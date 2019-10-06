/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/**
 * Fetch wrapper function.
 * @param  {} path path of REST API
 * @param  {} method word of REST API
 * @param  {} data data need to be sent.
 */
const BASE_URL = 'http://localhost:4000'
export async function doFetch(path, method, data) { // eslint-disable-line
  var requestJSON = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer'
  }
  if (data) {
    requestJSON.body = JSON.stringify(data)
    if (data.jwt) {
      requestJSON.headers.Authorization = 'Bearer ' + data.jwt
    }
  }
  let urlPath = BASE_URL + path; 
  const response = await fetch(urlPath, requestJSON)
  const result = await response.text()
  let parsedJSON = JSON.parse(result)
  return parsedJSON
}

/**
 * Async function use to change password.
 * @param  {} passwordData password data.
 */
export async function changePassword (body) {
  return doFetch('/changePassword', 'POST', body)
}
/**
 * Async function update user information
 * @param  {} user user information
 */
export async function updateUserInformation (body) {
  return doFetch('/updateUser', 'POST', body)
}
/**
 * Async function to post comment with body
 * @param  {} body body
 */
export async function postComment (body, uploadingFile) {
  var result = await fetch('/commentProduct', createParameter('POST', body))
  let response = await result.text()
  var res = JSON.parse(response)
  if (res.saved === 200 && uploadingFile) {
    let formData = new FormData()
    formData.append('file', uploadingFile)
    let result = await fetch('/upload/comment/' + res.commentId, {
      method: 'POST',
      body: formData
    })
    let resp = await result.text()
    let response = JSON.parse(resp)
    return response
  } else {
    return res
  }
}

export function createParameter (method, body) {
  let param =  {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(body)
  }
  if (body.jwt) {
    param.headers.Authorization = 'Bearer ' + body.jwt
  }
  return param;
}
export async function fetchProductDetail (product) {
  return doFetch('/product/' + product._id, 'GET')
}
export async function fetchProducts () {
  return doFetch('/products', 'GET')
}

export async function logoutUser (user) {
  var body = { user: user }
  return doFetch('/logout', 'POST', body)
}

export async function loginUser (user) {
  var body = { user: user }
  return doFetch('/login', 'POST', body)
}

export async function registerUser (user) {
  var body = { user: user }
  return doFetch('/register', 'POST', body)
}
/**
 * Send purchase order to server.
 */
export async function sendPurchaseOrder (body) {
  return doFetch('/order', 'POST', body)
}

export default {
  doFetch,
  changePassword,
  updateUserInformation,
  postComment,
  createParameter,
  fetchProductDetail,
  fetchProducts,
  logoutUser,
  loginUser,
  registerUser,
  sendPurchaseOrder
}
