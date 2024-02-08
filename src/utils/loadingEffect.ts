export const startLoadingEffect = () => {
  let counter = 1;
  return setInterval(() => {
    process.stdout.clearLine(0); // Limpa a linha anterior
    process.stdout.cursorTo(0); // Move o cursor para a coluna 0
    process.stdout.write(`Trying to connect to database${".".repeat(counter)}`);
    counter = (counter % 4) + 1; // Alternando entre 1, 2 e 3 para controlar a quantidade de pontos
  }, 500); // Intervalo de tempo em milissegundos
};

export const stopLoadingEffect = (interval: NodeJS.Timeout) => {
  clearInterval(interval);
  process.stdout.write("\n"); // Nova linha após a conclusão do carregamento
};
