import { RollupBuild, rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import resolve from "@rollup/plugin-node-resolve";
import webWorkerLoader from "rollup-plugin-web-worker-loader";

export async function getSolidityCompilerCode(
  entryModule: string,
  sourcemap = false
): Promise<string> {
  let bundle: RollupBuild;
  let source: string | null = null;

  try {
    bundle = await rollup({
      external: ["ContractsInFileStorage"],
      input: entryModule,
      plugins: [
        webWorkerLoader({ preserveSource: sourcemap, sourcemap }),
        commonjs({
          esmExternals: true,
          requireReturnsDefault: "preferred",
        }),
        resolve({
          mainFields: ["browser", "module", "main"],
          preferBuiltins: false,
        }),
        nodePolyfills({
          sourceMap: sourcemap,
        }),
        json(),
      ],
      treeshake: {
        preset: "smallest",
      },
    });
    const { output } = await bundle.generate({
      format: "esm",
      sourcemap,
    });

    if (output && output.length !== 0) {
      source = output[0].code;
    }
  } catch (e) {
    console.error(`There was an issue bundling the compiler`, e);
  } finally {
    if (bundle) {
      await bundle.close();
    }
  }
  return source;
}
