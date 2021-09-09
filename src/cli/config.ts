export default {
    componentTemplatePath: 'src/cli/templates/component.ejs',
    screenTemplatePath: 'src/cli/templates/screen.ejs',
    stackTemplatePath: 'src/cli/templates/stack.ejs',

    // when an element is generated, it will reside in the respective directory.
    // Moreover, it will be re-exported in an index.ts file residing in the directory.
    // if index.ts does not exist, it will be created.
    componentsPath: 'src/components',
    screensPath: 'src/screens',
    stacksPath: 'src/navigation/stacks',
}
