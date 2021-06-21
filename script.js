class Produits {
    constructor(elt){
      this.imageUrl = elt.imageUrl;
      this.name = elt.name;
      this.description = elt.description;
      this.price = elt.price;
      this.colors = elt.colors;
      this._id = elt._id;
    }
    
    displayInList(){
    return  `<div class="produit">
            <a href="/produits.html?id=${this.id}">
            <img src=${this.imageUrl}>
            <div class="description">
            <h4 class="produit_title">${this.name}</h4>
            <p class="produit_description">${this.description}</p>
            <p class="produit_prix">${this.price / 100}.00 €</p>
            <p class="produit_colors" style="background-color:${this.colors[0]}; width:15px ; height:15px"></p>
            <p class="produit_colors" style="background-color:${this.colors[1]}; width:15px ; height:15px"></p>
            <p class="produit_colors" style="background-color:${this.colors[2]}; width:15px ; height:15px"></p>
            <p class="produit_colors" style="background-color:${this.colors[3]}; width:15px ; height:15px"></p>
            <p class="produit_colors" style="background-color:${this.colors[4]}; width:15px ; height:15px"></p>
            </div>
            </a>
            </div>`;
    }
  }
  
  fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
  .then(product => {
    console.log(product);
    let picsElt = document.getElementById("produit_list");
    for(product of product){
      let pic = new Produits(product);
      picsElt.innerHTML += pic.displayInList();
    }
})