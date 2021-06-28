//recuperer les parametres de l url https://www.sitepoint.com/get-url-parameters-with-javascript/
//recuperer le produit en fonction de son id avec l API
//afficher le produit
//permettre d afficher la couleur et d ajouter au panier
fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
  .then(produit => {
    console.log(produit);
  })


let searchParams = new URL(window.location).searchParams.get('id');
console.log(searchParams);
if (searchParams.has('id')) {
    let prodId = searchParams.get('id');
    let produitToDisplay = produit[prodId];
    let root = document.querySelector('#product-detail');
    root.innerHTML = Produit.displayInList();
    let prod = new Produit(produit);
    root.innerHTML = prod.displayInList();
} else {
    windows.location.pathname = 'index.hmtl';
}
fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
    .then(product => {
    console.log(product);
    if (id === Produit.elt._id) {
        return displayInList()
    }
    })

/*async function myFetch() {
//    let response = await fetch(`http://localhost:3000/api/teddies/${id}`);
}*/


//const idProduitSelectionner = id.find((element) => element._id === id);

let mainProduit = document.getElementById("product-detail");
mainProduit =  Produit.displayInList();
