import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

if (command === "make:module") {
  const moduleName = args[1];
  if (!moduleName) {
    console.error("❌ Nama module wajib diisi!");
    process.exit(1);
  }

  const camelizeModuleName = camelize(moduleName);
  const templatePath = path.join(__dirname, "module");
  const targetPath = path.join(__dirname, "..", "modules", camelizeModuleName);
  copyTemplate(templatePath, targetPath, moduleName);
  console.log(`✅ Module "${moduleName} created!"`);
}

function camelize(string) {
  return string
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

function copyTemplate(src, dest, moduleName) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name
      .replace(/__Module__/g, moduleName)
      .replace(/__module__/g, moduleName.toLowerCase())
      .replace(/__MODULE__/g, moduleName.toUpperCase());

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyTemplate(srcPath, destPath, moduleName);
    } else {
      let content = fs.readFileSync(srcPath, "utf8");
      content = content
        .replace(/__Module__/g, moduleName)
        .replace(/__module__/g, moduleName.toLowerCase())
        .replace(/__MODULE__/g, moduleName.toUpperCase());
      fs.writeFileSync(destPath, content);
    }
  }
}
