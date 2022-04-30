if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    let removeItemBtn = document.getElementsByClassName('btn-remove')
    for (let i = 0; i < removeItemBtn.length; i++) {
        let button = removeItemBtn[i]
        button.addEventListener('click', removeItems)
    }

    let ItemsNumber = document.getElementsByClassName('cart-enter-number')
    for (let i = 0; i < ItemsNumber.length; i++) {
        let input = ItemsNumber[i]
        input.addEventListener('change', changeQuantity)
    }

    let addToCartButtons = document.getElementsByClassName('btn-add')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', btnAddToCart)
    }

    document.getElementsByClassName('btn-shop')[0].addEventListener('click', shopClicked)
}

function removeItems(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    cartTotal()
}

function changeQuantity(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    cartTotal()
}

function btnAddToCart(event) {
    let button = event.target
    let shopLego = button.parentElement.parentElement
    let title = shopLego.getElementsByClassName('Lego-title')[0].innerText
    let price = shopLego.getElementsByClassName('Lego-price')[0].innerText
    let image = shopLego.getElementsByClassName('Lego-image')[0].src
    addToCart(title, price, image)
    cartTotal()
}

function shopClicked() {
    alert('Thank you')
    let cartLego = document.getElementsByClassName('cart-lego')[0]
    while (cartLego.hasChildNodes()) {
        cartLego.removeChild(cartLego.firstChild)
    }
    cartTotal()
}

function addToCart(title, price, image) {

    let cartShape= document.createElement('div')
    cartShape.classList.add('cart-content')
    let cartLego = document.getElementsByClassName('cart-lego')[0]
    let cartItemNames = cartLego.getElementsByClassName('Lego-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    let cartShapeContent = 
        `
        <div class="cart-item cart-column">
            <img class="Lego-image" src="${image}" width="100" height="100">
            <span class="Lego-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-enter-number" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>
        `
    cartShape.innerHTML = cartShapeContent

    cartLego.append(cartShape)
    cartShape.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItems)
    cartShape.getElementsByClassName('cart-enter-number')[0].addEventListener('change', changeQuantity)
}

function cartTotal() {

    let cartItemContainer = document.getElementsByClassName('cart-lego')[0]
    let cartShapes = cartItemContainer.getElementsByClassName('cart-content')
    let total = 0

    for (let i = 0; i < cartShapes.length; i++) {
        let cartShape = cartShapes[i]
        let shapeLegoPrice = cartShape.getElementsByClassName('cart-price')[0]
        let shapeLegoQuantity = cartShape.getElementsByClassName('cart-enter-number')[0]
        let price = parseFloat(shapeLegoPrice.innerText.replace('£', ''))
        let quantity = shapeLegoQuantity.value
        total = total + (price * quantity)
    }

    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}
