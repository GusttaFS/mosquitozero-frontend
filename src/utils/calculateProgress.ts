
export function calculateProgress(current: number, total: number): number {
    if (current > 0 && total > 0 && current <= total) {
        console.log(current); console.log(total)
        const progress = (current / total) * 100;
        return parseFloat(progress.toFixed(1));
    } return 0;
}