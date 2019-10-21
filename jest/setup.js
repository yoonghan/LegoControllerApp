import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { format } from 'prettier'

Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = Enzyme.shallow

Enzyme.ShallowWrapper.prototype.jsx = function jsx () {
  const placeholder = '{ something: null }'
  const obj = this.debug({ ignoreProps: false, verbose: true }).replace(/{\.\.\.}/g, placeholder)

  return format(obj, {
    parser: 'babylon',
    filepath: 'test/setup.mjs',
    trailingComma: 'all',
    semi: false,
    arrowParens: 'always',
  })
    .replace(new RegExp(placeholder, 'g'), '{...}')
    .replace(';<', '<')
}
// the html function just throws errors so it's just reset to be the jsx function
Enzyme.ShallowWrapper.prototype.html = Enzyme.ShallowWrapper.prototype.jsx

const { JSDOM } = require('jsdom')


const jsdom = new JSDOM()
const { window } = jsdom
function copyProps (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .map((prop) => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
copyProps(window, global)
Enzyme.configure({ adapter: new Adapter() })

// Ignore React Web errors when using React Native
// allow other errors to propagate if they're relevant
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser)/
const realConsoleError = console.error
console.error = (message) => {
  if (message.match(suppressedErrors)) {
    return
  }
  realConsoleError(message)
}
require('react-native-mock-render/mock')
