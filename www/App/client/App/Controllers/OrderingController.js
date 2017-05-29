app.controller('OrderingController', ['$scope', '$http', 'cartService', 'errorService', '$location', '$httpParamSerializerJQLike', ($scope, $http, cartService, errorService, $location, $httpParamSerializerJQLike) => {

    $scope.userInfo = {
        name: '',
        email: '',
        phone: '',
        address: '',
        donotcallme: false
    };
    
    // var passwordRegExp = /(?=.*\d+)(?=.*[A-Z]+)(?=.*[a-z]+)^[A-Za-z0-9]{6,15}$/;
    // var nameRegEx = /(?=^.{10}\s?.{10}$)[A-Za-z ]/g;
    var nameRegEx = /(?=\+?.)[0-9\+]{13}/;
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegEx = /^\+?[0-9]{0,12}$/;
    
    var regExValidation = (regEx, event) => {
        // console.log(event.currentTarget.value + getChar(event));
        // console.log(regEx.test((event.currentTarget.value + getChar(event))));

        event.preventDefault();
        event.currentTarget.value += (regEx.test((event.currentTarget.value + getChar(event))) === false /* || (event.currentTarget.value === '+' && getChar(event) === '+' ) */) ? '' : getChar(event);
        return;
    }
var  getChar = function (event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

    // regExValidation()
    $scope.nameKeyPressed = () => {
        regExValidation(nameRegEx, event);
        // console.log(event.currentTarget.value);
    };
    $scope.emailKeyPressed = () => {
        regExValidation(emailRegEx, event);
    };
    $scope.phoneKeyPressed = () => {

        var allowedSymbols = /[0-9]/;

        var char = getChar(event);
        if (char === null)
            return;

        event.preventDefault();

        event.currentTarget.value = (char === '+' && event.currentTarget.value.length == 0) ? char + event.currentTarget.value : event.currentTarget.value;
        event.currentTarget.value += (allowedSymbols.test(char) && phoneRegEx.test(event.currentTarget.value.replace(/[\(\)\s]/g, '') + char)) ? char : '';

        var offset = (event.currentTarget.value.includes('+')) ? 0 : -1;
        event.currentTarget.value += (event.currentTarget.value.length == 3 + offset) ? ' (' : '';
        event.currentTarget.value += (event.currentTarget.value.length == 8 + offset) ? ') ' : '';
        event.currentTarget.value += (event.currentTarget.value.length == 12 + offset) ? ' ' : '';
        event.currentTarget.value += (event.currentTarget.value.length == 16 + offset) ? ' ' : '';

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