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
