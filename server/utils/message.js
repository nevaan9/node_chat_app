const genMessage = function (from, msg) {
    return {
        from,
        msg,
        createdAt: new Date().getTime()
    }
};

module.exports = {genMessage};
