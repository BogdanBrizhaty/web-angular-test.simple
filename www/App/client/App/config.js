app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', { 
        templateUrl:'/App/client/App/Templates/main.html',
        Controller: 'AppController'
    });

    $routeProvider.when('/cart', {
        templateUrl: '/App/client/App/Templates/cart.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/ordering', {
        templateUrl: '/App/client/App/Templates/ordering.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/succeed', {
        templateUrl: '/App/client/App/Templates/orderSucceed.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/failure', {
        templateUrl: '/App/client/App/Templates/orderFailed.html',
        Controller: 'CartController'
    });
}]);