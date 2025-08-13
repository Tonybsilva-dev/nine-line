/**
 * Formata números de forma consistente entre servidor e cliente
 * para evitar erros de hidratação
 */

export function formatNumber(value: number): string {
  // Usar formatação consistente para servidor e cliente
  // Para evitar problemas de hidratação, sempre usar ponto como separador de milhares
  const parts = value.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Adicionar separadores de milhares
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (decimalPart) {
    return `${formattedInteger},${decimalPart}`;
  }

  return formattedInteger;
}

export function formatCurrency(value: number): string {
  const formatted = formatNumber(value);
  return `R$ ${formatted}`;
}
