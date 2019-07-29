// @flow

/**
 * @typedef {Object} Product
 * @property {string} title - Title of the product
 * @property {string} productID - ID of the product
 * @property {string?} description - Text description of the product
 * @property {string?} imageURI - A URL to the product's image
 * @property {string} price - A localized string representing the product's pirce in the local currency, e.g. "$1"
 * @property {string} priceCurrencyCode - A string representing which currency is the price calculated in, following [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
 */
export type Product = {
  title: string,
  productID: string,
  description: ?string,
  imageURI: ?string,
  price: string,
  priceCurrencyCode: string
};

/**
 * @typedef {Object} PurchaseConfig
 * @property {string} productID - ID of the product
 * @property {string?} developerPayload - An optional payload can be assigned by game developer, which will be attached in the signed purchase request
 */
export type PurchaseConfig = {
  productID: string,
  developerPayload: ?string
};

/**
 * @typedef {Object} Purchase
 * @property {string?} developerPayload - An optional payload can be assigned by game developer, which will be attached in the signed purchase request
 * @property {string} paymentID - ID of the payment
 * @property {string} productID - ID of the purchased product
 * @property {number} purchaseTime - A UNIX timestamp representing the time purchase is made
 * @property {number} purchaseToken - A token used for consuming the purchase
 * @property {SignedPurchaseRequest} signedRequest - A signed request of this purchase
 */
export type Purchase = {
  developerPayload: ?string,
  paymentID: string,
  productID: string,
  purchaseTime: number,
  purchaseToken: string,
  signedRequest: SignedPurchaseRequest
};

/**
 * @typedef {string} SignedPurchaseRequest
 * @description On your game server, please validate this signature 
 * by the following steps:
 *
 * 1. Split the signature into two parts delimited by the `.` character.
 * 2. Decode the first part with base64url encoding.
 * 3. Decode the second part with base64url encoding, which should be a
 *    string representation of an JSON object with fields below:
 *
 *    - algorithm - Always `HMAC-SHA256`
      - is_consumed - Representing the consumption state of the purchase
 *    - issued_at - A UNIX timestamp representing the time signature
 *      is issued
 *    - payment_id - ID of the payment
 *    - product_id - ID of the purchased product
 *    - purchase_time - A UNIX timestamp representing the time purchase is made
 *    - purchase_token - A token used for consuming the purchase
 *
 * 4. Hash the second part string using HMAC SHA-256 and your app
 *    secret, check if it is identical to the first part string.
 * 5. You may also wish to validate the timestamp to see if the request was
 *    made recently.
 */
export type SignedPurchaseRequest = string;
