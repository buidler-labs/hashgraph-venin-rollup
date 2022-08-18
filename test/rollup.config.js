/* eslint-env node */

import { join as pathJoin } from "path";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import resolve from "@rollup/plugin-node-resolve";

import strato from "@buidlerlabs/rollup-plugin-hedera-strato";

import dotenv from "dotenv";
dotenv.config();

// Make sure we use the contracts defined for this bundle
process.env.HEDERAS_CONTRACTS_RELATIVE_PATH = "./test/contracts";

const extensions = [".js", ".ts"];

export default {
  context: "window",
  input: "./test/smoke.spec.js",
  output: [
    {
      file: "./test/lib.esm/strato-rollup-test-bundle.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    strato({
      contracts: {
        path: pathJoin(__dirname, "contracts"),
      },
      includeCompiler: true,
      sourceMap: true,
    }),
    resolve({
      extensions,
      mainFields: ["browser", "module", "main"],
      preferBuiltins: false,
    }),
    commonjs({
      esmExternals: true,
      requireReturnsDefault: "preferred",
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
}
