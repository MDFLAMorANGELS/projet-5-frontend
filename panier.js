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
            <div class="prix_btn">${produitEnregistrerLocalStorage[k].prix}€ - <button class="btn-supprimer" data-index="${k}"> Supprimer </button></div>
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

        let index = btnSupprimer[l].dataset.index;
        produitEnregistrerLocalStorage.splice(index,1);
        localStorage.setItem("produit", JSON.stringify(produitEnregistrerLocalStorage));
        window.location.reload();
    })
}