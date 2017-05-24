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

.service('productService', function () {
    var productList = [];

  var addProduct = (newObj) => {
      productList.push(newObj);
  };

  var getProducts = () =>{
      return productList;
  };
  var getProduct = (model, brand) => {
    productList.find((e) => {
        return e.Model == model && e.Brand == brand;
    })
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
    getProduct: getProduct
  };
})

.controller('AppController', ['$scope', '$http', 'productService', ($scope, $http, productService) => {
    $http.get('/phonesapi/get?page=0').then((e) => {
        $scope.phones = e.data;
        $scope.phones.forEach((element) => {
            var url = element.Model;
            element.url = '/uploads/' + url.replace(/\s+/g, "").toLowerCase() + ".jpg";
        })
    });
    $scope.onAddButtonClick = function (phone) {
        console.log('clicked ' + phone.Model);
        productService.addProduct(phone);
    }
}])

.controller('CartController', ['$scope', '$http', 'productService', ($scope, $http, productService) => {
    
    $scope.orderlist = productService.getProducts();
        var sum = 0.0;
        $scope.orderlist.forEach((e) => {
            e.Amount = 1;
            sum += e.Price;
        })
        $scope.totalsum = sum;
}]);