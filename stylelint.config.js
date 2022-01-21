module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order',
        'stylelint-config-prettier'
    ],
    // overrides: [
    //     {
    //         files: ['*.vue', '**/*.vue'],
    //         rules: {
    //             'unit-allowed-list': ['em', 'rem', 's']
    //         }
    //     }
    // ],
    ignoreFiles: ['**/*.js', '**/*.ts', 'lib/*', 'dist/*', 'docs/dist/*'],
    rules: {
        'selector-class-pattern': null
    }
}
