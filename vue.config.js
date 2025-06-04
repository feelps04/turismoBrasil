const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  // Set the publicPath to match GitHub Pages repository subdirectory
  // This is necessary because GitHub Pages serves content from username.github.io/turismoBrasil/
  // For local development, you can use '/' and for production GitHub Pages use '/turismoBrasil/'
  publicPath: process.env.NODE_ENV === 'production' ? '/turismoBrasil/' : '/'
})
