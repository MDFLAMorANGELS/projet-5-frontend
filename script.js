fetch("http://localhost:3000/api/teddies")
.then (function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then (function(data) {
    console.log(data);
})
.catch(function(err) {
    // Une erreur est survenue
});



let img1 = document.createElement("img");
img1.src = "http://localhost:3000/images/teddy_1.jpg";
let produit1 = document.getElementById("produit1");
produit1.appendChild(img1);

let img2 = document.createElement("img");
img2.src = "http://localhost:3000/images/teddy_2.jpg";
let produit2 = document.getElementById("produit2");
produit2.appendChild(img2);

let img3 = document.createElement("img");
img3.src = "http://localhost:3000/images/teddy_3.jpg";
let produit3 = document.getElementById("produit3");
produit3.appendChild(img3);

let img4 = document.createElement("img");
img4.src = "http://localhost:3000/images/teddy_4.jpg";
let produit4 = document.getElementById("produit4");
produit4.appendChild(img4);

let img5 = document.createElement("img");
img5.src = "http://localhost:3000/images/teddy_5.jpg";
let produit5 = document.getElementById("produit5");
produit5.appendChild(img5);

let title = document.createElement("h2");
title.innerHTML = "<h3>v</h3>";
let desciption = document.getElementById('description');
desciption.appendChild(title);

