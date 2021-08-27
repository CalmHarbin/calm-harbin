module.exports = {
    defaultSeverity: 'error',
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order', // 属性排序规则
        'stylelint-config-prettier'
    ],
    plugins: [
        'stylelint-order',
        'stylelint-scss',
        'stylelint-declaration-block-no-ignored-properties'
    ],
    rules: {
        // 不要使用已被 autoprefixer 支持的浏览器前缀
        'media-feature-name-no-vendor-prefix': true,
        'at-rule-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'no-descending-specificity': null,
        //https://github.com/stylelint/stylelint/issues/4114
        'function-calc-no-invalid': null,
        'function-url-quotes': 'always',
        'font-family-no-missing-generic-family-keyword': null,
        // 'plugin/declaration-block-no-ignored-properties': true,
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
        // 忽略v-deep伪元素
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'mixin',
                    'include',
                    'if',
                    'else',
                    'extend',
                    'for'
                ]
            }
        ],
        indentation: 4
    }
}
