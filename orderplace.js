var count = JSON.parse(localStorage.getItem("cartitemscount"))
if(count == null){
    cartCount.textContent = 0;
}
var cartCount = document.getElementById("cart-count")
cartCount.textContent = 0;

function btnForAgainShopping(){
    location.assign("http://127.0.0.1:5500/index.html")
}