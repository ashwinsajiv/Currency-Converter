/**
 *
 * @param currencyList
 * @param currencyId
 * @param number
 * @returns {string}
 */
export function displayCurrency({
  currencyList = [],
  currencyId = "EUR",
  number = 0
}) {
  const displayedCurrency = currencyName({ currencyList, currencyId });
  const formatting = new Intl.NumberFormat("de-DE").format(number);

  return `${formatting} ${displayedCurrency}`;
}

/**
 *
 * @param currencyList
 * @param currencyId
 * @returns {*}
 */
export function currencyName({ currencyList = [], currencyId = "EUR" }) {
  return currencyList.find(currency => currency.id === currencyId).currencyName;
}

/**
 *
 * @param amount
 * @param data
 * @param mode
 * @returns {number}
 */
export function convert({ amount = 0, state = {}, mode ='from' }) {
  const rate = Object.values(state.data)[0];
  let result;

  if (mode === "from") {
    result = amount * rate;
  }
  if (mode === "to") {
    result = amount * (1 / rate);
  }

  return Math.round(result * 1000) / 1000;
}

export function formatDate(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = yyyy+'-'+mm+'-'+dd;
  return date
}

export function last7Dates() {
  var result = [];
    var d = new Date();
    d.setDate(d.getDate());
    result.push(formatDate(d))
    d.setDate(d.getDate());
    
    d.setDate(d.getDate()-6);
    result.push(formatDate(d))
  return result;
}
