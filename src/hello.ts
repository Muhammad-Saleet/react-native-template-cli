/* This is just a sample file. A command should go under src/commands */

import { Command, flags as oclifFlags } from '@oclif/command'

export default class Hello extends Command {
    static description = `
    description of my command
    can be multiline
    `

    // hide the command from help
    static hidden = false

    // custom usage string for help
    // this overrides the default usage
    static usage = 'mycommand --myflag'

    // examples to add to help
    // each can be multiline
    static examples = [
        '$ hello first second', // command with args
        '$ hello --force --name=muhammad', // command with boolean and option flags
    ]

    // this makes the parser not fail when it receives invalid arguments
    // defaults to true
    // set it to false if you need to accept variable length arguments
    static strict = false

    // defining positional arguments
    static args = [
        { name: 'firstArg' },
        {
            name: 'secondArg', // name of arg to show in help and reference with args[name]
            required: false, // make the arg required with `required: true`
            description: 'An argument with options specified for demo purposes', // help description
            hidden: true, // hide this arg from help
            parse: (input: string) => input.toLowerCase(), // instead of the user input, return a different value
            default: 'world', // default value if no arg input
            options: ['a', 'b'], // only allow input to be from a discrete set
        },
    ]

    static flags = {
        help: oclifFlags.help({ char: 'h' }),

        // flag with no value (-f, --force)
        force: oclifFlags.boolean({
            char: 'f',
            default: true, // default value if flag not passed (can be a function that returns a boolean)
            // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
            // The flag will be set to false if reversed. This functionality
            // is disabled by default, to enable it:
            // allowNo: true
        }),

        // flag with a value (-n, --name=VALUE)
        name: oclifFlags.string({
            char: 'n', // shorter flag version
            description: 'name to print', // help description for flag
            hidden: false, // hide from help
            multiple: false, // allow setting this flag multiple times
            env: 'MY_NAME', // default to value of environment variable
            options: ['a', 'b'], // only allow the value to be from a discrete set
            parse: (input: string) => input, // instead of the user input, return a different value
            default: 'world', // default value if flag not passed (can be a function that returns a string or undefined)
            required: false, // make flag required (this is not common and you should probably use an argument instead)
            dependsOn: ['extra-flag'], // this flag requires another flag
            exclusive: ['extra-flag'], // this flag cannot be specified alongside this other flag
        }),
    }

    async run() {
        // logging
        this.log('hello, world!')

        this.warn('uh oh!')
        this.warn(new Error('uh oh!'))

        this.error('uh oh!', { exit: 2 })
        this.error(new Error('uh oh!'))

        // getting args as an object or as an array
        const { args, argv } = this.parse(Hello)
        this.log(`running my command with args: ${args.firstArg}, ${args.secondArg}`)
        this.log(`running my command with args: ${argv[0]}, ${argv[1]}`)
    }
}
