// JavaScript Document

/*
$(document).ready(function(){
  alert("Hi!")
});
*/

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 *
 * @param {String} address the given HEX address
 *
 * @param {Number} chainId to define checksum behavior
 *
 * @returns {Boolean}
 */
const isAddress = (address, chainId = null) => {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
      // If it's ALL lowercase or ALL upppercase
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      return true;
      // Otherwise check each case
  } else {
      return checkAddressChecksum(address, chainId);
  }
};

/**
* Removes prefix from address if exists.
*
* @method stripHexPrefix
*
* @param {string} string
*
* @returns {string} address without prefix
*/
const stripHexPrefix = (string) => {
  return string.startsWith('0x') || string.startsWith('0X') ? string.slice(2) : string;
};

/**
* Checks if the given string is a checksummed address
*
* @method checkAddressChecksum
*
* @param {String} address the given HEX address
*
* @param {number} chain where checksummed address should be valid.
*
* @returns {Boolean}
*/
const checkAddressChecksum = (address, chainId = null) => {
  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = chainId != null ? chainId.toString() + '0x' : '';
  const keccakHash = Hash.keccak256(prefix + stripAddress)
      .toString('hex')
      .replace(/^0x/i, '');

  for (let i = 0; i < stripAddress.length; i++) {
      let output = parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
      if (stripHexPrefix(address)[i] !== output) {
          return false;
      }
  }
  return true;
};

async function connectwallet() {

	
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      alert(error.message);
      return error
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts
  } else {
     alert("Please install MetaMask");
  }
  return ''
}


async function WalletConnect(){
    let walled_id = await connectwallet()
    if(isAddress(walled_id)) {
      $("div.HideMe").hide();
    }
};