app.controller('AppController', ['$scope', '$http', 'cartService', '$location', ($scope, $http, cartService, $location) => {
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
}]);