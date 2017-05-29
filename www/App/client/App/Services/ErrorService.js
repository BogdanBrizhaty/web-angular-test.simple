app.service('errorService', function() {
    // key-value array
    var error = [];
    var setError = (key, data) => {
        error[key] = data;
        console.log(error);
    };
    var getError = (key) => {
        return error[key];
    };
    var remError = (key) => {
        delete error[key];
    };
    return {
        setError: setError,
        getError: getError,
        remError: remError
    };
});