import esbuild from 'esbuild';
import glob from 'fast-glob';
import { promises as fs } from 'fs';
import path from 'path';

// Transpila todos os arquivos .ts
const entryPoints = await glob('src/**/*.ts');

await esbuild.build({
  entryPoints,
  outdir: 'dist',
  bundle: false,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  external: [],
  sourcemap: true,
});

// Copia arquivos auxiliares (json, env, yml, yaml) mantendo estrutura
const extraFiles = await glob(['src/**/*.{json,env,yml,yaml}']);
for (const file of extraFiles) {
  const dest = path.join('dist', file.replace(/^src\//, ''));
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(file, dest);
}
