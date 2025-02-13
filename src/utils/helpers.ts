export const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("de", { style: "currency", currency: "EUR" }).format(
        value
    );