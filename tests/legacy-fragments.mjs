import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const redirects = JSON.parse(readFileSync(resolve(root, 'docs.json'))).redirects;
// Heading snapshots from the previously published Rayline docs (c09bb73 and 7068df9).
const legacy = JSON.parse(readFileSync(new URL('./legacy-fragments.json', import.meta.url)));
const slug = (heading) => heading.toLowerCase().replace(/<[^>]*>/g, '')
  .replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
let checked = 0;

for (const { source, destination, fragments } of legacy) {
  assert.equal(redirects.find((redirect) => redirect.source === source)?.destination, destination,
    `Legacy route ${source} must retain its destination`);
  const path = destination.slice(1);
  const file = [`${path}.mdx`, `${path}/index.mdx`].map((name) => resolve(root, name)).find(existsSync);
  assert.ok(file, `Missing destination ${destination}`);
  const content = readFileSync(file, 'utf8');
  const ids = [...content.matchAll(/<span id="([^"]+)"\s*\/>/g)].map((match) => match[1]);
  const counts = new Map();
  for (const match of content.matchAll(/^#{2,6} (.+)$/gm)) {
    const id = slug(match[1]);
    const count = counts.get(id) ?? 0;
    counts.set(id, count + 1);
    ids.push(count ? `${id}-${count}` : id);
  }
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs on ${destination}`);
  for (const fragment of fragments) {
    assert.ok(ids.includes(fragment), `${source}#${fragment} has no anchor at ${destination}`);
    checked++;
  }
}

console.log(`Preserved ${checked} legacy fragment links across ${legacy.length} redirects.`);
