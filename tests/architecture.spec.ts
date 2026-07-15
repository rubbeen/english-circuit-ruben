import { describe, expect, it } from 'vitest';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

async function sourceFiles(root: string): Promise<string[]> { const output:string[]=[]; for(const entry of await readdir(root,{withFileTypes:true})){const full=path.join(root,entry.name);if(entry.isDirectory())output.push(...await sourceFiles(full));else if(/\.(ts|tsx)$/.test(full))output.push(full);}return output; }

describe('architecture boundaries', () => {
  it('UI does not access Firestore or IndexedDB', async () => { for (const file of [...await sourceFiles('src/ui'), ...await sourceFiles('src/pages')]) { const source=await readFile(file,'utf8'); expect(source, file).not.toMatch(/firebase\/firestore|infrastructure\/indexeddb|\bindexedDB\b/); } });
  it('production code has no financial collection calls', async () => { for (const file of await sourceFiles('src')) { const source=await readFile(file,'utf8'); expect(source, file).not.toMatch(/(?:collection|doc)\s*\([^\n]*(?:accounts|categories|movements|budgets)/i); } });
});
