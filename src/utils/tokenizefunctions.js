export const TokenizarStringEmIntervalos = (str) => {
    const tokens = str.split(','); // Dividir a string pelos separadores de vírgula
    let intervalos = [];

    tokens.forEach((token) => {
        if (token.includes('-')) {
        // Se o token contiver '-', trata-se de um intervalo de números
        const [inicio, fim] = token.split('-').map(Number);
        intervalos.push({ inicio, fim });
        } else {
        // Caso contrário, o token é um número simples
        const numero = Number(token);
        intervalos.push({ inicio: numero, fim: numero });
        }
    });

    return intervalos;
}

export const TokenizaConverterParaKg = (str) => {
    const partes = str.split(' '); // Dividir a string em partes separadas pelo espaço
    const valor = Number(partes[0]); // Extrair o valor numérico
  
    if (partes[1] && partes[1].toLowerCase() === 'g') {
      // Se a segunda parte for 'g', converter para Kg
      return valor / 1000;
    } else {
      // Caso contrário, assumir que já está em Kg
      return valor;
    }
  }
