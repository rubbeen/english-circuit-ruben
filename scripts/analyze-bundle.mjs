import { readdir, readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

async function files(root) { const result = []; for (const entry of await readdir(root, { withFileTypes: true })) { const full = path.join(root, entry.name); if (entry.isDirectory()) result.push(...await files(full)); else result.push(full); } return result; }
const targets = (await files('dist')).filter((file) => /\.(js|css)$/.test(file));
const rows = [];
for (const file of targets) { const raw = await readFile(file); rows.push({ file: path.relative('dist', file), raw: (await stat(file)).size, gzip: gzipSync(raw).length }); }
rows.sort((a,b)=>b.gzip-a.gzip);
console.table(rows.map((row)=>({ archivo: row.file, 'KB bruto': (row.raw/1024).toFixed(1), 'KB gzip': (row.gzip/1024).toFixed(1) })));
const initialJs = rows.filter((row)=>row.file.endsWith('.js') && !row.file.includes('week-')).reduce((sum,row)=>sum+row.gzip,0);
const css = rows.filter((row)=>row.file.endsWith('.css')).reduce((sum,row)=>sum+row.gzip,0);
console.log(`JavaScript inicial aproximado: ${(initialJs/1024).toFixed(1)} KB gzip (objetivo <= 450 KB)`);
console.log(`CSS total: ${(css/1024).toFixed(1)} KB gzip (objetivo <= 80 KB)`);
if (rows.some((row)=>row.gzip>500*1024) || initialJs>450*1024 || css>80*1024) process.exitCode=1;

