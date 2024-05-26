#! /usr/bin/env node

import fs from "fs";
import path from "path";
import url from "url";

const ignoreList = [
  ".git",
  ".github",
  "bin",
  "node_modules",
  "package-lock.json",
];

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "..");
const targetDirName = process.argv[2];

if (!targetDirName) {
  console.error("Please provide a target directory");
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), targetDirName);

fs.mkdir(targetDir, (err) => {
  if (err) throw err;
  console.log(`Directory ${targetDir} created`);

  fs.readdir(sourceDir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (ignoreList.includes(file)) return;

      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);

      if (fs.lstatSync(sourceFile).isDirectory()) {
        fs.cp(sourceFile, targetFile, { recursive: true }, (err) => {
          if (err) throw err;
          console.log(`${file} created at ${targetDir}`);
        });
      } else {
        fs.copyFile(sourceFile, targetFile, (err) => {
          if (err) throw err;
          console.log(`${file} created at ${targetDir}`);
        });
      }
    });
  });
});
