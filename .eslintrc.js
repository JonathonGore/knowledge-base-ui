module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
		"extends": [
		  "eslint:recommended",
			"plugin:react/recommended"
    ],
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
