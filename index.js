import { build } from 'esbuild';
import fs from 'fs/promises';

// 1. we're going to create a fake node_module to use as an entry point
await fs.mkdir("./node_modules/fake-module", { recursive: true });
await fs.writeFile("./node_modules/fake-module/entrypoint.js", "export default 'Hello World'")

// 2. build an entrypoint from node_modules

await build({
  // in my project i have many entry points, but using a single entrypoint to keep it simple
  entryPoints: ['./node_modules/fake-module/entrypoint.js'], 
  bundle: true,
  entryNames: '[dir]/[name]',
  outbase: "./",
  outdir: './dist',
  platform: 'node',
  format: 'esm',
});

// 3. dynamically import that entrypoint
// this will fail because node_modules exists in the path. Node thinks this is a node module
await import("./dist/node_modules/fake-module/entrypoint.js");


