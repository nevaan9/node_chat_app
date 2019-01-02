const expect = require('expect');
const {genMessage} = require('./message');

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
