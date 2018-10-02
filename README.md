# Esperanto Analyzer - React

---


[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)


#### Development

[![Build Status](https://travis-ci.com/fidelisrafael/esperanto-analyzer-react.svg?token=k5uMpn3U564QqWar8oA1&branch=development)](https://travis-ci.com/fidelisrafael/esperanto-analyzer-react)
[![codecov](https://codecov.io/gh/fidelisrafael/esperanto-analyzer-react/branch/development/graph/badge.svg?token=Iu4jqn1jyX)](https://codecov.io/gh/fidelisrafael/esperanto-analyzer-react)

#### Master

[![Build Status](https://travis-ci.com/fidelisrafael/esperanto-analyzer-react.svg?token=k5uMpn3U564QqWar8oA1&branch=master)](https://travis-ci.com/fidelisrafael/esperanto-analyzer-react) [![codecov](https://codecov.io/gh/fidelisrafael/esperanto-analyzer-react/branch/master/graph/badge.svg?token=Iu4jqn1jyX)](https://codecov.io/gh/fidelisrafael/esperanto-analyzer-react)

---

## About

This React application is the front-end for the Python library [esperanto-analyzer](https://github.com/fidelisrafael/esperanto-analyzer).

> **OBS**: This is the first experimental version and may contain many errors, if you want you can contribute sending a PR \o/

You can try the demo at: https://fidelisrafael.github.io/esperanto-analyzer-react/

![Frontend application](./public/esperanto_analyzer_screenshot.png)

---

## Development Setup

```bash
$ git clone https://github.com/fidelisrafael/esperanto-analyzer-react
$ cd esperanto-analyzer-react
$ yarn install
$ yarn start
```

The application will run at `http://localhost:3000`

**OBS**: By default for developing environment the Web API is hosted at Heroku.
If you'd like to use a local Web API, you have to change `developmentConfig` at `src/Config.js` file as follow:

```js
const developmentConfig = {
  api_host: '127.0.0.1:5000',
  api_protocol: 'http'
}
```

### Tests

You can run all tests with:

```bash
# or `npm test`
yarn test
```

---

## :calendar: Roadmap <a name="roadmap"></a>

- :white_medium_small_square: Finish writing tests
- :white_medium_small_square: Update this Roadmap with more plans


---

## :thumbsup: Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fidelisrafael/esperanto-analyzer-react. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

---

## :memo: License

The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

