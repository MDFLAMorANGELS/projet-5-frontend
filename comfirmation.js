const validationId = localStorage.getItem("formulaireID") ? JSON.parse(localStorage.getItem("formulaireID")) : [];
const messageComfirm = document.querySelector("#message-comfirmation");
const message = `
<h2 id="titre-message">Comfirmation de la commande</h2>
<div id="comfirm">
<h3 id="titre-message">Facture N° ${validationId.orderId}</h3>
<h3 id="titre-message">Mes coordonées</h3>
<p class="message">Nom : ${validationId.contact.lastName}</p>
<p class="message">prenom : ${validationId.contact.firstName}</p>
<p class="message">E-mail : ${validationId.contact.email}</p>
<p class="message">Adresse de livraison : ${validationId.contact.address}</p>
<h3 id="titre-message">Details de la commande</h3>
<div id="details"></div>
</div>
`;
messageComfirm.innerHTML = message;


let produitEnregistrerLocalStorage = localStorage.getItem("produit") ? JSON.parse(localStorage.getItem("produit")) : [];
const positionPanier = document.querySelector("#details");

    let structurePanier = [];

    for (k = 0; k < produitEnregistrerLocalStorage.length; k++) {
        console.log("produit dans le panier-" + produitEnregistrerLocalStorage.length)
        structurePanier = structurePanier + `
        <div class="container-recapitulatif">
            <div>Quantité 1 - ${produitEnregistrerLocalStorage[k].nomProduit} couleur : ${produitEnregistrerLocalStorage[k].option_produit}</div>
            <div class="prix_btn">${produitEnregistrerLocalStorage[k].prix} €</div>
        </div>
        `;
    }
    if (k == produitEnregistrerLocalStorage.length) {
        positionPanier.innerHTML = structurePanier;
    }
