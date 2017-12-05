'use strict';

angular.module('copayApp.controllers').controller('preferencesBwsUrlController',
  function($scope, $log, configService, applicationService, profileService, storageService) {
    $scope.error = null;
    $scope.success = null;

    var fc = profileService.focusedClient;
    var walletId = fc.credentials.walletId;
    var defaults = configService.getDefaults();
    var config = configService.getSync();

    $scope.bwsurl = (config.bwsFor && config.bwsFor[walletId]) || defaults.bws.url;

    $scope.resetDefaultUrl = function() {
      $scope.bwsurl = defaults.bws.url;
    };

    $scope.save = function() {

      var bws;
      switch ($scope.bwsurl) {
        case 'prod':
        case 'production':
          bws = 'https://node.blackcoin.io/bws'
          break;
        case 'sta':
        case 'staging':
          bws = 'https://node.blackcoin.io/bws'
          break;
        case 'loc':
        case 'local':
          bws = 'https://node.blackcoin.io/bws'
          break;
      };
      if (bws) {
        $log.info('Using BWS URL Alias to ' + bws);
        $scope.bwsurl = bws;
      }

      var opts = {
        bwsFor: {}
      };
      opts.bwsFor[walletId] = $scope.bwsurl;

      configService.set(opts, function(err) {
        if (err) $log.debug(err);
        storageService.setCleanAndScanAddresses(walletId, function() {
          applicationService.restart();
        });
      });
    };
  });
