export const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
};
  


export const formatExpiryDate = (value) => {

    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.slice(0, 4);
  
   
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + " / " + formattedValue.slice(2);
    } else {
      return formattedValue;
    }
};
  