const defaultConfig = {
  api_host: '127.0.0.1:5000',
  api_protocol: 'http'
}

const developmentConfig = {...defaultConfig}
const testConfig = {...defaultConfig}

const productionConfig = {
  api_host: 'esperanto-analyzer-api.herokuapp.com',
  api_protocol: 'https'
}

export default {
  development: productionConfig,
  production: productionConfig,
  test: testConfig
}
