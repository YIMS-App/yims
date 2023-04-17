module.exports = {
    // setting up plugins
    extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
    // environment
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true,
      node: true,
    },
    // here you can set and disable particular rules
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'max-len': [
        'warn',
        {
          code: 120,
          tabWidth: 2,
          comments: 120,
          ignoreComments: false,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
    settings: {
      // setting up the source folder
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },
  };