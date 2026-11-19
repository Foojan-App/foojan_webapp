import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const theme = path.join(here, "foojan");
const input = path.join(theme, "assets/src/site.css");
const output = path.join(theme, "assets/css/site.css");

const copyAssets = () => {
  cpSync(path.join(root, "public/images"), path.join(theme, "assets/images"), { recursive: true });
  cpSync(path.join(here, "images"), path.join(theme, "assets/images"), { recursive: true });
  mkdirSync(path.join(theme, "assets/fonts"), { recursive: true });
  for (const weight of ["400", "700"]) {
    cpSync(path.join(root, `src/app/fonts/dm-sans-arrow-${weight}.woff2`), path.join(theme, `assets/fonts/dm-sans-arrow-${weight}.woff2`));
  }
};

const photos = [
  "foojan-hero.png",
  ...readdirSync(path.join(root, "public/images/home")).map((file) => `home/${file}`),
  ...readdirSync(path.join(here, "images/pages")).map((file) => `pages/${file}`),
];

const optimizeImages = async () => {
  let before = 0;
  let after = 0;
  for (const file of photos.filter((name) => /\.(png|jpe?g)$/i.test(name))) {
    const source = path.join(theme, "assets/images", file);
    const target = source.replace(/\.(png|jpe?g)$/i, ".webp");
    const input = readFileSync(source);
    const info = await sharp(input).webp({ quality: 82, effort: 6 }).toFile(target);
    before += input.length;
    after += info.size;
    rmSync(source);
  }
  return { before, after };
};

const buildCss = async () => {
  const compiler = await compile(readFileSync(input, "utf8"), { base: path.dirname(input), onDependency: () => {} });
  const sources = compiler.sources.map((source) => ({ base: source.base, pattern: source.pattern, negated: source.negated }));
  const scanner = new Scanner({ sources });
  const css = compiler.build(scanner.scan());
  const minified = optimize(css, { minify: true }).code;
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, minified);
  return { bytes: minified.length, candidates: scanner.scan().length };
};

const zipTheme = () => {
  const dist = path.join(here, "dist");
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  execFileSync("zip", ["-rq", path.join(dist, "foojan.zip"), "foojan", "-x", "foojan/assets/src/*", "*.DS_Store"], { cwd: here });
  return path.join(dist, "foojan.zip");
};

copyAssets();
const images = await optimizeImages();
console.log(`Images: ${(images.before / 1048576).toFixed(1)} MB -> ${(images.after / 1048576).toFixed(1)} MB`);
const result = await buildCss();
console.log(`CSS: ${result.bytes} bytes from ${result.candidates} candidates -> ${path.relative(root, output)}`);
if (process.argv.includes("--zip")) console.log(`Zip: ${path.relative(root, zipTheme())}`);
