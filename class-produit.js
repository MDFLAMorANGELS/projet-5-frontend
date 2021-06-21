class Produit {
    constructor(elt){
      this.imageUrl = elt.imageUrl;
      this.name = elt.name;
      this.description = elt.description;
      this.price = elt.price;
      this.colors = elt.colors;
      this.id = elt._id;
    }
    
    displayInList(){
    return  `<div class="produit">
            <a href="/produits.html?id=${this.id}">
            <img src=${this.imageUrl}>
            <div class="description">
            <h4 class="produit_title">${this.name}</h4>
            <p class="produit_description">${this.description}</p>
            <p class="produit_prix">${this.price / 100}.00 €</p>
            <div class="colors" style="display:flex">
            ${this.displayColor()}
            </div>
            </div>
            </a>
            </div>`;
    }
    displayColor(){
      const colors = {
        "Dark brown" : '#654321',
        "Pale brown" : '#987654'
      };

      let content = "";
      this.colors.forEach(color => {
        let bgColor = colors[color] ? colors[color] : color;
        content += `<p class="produit_colors" style="background-color:${bgColor}; width:15px ; height:15px"></p>
        `
      });
      return content;
    }
  }
