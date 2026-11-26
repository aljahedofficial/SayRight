import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attributes, source]) => !/\bsrc\s*=/.test(attributes) && source.trim());

if (inlineScripts.length === 0) {
  throw new Error('No inline JavaScript found in index.html.');
}

for (const [index, [, , source]] of inlineScripts.entries()) {
  new vm.Script(source, { filename: `index.html inline script ${index + 1}` });
}

console.log(`Syntax OK: checked ${inlineScripts.length} inline scripts.`);
