#! /usr/bin/env node
// @ts-check

import fs from "fs/promises";
import path from "path";
import url from "url";
import { execSync } from "child_process";

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

// top level await :tada:
await createSaneToolsProject(sourceDir, targetDirName);

/**
 * @param {string} sourceDir
 * @param {string} targetDirName
 */
async function createSaneToolsProject(sourceDir, targetDirName) {
  if (!targetDirName) {
    console.error("Please provide a target directory");
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), targetDirName);

  await fs.mkdir(targetDir);
  console.log(`Directory ${targetDir} created`);

  const files = await fs.readdir(sourceDir);

  const promises = files.map(async (file) => {
    if (ignoreList.includes(file)) return;

    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);

    const isDir = (await fs.lstat(sourceFile)).isDirectory();
    if (isDir) {
      return copyDir(sourceFile, targetFile);
    } else {
      if (file === "package.json") {
        return copyPackageJson(sourceFile, targetFile);
      } else {
        return copyFile(sourceFile, targetFile);
      }
    }
  });
  // janky copy gitignore because it gets ignored because it includes `.git`
  copyFile(path.join(sourceDir, '.gitignore'), path.join(targetDir, '.gitignore'));

  await Promise.all(promises);

  initializeProject(targetDir);
}

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 * @returns {Promise<void>}
 */
async function copyDir(sourceFile, targetFile) {
  console.log(`copying ${targetFile}/...`);
  await fs.cp(sourceFile, targetFile, { recursive: true });
}

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 * @returns {Promise<void>}
 */
async function copyPackageJson(sourceFile, targetFile) {
  const fileContent = await fs.readFile(sourceFile, "utf8");
  const targetContent = fileContent.replace("sanetools", targetDirName);
  const targetJson = JSON.parse(targetContent);

  delete targetJson["bin"];
  delete targetJson["author"];
  delete targetJson["license"];

  console.log(`copying ${targetFile}`);
  await fs.writeFile(targetFile, JSON.stringify(targetJson, null, 2));
}

/**
 * @param {string} sourceFile
 * @param {string} targetFile
 * @returns {Promise<void>}
 */
async function copyFile(sourceFile, targetFile) {
  console.log(`copying ${targetFile}`);
  await fs.copyFile(sourceFile, targetFile);
}

/**
 * @param {string} targetDir
 */
function initializeProject(targetDir) {
  console.log("installing dependencies...");
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });

  console.log("initializing the project...");
  execSync("cp .env.sample .env", { cwd: targetDir, stdio: "inherit" });
  execSync("npm run db:migrate initial && npm run db:deploy", {
    cwd: targetDir,
    stdio: "inherit",
  });
}
