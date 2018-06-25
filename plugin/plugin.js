'use strict';

angular.module('owsWalletPlugin', [
	'gettext',
	'ionic',
	'ngLodash',
	'owsWalletPluginClient',
  'owsWalletPlugin.api.bitpay',
  'owsWalletPlugin.controllers',
  'owsWalletPlugin.services'
]);

angular.module('owsWalletPlugin.controllers', []);
angular.module('owsWalletPlugin.services', []);
