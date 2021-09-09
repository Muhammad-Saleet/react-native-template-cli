import { Command, flags as oclifFlags } from '@oclif/command'

export default class Component extends Command {
    static description = 'Generates a component'

    static usage = 'generate:component ComponentName'

    static flags = { help: oclifFlags.help({ char: 'h' }) }

    static args = [
        {
            name: 'name',
            required: true,
            description: 'The name of the component in PascalCase',
        },
    ]

    async run() {
        const { args } = this.parse(Component)
        this.log(`running my command with args: ${args.name}`)
    }
}
