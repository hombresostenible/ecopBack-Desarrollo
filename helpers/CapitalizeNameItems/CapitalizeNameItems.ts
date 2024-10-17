export const CapitalizeNameItems = (text: string): string => {
    const exceptions = ["de", "la", "el", "y", "a", "o", "en", "con", "del", "al", "por", "para", "se", "un", "una"]; // Conjunciones y pronombres comunes
    return text
        .toLowerCase()
        .split(" ")
        .map((word, index) => {
            // Si la palabra es la primera, o no está en la lista de excepciones, capitalizarla
            if (index === 0 || !exceptions.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word; // Si está en las excepciones y no es la primera, mantener en minúsculas
        })
        .join(" ");
};