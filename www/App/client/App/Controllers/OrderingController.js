app.controller('OrderingController', ['$scope', '$http', 'cartService', 'errorService', '$location', '$httpParamSerializerJQLike', ($scope, $http, cartService, errorService, $location, $httpParamSerializerJQLike) => {

    $scope.userInfo = {
        name: '',
        email: '',
        phone: '',
        address: '',
        donotcallme: false
    };
    console.log($scope.userInfo);

    var  getChar = function (event) 
    {
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
    // REGION :: EVENT HANDLERS

    // ON-TYPE

    $scope.nameKeyPressed = () => {

        var nameRegEx = /^[A-Za-z\s]{0,30}$/;
        var allowedSymbols = /[A-Za-z\s]/;

        $scope.nameValidationError = '';

        var char = getChar(event);
        console.log (char);
        if (char === null)
            return;

        if (!allowedSymbols.test(char) || !nameRegEx.test(event.currentTarget.value + char))
            event.preventDefault();

        // event.currentTarget.value += (allowedSymbols.test(char) && nameRegEx.test(event.currentTarget.value + char)) ? char : '';

    };
    $scope.emailKeyPressed = () => {

        var emailLocalPartRegEx = /^[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~\.]{0,64}$/;
        var emailDomainPartRegEx = /^([A-Za-z0-9\-]{1,63}\.){1,3}[A-Za-z0-9\-]{1,63}$/;
        var allowedLocalPartSymbols = /[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~\.]/;
        var allowedDomainPartSymbols = /[A-Za-z0-9\.\-]/;
        var partialDomainRegEx = /^[A-Za-z0-9\-]+\.?/;
        var char = getChar(event);
        var sender = event.currentTarget;

        $scope.emailValidationError = '';

        event.preventDefault();

        // console.log(char);

        if (sender.value.includes('@'))
        {
            // if we working with domain part
            if (char === '@')
                return;
            var domain = sender.value.substring(sender.value.indexOf('@') + 1, sender.value.length);

            if (domain === '' && allowedDomainPartSymbols.test(char) && char !== '.' || partialDomainRegEx.test(domain + char) && !domain.includes('.'))
            {
                $scope.userInfo.email += char;
                // console.log(char);
                sender.value += char;
                return;
            }
            if (emailDomainPartRegEx.test(domain + char + 'a') || emailDomainPartRegEx.test(domain + char))
            {
                sender.value += char;
                $scope.userInfo.email += char;
            }                
        }
        else
        {
            if (sender.value.length == 0 && char === '.')
            {
                $scope.emailValidationError = 'email can not start with dot';
                return;
            }
            if (sender.value.length == 0 && char === '@')
            {
                $scope.emailValidationError = 'email can not start with @';
                return;
            }
            if ((sender.value + char).includes('..'))
            {
                $scope.emailValidationError = 'email can not contain two located together dots';
                return;
            }
            // if with local-part
            if (char === '@')
            {
                if (sender.value.endsWith('.'))
                {
                    $scope.emailValidationError = 'Left part of email address can not end with dot!'
                    return;
                }
                $scope.userInfo.email += char;
                sender.value += char;
            }
            if (allowedLocalPartSymbols.test(char) && emailLocalPartRegEx.test(sender.value + char))
            {
                sender.value += char;
                $scope.userInfo.email += char;                
            }
            // sender.value += (allowedLocalPartSymbols.test(char) && emailLocalPartRegEx.test(sender.value + char)) ? char : '';
        }
        
    };
    $scope.phoneKeyPressed = () => {

        var phoneRegEx = /^\+?[0-9]{0,12}$/;
        var allowedSymbols = /[0-9]/;

        $scope.phoneValidationError = '';


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

        $scope.userInfo.phone = sender.value.replace(/[\(\)\s]/g, '');
        console.log(sender.value.replace(/[\(\)\s]/g, ''));

    };
    $scope.addressKeyPressed = () => {
        $scope.addressValidationError = '';
    };

    // ON KEY UP
    $scope.emailKeyUp = () => {
        console.log(getChar(event));
        if (getChar(event) == null) 
            $scope.userInfo.email = event.currentTarget.value;
    };
    $scope.phoneKeyUp = () => {
        console.log(getChar(event));
        if (getChar(event) == null) 
            $scope.userInfo.phone = event.currentTarget.value.replace(/[\(\)\s]/g, '');
    };

    // ON FOCUSOUT(blur)

    $scope.nameFocusOutEventHandler = () => {
        $scope.nameValidationError = '';
        console.log('name leave');
        if ($scope.userInfo.name.length == 0)
        {
            $scope.nameValidationError = 'Name is empty';
            return false;
        }
        if ($scope.userInfo.name.length < 4)
        {
            $scope.nameValidationError = 'Name is too short';
            return false;
        }
        // TRUE if no Errors
        return true;
    };
    $scope.emailFocusOutEventHandler = () => {
        $scope.emailValidationError = '';
        if ($scope.userInfo.email.length == 0)
        {
            $scope.emailValidationError = 'Email is empty';
            return false;
        }
        var domain = $scope.userInfo.email.substring($scope.userInfo.email.indexOf('@') + 1, $scope.userInfo.email.length);
        if (!$scope.userInfo.email.includes('@') || domain.length == 0 || !domain.includes('.') || domain.endsWith('.'))
        {
            $scope.emailValidationError = 'Sorry, this is not email';
            return false;
        }
        if ($scope.userInfo.email.length < 5)
        {
            $scope.emailValidationError = 'Email is too short';
            return false;
        }

        return true;
    };
    $scope.phoneFocusOutEventHandler = () => {
        if ($scope.userInfo.donotcallme)
            return true;
        if ($scope.userInfo.phone.length == 0)
        {
            $scope.phoneValidationError = 'Phone is empty';
            return false;
        }
        if ($scope.userInfo.phone.length < 12)
        {
            $scope.phoneValidationError = 'Phone is too short';
            return false;
        }

        return true;
    };
    $scope.addressFocusOutEventHandler = () => {
        $scope.addressValidationError = '';
        if ($scope.userInfo.address.length == 0)
        {
            $scope.addressValidationError = 'Address is empty';
            return false;
        }
        if ($scope.userInfo.address.length < 4)
        {
            $scope.addressValidationError = 'Address is too short';
            return false;
        }
        // TRUE if no Errors
        return true;
    };

    // ON CHECKBOX CHANGE STATE

    $scope.donotcallmeChanged = () => {
        if (event.currentTarget.checked)
            $scope.phoneValidationError = '';
        else 
            $scope.phoneFocusOutEventHandler();
    };

    // DATA SUBMITTING

    $scope.submit = () => {
        console.log('orderprocceed');
        console.log(JSON.stringify(cartService.getProducts()));

        if (!$scope.nameFocusOutEventHandler() || !$scope.emailFocusOutEventHandler() || !$scope.phoneFocusOutEventHandler() || !$scope.addressFocusOutEventHandler())
        {
            $scope.submitError = 'Please, complete the form first';
            return;
        }


        // submitting data and redirecting
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
        );
    }

}]);