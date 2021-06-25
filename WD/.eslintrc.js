module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'react/prop-types': 0,
    'object-curly-spacing': [ 2, 'always' ],
    'array-bracket-spacing': [ 2, 'always' ],
    'require-jsdoc': 0,
    'max-len': [ 2, { 'code': 130, 'tabWidth': 4, 'ignoreUrls': true } ],
  },
};
