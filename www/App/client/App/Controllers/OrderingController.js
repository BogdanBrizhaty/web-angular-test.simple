app.controller('OrderingController', ['$scope', '$http', 'cartService', 'errorService', '$location', '$httpParamSerializerJQLike', ($scope, $http, cartService, errorService, $location, $httpParamSerializerJQLike) => {

    $scope.userInfo = {
        name: '',
        email: '',
        phone: '',
        address: '',
        donotcallme: false
    };
    // var nameRegEx =/^(?=.\s.)[A-Za-z]{4, 10}$/;
    // var phoneRegEx = /\+[0-9]{12}/;

    $scope.nameKeyPressed = () => {
        e = event.currentTarget;
        // if ($scope.name)
    };
    $scope.submit = () => {
        console.log('orderprocceed');
        console.log(JSON.stringify(cartService.getProducts()));

        $http(
            {
                method: 'POST',
                url: '/cartapi/procceedorder',
                data: $httpParamSerializerJQLike( { order: JSON.stringify(cartService.getProducts()), clientinfo : JSON.stringify($scope.userInfo) } ),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ).then(
            (response) => {
                if (!response.data.status)
                {
                    errorService.setError(response.data);
                    $location.path('/failure');
                }
                else 
                    $location.path('/succeed');

                    console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

}]);