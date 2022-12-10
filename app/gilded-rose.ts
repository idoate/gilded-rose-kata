export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isNormalProduct(itemName) {
    return (
      itemName != "Aged Brie" &&
      itemName != "Backstage passes to a TAFKAL80ETC concert" &&
      itemName != "Sulfuras, Hand of Ragnaros"
    );
  }

  //Se pueden poner constantes en vez de funicones para no trabajar con strings
  isAgedBrie(itemName) {
    return itemName === "Aged Brie";
  }

  isSulfuras(itemName) {
    return itemName === "Sulfuras, Hand of Ragnaros";
  }

  isBackstage(itemName) {
    return itemName === "Backstage passes to a TAFKAL80ETC concert";
  }

  decreaseQuality(quality, value) {
    quality = quality - value;
    if (quality < 0) {
      return 0;
    }
    return quality;
  }

  increaseQuality(quality, value) {
    quality = quality + value;
    if (quality > 50) {
      return 50;
    }
    return quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = this.updateProduct(this.items[i]);
    }

    return this.items;
  }

  updateProduct(item) {
    const isExpired = item.sellIn < 0; // Guardamos en un booleano si esta expirado o no, en si a veces cunde mas que hacer funciones
    if (this.isSulfuras(item.name)) {
      return item;
    }
    item.sellIn = item.sellIn - 1;
    if (this.isAgedBrie(item.name)) {
      if (item.sellIn <= 0) {
        item.quality = this.increaseQuality(item.quality, 2);
      }
      if (item.sellIn > 0) {
        item.quality = this.increaseQuality(item.quality, 1);
      }
      return item;
    }
    if (this.isNormalProduct(item.name)) {
      item.quality = this.decreaseQuality(item.quality, 1);
    } else {
      item.quality = this.increaseQuality(item.quality, 1);
      if (this.isBackstage(item.name)) {
        if (item.sellIn < 11) {
          item.quality = this.increaseQuality(item.quality, 1);
        }
        if (item.sellIn < 6) {
          item.quality = this.increaseQuality(item.quality, 1);
        }
      }
    }
    if (item.sellIn < 0) {
      if (!this.isBackstage(item.name)) {
        item.quality = this.decreaseQuality(item.quality, 1);
      } else {
        item.quality = 0;
      }
    }
    return item;
  }
}
