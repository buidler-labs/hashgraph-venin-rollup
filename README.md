# Hedera Strato Rollup

[![Discord support channel](https://img.shields.io/discord/949250301792239686?style=flat-square)](https://discord.com/invite/4mYCre869F)
![contributions](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
![license](https://img.shields.io/github/license/buidler-labs/hedera-strato-rollup.svg?colorB=ff0000&style=flat-square)
![node version](https://img.shields.io/badge/Node.js-%3E%3D14.8.0-orange.svg?style=flat-square)

... rollup's best friend for bundling [Strato](https://github.com/buidler-labs/hedera-strato-js)

## Quick. No questions asked, TL;LDR;
Do a
```
npm install --save-dev @buidlerlabs/rollup-plugin-hedera-strato
```
then, in your `rollup.config.json` or any [other Rollup config option of preference](https://rollupjs.org/guide/en/#configuration-files), do

```js
import strato from "@buidlerlabs/rollup-plugin-hedera-strato";

//...
export default {
  //...
  plugins: [
    strato(),
    //...
  ]
  //...
}
```

*That's it!* 🍾 Now you can bundle your dApp and have Strato embedded in it, ready to be used. 🥂

## Config-ing
You can configure the plugin by passing in an object with the following properties and meaning:

| Prop  | Description  |
| ----- | ----------- |
`contracts.path` | Where to load the solidity contracts from
`contracts.recurse` | `true` to deep load all the inner directory's contracts from `contracts.path`, `false` to only load the provided top directory
`environment` | The environment object passed to Strato to be used when creating `ApiSession.default` instances
`includeCompiler` | `true` to embed a web-worker that will allow in-browser compilation (note: the solidity compiler is lazy loaded the first time a `Contract.newFrom`/`Contract.allFrom` is called) and `false` if you don't intend to use this feature (conserves bandwidth)
`sourceMap` | `true` to include the source-map (helpful for debugging), `false` otherwise

Embedding the plugin with no such object is equivalent to virtually calling:
```
strato({
  contracts: {
    path: './contracts',
    recurse: false
  },
  environment: process.env,
  includeCompiler: false,
  sourceMap: false
})
```

For an immediate working example, have a look at [our bundler recipe used by our test-base](https://github.com/buidler-labs/hedera-strato-rollup/blob/main/test/rollup.config.js).

## Further docs
Need more context and configurability? Check our [official docs page](https://hsj-docs.buidlerlabs.com/) for more info.

## Testing it

Have the `.env` file ready (see above) and run

```
$ npm test
```

## Contributions

... are more then welcome! Head over to [our issues page](https://github.com/buidler-labs/hedera-strato-js/issues) and let us know your thoughts or, better yet, open that PR and lets discuss it there! 

Oh! And if you ever feel like talking to us, you can [reach us on discord](https://discord.gg/4mYCre869F). We're very friendly! 👨‍👩‍👧‍👦

## License

This work has been published under the MIT License.
