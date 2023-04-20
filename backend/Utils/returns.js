const errorMessage = (message) => {
    return {
        error: true,
        errorMessage: message,
        data: null,
    };
};

module.exports = errorMessage