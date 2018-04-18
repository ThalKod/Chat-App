const expect = require("expect");
const validation = require("../utils/validation");

describe("String Validation", ()=>{
    it("should reject non-string values", ()=>{
        var sample = 3232;
        var bool = validation.isValidString(sample);

        expect(bool).toBe(false);
    });

    it("should reject string with only space", ()=>{
        var sample = "    ";
        var bool = validation.isValidString(sample);

        expect(bool).toBe(false);
    });

    it("should allow space with non-space characters", ()=>{
        var sample = "Hello";
        var bool = validation.isValidString(sample);

        expect(bool).toBe(true);
    });
});