//Récuperation des données du serveurs 
fetch("http://localhost:3000/api/teddies")
  .then(res => res.json())
  .then(products => {
    console.log(products);
    let picsElt = document.getElementById("produit_list");
    //Creation d une boucle qui injecte le html de displayinlist pour chaque produits produits en fonction du nombre de produits
    for (product of products) {
      let pic = new Produit(product);
      picsElt.innerHTML += pic.displayInList();
    }
  })
  //Afficher message si une erreure est produite
  .catch(error => {
    let picsElt = document.getElementById("produit_list");
    picsElt.innerHTML = '<h1>Probleme serveur</h1>'
  })