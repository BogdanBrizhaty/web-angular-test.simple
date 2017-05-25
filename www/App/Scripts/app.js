angular.module('app', ['ngRoute'])

.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', { 
        templateUrl:'/App/client/Templates/main.html',
        Controller: 'AppController'
    })

    $routeProvider.when('/cart', {
        templateUrl: '/App/client/Templates/cart.html',
        Controller: 'CartController'
    })
}])

.service('cartService', function () {
    var productList = [];

  var addProduct = (newObj) => {
      productList.push(newObj);
  };
  var count = () => {
      return productList.length;
  }
  var getProducts = () =>{
      return productList;
  };
  var getProduct = (model, brand) => {
    productList.find((e) => {
        return e.Model == model && e.Brand == brand;
    })
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
    // getProduct: getProduct,
    removeProduct: removeProduct
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

.controller('CartController', ['$scope', '$http', 'cartService', ($scope, $http, cartService) => {
    
    $scope.orderlist = cartService.getProducts();
        var sum = 0.0;
        $scope.orderlist.forEach((e) => {
            e.Amount = 1;
            sum += e.Price;
        });
        $scope.totalsum = sum;
        console.log('cart');

    $scope.procceedOrder = () => {
        console.log('orderprocceed');
        console.log(JSON.stringify(cartService.getProducts()));
        $.ajax({
            type: "POST",
            url: '/cartapi/procceedorder',
            data: 'order=' + JSON.stringify(cartService.getProducts()),
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
            // dataType: dataType
        });
        // $http(
        //     {
        //         method: 'POST',
        //         url: '/cartapi/procceedorder',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //         data: 'order=' + encodeURIComponent(JSON.stringify(cartService.getProducts()))
        //         //'order=' + JSON.stringify(cartService.getProducts()),
        //     }
        // ).then((data, status, header, config) => {
        //     console.log(data);
        // },
        // (error) => {
        //     console.log(error);
        // }
        //  );

        //  $()

    }
}]);