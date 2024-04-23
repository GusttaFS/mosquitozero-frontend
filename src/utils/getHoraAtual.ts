export function getHoraAtual() {
        const agora = new Date();
        const horaAtual = agora.getHours();
        const minutoAtual = agora.getMinutes();
        const horaFormatada = horaAtual.toString().padStart(2, '0');
        const minutoFormatado = minutoAtual.toString().padStart(2, '0');
        return horaFormatada + ":" + minutoFormatado;
}