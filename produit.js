//recuperer les parametres de l url https://www.sitepoint.com/get-url-parameters-with-javascript/
//recuperer le produit en fonction de son id avec l API
//afficher le produit
//permettre d afficher la couleur et d ajouter au panier
let id= new URL(window.location).searchParams.get("id");
console.log(id);

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
