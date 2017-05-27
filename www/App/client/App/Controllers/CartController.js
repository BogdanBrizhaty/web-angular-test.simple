app.controller('CartController', ['$scope', '$http', 'cartService', 'errorService', '$location', ($scope, $http, cartService, errorService, $location) => {
    $scope.error = errorService.getError();

    $scope.canProcceed = () => {
        console.log(cartService.count());
        return (cartService.count() === 0) ? true : false;
    };
    // $scope.display_invalid_list = ($scope.error !== null && $scope.error.invalid_products === null) ? 'none' : 'block';

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
    }
}]);