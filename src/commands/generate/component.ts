import { Command, flags as oclifFlags } from '@oclif/command'
import { toCamelCase } from '../../helpers'
import config from '../../cli/config'
const ejs = require('ejs')
const path = require('path')
import * as jetpack from 'fs-jetpack'

export default class Component extends Command {
    static description = 'Generates a component'

    static usage = 'generate:component FirstComponent SecondComponent ...'

    // allows the use of a variable number of arguments
    static strict = false

    static flags = { help: oclifFlags.help({ char: 'h' }) }

    async run() {
        const { argv } = this.parse(Component)

        for (const component of argv) {
            const namePascalCase = component
            const nameCamelCase = toCamelCase(component)
            const template = path.normalize(config.componentTemplatePath)
            const destination = path.join(
                config.componentsPath,
                nameCamelCase,
                `${namePascalCase}.tsx`
            )

            // we will assume the index is in the componentsPath
            const exportStatement = `export * from "./${nameCamelCase}/${namePascalCase}"\n`
            const indexPath = path.join(config.componentsPath, 'index.ts')

            try {
                // read the template
                const templateString = await jetpack.readAsync(template)

                // render it
                const data = { namePascalCase, nameCamelCase }
                const rendered = ejs.render(templateString, data)

                // write it to a file
                await jetpack.writeAsync(destination, rendered)

                // add an import statement to index.ts
                await jetpack.appendAsync(indexPath, exportStatement)
            } catch (error) {
                this.log(error)
            }
        }
    }
}
