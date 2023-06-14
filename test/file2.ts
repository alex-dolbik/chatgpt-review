const currencySymbols: { [key: string]: string } = {
  $: 'USD',
  '€': 'EUR',
  '£': 'GBP',
};

function getCurrencyCode(symbol: string) {
  return currencySymbols[symbol] || 'USD';
}

function getMoneyString(amount: string | number, currency = '$', fractionDigits = 0) {
  if (!amount && amount !== 0) {
    return;
  }

  return (+amount).toLocaleString('en-US', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
    style: 'currency',
    currency: getCurrencyCode(currency),
  });
}

export { getMoneyString };