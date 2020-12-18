const timeWord = require("./timeWord");

describe("#timeword", () => {
	test("it is a function", () => {
		expect(typeof timeWord).toBe("function");
	});

	describe("noon & midnight", () => {
		test("should return 'noon' if time is 12-00", () => {
			expect(timeWord("12-00")).toEqual("noon");
		});
		test("should return 'midnight' if time is 00-00", () => {
			expect(timeWord("00-00")).toEqual("midnight");
		});
	});

	describe("twelve hour am & pm", () => {
		test("should return 'twelve oh nine am' if time is 00-09", () => {
			expect(timeWord("00-09")).toEqual("twelve oh nine am");
		});
		test("should return 'twelve thirteen pm' if time is 12-13", () => {
			expect(timeWord("12-13")).toEqual("twelve thirteen pm");
		});
	});

	describe("converting hour > 12", () => {
		test("should return 'four oh four pm' if time is 16-04", () => {
			expect(timeWord("16-04")).toEqual("four oh four pm");
		});
		test("should return 'eleven twenty three pm' if time is 23-23", () => {
			expect(timeWord("23-23")).toEqual("eleven twenty three pm");
		});
	});

	describe("determining teen minute", () => {
		test("should return 'two fourteen pm' if time is 14-14", () => {
			expect(timeWord("14-14")).toEqual("two fourteen pm");
		});
		test("should return 'five seventeen am' if time is 05-17", () => {
			expect(timeWord("05-17")).toEqual("five seventeen am");
		});
	});
	describe("twenties, thirties, forties, and fifties minutes", () => {
		test("should return 'six twenty five pm' if time is 18-25", () => {
			expect(timeWord("18-25")).toEqual("six twenty five pm");
		});
		test("should return 'seven thirty one am' if time is 07-31", () => {
			expect(timeWord("07-31")).toEqual("seven thirty one am");
		});
		test("should return 'eight forty nine pm' if time is 20-49", () => {
			expect(timeWord("20-49")).toEqual("eight forty nine pm");
		});
		test("should return 'ten fifty eight am' if time is 07-31", () => {
			expect(timeWord("10-58")).toEqual("ten fifty eight am");
		});
	});
});
