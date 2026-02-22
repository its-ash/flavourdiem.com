import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');
const assetsSrc = path.join(rootDir, 'assets');
const assetsDest = path.join(docsDir, 'assets');

const skipDirs = new Set(['node_modules', '.git', 'docs']);

async function findEjsFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) {
        continue;
      }
      files.push(...(await findEjsFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.ejs')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function copyDirectory(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

async function build() {
  await fs.rm(docsDir, { recursive: true, force: true });
  await fs.mkdir(docsDir, { recursive: true });

  const ejsFiles = await findEjsFiles(rootDir);

  if (ejsFiles.length === 0) {
    throw new Error('No .ejs files found in project.');
  }

  for (const ejsFile of ejsFiles) {
    const relativePath = path.relative(rootDir, ejsFile);
    const outputRelativePath = relativePath.replace(/\.ejs$/i, '.html');
    const outputPath = path.join(docsDir, outputRelativePath);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    const rendered = await ejs.renderFile(ejsFile, {}, {
      root: rootDir,
      views: [rootDir]
    });

    await fs.writeFile(outputPath, rendered, 'utf8');
    console.log(`Built ${outputRelativePath}`);
  }

  await copyDirectory(assetsSrc, assetsDest);
  console.log('Copied assets to docs/assets');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
