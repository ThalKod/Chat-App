var expect = require("expect");

var {generateMessage} = require("../utils/message");


describe("generateMessage", ()=>{
    it("should generate correct message object", () =>{
        var res = {
            from: "Admin",
            text: "Hello test",
        };

        message = generateMessage(res.from, res.text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: res.from,
            text: res.text
        });

    });
});