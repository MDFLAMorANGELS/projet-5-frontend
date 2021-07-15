let produitEnregistrerLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistrerLocalStorage);

const positionPanier = document.querySelector(".container-produits");


if(produitEnregistrerLocalStorage ===null){
    const panierVide = `
    <div class="container-panier-vide">
        <div> Le panier et vide</div>
    </div>
    `;
    positionPanier.innerHTML = panierVide;
    console.log("je suis vide")
}else{
    let structurePanier = [];

    for(k = 0; k<produitEnregistrerLocalStorage.length;k++){
        console.log("produit dans le panier-" + produitEnregistrerLocalStorage.length)
        structurePanier = structurePanier +`
        <div class="container-recapitulatif">
            <div>Quantité 1 - ${produitEnregistrerLocalStorage[k].nomProduit} couleur : ${produitEnregistrerLocalStorage[k].option_produit}</div>
            <div class="prix_btn">${produitEnregistrerLocalStorage[k].prix}€ - <button class="btn-supprimer"> Supprimer </button></div>
        </div>
        `;
    }
        if(k == produitEnregistrerLocalStorage.length) {
        positionPanier.innerHTML = structurePanier;
        }
}

let btnSupprimer = document.querySelectorAll(".btn-supprimer");

for ( let l = 0 ; l < btnSupprimer.length ; l++) {
    btnSupprimer[l].addEventListener("click",(event) => {
        event.preventDefault();

        let idSupprimer = produitEnregistrerLocalStorage[l].idProduit;
        console.log(idSupprimer);

        produitEnregistrerLocalStorage = produitEnregistrerLocalStorage.filter(el => el.idProduit !== idSupprimer);
        console.log(produitEnregistrerLocalStorage);
    })
}