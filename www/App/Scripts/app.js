var placeholder = null;

angular.module('app', ['ngRoute'])

.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', { 
        templateUrl:'/App/client/Templates/main.html',
        Controller: 'AppController'
    });

    $routeProvider.when('/cart', {
        templateUrl: '/App/client/Templates/cart.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/ordering', {
        templateUrl: '/App/client/Templates/ordering.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/succeed', {
        templateUrl: '/App/client/Templates/orderSucceed.html',
        Controller: 'CartController'
    });

    $routeProvider.when('/failure', {
        templateUrl: '/App/client/Templates/orderFailed.html',
        Controller: 'CartController'
    });
}])

.service('cartService', function () {
    var productList = [];

  var addProduct = (newObj) => {
      productList.push(newObj);
  };
  var count = () => {
      return productList.length;
  };
  var getProducts = () =>{
      return productList;
  };
  var removeProduct = (phone) => {
    var index = productList.findIndex((e) => {
        return e.Model == phone.Model && e.Brand == phone.Brand;
    });
    if (index !== -1)
        productList.splice(index, 1);
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
    count: count,
    removeProduct: removeProduct
  };
})
.service('errorService', function() {
    var error = null;
    var setError = (data) => {
        error = data;
        console.log(error);
    };
    var getError = () => {
        return error;
    };
    return {
        setError: setError,
        getError: getError
    };
})

.controller('AppController', ['$scope', '$http', 'cartService', '$location', ($scope, $http, cartService, $location) => {
    $http.get('/phonesapi/get?page=0').then((e) => {
        $scope.phones = e.data;
        $scope.phones.forEach((element) => {
            var url = element.Model;
            element.url = '/uploads/' + url.replace(/\s+/g, "").toLowerCase() + ".jpg";
            element.InCart = false;
        })
    });
    $scope.itemsInCart = cartService.count();
    $scope.productClickHandler = function(phone) {
        if (phone.InCart)
            cartService.removeProduct(phone);
        else cartService.addProduct(phone);
        
        $scope.itemsInCart = cartService.count();
        phone.InCart = phone.InCart ^ true;
        console.log('handler');
    };

    $scope.goToCartHandler = () => {
        $location.path('/cart');
    }

    $scope.inCartToText = function (phone) {
        return (phone.InCart) ? "Remove from cart" : "AddToCart";
    };
}])

.controller('CartController', ['$scope', '$http', 'cartService', 'errorService', '$location', '$httpParamSerializerJQLike', ($scope, $http, cartService, errorService, $location, $httpParamSerializerJQLike) => {
    $scope.error = errorService.getError();

    $scope.canProcceed = () => {
        console.log(cartService.count());
        return (cartService.count() === 0) ? true : false;
    };

    $scope.orderlist = cartService.getProducts();
        var sum = 0.0;
        $scope.orderlist.forEach((e) => {
            e.Amount = 1;
            sum += e.Price;
        });
        $scope.totalsum = sum;
        console.log('cart');

    $scope.procceedOrder = () => {

        $location.path('/ordering');

        return;

        // console.log('orderprocceed');
        // console.log(JSON.stringify(cartService.getProducts()));
        // $scope.errorToInfo = () => {
        //     // return ($scope.error.invalid_products === null) ? $scope.error.msg : $scope.error.msg + 
        // };

        // var getError = () => {
        //     return errorService.getError();
        // };
        
        // $http(
        //     {
        //         method: 'POST',
        //         url: '/cartapi/procceedorder',
        //         data: $httpParamSerializerJQLike(
        //             {
        //                 order: JSON.stringify(cartService.getProducts())
        //             }
        //         ),
        //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //     }
        // ).then(
        //     (response) => {
        //         // $scope.error = response.data;
        //         if (!response.data.status)
        //         {
        //             errorService.setError(response.data);
        //             $location.path('/failure');
        //         }
        //         else 
        //         {
        //             $location.path('/succeed');
        //         }
        //             console.log(response.data);
        //         // $scope.$apply();
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // )

        
    }
}]);