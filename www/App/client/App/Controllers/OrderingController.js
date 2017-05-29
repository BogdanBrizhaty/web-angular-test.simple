app.controller('OrderingController', ['$scope', '$http', 'cartService', 'errorService', '$location', '$httpParamSerializerJQLike', ($scope, $http, cartService, errorService, $location, $httpParamSerializerJQLike) => {

    $scope.userInfo = {
        name: '',
        email: '',
        phone: '',
        address: '',
        donotcallme: false
    };
    
    var nameRegEx = /^[A-Za-z\s]{0,30}$/;
    var phoneRegEx = /^\+?[0-9]{0,12}$/;
    
    var emailLocalPartRegEx = /^[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~\.]{0,64}$/;
    var emailDomainPartRegEx = /^([A-Za-z0-9\-]{1,63}\.){1,3}[A-Za-z0-9\-]{1,63}$/;

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

    $scope.nameKeyPressed = () => {
        // regExValidation(nameRegEx, event);
        // console.log(event.currentTarget.value);
        var allowedSymbols = /[A-Za-z\s]/;

        var char = getChar(event);
        console.log (char);
        if (char === null)
            return;

        event.preventDefault();

        event.currentTarget.value += (allowedSymbols.test(char) && nameRegEx.test(event.currentTarget.value + char)) ? char : '';

    };
    $scope.emailKeyPressed = () => {

        var allowedLocalPartSymbols = /[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~\.]/;
        var allowedDomainPartSymbols = /[A-Za-z0-9\.\-]/;
        var partialDomainRegEx = /^[A-Za-z0-9\-]+\.?/;
        var char = getChar(event);
        var sender = event.currentTarget;

        event.preventDefault();

        $scope.emailValidationError = '';

        if (sender.value.includes('@'))
        {
            // if we working with domain part
            if (char === '@')
                return;
            var domain = sender.value.substring(sender.value.indexOf('@') + 1, sender.value.length);

            if (domain === '' && allowedDomainPartSymbols.test(char) && char !== '.' || partialDomainRegEx.test(domain + char) && !domain.includes('.'))
            {
                sender.value += char;
                return;
            }
            if (emailDomainPartRegEx.test(domain + char + 'a') || emailDomainPartRegEx.test(domain + char))
                sender.value += char;
        }
        else
        {
            if (sender.value.length == 0 && char === '.')
                return;
            
            if ((sender.value + char).includes('..'))
                return;
            // if with local-part
            if (char === '@')
            {
                if (sender.value.endsWith('.'))
                {
                    $scope.emailValidationError = 'left part of email address can not end with dot!'
                    return;
                }
                sender.value += char;
            }
            sender.value += (allowedLocalPartSymbols.test(char) && emailLocalPartRegEx.test(sender.value + char)) ? char : '';
        }
        
    };
    $scope.phoneKeyPressed = () => {

        var allowedSymbols = /[0-9]/;

        var char = getChar(event);
        var sender = event.currentTarget;
        if (char === null)
            return;

        event.preventDefault();

        sender.value = (char === '+' && sender.value.length == 0) ? char + sender.value : sender.value;
        sender.value += (allowedSymbols.test(char) && phoneRegEx.test(sender.value.replace(/[\(\)\s]/g, '') + char)) ? char : '';

        var offset = (sender.value.includes('+')) ? 0 : -1;
        sender.value += (sender.value.length == 3 + offset) ? ' (' : '';
        sender.value += (sender.value.length == 8 + offset) ? ') ' : '';
        sender.value += (sender.value.length == 12 + offset) ? ' ' : '';
        sender.value += (sender.value.length == 16 + offset) ? ' ' : '';

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
                    errorService.setError('responseError', response.data);
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