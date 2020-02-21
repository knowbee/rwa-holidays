const chai = require("chai");
const expect = chai.expect;
const { isAHoliday, getHolidays } = require("../index");
const getDate = dateString => new Date(`${dateString} 00:00:00`);

console.log(getHolidays(2020));
describe("rwa-holidays", () => {
  describe("gets observed holidays", () => {
    it("2010-12-31 should return false", () => {
      const date = getDate("2010-12-31");
      expect(isAHoliday(date)).to.be.false;
    });
    it("2010-12-24 should return true", () => {
      const date = getDate("2010-12-24");
      expect(isAHoliday(date)).to.be.true;
    });
    it("2010-12-25 should return false", () => {
      const date = getDate("2010-12-25");
      expect(isAHoliday(date)).to.be.false;
    });
    it("2005-12-25 should return false", () => {
      const date = getDate("2005-12-25");
      expect(isAHoliday(date)).to.be.false;
    });
    it("2005-12-26 should return true", () => {
      const date = getDate("2005-12-26");
      expect(isAHoliday(date)).to.be.true;
    });
    it("2010-01-01 should return true", () => {
      const date = getDate("2010-01-01");
      expect(isAHoliday(date)).to.be.true;
    });
    it("2010-07-01 should return true", () => {
      const date = getDate("2010-07-01");
      expect(isAHoliday(date)).to.be.true;
    });
    it("1990-04-07 should return false", () => {
      const date = getDate("1990-04-07");
      expect(isAHoliday(date)).to.be.false;
    });
    it("should return array of holidays", () => {
      expect(typeof getHolidays("2020")).to.equal("object");
    });
  });
});
