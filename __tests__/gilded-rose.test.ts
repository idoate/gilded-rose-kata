import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  let allItems = {
    normalItem: new Item("Normal Item", 10, 20),
    expiredNormalItem: new Item(" 0 Sell days Item", 0, 20),
   }
  beforeEach (() => {
    allItems = {
      normalItem: new Item("Normal Item", 10, 20),
      expiredNormalItem: new Item(" 0 Sell days Item", 0, 20),
     }
  })
  it("should decrease one unit of quality when one day has passed ", function () {
    const gildedRose = new GildedRose([allItems.normalItem]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(19);
  });
  it("should decrease one unit of quality when two days has passed ", function () {
    const gildedRose = new GildedRose([allItems.normalItem]);
    let  updatedItems = gildedRose.updateQuality();
    updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(18);
  });

  it("should decrease two unit of quality when sellin is over ", function () {
    const gildedRose = new GildedRose([allItems.expiredNormalItem]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(18);
  });

});
