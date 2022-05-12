module.exports = {
  env: {
    esm: {
      ignore: ["test/**/*.spec.ts"],
      presets: ["@babel/preset-typescript"],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            absoluteRuntime: false,
            corejs: false,
            helpers: true,
            regenerator: true,
          },
        ],
      ],
    },
    cjs: {
      ignore: ["test/**/*.spec.ts"],
      presets: [
        ["@babel/env", { modules: "commonjs" }],
        "@babel/preset-typescript",
      ],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            absoluteRuntime: false,
            corejs: false,
            helpers: true,
            regenerator: true,
          },
        ],
      ],
    },
  },
};