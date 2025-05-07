const areas: { [key: number]: string } = {
    1: "Medicina",
    2: "Veterinária, Odontologia, Zootecnia",
    3: "Ciências Exatas e da Terra",
    4: "Ciências Biológicas",
    5: "Engenharias",
    6: "Tecnólogos",
    7: "Nutrição, Farmácia",
    8: "Ciências Agrárias",
    9: "Ciências Exatas – Computação",
    10: "Ciências Exatas – Matemática e Estatística",
    11: "Arquitetura/Urbanismo",
    12: "Artes",
    13: "Música",
    14: "Enfermagem, Fisioterapia, Fonoaudiologia e Educação Física",
    15: "Ciências Sociais Aplicadas",
    16: "Direito",
    17: "Linguística e Letras",
    18: "Ciências Humanas",
    19: "Psicologia",
    20: "Formação de Professor"
};
  
export const mapArea = (area: number | null): string => {
    return areas[area ?? -1] || "Sem registro";
};