import fs from 'fs';

// npx compodoc -p tsconfig.json -s

const data = JSON.parse(fs.readFileSync('docs/architecture.json', 'utf8'));
let out = '# Architecture Summary\n\n';

for (const mod of data.modules) {
  out += `## ${mod.name}\n`;
  if (mod.controllers?.length) {
    out += `**Controllers:** ${mod.controllers.map((c) => c.name).join(', ')}\n`;
  }
  if (mod.providers?.length) {
    out += `\n**Providers:** ${mod.providers.map((p) => p.name).join(', ')}\n`;
  }
  out += '\n---\n';
}

fs.writeFileSync('docs/ARCHITECTURE_OVERVIEW.md', out);
console.log('✅ Generated docs/ARCHITECTURE_OVERVIEW.md');
