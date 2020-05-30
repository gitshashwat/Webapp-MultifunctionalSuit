/* global module */

module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["vue"],
    "rules": {

        /* Possible Errors */
        "no-await-in-loop": ["error"],
        "no-console": ["error"],
        "no-extra-parens": [
            "error",
            "all"
        ],
        "no-template-curly-in-string": ["error"],

        /* Best Practices */
        "accessor-pairs": ["error"],
        "array-callback-return": ["error"],
        "block-scoped-var": ["error"],
        "class-methods-use-this": ["error"],
        "complexity": ["error"],
        "consistent-return": ["error"],
        "curly": ["error"],
        "default-case": ["error"],
        "dot-location": ["error"],
        "dot-notation": ["error"],
        "eqeqeq": ["error"],
        "guard-for-in": ["error"],
        "max-classes-per-file": ["error"],
        "no-caller": ["error"],
        "no-div-regex": ["error"],
        "no-else-return": ["error"],
        "no-empty-function": ["error"],
        "no-eq-null": ["error"],
        "no-eval": ["error"],
        "no-extend-native": ["error"],
        "no-extra-bind": ["error"],
        "no-extra-label": ["error"],
        "no-floating-decimal": ["error"],
        "no-implicit-coercion": ["error"],
        "no-implicit-globals": ["error"],
        "no-implied-eval": ["error"],
        "no-iterator": ["error"],
        "no-labels": ["error"],
        "no-lone-blocks": ["error"],
        "no-loop-func": ["error"],
        "no-multi-spaces": ["error"],
        "no-multi-str": ["error"],
        "no-new": ["error"],
        "no-new-func": ["error"],
        "no-new-wrappers": ["error"],
        "no-octal-escape": ["error"],
        "no-param-reassign": ["error"],
        "no-proto": ["error"],
        "no-restricted-properties": ["error"],
        "no-return-assign": ["error"],
        "no-return-await": ["error"],
        "no-script-url": ["error"],
        "no-self-compare": ["error"],
        "no-sequences": ["error"],
        "no-throw-literal": ["error"],
        "no-unmodified-loop-condition": ["error"],
        "no-unused-expressions": ["error"],
        "no-useless-call": ["error"],
        "no-useless-concat": ["error"],
        "no-useless-return": ["error"],
        "no-void": ["error"],
        "prefer-named-capture-group": ["error"],
        "prefer-promise-reject-errors": ["error"],
        "radix": [
            "error",
            "always"
        ],
        "require-await": ["error"],
        "require-unicode-regexp": ["error"],
        "vars-on-top": ["error"],
        "wrap-iife": ["error"],
        "yoda": ["error"],

        /* Strict Mode */
        "strict": [
            "error",
            "global"
        ],

        /* Variables */
        "no-label-var": ["error"],
        "no-restricted-globals": ["error"],
        "no-shadow": ["error"],
        "no-undef-init": ["error"],
        "no-undefined": ["error"],
        "no-use-before-define": ["error"],

        /* Stylistic Issues */
        "array-bracket-newline": ["error"],
        "array-bracket-spacing": ["error"],
        "array-element-newline": ["error"],
        "block-spacing": ["error"],
        "brace-style": ["error"],
        "camelcase": ["warn"],
        // "capitalized-comments": ["error"],
        "comma-dangle": ["error"],
        "comma-spacing": ["error"],
        "comma-style": ["error"],
        "computed-property-spacing": ["error"],
        "consistent-this": ["error"],
        "eol-last": ["error"],
        "func-call-spacing": ["error"],
        "func-name-matching": ["error"],
        // "func-names": ["error"],
        "func-style": ["error"],
        // "function-call-argument-newline": ["error"],
        "function-paren-newline": ["error"],
        "id-blacklist": ["error"],
        // "id-length": ["error"],
        "id-match": ["error"],
        "implicit-arrow-linebreak": ["error"],
        "indent": [
            "error",
            4
        ],
        "jsx-quotes": ["error"],
        "key-spacing": ["error"],
        "keyword-spacing": ["error"],
        "line-comment-position": ["error"],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "lines-around-comment": ["error"],
        "lines-between-class-members": ["error"],
        "max-depth": [
            "error",
            {
                "max": 4
            }
        ],
        "max-len": [
            "warn",
            {
                "code": 200,
                "tabWidth": 4,
                "ignoreUrls": true
            }
        ],
        "max-lines": [
            "error",
            {
                "max": 1350,
                "skipBlankLines": true,
                "skipComments": true
            }
        ],
        "max-lines-per-function": [
            "error",
            {
                "max": 80,
                "skipBlankLines": true,
                "skipComments": true
            }
        ],
        "max-nested-callbacks": ["error"],
        "max-params": [
            "error",
            {
                "max": 6
            }
        ],
        // "max-statements": ["error"],
        // "max-statements-per-line": ["error"],
        "multiline-comment-style": ["error", "bare-block"],
        "multiline-ternary": ["error", "always-multiline"],
        "new-cap": ["error"],
        "new-parens": ["error"],
        "newline-per-chained-call": ["error"],
        "no-array-constructor": ["error"],
        "no-bitwise": ["error"],
        "no-continue": ["error"],
        // "no-inline-comments": ["error"],
        "no-lonely-if": ["error"],
        // "no-mixed-operators": ["error"],
        "no-multi-assign": ["error"],
        "no-multiple-empty-lines": ["error"],
        // "no-negated-condition": ["error"],
        "no-nested-ternary": ["error"],
        "no-new-object": ["error"],
        // "no-plusplus": ["error"],
        "no-restricted-syntax": ["error"],
        "no-tabs": ["error"],
        // "no-ternary": ["error"],
        "no-trailing-spaces": ["error"],
        "no-underscore-dangle": ["error"],
        "no-unneeded-ternary": ["error"],
        "no-whitespace-before-property": ["error"],
        "nonblock-statement-body-position": ["error"],
        "object-curly-newline": ["error"],
        "object-curly-spacing": ["error"],
        "object-property-newline": ["error"],
        "one-var": ["error"],
        "one-var-declaration-per-line": ["error"],
        "operator-assignment": ["error"],
        "operator-linebreak": ["error"],
        "padded-blocks": ["error"],
        "padding-line-between-statements": ["error"],
        "prefer-object-spread": ["error"],
        "quote-props": ["error"],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "semi-spacing": ["error"],
        "semi-style": ["error"],
        /*
         * "sort-keys": ["error"],
         * "sort-vars": ["error"],
         */
        "space-before-blocks": ["error"],
        "space-before-function-paren": ["error"],
        "space-in-parens": ["error"],
        "space-infix-ops": ["error"],
        "space-unary-ops": ["error"],
        "spaced-comment": ["error"],
        "switch-colon-spacing": ["error"],
        "template-tag-spacing": ["error"],
        "unicode-bom": ["error"],
        "wrap-regex": ["error"]
    }
}
