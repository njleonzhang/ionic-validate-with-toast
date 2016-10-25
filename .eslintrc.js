module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  'globals': {
    '$': true,
    'angular': true
  },
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': [2, "never"],
    'func-names': 0,
    'prefer-const': 0,
    'object-curly-spacing': 0,
    'arrow-body-style': 0,
    'space-before-function-paren': [2, 'never'],
    'new-cap': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'semi': [2, 'never'],
    'no-underscore-dangle': [2, {"allow": ["angular"]}],
    'max-len': 0,
    'prefer-arrow-callback': 0,
    'no-unused-vars': 0
  }
}
