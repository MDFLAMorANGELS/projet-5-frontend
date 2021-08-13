//Si il y a la clee produit dans le LS on parse la reponse sinon on creer un tableau
let produitEnregistrerLocalStorage = localStorage.getItem("produit") ? JSON.parse(localStorage.getItem("produit")) : [];
console.log(produitEnregistrerLocalStorage);

const positionPanier = document.querySelector(".container-produits");

//Création d une condition qui verifie si produitEnregistrerLocalStorage est null ou egale a 0
if (produitEnregistrerLocalStorage === null || produitEnregistrerLocalStorage == 0) {
    const panierVide = `
    <div class="container-panier-vide">
        <div> Le panier et vide</div>
    </div>
    `;
    positionPanier.innerHTML = panierVide;
    console.log("je suis vide")
} else {
    let structurePanier = [];
    //Création d une boucle qui affiche chaque produit enregistrer dans produitenregisterlocalstorage
    for (k = 0; k < produitEnregistrerLocalStorage.length; k++) {
        console.log("produit dans le panier-" + produitEnregistrerLocalStorage.length)
        structurePanier = structurePanier + `
        <div class="container-recapitulatif">
            <div>Quantité 1 - ${produitEnregistrerLocalStorage[k].nomProduit} couleur : ${produitEnregistrerLocalStorage[k].option_produit}</div>
            <div class="prix_btn">${produitEnregistrerLocalStorage[k].prix} €  -  <button class="btn-supprimer" data-index="${k}"> Supprimer </button></div>
        </div>
        `;
    }
    if (k == produitEnregistrerLocalStorage.length) {
        positionPanier.innerHTML = structurePanier;
    }


    let btnSupprimer = document.querySelectorAll(".btn-supprimer");
    //Création d un bouton pouvant supprimer l article supprimer et recharger la page//
    for (let l = 0; l < btnSupprimer.length; l++) {
        btnSupprimer[l].addEventListener("click", (event) => {
            event.preventDefault();

            let index = btnSupprimer[l].dataset.index;
            produitEnregistrerLocalStorage.splice(index, 1);
            localStorage.setItem("produit", JSON.stringify(produitEnregistrerLocalStorage));
            window.location.reload();
        })
    }

    const btn_tout_supprimer_position = `
    <button class="btn-tout-supprimer"> Vider le panier </button>
`;
    //Ajout du Html a la suite de position panier avec beforeend
    positionPanier.insertAdjacentHTML("beforeend", btn_tout_supprimer_position);

    const btn_tout_supprimer = document.querySelector(".btn-tout-supprimer");
    //Création d un bonton qui supprime la clee produit du local storage et recharge la page
    btn_tout_supprimer.addEventListener('click', (event) => {
        event.preventDefault();

        localStorage.removeItem("produit");
        alert("le panier a été vider")
        window.location.href = "panier.html";
    })

    const prixTotal = getTotalPrice(produitEnregistrerLocalStorage);

    const totalPrixPosition = `
    <div class="affichage-prix">Le prix total est de : ${prixTotal} €</div>
`;
    //Ajout du Html a la suite de position panier avec beforeend
    positionPanier.insertAdjacentHTML("beforeend", totalPrixPosition);


    afficherFormulaire('.container-produits');

    const btnEnvoyerFormulaire = document.querySelector("#envoyer-formulaire");
    //Création d un bouton qui engistre vérifie et envoie les données saisie
    btnEnvoyerFormulaire.addEventListener('click', (e) => {
        e.preventDefault()

        //Création d un objet qui contient chaque champ du formulaire
        const formulaireValues = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            codePostal: document.querySelector("#codePostal").value,
            email: document.querySelector("#email").value,
        }

        const textAlert = (value) => {
            return `${value} : Chiffre et symbole ne sont pas autorisé \n Ne pas depasser 20 caractere, minimum 2 caracteres`;
        };
        //Création d une regex qui autorise les lettres de a a z de 2 a 20 caracteres
        const regExPrenomNomVille = (value) => {
            return /^[A-Za-z]{2,20}$/.test(value);
        };
        //Création d une regex qui autorise les chiffres de 0 a 9 et demande 5 caractere
        const regExCodePostal = (value) => {
            return /^[0-9]{5}$/.test(value);
        };
        //Création d une regex qui autorise les données pour une email
        const regExEmail = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,15}$/.test(value);
        };

        //Création d une condition qui verifie chaque donnés du formulaire avec la function check(value,regex,value)
        if (check(formulaireValues.firstName, regExPrenomNomVille, textAlert('Le prenom')) &&
            check(formulaireValues.lastName, regExPrenomNomVille, textAlert('Le nom')) &&
            checkEmpty(formulaireValues.address) &&
            check(formulaireValues.city, regExPrenomNomVille, textAlert('La ville')) &&
            check(formulaireValues.codePostal, regExCodePostal, textAlert('Le code postal')) &&
            check(formulaireValues.email, regExEmail, textAlert('Le mail'))
        ) {
            localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
            //le .map sert uniquement a recupere l id des produit + des données du contacts
            const aEnvoyer = {
                products: produitEnregistrerLocalStorage.map(elt => elt.idProduit),
                contact: formulaireValues
            }
            //envoie des données  de aenvoyer pour recupere N°order et creer une clee local storage avec la reponse
            fetch('http://localhost:3000/api/teddies/order', {
                method: "POST",
                body: JSON.stringify(aEnvoyer),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    localStorage.setItem("formulaireID", JSON.stringify(json));
                    window.location.href = "./comfirmation.html";
                })
                .catch(err => console.log(err));
        } else {
            alert("Veuillez bien remplir le formulaire");
        };
    });
    
    remplirFormulaireAutoViaLocalStorage("firstName");
    remplirFormulaireAutoViaLocalStorage("city");
    remplirFormulaireAutoViaLocalStorage("lastName");
    remplirFormulaireAutoViaLocalStorage("address");
    remplirFormulaireAutoViaLocalStorage("codePostal");
    remplirFormulaireAutoViaLocalStorage("email");
}
//Récupération de la clee formulaireValues puis parse et envoyer dans son input
function remplirFormulaireAutoViaLocalStorage(input) {
    const dataLocalStorage = localStorage.getItem("formulaireValues");
    const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
};

