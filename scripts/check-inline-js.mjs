import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attributes, source]) => !/\bsrc\s*=/.test(attributes) && source.trim());
const actorSelectors = [...html.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)]
  .filter(([, , options]) => /\bvalue=["'](?:uk|us)_/.test(options))
  .map(([, attributes]) => attributes.match(/\bid=["']([^"']+)["']/)?.[1]);

if (inlineScripts.length === 0) {
  throw new Error('No inline JavaScript found in index.html.');
}

if (actorSelectors.length !== 2 || actorSelectors[0] !== 'ukActorSelect' || actorSelectors[1] !== 'usActorSelect') {
  throw new Error('Expected only the British and American voice actor selectors in the page.');
}

for (const [index, [, , source]] of inlineScripts.entries()) {
  new vm.Script(source, { filename: `index.html inline script ${index + 1}` });
}

console.log(`Checks OK: ${inlineScripts.length} inline scripts and exactly two dialect voice selectors.`);
