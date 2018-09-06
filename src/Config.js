const developmentConfig = {
  api_host: '127.0.0.1:5000',
  api_protocol: 'http'
}

const productionConfig = {
  api_host: 'esperanto-analyzer-api.herokuapp.com',
  api_protocol: 'https'
}

export default { development: developmentConfig, production: productionConfig }
