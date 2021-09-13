import * as jetpack from 'fs-jetpack'
const ejs = require('ejs')
const path = require('path')

export const toCamelCase = (str: string) => (
    str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
        index === 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '')
)

export const getConfigPath = () => path.join(process.cwd(), 'src/cli/config')

export const generateFile = async (
    template: string,
    data: { [key: string]: any },
    destination: string
) => {
    // read the template
    const templateString = await jetpack.readAsync(template)

    // render it
    const rendered = ejs.render(templateString, data)

    // write it to a file
    await jetpack.writeAsync(destination, rendered)
}

export const errorMessages = {
    invalidConfig: `
Make sure a config with the following keys exists in the ./cli directory:

componentTemplatePath -> path to the component.ejs template
screenTemplatePath -> path to the screen.ejs template
stackTemplatePath -> path to the stack.ejs template
componentsPath -> path to the directory where generated components should reside
screensPath -> path to the directory where generated screens should reside
stacksPath -> path to the directory where generated stacks should reside

`,
}
