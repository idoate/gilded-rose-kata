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

  isAgedBrie(itemName) {
    return (
      itemName === "Aged Brie" );
  }

  isSulfuras(itemName) {
    return (
      itemName === "Sulfuras, Hand of Ragnaros" );
  }

  isBackst(itemName) {
    return (
      itemName === "Sulfuras, Hand of Ragnaros" );
  }

  decreaseQuality(quality, value) {
    quality = quality - value
    if (quality < 0){
        return 0
    }
    return quality
  }

  increaseQuality(quality, value) {
    quality = quality + value
    if (quality > 50){
        return 50
    }
    return quality
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateProduct(this.items[i]);
    }

    return this.items;
  }


  updateProduct(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return item;
    }
    if (this.isNormalProduct(item.name)) {
      item.quality = this.decreaseQuality(item.quality, 1)
    } 
    
    else {
        item.quality = this.increaseQuality(item.quality, 1)
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 11) {
              item.quality = this.increaseQuality(item.quality, 1)
          }
          if (item.sellIn < 6) {
            item.quality = this.increaseQuality(item.quality, 1)
          }
        
      }
    }
    
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            item.quality = this.decreaseQuality(item.quality, 1)
        } else {
          item.quality = 0
        }
      } else {
        item.quality = this.increaseQuality(item.quality, 1)
      }
    }
  }
}
