/**
 * 2022.04.06
 * LYJ
 * AES encryption/decription
 * **/

import CryptoJS from 'crypto-js'
let key = 'iljoogns004134112345678123456789'
key = CryptoJS.enc.Utf8.parse(key)

let iv = 'iljoogns12345678'
iv = CryptoJS.enc.Utf8.parse(iv)

export function AesEncrypt(targetString) {
  return CryptoJS.AES.encrypt(targetString, key, { iv: iv }).toString()
}

export function AesDecrypt(targetString) {
  return CryptoJS.AES.decrypt(targetString, key, { iv: iv }).toString(CryptoJS.enc.Utf8)
}
