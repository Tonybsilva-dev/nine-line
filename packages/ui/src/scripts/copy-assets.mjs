import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const srcFile = path.join(packageRoot, 'src', 'styles.css');
const destDir = path.join(packageRoot, 'dist');
const destFile = path.join(destDir, 'styles.css');

try {
  // Garante que o diretório de destino exista
  await fs.mkdir(destDir, { recursive: true });
  // Copia o arquivo
  await fs.copyFile(srcFile, destFile);
  console.log('✅ Styles copied successfully!');
} catch (error) {
  console.error('❌ Failed to copy styles:', error);
  process.exit(1);
}