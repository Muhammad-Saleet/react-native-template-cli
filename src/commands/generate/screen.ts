import { Command, flags as oclifFlags } from '@oclif/command'
import { errorMessages, toCamelCase, getConfigPath, generateFile } from '../../helpers'
const path = require('path')
import * as jetpack from 'fs-jetpack'
import { ConfigType } from '../../types'

export default class Screen extends Command {
    static description = 'Generates a screen'

    static usage = 'generate:screen FirstScreen SecondSecond ...'

    // allows the use of a variable number of arguments
    static strict = false

    static flags = { help: oclifFlags.help({ char: 'h' }) }

    async generateViewFile(
        nameCamelCase: string,
        namePascalCase: string,
        config: ConfigType,
    ) {
        const template = path.normalize(config.screenViewTemplatePath)
        const destination = path.join(
            config.screensPath,
            nameCamelCase,
            `${namePascalCase}View.tsx`
        )

        await generateFile(template, { namePascalCase, nameCamelCase }, destination)
    }

    async generateControllerFile(
        nameCamelCase: string,
        namePascalCase: string,
        config: ConfigType,
    ) {
        const template = path.normalize(config.screenControllerTemplatePath)
        const destination = path.join(
            config.screensPath,
            nameCamelCase,
            `${namePascalCase}Controller.tsx`
        )

        await generateFile(template, { namePascalCase, nameCamelCase }, destination)
    }

    async run() {
        const { argv } = this.parse(Screen)

        const { default: config }: {default: ConfigType} = await import(getConfigPath())

        if (!config.screensPath || !config.screenViewTemplatePath || !config.screenControllerTemplatePath) {
            throw new Error(errorMessages.invalidConfig)
        }

        for (const screen of argv) {
            const namePascalCase = screen
            const nameCamelCase = toCamelCase(screen)

            await this.generateViewFile(nameCamelCase, namePascalCase, config)
            await this.generateControllerFile(nameCamelCase, namePascalCase, config)

            // we will assume the index is in the screensPath
            const exportStatement = `export * from "./${nameCamelCase}/${namePascalCase}View"\n`
            const indexPath = path.join(config.screensPath, 'index.ts')
            // add an import statement to index.ts
            await jetpack.appendAsync(indexPath, exportStatement)
        }
    }
}
