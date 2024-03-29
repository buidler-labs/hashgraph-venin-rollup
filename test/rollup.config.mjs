/* eslint-env node */

import { dirname, join as pathJoin } from "path";
import { fileURLToPath } from "url";

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import resolve from "@rollup/plugin-node-resolve";

import venin from "@buidlerlabs/rollup-plugin-hashgraph-venin";

import dotenv from "dotenv";
dotenv.config();

// Make sure we use the contracts defined for this bundle
process.env.HEDERAS_CONTRACTS_RELATIVE_PATH = "./test/contracts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensions = [".mjs", ".ts"];

export default {
  context: "window",
  input: "./test/smoke.spec.mjs",
  output: [
    {
      file: "./test/lib.esm/venin-rollup-test-bundle.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    venin({
      contracts: {
        path: pathJoin(__dirname, "contracts"),
      },
      includeCompiler: true,
      sourceMap: true,
    }),
    commonjs({
      esmExternals: true,
      requireReturnsDefault: "auto",
    }),
    resolve({
      mainFields: ["browser", "module", "main"],
      preferBuiltins: false,
    }),
    nodePolyfills({
      sourceMap: true,
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "./node_modules/**",
      extensions,
      include: ["lib/**/*.ts"],
      plugins: [["@babel/plugin-transform-runtime", { regenerator: true }]],
      presets: [
        ["@babel/env", { targets: "> 0.25%, not dead" }],
        ["@babel/typescript"],
      ],
    }),
    json(),
  ],
  treeshake: true,
};
