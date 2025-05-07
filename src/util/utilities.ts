export const initCap = (str: string): string => {
    if (!str) {
      return "";
    }
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  }