// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionicValidateWithToast', 'ionic-toast'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('controller', function ($scope) {
    $scope.userNameErrorTips = {
      required: 'please input username',
      minlength: 'This field does not match the min length',
      maxlength: 'This field does not match the max length',
      pattern: 'This field is not right',
      number: 'This field should be a number'
    }

    $scope.passwordErrorTips = {
      required: 'please input password',
      minlength: 'password can not short than 5',
    }

    $scope.numberErrorTips = {
      required: 'please input account NO.',
      number: 'account NO. must be number'
    }

    $scope.phoneNumberErrorTips = {
      pattern: 'please input a valid phone number'
    }
  });

