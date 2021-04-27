module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        semi: ['warn', 'always'],
        quotes: ['warn', 'single'],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx']
        }
    ]
};
