module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        devtool: 'source-map'
      }
    }
  }
}
