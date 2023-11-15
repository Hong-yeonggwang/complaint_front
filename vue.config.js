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
  productionSourceMap: false,

  devServer: {
    allowedHosts: "all",
    proxy: 
    {
      "/v1": {
        target: "https://bck.twoleebubu.com",
        // target: "http://localhost:8080",
        changeOrigin: true,
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    vuetify: {}
  }
};
