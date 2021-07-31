module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
                alias: {
                    tests: ["./tests/"],
                    "@components": "./src/components",
                },
            }
        ],
        [
            "module:react-native-dotenv",
            {
                moduleName: "@env",
                path: ".env",
                blacklist: null,
                whitelist: null,
                safe: false,
                allowUndefined: true,
            }
        ], 
    ],
};