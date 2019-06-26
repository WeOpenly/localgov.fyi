// use this format since .eslintrc is deprecated.
// You can logically derive this format.

module.exports = {
    globals: {
        __PATH_PREFIX__: true,
    }, 
    extends: `react-app`,
    rules: {
        'import/first': 0,
    },
}