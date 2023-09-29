var owl = $('.owl-carousel');
owl.owlCarousel({
    items:1, 
  // items change number for slider display on desktop
  
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true
});
     var clothingGridElement = document.getElementById("clothing-grid");
     var accessoryGridElement = document.getElementById("accessory-grid");
     var productCardElement = document.getElementsByClassName("product-card") 

    

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
      for( i = 0; i<response.length; i++){
        if(response[i].isAccessory == false){
        clothingGridElement.innerHTML +=` <div onclick ="cardClickedFunction(${response[i].id})" class="product-card" id = ${response[i].id}>
        <a href ="productdetails.html?id=${response[i].id} ">
           <img class="product-image" src="${response[i].preview} " alt="Shirt"></a>
           <div class="product-meta">
               <h4>${response[i].name} </h4>
               <h5>${response[i].brand}</h5>
               <p>${response[i].price} </p>
            </div>
     </div> `
      }
      else{
        accessoryGridElement.innerHTML +=`<div onclick = "cardClickedFunction(${i+1})" class="product-card">
        <a href="productdetails.html?id=${response[i].id} ">
           <img class="product-image" src="${response[i].preview} " alt="Shirt"></a>
           <div class="product-meta">
               <h4>${response[i].name} </h4>
               <h5>${response[i].brand}</h5>
               <p>${response[i].price} </p>
            </div>
     </div>`
      }
    }
  })

  function cardClickedFunction(id){
    localStorage.setItem("id",id)
  }

var count = JSON.parse(localStorage.getItem("cartitemscount"))
if(count == null){
    cartCount.textContent = 0;
}
var cartCount = document.getElementById("cart-count")
cartCount.textContent = count;