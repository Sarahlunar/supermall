module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
      // 默认有'@': 'src'
        'assets': '@/assets',
        'components': '@/components',
        'common': 'components/common',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
