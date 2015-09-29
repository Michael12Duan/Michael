'use strict'
var services = angular.module('routerApp.services',[])
services.factory('filterService', function() {
    return {
      activeFilters: {},
      searchText: ''
    };
  });

// services.factory('errorService', function() {
//   return {
//     errorMessage: null,
//     setError: function(msg) {
//       this.errorMessage = msg;
//     },
//     clear: function() {
//       this.errorMessage = null;
//     }
//   };
// });

services.config(function ($httpProvider) {
  //$httpProvider.responseInterceptors.push('errorHttpInterceptor');
});
//把拦截器注册成一个服务，拦截所有angular ajax HTTP 调用

// services.factory('errorHttpInterceptor', function ($q, $location, ErrorService, $rootScope) {
//   return function (promise) {
//     return promise.then(function (response) {
//       return response;
//     }, function (response) {
//       if (response.status === 401) {
//         $rootScope.$broadcast('event:loginRequired');
//       } else if (response.status >= 400 && response.status < 500) {
//         ErrorService.setError('Server was unable to find what you were looking for... Sorry!!');
//       }
//       return $q.reject(response);
//     });
//   };
// });

// services.factory('Authentication', function() {
//   return {
//     getTokenType: function() {
//       return 'Awesome';
//     },
//     getAccessToken: function() {
//       // Fetch from the server in real life
//       return 'asdads131321asdasdasdas';
//     }
//   };
// });

// This factory is only evaluated once, and authHttp is memoized. That is,
// future requests to authHttp service return the same instance of authHttp

// services.factory('authHttp', function($http, Authentication) {
//   var authHttp = {};

  // Append the right header to the request
  
  // var extendHeaders = function(config) {
  //   config.headers = config.headers || {};
  //   config.headers['Authorization'] = Authentication.getTokenType() + ' ' + Authentication.getAccessToken();
  // };
    // Do this for each $http call
   
  //   angular.forEach(['get', 'delete', 'head', 'jsonp'], function(name) {
  //   authHttp[name] = function(url, config) {
  //     config = config || {};
  //     extendHeaders(config);
  //     return $http[name](url, config);
  //   };
  // });

// angular.forEach(['post', 'put'], function(name) {
//     authHttp[name] = function(url, data, config) {
//       config = config || {};
//       extendHeaders(config);
//       return $http[name](url, data, config);
//     };
//   });

//  return authHttp;
// });
