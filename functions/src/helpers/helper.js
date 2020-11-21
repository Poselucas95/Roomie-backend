/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */

const capitalizeLetters = (string) => {
    if(string && string != null){
      return string.toLowerCase().replace(/(^|\s)([a-z])/g, l => l.toUpperCase())      
    }
    return ""
}

function capitalizeFirstLetter(string) {
    if(string && string != null){
      aux = string.toLowerCase()
      return aux.charAt(0).toUpperCase() + aux.slice(1);
    }
    return ""
  }


module.exports = {capitalizeLetters, capitalizeFirstLetter}