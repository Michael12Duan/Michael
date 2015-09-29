var routerApp = angular.module('routerApp', ['ui.router','ngGrid','ngAnimate','ngTouch','ui.grid','routerApp.ProListModule','routerApp.ProDetailModule','routerApp.directives','routerApp.services'])
routerApp.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
   
}]);
//console.log("out put info on console.........................");

routerApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/c?id', '/contacts/:id');
    // $urlRouterProvider.when('/c?id', '/contacts/:id');
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
        url: '/index',
        views: {
                '': {
                    templateUrl: 'views/home.html'
                },
                'main@index': {
                    templateUrl: 'views/login.html',
                    //templateUrl: 'views/yanmaiLogin.html',
                    controller:function($scope){
                        
                    }
                }
            }

        })
        .state('prolist', {
        url: '/{proType:[0-9]{1,4}}',
        views: {
                '': {
                    templateUrl: 'views/proList.html'
                },
                'protype@prolist': {
                    templateUrl: 'views/proType.html'
                },
                'progrid@prolist': {
                    templateUrl: 'views/proGrid.html'
                },
                'progrid1@prolist':{
                   templateUrl:'views/proGrid1.html'
                },
                'progrid2@prolist':{
                   templateUrl:'views/proGrid2.html'
                },
                'progrid3@prolist':{
                   templateUrl:'views/proGrid3.html'
                },
                'productnavi@prolist':{
                    templateUrl:'views/navigation.html'
                }
            }

        })
        .state('addpro',{
        url:'/addpro',
        templateUrl:'views/addProForm.html'
        })
        .state('prodetail',{
        url:'/prodetail/:proId',
        templateUrl:'views/proDetail.html'
        })
}]);
