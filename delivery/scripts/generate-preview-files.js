const fs = require("node:fs");
const path = require("node:path");

const outDir = path.resolve(__dirname, "..", "out");

if (!fs.existsSync(outDir)) {
  console.error(
    'The "out" directory was not found. Run `next build` before generating preview files.',
  );
  process.exit(1);
}

const files = [
  {
    name: "robots.txt",
    contents: "User-agent: *\nDisallow: /\n",
  },
  {
    name: "_headers",
    contents:
      ["/*", "  Basic-Auth: client preview2025", "  X-Robots-Tag: noindex, nofollow"].join("\n") +
      "\n",
  },
];

files.forEach(({ name, contents }) => {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, contents, "utf8");
  console.log(`Generated ${path.relative(process.cwd(), filePath)}`);
});
