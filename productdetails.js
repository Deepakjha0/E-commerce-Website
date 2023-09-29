var idInLocalStorage = localStorage.getItem("id")
var sectionElement = document.getElementById("product-wrapper")
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+idInLocalStorage, function(response){
    
    sectionElement.innerHTML +=` <div class="product-wrapper" id="Wrapper">
    <div id="product-image">
        <div id="image-wrapper">
            <img id="product-preview"  src="${response.preview}" >
        </div>
        </div>
        <div id="product-details">
        <h1 id="product-title">${response.name}</h1>
        <h1 id="product-brand">${response.brand}</h1>
        <h4 class="section-heading">Price: Rs 
            <p id="product-price">${response.price}</p>
        </h4>
        <h4 class="section-heading">Description</h4>
        <p id="description">${response.description}</p>
        <h4 class="section-heading">Product Preview</h4>
            <div id ="product-images">

             </div>   
         <button id="btn-add-to-cart" onclick = "addToCart()">Add to Cart</button>
        </div> 
 </div>`
var productImages = document.getElementById("product-images");
for(var i = 0; i < response.photos.length ; i++){
    if(i==0){
        productImages.innerHTML += `
    <img src=${response.photos[i]} class="active-image" onclick=smallImageClicked(${i}) id="activeImage${i}"/>`
    }else{
        productImages.innerHTML += `
    <img src=${response.photos[i]} )  onclick=smallImageClicked(${i}) id="activeImage${i}"/>`
    }
    
}
})
function smallImageClicked(id){
    $(".active-image").removeClass("active-image");
    $("#activeImage"+id).addClass("active-image");
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+idInLocalStorage,function(response){
    var bigImage = document.getElementById("image-wrapper")
    bigImage.innerHTML =`
    <img id="product-preview" src=${response.photos[id]} />
    `
})
}

var count = JSON.parse(localStorage.getItem("cartitemscount"))
var cartCount = document.getElementById("cart-count")
if(count == null){
    var countInitial = 0
    count = localStorage.setItem("cartitemscount",JSON.stringify(countInitial))
    cartCount.textContent = countInitial;
}

function addToCart(){
    count = JSON.parse(localStorage.getItem("cartitemscount"))
    count  +=  1
    localStorage.setItem("cartitemscount",JSON.stringify(count))
    cartCount.textContent = JSON.parse(localStorage.getItem("cartitemscount"));


    // Creating an array to push ids and prices of the product
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+idInLocalStorage,function(response){
        var itemsAddedToCart = JSON.parse(localStorage.getItem("itemsAddedToCart"))
        var idOfTheProductAddedTotheCart = response.id
        var obj = {
            id:idOfTheProductAddedTotheCart
        }
        if(itemsAddedToCart==null){
            var idArray = []
            idArray.push(obj)
            localStorage.setItem("itemsAddedToCart",JSON.stringify(idArray))
        }else{
            itemsAddedToCart.push(obj);
            localStorage.setItem("itemsAddedToCart",JSON.stringify(itemsAddedToCart))   
        }
    })

}

cartCount.textContent = JSON.parse(localStorage.getItem("cartitemscount"));