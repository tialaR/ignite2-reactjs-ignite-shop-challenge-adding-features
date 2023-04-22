function formatValueToCurrencyInReal(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value ? value : 0);
}

export { 
    formatValueToCurrencyInReal,
 }