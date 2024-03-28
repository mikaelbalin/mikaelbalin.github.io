const path = require("path");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      // See all options in the babel plugin configuration docs:
      // https://stylexjs.com/docs/api/configuration/babel-plugin/
      {
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        // aliases: {
        //   "@/*": [path.join(__dirname, "*")],
        // },
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: "commonJS",
          // The absolute path to the root directory of your project
          rootDir: __dirname,
        },
      },
    ],
  ],
};
