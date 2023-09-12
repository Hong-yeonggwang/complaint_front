const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

module.exports = {
  runtimeCompiler: true,

  devServer: {
    proxy: 'http://localhost:8080',
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    vuetify: {}
  }
};
