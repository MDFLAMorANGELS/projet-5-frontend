//recuperer les parametres de l url https://www.sitepoint.com/get-url-parameters-with-javascript/
//recuperer le produit en fonction de son id avec l API
//afficher le produit
//permettre d afficher la couleur et d ajouter au panier
let id = getParamFromURI('id');
if ( id !== undefined){
    fetch("http://localhost:3000/api/teddies/"+id)
    .then(res => res.json())
  .then(produit => {
    console.log(produit);
    let root = document.querySelector('#product-detail');
    let prod = new Produit(produit);
    root.innerHTML = prod.displayProduit();
  })
} else {
    let root = document.querySelector('#product-detail');
    root.innerHTML = `<h1>Pas de Produit Selectionne</h1>`
}

function getParamFromURI(param){
    let searchParams = new URL(window.location).searchParams;
    if(searchParams.has(param)){
        return searchParams.get(param);
    }
    return undefined;
}
