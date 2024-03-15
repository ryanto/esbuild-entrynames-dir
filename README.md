# README

This build ends up creating an output file that has `node_modules` in its path. This causes node to think
the file is a node_module, and is confused when it finds ESM code in the directory.

To reproduce:

```bash
npm i
node index
```