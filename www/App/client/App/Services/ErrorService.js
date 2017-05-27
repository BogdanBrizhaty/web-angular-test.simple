app.service('errorService', function() {
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
});