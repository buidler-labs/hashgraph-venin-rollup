export function encodeToHex(what: Uint8Array, addPrefix = true) {
  const unPrefixedHexEncoding = [...what]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

  return addPrefix ? `0x${unPrefixedHexEncoding}` : unPrefixedHexEncoding;
}

// Inspired from: https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09
export function decodeFromHex(hexString: string) {
  // remove the leading 0x
  hexString = hexString.replace(/^0x/, '');
  
  // ensure even number of characters
  if (hexString.length % 2 != 0) {
      console.log('WARNING: expecting an even number of characters in the hexString');
  }
  
  // check for some non-hex characters
  const bad = hexString.match(/[G-Z\s]/i);
  if (bad) {
      console.log('WARNING: found non-hex characters', bad);    
  }
  
  // split the string into pairs of octets
  let pairs = hexString.match(/[\dA-F]{2}/gi);
  
  // convert the octets to integers
  const integers = pairs!.map(function(s) {
      return parseInt(s, 16);
  });
  
  return new Uint8Array(integers);
}
