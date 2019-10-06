// main index javascript file
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
var session
if (!typeof (Storage) !== 'undefined') { // eslint-disable-line
  // declare a variable replace session variable
  session = {}
} else {
  session = sessionStorage
}
session.test = 'abc'

function removeItem (index) { // eslint-disable-line
  if (session.purchaseOrder) {
    session.purchaseOrder.cartProducts.splice(index, 1)
    window.location = '#/buy?abcdefghijklmh'
    return true
  }
}
function addToCart(elementId, parentId, qtyElement) { // eslint-disable-line
  if (parentId) animateToShoppingCart(parentId)
  if (!session.purchaseOrder) {
    let cartProducts = []
    session.purchaseOrder = {
      cartProducts: cartProducts,
      subTotal: 0.00,
      shippingCost: 0.00,
      tax: 0.00,
      total: 0.00
    }
  }
  let idOfProduct = $(elementId).val()
  let product = session.products[idOfProduct]
  let lineIndex = findProductIndex(session.purchaseOrder.cartProducts, product)
  let qty = qtyElement ? parseInt($(qtyElement).val()) : 1
  let cartProducts = session.purchaseOrder.cartProducts
  if (lineIndex >= 0) {
    cartProducts[lineIndex].quantity += qty
  } else {
    cartProducts.push({
      product: product,
      quantity: qty
    })
  }
  $('#itemsInCart').text(getCountProduct(session.purchaseOrder.cartProducts).toString())
}

/**
 * Return count of product quantities in cart
 * @param  {} cartProducts products in cart
 * @return count of product quantities
 */
function getCountProduct (cartProducts) {
  var count = 0
  return cartProducts.reduce((accumulator, p) => accumulator + p.quantity, count)
}

function changeCartInfo(idOfProduct, quantityElement) { // eslint-disable-line
  let product = session.products[idOfProduct]
  var lineIndex = findProductIndex(session.purchaseOrder.cartProducts, product)
  session.purchaseOrder.cartProducts[lineIndex].quantity = parseInt($(quantityElement).val())
  calculateOrderSummary(session.purchaseOrder)
  // update cart summary
  $('#subTotal').html(session.purchaseOrder.subTotalString)
  $('#shippingCost').html(session.purchaseOrder.shippingCostString)
  $('#tax').html(session.purchaseOrder.taxString)
  $('#total').html(session.purchaseOrder.totalString)
}

function mergeSessionTo (productData) {
  var data = mergeObject(productData, { isLoggedIn: session.isLoggedIn ? session.isLoggedIn : false })
  return mergeObject(data, { user: session.user })
}

function calculateOrderSummary (purchaseOrder) {
  var subTotal = 0
  var shippingCost = 0
  let cartProducts = session.purchaseOrder.cartProducts
  purchaseOrder.hasItem = cartProducts.length > 0
  for (var i = 0; i < session.purchaseOrder.cartProducts.length; i++) {
    let p = session.purchaseOrder.cartProducts[i]
    subTotal += p.product.price * p.quantity
    shippingCost += p.product.shippingCost
  }
  let tax = getRound((subTotal + shippingCost) * GST_TAX)
  let total = getRound(subTotal + shippingCost + tax)
  session.purchaseOrder.subTotal = subTotal
  session.purchaseOrder.subTotalString = subTotal.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  session.purchaseOrder.shippingCost = shippingCost
  session.purchaseOrder.shippingCostString = shippingCost.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  session.purchaseOrder.tax = tax
  session.purchaseOrder.taxString = tax.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  session.purchaseOrder.total = total
  session.purchaseOrder.totalString = total.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
}

function buyNow (elementId, qtyElement) { // eslint-disable-line
  addToCart(elementId, null, qtyElement)
  window.location = '#/buy'
}
