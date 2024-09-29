
const MoneyFormatter = (value: number) => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return formatter.format(value)
};

export default MoneyFormatter;