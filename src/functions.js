/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
// check storage and create global variable in case it needed.
const GST_TAX = 0.13
const DEFAULT_FRACTION_DIGITS = 2
const LOCALE = 'en-CA'

const MAX_FRACTION_DIGITS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

/**
 * Look up product in a cart and return an index
 * @param  {} cartProducts cart contains product line
 * @param  {} product product
 * @returns index of product in product cart
 */
export function findProductIndex (cartProducts, product) {
  var lineIndex = -1
  for (let i = 0; i < cartProducts.length; i++) {
    if (product._id === cartProducts[i].product._id) {
      lineIndex = i
      break
    }
  }
  return lineIndex
}
export function sumOfProducts (cartProducts) {
  var count = 0
  for (let i = 0; i < cartProducts.length; i++) {
    count += cartProducts[i].quantity
  }
  return count
}
/**
 * Use Add to cart fly effect with jQuery. - May 05, 2013
 * (c) 2013 @ElmahdiMahmoud - fikra-masri.by
 * license: https://www.opensource.org/licenses/mit-license.php
 * @param  {} parentId parentId of current element
 */
export function animateToShoppingCart (parentId) {
  var cart = $('.shopping-cart')
  var imgtodrag = $(parentId).find('img').eq(0)
  if (imgtodrag && imgtodrag.length > 0) { // if find image
    var imgclone = imgtodrag.clone()
      .offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      })
      .css({
        'opacity': '0.5',
        'position': 'absolute',
        'z-index': '100',
        'width': imgtodrag.width(),
        'height': imgtodrag.height()
      })
      .appendTo($('body'))
      .animate({
        'top': cart.offset().top + 10,
        'left': cart.offset().left + 10,
        'width': 20,
        'height': 22
      }, 600, 'easeInOutExpo')

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(imgclone).detach()
    })
  }
}
/**
 * Merge object using jQuery extends
 * @param  {} defaultObject object to be extended
 * @param  {} extra extra properties
 */
export function mergeObject (defaultObject, extra) {
  return $.extend({}, defaultObject, extra)
}
/**
 * Round the number by fraction digits
 * @param  {} number number to be rounded
 * @param  {} fractionDigits digits for rounding, default is 2.
 */
export function getRound (number, fractionDigits) {
  var fragDigits = Math.pow(10, fractionDigits | DEFAULT_FRACTION_DIGITS)
  return Math.floor(number * fragDigits) / fragDigits
}
export function calculateOrderSummary (purchaseOrder) {
  var subTotal = 0
  var shippingCost = 0
  let cartProducts = purchaseOrder.cartProducts
  purchaseOrder.hasItem = cartProducts.length > 0
  for (var i = 0; i < cartProducts.length; i++) {
    let p = cartProducts[i]
    subTotal += p.product.price * p.quantity
    shippingCost += p.product.shippingCost
  }
  let tax = getRound((subTotal + shippingCost) * GST_TAX)
  let total = getRound(subTotal + shippingCost + tax)
  purchaseOrder.subTotal = subTotal
  purchaseOrder.subTotalString = subTotal.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  purchaseOrder.shippingCost = shippingCost
  purchaseOrder.shippingCostString = shippingCost.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  purchaseOrder.tax = tax
  purchaseOrder.taxString = tax.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
  purchaseOrder.total = total
  purchaseOrder.totalString = total.toLocaleString(LOCALE, MAX_FRACTION_DIGITS)
}
export default {
  findProductIndex,
  animateToShoppingCart,
  mergeObject,
  getRound,
  sumOfProducts,
  calculateOrderSummary
}
