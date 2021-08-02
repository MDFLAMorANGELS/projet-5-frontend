let produitEnregistrerLocalStorage = localStorage.getItem("produit") ? JSON.parse(localStorage.getItem("produit")) : [];
console.log(produitEnregistrerLocalStorage);

const positionPanier = document.querySelector(".container-produits");


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
}

let btnSupprimer = document.querySelectorAll(".btn-supprimer");

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

positionPanier.insertAdjacentHTML("beforeend", btn_tout_supprimer_position);

const btn_tout_supprimer = document.querySelector(".btn-tout-supprimer");

btn_tout_supprimer.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.removeItem("produit");
    alert("le panier a été vider")
    window.location.href = "panier.html";
})


let prixTotalCalcul = [];

for (let m = 0; m < produitEnregistrerLocalStorage.length; m++) {
    let prixProduitPanier = produitEnregistrerLocalStorage[m].prix;

    prixTotalCalcul.push(prixProduitPanier);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

const totalPrixPosition = `
    <div class="affichage-prix">Le prix total est de : ${prixTotal} €</div>
`;

positionPanier.insertAdjacentHTML("beforeend", totalPrixPosition);

const afficherFormulaire = () => {
    const positionFormulaire = document.querySelector('.container-produits');

    const structureFormulaire = `
    <div id="formulaire-commande">
    <h4>Remplissez le formulaire pour valider la commande</h2>
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

afficherFormulaire();

const btnEnvoyerFormulaire = document.querySelector("#envoyer-formulaire");

btnEnvoyerFormulaire.addEventListener('click', (e) => {
    e.preventDefault();


    //const formulaireValues = new Formulaire();
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

    const regExPrenomNomVille = (value) => {
        return /^[A-Za-z]{2,20}$/.test(value);
    };

    const regExCodePostal = (value) => {
        return /^[0-9]{5}$/.test(value);
    };

    const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,15}$/.test(value);
    };

    function prenomControl() {
        const lePrenom = formulaireValues.firstName;
        if (regExPrenomNomVille(lePrenom)) {
            return true;
        } else {
            alert(textAlert("le prenom"));
            return false;
        }
    };

    function nomControl() {
        const leNom = formulaireValues.lastName;
        if (regExPrenomNomVille(leNom)) {
            return true;
        } else {
            alert(textAlert("le nom"));
            return false;
        }
    };

    function codePostalControl() {
        const leCodePostal = formulaireValues.codePostal;
        if (regExCodePostal(leCodePostal)) {
            return true;
        } else {
            alert("le code postal : doit etre composé de 5 chiffres");
            return false;
        }
    };

    function villeControl() {
        const laVille = formulaireValues.city;
        if (regExPrenomNomVille(laVille)) {
            return true;
        } else {
            alert(textAlert("la ville"));
            return false;
        }
    };

    function emailControl() {
        const leEmail = formulaireValues.email;
        if (regExEmail(leEmail)) {
            return true;
        } else {
            alert("L email n est pas valide");
            return false;
        }
    };


    if (prenomControl() && nomControl() && codePostalControl() && emailControl()&& villeControl()) {
        localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
        const aEnvoyer = {
            products: produitEnregistrerLocalStorage.map(elt => elt.idProduit),
            contact: formulaireValues
        }

        fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            body: JSON.stringify(aEnvoyer),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                localStorage.setItem("formulaireID", JSON.stringify(json));
                window.location.href="./comfirmation.html";
            })
            .catch(err => console.log(err));
    } else {
        alert("Veuillez bien remplir le formulaire");
    };
});

const dataLocalStorage = localStorage.getItem("formulaireValues");

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

function remplirFormulaireAutoViaLocalStorage(input) {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
};

remplirFormulaireAutoViaLocalStorage("firstName");
remplirFormulaireAutoViaLocalStorage("city");
remplirFormulaireAutoViaLocalStorage("lastName");
remplirFormulaireAutoViaLocalStorage("address");
remplirFormulaireAutoViaLocalStorage("codePostal");
remplirFormulaireAutoViaLocalStorage("email");
