import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  describe("Constructor", function () {
    it("should create the Glided rose with correct values ", function () {
      const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
      expect(gildedRose.items[0].name).toEqual("Normal Item");
      expect(gildedRose.items[0].sellIn).toEqual(10);
      expect(gildedRose.items[0].quality).toEqual(20);
      expect.arrayContaining(gildedRose.items);
    });
  });
  describe("Normal Item", function () {
    it("should decrease one unit of quality when one day has passed ", function () {
      const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(19);
    });

    it("should decrease two unit of quality when product is expired ", function () {
      const gildedRose = new GildedRose([new Item(" 0 Sell days Item", 0, 20)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(18);
    });

    it("should decrease sellIn in one Day ", function () {
      const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].sellIn).toEqual(9);
    });

    it("should not decrease quality lower than 0 ", function () {
      const gildedRose = new GildedRose([new Item(" 0 Sell days Item", 0, 0)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(0);
    });
  });

  describe("Queso Brie", function () {
    it("should increment quality when sellIn > 0 ", function () {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(21);
    });

    it("should not have quality more than 50 ", function () {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(50);
    });

    it("should decrease two unit of quality when product is expired ", function () {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 20)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(22);
    });

    it("should decrease two unit of quality when product is expired ", function () {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(50);
    });
  });

  describe("Sulfuras (legendario)", function () {
    it("Should have quality inmutable on lengendary items ", function () {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(80);
    });

    it("Should have sellin inmutable on lengendary items ", function () {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 20),
      ]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].sellIn).toEqual(0);
    });

    it("Should have sellin inmutable on lengendary items ", function () {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", -1, 1),
      ]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(1);
      expect(updatedItems[0].sellIn).toEqual(-1);

    });


  });

  describe("Entrada al backstage", function () {
    it("Should increase quality +1 when sellin > 10 ", function () {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10),
      ]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(11);
    });

    describe("Sellin <= 10", function () {
      it("Should increase quality +2 when sellin <= 10 ", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10),
        ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).toEqual(12);
      });

      it("Should not increase quality +50 when sellin <= 10 ", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49),
        ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).toEqual(50);
      });
    });

    describe("Sellin <= 5", function () {
      it("Should increase quality +3 when sellin <= 5 ", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10),
        ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).toEqual(13);
      });

      it("Should not increase quality +50 when sellin <= 5 ", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48),
        ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).toEqual(50);
      });
    });

      it("Should have quality 0 when sellin is 0 ", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
        ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].quality).toEqual(0);
      });

    it("Should increase quality when sellin is 1 although the sellIn drops to 0 ", function () {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
      ]);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].quality).toEqual(13);
      expect(updatedItems[0].sellIn).toEqual(0);
    });
  });
});
