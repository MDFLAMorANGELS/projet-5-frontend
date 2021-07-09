let produitEnregistrerLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistrerLocalStorage);

if(produitEnregistrerLocalStorage === null){
    console.log("je suis vide")
}else{
    console.log("je ne suis pas vide")
}