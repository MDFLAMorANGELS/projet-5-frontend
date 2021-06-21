fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
  .then(product => {
    console.log(product);
    let picsElt = document.getElementById("produit_list");
    for(product of product){
      let pic = new Produit(product);
      picsElt.innerHTML += pic.displayInList();
    }
})