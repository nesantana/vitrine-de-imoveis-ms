module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@models': './src/models',
          '@routes': './src/routes',
          '@utils': './src/utils',
          '@interfaces': './src/interfaces',
        },
      },
    ],
  ],
}
