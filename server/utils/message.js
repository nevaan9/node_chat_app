const moment = require('moment');
const genMessage = function (from, msg) {
    return {
        from,
        msg,
        createdAt: moment().valueOf()
    }
};

const genLocMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {genMessage, genLocMessage};
