#! /usr/bin/env node
// @ts-check

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
        if (file === "package.json") {
          copyPackageJson(sourceFile, targetFile);
        } else {
          copyFile(sourceFile, targetFile);
        }
      }
    });
  });
});

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 */
function copyPackageJson(sourceFile, targetFile) {
  const fileContent = fs.readFileSync(sourceFile, "utf8");
  const targetContent = fileContent.replace("sanetools", targetDirName);
  const targetJson = JSON.parse(targetContent);

  delete targetJson["bin"];
  delete targetJson["author"];
  delete targetJson["license"];

  fs.writeFileSync(targetFile, JSON.stringify(targetJson, null, 2));
}

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 */
function copyFile(sourceFile, targetFile) {
  fs.copyFile(sourceFile, targetFile, (err) => {
    if (err) throw err;
  });
}
