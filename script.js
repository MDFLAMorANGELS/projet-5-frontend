class Produits {
    constructor(elt){
      this.imageUrl = elt.imageUrl;
      this.name = elt.name;
      this.description = elt.description;
      this.price = elt.price;
      this.colors = elt.colors;
    }
    
    displayInList(){
    return  `<div class="produit">
            <img src=${this.imageUrl}>
            <div class="description">
            <h4 class="produit_title">${this.name}</h4>
            <p class="produit_description">${this.description}</p>
            <p class="porduit_prix">${this.price} €</p>
            <p "porduit_colors">${this.color}</p>
            </div>
            </div>`;
    }
  }
  
  fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
  .then(pictures => {
    console.log(pictures);
    let picsElt = document.getElementById("produit_list");
    for(let i=0; i < 5; i++){
      let pic = new Produits(pictures[i]);
      picsElt.innerHTML += pic.displayInList();
    }
    let img_banneire = document.createElement("img");
    img_banneire.src = "http://localhost:3000/images/teddy_4.jpg";
    let banniere = document.getElementById("banniere");
    banniere.appendChild(img_banneire);
  })