var count = JSON.parse(localStorage.getItem("cartitemscount"))
var cartCount = document.getElementById("cart-count")
if(count == null || count == 0){
    cartCount.textContent = 0;  
}else{
    cartCount.textContent = count;
}

var arrayOfProductIdAndPrice = JSON.parse(localStorage.getItem("itemsAddedToCart"))
console.log(arrayOfProductIdAndPrice)
var cartList = document.getElementById("card-list")
var totalItemsCount = document.getElementById("item-count")

var arrayOfIds = []
for(var k=0 ; k < arrayOfProductIdAndPrice.length;k++){
    arrayOfIds.push(arrayOfProductIdAndPrice[k].id)
}
var arrayOfIds = arrayOfIds
console.log(arrayOfIds)

var arrayOfIdsNotSimilar = []
for(var j = 0 ; j < arrayOfIds.length ; j++){
    var isInclude = false
    if(arrayOfIdsNotSimilar.includes(arrayOfIds[j])){
        isInclude = true
    }
    if(!(isInclude)){
        arrayOfIdsNotSimilar.push(arrayOfIds[j])
    }
}
console.log(arrayOfIdsNotSimilar)
totalItemsCount.textContent = arrayOfIdsNotSimilar.length

var countOfProducts = []
for(var l =0 ; l < arrayOfIdsNotSimilar.length ; l++){
    var countOfProduct = 0
    for(var j = 0 ; j< arrayOfIds.length;j++){
        if(arrayOfIdsNotSimilar[l] == arrayOfIds[j]){
            countOfProduct+=1
        }
    }
    countOfProducts.push(countOfProduct)
}
console.log(countOfProducts)

var totalAmount = document.getElementById("total-amount")
var totalprice = 0

for(i=0; i < arrayOfProductIdAndPrice.length; i++){
    $.ajax({
        url:"https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+arrayOfIdsNotSimilar[i],
        type:'Get',
        async:false,
        success:function(data){
            cartList.innerHTML+=`
            <div id="checkout-card">
            <div>
              <img
                class="checkout-product-img"
                src="${data.preview} "
                alt=""
              />
            </div>
            <div>
              <h4>${data.name} </h4>
              <p>x${countOfProducts[i]}</p>
              <p>
                <span>Amount: Rs</span>
                <span>${data.price}</span>
              </p>
            </div>
          </div>`
        totalprice+=(data.price)*parseInt(countOfProducts[i])
        totalAmount.textContent = totalprice
        },
        error:function(error){
            //Handling error here
        }
    })
}

var hrefChangeLinkElement = document.getElementById("hrefChangeLink")
function placeOrder(){ 
    if(totalItemsCount.textContent == 0){
        alert("You don't have in your cart.Please add items to your cart")
        $("#hrefChangeLink").attr("href","index.html")
    }else{
        $("#hrefChangeLink").attr("href","orderplace.html")
        localStorage.removeItem("itemsAddedToCart")
        localStorage.removeItem("cartitemscount")
        localStorage.removeItem("id")
    } 
    
}