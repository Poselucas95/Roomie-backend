
const capitalizeLetters = (string) => {
   return string.toLowerCase().replace(/(^|\s)([a-z])/g, l => l.toUpperCase())
}

function capitalizeFirstLetter(string) {
    aux = string.toLowerCase()
    return aux.charAt(0).toUpperCase() + aux.slice(1);
  }


module.exports = {capitalizeLetters, capitalizeFirstLetter}