import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should decrease one unit of quality when one day has passed ", function () {
    const gildedRose = new GildedRose([ new Item("Normal Item", 10, 20)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(19);
  });

  it("should decrease two unit of quality when sellin is over ", function () {
    const gildedRose = new GildedRose([new Item(" 0 Sell days Item", 0, 20)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(18);
  });

  it("should decrease sellIn on one Day ", function () {
    const gildedRose = new GildedRose([ new Item("Normal Item", 10, 20)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toEqual(9);
  });

  it("should not decrease quality lower than ", function () {
    const gildedRose = new GildedRose([new Item(" 0 Sell days Item", 0, 0)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(0);
  });



});
