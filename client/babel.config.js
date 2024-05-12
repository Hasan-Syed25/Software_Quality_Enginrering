module.exports = {
  presets: [
    [
      '@babel/preset-env', // Handles ES6+ features
    ],
    [
      '@babel/preset-react', // Enables JSX transformation
      {
        "runtime": "automatic"
      }
    ]
  ],
      plugins: [
        '@babel/plugin-transform-runtime' // Handles async/await and other runtime features
      ]
    };