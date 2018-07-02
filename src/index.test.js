import * as babel from 'babel-core'

import namedDirectory from './index'

const testCases = [
  {
    input: `import sth from './test_dir/path/to/some/Module'`,
    output: `import sth from './test_dir/path/to/some/Module/Module.js`
  },
  {
    input: `export { sth } from './test_dir/Module'`,
    output: `export { sth } from './test_dir/Module/Module.js'`
  },
  {
    input: `const Module = require('./test_dir/Module')`,
    output: `const Module = require('./test_dir/Module/Module.js')`
  }
]

testCases.forEach(({ input, output }) => {
  test(`it should resolve ${input} to ${output}`, () => {
    const babeled = babel.transform(input, {
      babelrc: false,
      plugins: [
        namedDirectory
      ]
    }).code
    console.log(babeled)
    expect(babeled).toMatch(output)
  })
})
