import styles from './styles.module.scss';

export function TagCompleted() {
    return (
        <span className={styles.completedTag}>
            Concluída
        </span>
    );
}

export function TagPending() {
    return (
        <span className={styles.pendingTag}>
            Pendente
        </span>
    );
}