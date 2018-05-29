OWS Wallet Applet Plugin - Movies!
=======

A sample OWS Wallet applet plugin to get you started on your own applet plugin.

## Main Features

- Navigate between view.
- Minimal movie purchase process.
- Includes a settings view with access to session log.
- Uses the [BitPay servlet plugin](https://github.com/owstack/ows-wallet-plugin-bitpay).

## Installation

Install [bower](http://bower.io/) and [grunt](http://gruntjs.com/getting-started) if you haven't already:

```sh
npm install -g bower
npm install -g grunt-cli
```

### Development build:

```sh
sudo gem install sass
grunt dev
```

Visit [`localhost:8100`](http://localhost:8100/) to view the plugin.

### Release build:

```sh
sudo gem install sass
grunt
```

The release/ directory contains the content consumed by the OWS Wallet and must be checked in.

## Support

* [GitHub Issues](https://github.com/owstack/ows-wallet-plugin-movies/issues)
  * Open an issue if you are having problems with this project

## License

This plugin is released under the MIT License.  Please refer to the [LICENSE](https://github.com/owstack/ows-wallet-plugin-movies/blob/master/LICENSE) file that accompanies this project for more information including complete terms and conditions.
