export const initCap = (str: string): string => {
    if (!str) {
      return "";
    }
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  }

export function formatarNome(texto: string): string {
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}

export const round2 = (valor: number) =>
  Math.round(valor * 100) / 100;