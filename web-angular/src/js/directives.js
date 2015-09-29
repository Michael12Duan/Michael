'use strict';

var directives = angular.module('routerApp.directives', []);
directives.directive('butter', ['$rootScope',//将rootScope注入到指令中
    function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.addClass('hide');

      $rootScope.$on('$routeChangeStart', function() {//在根作用域上面添加2个监听器
        element.removeClass('hide');
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('hide');
      });
    }
  };
}]);

directives.directive('focus',
    function() {
  return {
    link: function(scope, element, attrs) {
      element[0].focus();//调用当前元素的focus()方法，可以在任何输入元素上调价focus属性
    }
  };
});

directives.directive('translate',
    function() {
  return {
   restrict:'E',
    template: '<div>Hi error</div>',
    replace: true
  };
});


directives.directive('fileupload', function() {
  return {
    restrict: 'A',
    scope: {
      done: '&',
      progress: '&'
    },
    link: function(scope, element, attrs) {
      var optionsObj = {
        dataType: 'json'
      };

      if (scope.done) {
        optionsObj.done = function() {
          scope.$apply(function() {
            scope.done({e: e, data: data});
          });
        };
      }

      if (scope.progress) {
        optionsObj.progress = function(e, data) {
          scope.$apply(function() {
            scope.progress({e: e, data: data});
          });
        }
      }

      // the above could easily be done in a loop, to cover
      // all API's that Fileupload provides

      element.fileupload(optionsObj);
    }
  };
});

directives.directive('alertBar', ['$parse', function($parse) {
  return {
    restrict: 'A',
    template: '<div class="alert alert-error alert-bar" ng-show="errorMessage">' +
      '<button type="button" class="close" ng-click="hideAlert()">x</button>' +
      '{{errorMessage}}</div>',

    link: function(scope, elem, attrs) {
      var alertMessageAttr = attrs['alertmessage'];
      scope.errorMessage = null;

      scope.$watch(alertMessageAttr, function(newVal) {
        scope.errorMessage = newVal;
      });
      scope.hideAlert = function() {
        scope.errorMessage = null;
        // Also clear the error message on the bound variable
        // Do this so that in case the same error happens again
        // the alert bar will be shown again next time
        $parse(alertMessageAttr).assign(scope, null);
      };
    }
  };
}]);
