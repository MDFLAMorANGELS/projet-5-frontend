fetch("http://localhost:3000/api/teddies")
  .then(res => res.json())
  .then(products => {
    console.log(products);
    let picsElt = document.getElementById("produit_list");
    for (product of products) {
      let pic = new Produit(product);
      picsElt.innerHTML += pic.displayInList();
    }
  })
  .catch(error => {
    let picsElt = document.getElementById("produit_list");
    picsElt.innerHTML = '<h1>Probleme serveur</h1>'
  })