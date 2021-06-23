//recuperer les parametres de l url https://www.sitepoint.com/get-url-parameters-with-javascript/
//recuperer le produit en fonction de son id avec l API
//afficher le produit
//permettre d afficher la couleur et d ajouter au panier
let id= new URL(window.location).searchParams.get("id");
console.log(id);

async function myFetch() {
    let response = await fetch(`http://localhost:3000/api/teddies/${id}`);
}


//const idProduitSelectionner = id.find((element) => element._id === id);

let mainProduit = document.getElementById("product-detail");
mainProduit.innerHTML = Produit(displayInlist());
    `<div class="produit">
    <a href="/produits.html?id=${this.id}">
    <img src=${this.imageUrl}>
    <div class="description">
    <h4 class="produit_title">${this.name}</h4>
    <p class="produit_description">${this.description}</p>
    <p class="produit_prix">${this.price / 100}.00 €</p>
    </div>
    </a>
    </div>`
