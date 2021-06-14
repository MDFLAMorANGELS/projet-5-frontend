class Produits {
    constructor(elt){
      this.imageUrl = elt.imageUrl;
      this.name = elt.name;
      this.description = elt.description;
      this.price = elt.price;
      this.color = elt.color;
    }
    
    displayInList(){
    return  `<img src=${this.imageUrl}>
            <div>
            <p>${this.name}</p>
            <p>${this.description}</p>
            <p>${this.price} €</p>
            <p>${this.color}</p>
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
    pictures.colors.forEach(color => {
        let color_ = "";
    
        if (color === "Dark brown") {
          color_ = "#4c1414";
        } else if (color === "Pale brown") {
          color_ = "#c88e62";
        } else {
          color_ = color;
        }
    
        content += `<span id="color" style=" background-color: ${color_}" title="${color}"></span>`;
      });
  })