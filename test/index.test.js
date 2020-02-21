const chai = require("chai");
const expect = chai.expect;
const { isAHoliday, getHolidays } = require("../index");
const getDate = dateString => new Date(`${dateString} 00:00:00`);

describe("rwa-holidays", () => {
  describe("gets observed holidays", () => {
    it("should return false", () => {
      const date = getDate("2010-12-31");
      expect(isAHoliday(date)).to.be.false;
    });
    it("should return true", () => {
      const date = getDate("2010-12-25");
      expect(isAHoliday(date)).to.be.true;
    });
    it("should return true", () => {
      const date = getDate("2010-01-01");
      expect(isAHoliday(date)).to.be.true;
    });
    it("should return true", () => {
      const date = getDate("2010-07-01");
      expect(isAHoliday(date)).to.be.true;
    });
    it("should return false", () => {
      const date = getDate("1990-04-07");
      expect(isAHoliday(date)).to.be.false;
    });
    it("should return array of holidays", () => {
      expect(typeof getHolidays("2020")).to.equal("object");
    });
  });
});
