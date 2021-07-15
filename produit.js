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
    
    const btn_envoyerPanier = document.querySelector("#btn_envoyer");
    console.log(btn_envoyerPanier);
    btn_envoyerPanier.addEventListener("click", (event) => {
      event.preventDefault();

    const idForm = document.querySelector("input[name='color']:checked").value;
    console.log(idForm);

      let optionsProduit = {
        nomProduit: prod.name,
        idProduit: id,
        option_produit: idForm,
        quantite: 1,
        prix: prod.price /100 ,
      }
      console.log(optionsProduit);

      let produitEnregistrerLocalStorage = JSON.parse(localStorage.getItem("produit"));
      const popupConfirmation = () =>{
        if(window.confirm(`${prod.name} couleur : ${idForm} a bien été ajouté au panier
          consultez le panier OK ou revenir a l'accueil Annuler`)){
          window.location.href = "./panier.html";
        }else{
          window.location.href = "./index.html";
        }
      };

    if(produitEnregistrerLocalStorage){
      produitEnregistrerLocalStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(produitEnregistrerLocalStorage));
      console.log(produitEnregistrerLocalStorage);
      popupConfirmation();
    }else{
      produitEnregistrerLocalStorage = [];
      produitEnregistrerLocalStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(produitEnregistrerLocalStorage));
      console.log(produitEnregistrerLocalStorage);
      popupConfirmation();
    };
    })
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

