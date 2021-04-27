module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    webpackFinal: (config) => {
        const cssRule = config.module.rules.find(rule => rule.test.toString() === '/\\.css$/');
        if (cssRule) {
            cssRule.exclude = /\.module\.css$/;
            config.module.rules.push({
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ]
            })
        }
        return config;
      }
}