// Cart Tab Open or Close
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close-btn');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

// Cart Tab Funtionality

// Cart Tab Remove Button
var removeCartItemsButtons = document.getElementsByClassName('btn-remove')
for (var i = 0; i < removeCartItemsButtons.length; i++){
    var button = removeCartItemsButtons[i]
    button.addEventListener('click', function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()
    })
}

// Cart Tab Uodate Price
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('listcart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value 
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

// Cart Quantity Input
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

// Cart Tab Add to Cart Function
var addToCartButton = document.getElementsByClassName('add-to-cart')
for (var i = 0; i < addToCartButton.length; i++){
    var button = addToCartButton[i]
    button.addEventListener('click', addToCartClicked)
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchaseClicked)

function purchaseClicked(){
    // alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('listcart')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Cart Tab Add Items
function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('listcart')[0]
    var cartItemsNames = cartItems.getElementsByClassName('name')
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
            <div class="item">
              <div class="image">
                <img src="${imageSrc}" alt="AIRMAXDN8">
              </div>
              <div class="name">
                ${title}
              </div>
              <div class="price">${price}</div>
              <div class="quantity">
                <input class="cart-quantity-input" type="number" value="1">
              </div>
              <button class="btn-remove">Remove</button>
              </div>
            </div>
            </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}