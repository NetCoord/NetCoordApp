// Storing in variable a context with all files in this folder
// ending with `.js`.
const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }

  // filter fullstops and extension
  // and return a camel-case name for the file
  const moduleName = camelize(fileName.replace(/(\.\/|\.js)/g, ''))

  // create a dynamic object with all modules
  modules[moduleName] = {
    // add namespace here
    namespaced: true,
    ...requireModule(fileName).default
    // if you have exported the object with name in the module `js` file
    // e.g., export const name = {};
    // uncomment this line and comment the above
    // ...requireModule(fileName)[moduleName]
  }
})

export default modules
