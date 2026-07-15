import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const mode = process.argv[2]; const errors = [];
const text = async (file) => { try { return await readFile(file, 'utf8'); } catch { return ''; } };
const allFiles = async (root) => { const output=[]; for(const entry of await readdir(root,{withFileTypes:true})){if(['node_modules','.git','dist','android'].includes(entry.name))continue;const full=path.join(root,entry.name);if(entry.isDirectory())output.push(...await allFiles(full));else output.push(full);}return output; };
const pkg = JSON.parse(await text('package.json')); const capacitor = await text('capacitor.config.ts'); const rc = await text('.firebaserc'); const firebase = await text('firebase.json');

if (mode === 'project' || mode === 'release') {
  if (pkg.name !== 'english-circuit-ruben') errors.push('El repositorio activo no es English Circuit.');
  if (!capacitor.includes('com.ruben.englishcircuit') || capacitor.includes('com.ruben.controlfinanciero')) errors.push('Package ID Android incorrecto.');
  const remote = (await import('node:child_process')).execFileSync('git',['remote','get-url','origin'],{encoding:'utf8'}).trim();
  if (!remote.includes('rubbeen/english-circuit-ruben')) errors.push('Remoto Git incorrecto.');
}
if (mode === 'firebase' || mode === 'release') {
  if (!rc.includes('control-financiero-ruben') || !rc.includes('"english"')) errors.push('Proyecto o target Firebase incorrecto.');
  if (!firebase.includes('hosting') || !firebase.includes('english')) errors.push('Hosting no está limitado al target english.');
}
if (mode === 'security' || mode === 'release') {
  const files = await allFiles('.');
  for (const file of files) {
    if (/\.(png|jpg|ico|woff2|lock)$/.test(file)) continue; const source = await text(file);
    if (file.includes(path.join('src','')) && /(?:collection|doc)\s*\([^\n]*(?:accounts|categories|movements|budgets)/i.test(source)) errors.push(`Consulta financiera detectada en ${file}.`);
    if (/firebase deploy(?![^\n]*--only)/.test(source) && !file.endsWith('AGENTS.md') && !file.endsWith('DEPLOYMENT.md')) errors.push(`Despliegue Firebase sin --only en ${file}.`);
    if (/com\.ruben\.controlfinanciero/.test(source) && !['AGENTS.md','DECISIONS.md','DISCOVERY.md','SECURITY.md'].some((name)=>file.endsWith(name))) errors.push(`Package ID financiero detectado en ${file}.`);
    if (/orientation\s*=\s*["'](?:portrait|landscape)/i.test(source)) errors.push(`Orientación bloqueada en ${file}.`);
    if (/BEGIN PRIVATE KEY|AIza[0-9A-Za-z_-]{30,}|gh[oprs]_[0-9A-Za-z]{20,}/.test(source)) errors.push(`Posible secreto en ${file}.`);
  }
  const storage = await text('storage.rules'); if (!storage.includes('allow read, write: if false')) errors.push('Storage no está bloqueado.');
  try { await access('functions'); errors.push('Cloud Functions está presente.'); } catch { /* expected */ }
}
if (mode === 'release') {
  const required=['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_MESSAGING_SENDER_ID','VITE_FIREBASE_APP_ID'];
  for(const key of required) if(!process.env[key]) errors.push(`Falta ${key}.`);
  if (process.env.CONTENT_PHASE !== 'final') errors.push('CONTENT_PHASE=final es obligatorio para release.');
}
if(errors.length){console.error(errors.map((e)=>`- ${e}`).join('\n'));process.exit(1)} console.log(`Guard ${mode}: correcto.`);

