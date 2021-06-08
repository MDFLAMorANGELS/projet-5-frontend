fetch("http://localhost:3000/api/teddies")
.then (function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then (function(data) {
    console.log(data);
})
let img = document.createElement("img");
img.src = "http://localhost:3000/images/teddy_1.jpg";
let produit = document.getElementById("x");
produit.appendChild(img);