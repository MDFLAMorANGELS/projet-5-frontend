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
      <div id="color">
      ${this.displayColor(true)}
      </div>
      <div class="button" style="margin:2%">
      <button type="submit" id="btn_envoyer" class="bouton panier">Ajouter au panier</button>
      </fieldset>
      </form>
      </div>
      </div>
      </div>`;
    }

    displayColor(isForm = false){
      const colors = {
        "Dark brown" : '#654321',
        "Pale brown" : '#987654'
      };

      let content = "";
      this.colors.forEach(color => {
        let bgColor = colors[color] ? colors[color] : color;
        if(isForm){
          content += `<div>
          <input readOnly type="radio" id="${color}" name="color" value="${color}">
          <label style="background-color:${bgColor} ; width:15px ; height:15px ; display:block;" for="${color}"><span style="background-color:${bgColor}"></span></label>
          </div>`
        }else{
          content += `<p class="produit_colors" 
          style="background-color:${bgColor}; width:15px ; height:15px ; border:solid black 1px"></p>
          `
        }
       
        
        
        /*`<div>
                    <input type="radio" id="${bgColor}" name="${bgColor}" value="${bgColor}"
                    checked>
                    <label style="background-color:${bgColor} ; width:15px ; height:15px ; border:solid black 1px ; for="${bgColor}">SELECT</label>
                    </div>`*/
        //`<p class="produit_colors" 
        //style="background-color:${bgColor}; width:15px ; height:15px ; border:solid black 1px"></p>
        //`
      });
      return content;
    }

  }
  /*<form>
  <fieldset>
  <legend>Veuillez choisir la couleur parmit : ${this.colors}</legend>
  <div class="colors" style="display:flex ">
  ${this.displayColor()}
  </div>*/