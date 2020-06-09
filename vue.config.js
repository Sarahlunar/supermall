module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
      // 默认有'@': 'src'
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
