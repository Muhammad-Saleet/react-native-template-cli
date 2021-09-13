import { Command, flags as oclifFlags } from '@oclif/command'
import { errorMessages, toCamelCase, getConfigPath, generateFile } from '../../helpers'
const path = require('path')
import * as jetpack from 'fs-jetpack'
import { ConfigType } from '../../types'

export default class Component extends Command {
    static description = 'Generates a component'

    static usage = 'generate:component FirstComponent SecondComponent ...'

    // allows the use of a variable number of arguments
    static strict = false

    static flags = { help: oclifFlags.help({ char: 'h' }) }

    async generateComponentFile(
        nameCamelCase: string,
        namePascalCase: string,
        config: ConfigType,
    ) {
        const template = path.normalize(config.componentTemplatePath)
        const destination = path.join(
            config.componentsPath,
            nameCamelCase,
            `${namePascalCase}.tsx`
        )

        await generateFile(template, { namePascalCase }, destination)
    }

    async generateComponentTestFile(
        nameCamelCase: string,
        namePascalCase: string,
        config: ConfigType,
    ) {
        const template = path.normalize(config.componentTestTemplatePath)
        const destination = path.join(
            config.componentTestsPath,
            `${namePascalCase}.test.tsx`
        )

        await generateFile(template, { namePascalCase }, destination)
    }

    async run() {
        const { argv } = this.parse(Component)

        const { default: config }: {default: ConfigType} = await import(getConfigPath())

        if (!config.componentsPath || !config.componentTemplatePath) {
            throw new Error(errorMessages.invalidConfig)
        }

        for (const component of argv) {
            const namePascalCase = component
            const nameCamelCase = toCamelCase(component)

            await this.generateComponentFile(nameCamelCase, namePascalCase, config)
            await this.generateComponentTestFile(nameCamelCase, namePascalCase, config)

            // we will assume the index is in the componentsPath
            const exportStatement = `export * from "./${nameCamelCase}/${namePascalCase}"\n`
            const indexPath = path.join(config.componentsPath, 'index.ts')
            // add an import statement to index.ts
            await jetpack.appendAsync(indexPath, exportStatement)
        }
    }
}
