const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    const opt = {};
    opt.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename]
      }
    };
    opt.optimization = { 
      removeAvailableModules: true,
      removeEmptyChunks: true,
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          vue: {
            name: 'vue-vendors',
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            priority: -5,
          },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -5,
            enforce: true,
          },
          'vendors': {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -8,
            minChunks: 1,
          },
          common: {
            name: 'chunk-common',
            test: /[\\/]src\/components[\\/]/,
            priority: -7,
            minSize: 0,
					  minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
        }
      }
    }
    return opt;
  },
  chainWebpack: config => {
		config.module.rule("js").use("babel-loader").options({
			cacheCompression: false
		});
		// config.module.rule("eslint").use("eslint-loader").options({
		// 	cache: false
		// });
	},
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8008/',
        changeOrigin: true,
        ws: true,
        pathRewrite: path => path.replace(/^\/api/, '')
      }
    },
  }
});
