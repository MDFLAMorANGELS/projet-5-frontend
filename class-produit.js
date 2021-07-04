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
    return  `<div class="produit-card">
            <a href="/produits.html?id=${this.id}">
            <img src=${this.imageUrl}>
            <div class="description">
            <h4 class="card_title">${this.name}</h4>
            <p class="card_description">${this.description}</p>
            <p class="card_prix">${this.price / 100}.00 €</p>
            <div class="colors" style="display:flex">
            ${this.displayColor()}
            </div>
            </div>
            </a>
            </div>`;
    }
    
    displayProduit(){
      return `<div class="produit">
      <img src=${this.imageUrl}>
      <div class="description-produit">
      <h4 class="produit_title">${this.name}</h4>
      <p class="produit_description">${this.description}</p>
      <p class="produit_prix">${this.price / 100}.00 €</p>
      <form>
      <fieldset>
      <legend>Veuillez choisir la couleur parmit : ${this.colors}</legend>
      <div class="colors" style="display:flex ">
      ${this.displayColor()}
      </div>
      <div class="button" style="margin:2%">
      <button class="bouton panier">Ajouter au panier</button>
      </form>
      </fieldset>
      </div>
      </div>
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
        content += `<div>
                    <input type="radio" id="colors" name="colors" value="${bgColor}"
                    checked>
                    <label style="background-color:${bgColor} ; width:15px ; height:15px ; border:solid black 1px ; for="${bgColor}">SELECT</label>
                    </div>`
        //`<p class="produit_colors" 
        //style="background-color:${bgColor}; width:15px ; height:15px ; border:solid black 1px"></p>
        //`
      });
      return content;
    }

  }
