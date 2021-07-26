let produitEnregistrerLocalStorage = localStorage.getItem("produit") ? JSON.parse(localStorage.getItem("produit")) : [];
console.log(produitEnregistrerLocalStorage);

const positionPanier = document.querySelector(".container-produits");


if(produitEnregistrerLocalStorage === null || produitEnregistrerLocalStorage == 0){
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
            <div class="prix_btn">${produitEnregistrerLocalStorage[k].prix} €  -  <button class="btn-supprimer" data-index="${k}"> Supprimer </button></div>
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

const btn_tout_supprimer_position = `
    <button class="btn-tout-supprimer"> Vider le panier </button>
`;

positionPanier.insertAdjacentHTML("beforeend", btn_tout_supprimer_position);

const btn_tout_supprimer = document.querySelector(".btn-tout-supprimer");

btn_tout_supprimer.addEventListener('click', (event) => {
event.preventDefault();

localStorage.removeItem("produit");
alert("le panier a été vider")
window.location.href = "panier.html";
})


let prixTotalCalcul = [];

for(let m = 0 ; m < produitEnregistrerLocalStorage.length ; m++ ){
   let prixProduitPanier =  produitEnregistrerLocalStorage[m].prix;

   prixTotalCalcul.push(prixProduitPanier);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

const totalPrixPosition = `
    <div class="affichage-prix">Le prix total est de : ${prixTotal} €</div>
`;

positionPanier.insertAdjacentHTML("beforeend", totalPrixPosition);



// data to be sent to the POST request
let _data = {
    contact: {
        firstName: "teddies",
         lastName: "ourson",
         address: "rue du",
         city: "paris",
        email: "mm@gmail.com",
       },
       products: ["5beaa8bf1c9d440000a57d94"]
  }

 
 

  fetch('http://localhost:3000/api/teddies/order', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json))
  .catch(err => console.log(err));
