const expect = require('expect');
const {genMessage, genLocMessage} = require('./message');

describe('GenerateMessage', () => {
    it('Should generate a correct message object', () => {
        const from = 'Nevaan Perera';
        const msg = 'Hey what are you up to?';
        const message = genMessage(from, msg);

        // Look up expect functions here: https://jestjs.io/docs/en/expect.html
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, msg});
    });
});

describe('GenerateMessage', () => {
    it('Should generate a correct location message object', () => {
        const from = 'Nevaan Perera';
        const lat = 49.839;
        const lng = -75.829;
        const locMessage = genLocMessage(from, lat, lng);

        // Look up expect functions here: https://jestjs.io/docs/en/expect.html
        expect(typeof locMessage.createdAt).toBe('number');
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        expect(locMessage).toMatchObject({from, url});
    });
});
