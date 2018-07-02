module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
		"extends": [
		  "eslint:recommended",
			"plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-debugger": "error",
        "jsx-quotes": [
          "error",
          "prefer-single"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/no-unused-state": [
            "error"
        ],
        "react/no-will-update-set-state": [
            "error"
        ]
    }
};