function check(value, regex, error) {
    if (regex(value)) {
        return true
    }
    alert(error)
    return false
}

function checkEmpty(entry) {
    if (entry.length > 0) {
        return true
    }
    alert("le champ ne peut etre vide");
    return false;
}

function afficherFormulaire(container) {
    const positionFormulaire = document.querySelector(container);
    //Création de l html du formulaire
    const structureFormulaire = `
    <div id="formulaire-commande">
    <h4 id="titre-form">Remplissez le formulaire pour valider la commande</h2>
<form id="formulaire">
    
    <label for="prenom">Prenom : </label>
    <input type="text" id="firstName" name="firstName" required>

    <label for="nom">Nom : </label>
    <input type="text" id="lastName" name="nom" required>

    <label for="adresse">adresse : </label>
    <textarea type="text" id="address" required></textarea>

    <label for="ville">Ville : </label>
    <input type="text" id="city" name="ville" required>

    <label for="codePostal">Code postal : </label>
    <input type="text" id="codePostal" name="code-postal" required>

    <label for="email">Email : </label>
    <input type="text" id="email" name="email" required>

    <button id="envoyer-formulaire" type="submit" name="envoyer-formulaire">
        Confirmation de la commande
    </button>

</form>
</div>
    `;

    positionFormulaire.insertAdjacentHTML("afterend", structureFormulaire);
};
//Création d une function qui creer un prix a 0 et qui ajoute chaque prix en fonction du nombre de produit
function getTotalPrice(products) {
    let total = 0;
    products.forEach(product => total += product.prix);
    return total;
}