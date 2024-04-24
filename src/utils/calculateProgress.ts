
type VisitationAreas = VisitationArea[];

type VisitationArea = {
    completed_visitations: number;
    num_visitations: number;
}

export function calculateProgress(current: number, total: number): number {
    if (current > 0 && total > 0 && current <= total) {
        const progress = (current / total) * 100;
        return parseFloat(progress.toFixed(1));
    } return 0;
}


export function calculateAreasProgress(visitationAreas: VisitationAreas): number {
    const areas = visitationAreas.length;
    if (areas > 0) {
        let totalProgress = 0;
        visitationAreas.forEach((area: VisitationArea) => {
            const areaProgress = calculateProgress(area.completed_visitations, area.num_visitations);
            totalProgress += areaProgress;
        });
        const averageProgress = totalProgress / areas;
        return parseFloat(averageProgress.toFixed(1));
    } return 0;
}