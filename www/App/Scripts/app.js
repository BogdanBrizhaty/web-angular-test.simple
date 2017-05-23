angular.module('app', ['ngRoute'])

.config(['$routeProvider', ($routeProvider) => {
    // console.log("dddd");
    $routeProvider.when('/', { 
        templateUrl:'/App/client/Templates/main.html',
        Controller: 'AppController'
    })

    $routeProvider.when('/cart', {
        templateUrl: 'cart.html',
        Controller: 'CartController'
    })
}])

.service('productService', function () {
    var productList = [];

  var addProduct = (newObj) => {
      productList.push(newObj);
  };

  var getProducts = () =>{
      return productList;
  };
  var productsearch = (e) => {
      return e.Model == "ddd";
  };
  var getProduct = (model) => {
    productList.find((e) => {
        return e.Model == model;
    })
    //   return 
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
    getProduct: getProduct
  };
})

.controller('AppController', ['$scope', '$http', 'productService', ($scope, $http, productService) => {
    $http.get('/phonesapi/get?page=1').then((e) => {
        $scope.phones = e.data;
        $scope.phones.forEach((element) => {
            var url = element.Model;
            element.url = '/uploads/' + url.replace(/\s+/g, "").toLowerCase() + ".jpg";
        })
    })
}])

.controller('CartController', ['$scope', '$http', 'productService', ($scope, $http, productService) => {
    
    // console.log('Cart gett');
    // $http.get('/seedOrder.json').then((e) => {
    //     console.log(e.data);
    //     $scope.orderlist = e.data;
    //     var sum = 0.0;
    //     $scope.orderlist.forEach((e) => {
    //         e.Amount = 1;
    //         sum += e.Price;
    //     })
    //     $scope.totalsum = sum;
    // });

}]);