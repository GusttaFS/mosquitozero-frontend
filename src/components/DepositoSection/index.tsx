import { Input } from '../ui/Input';
import styles from './styles.module.scss';

export function DepositoSection({ handleInputChange, isEditing, formData }) {
    const campos = [
        { label: "A1", name: "a1" },
        { label: "A2", name: "a2" },
        { label: "B", name: "b" },
        { label: "C", name: "c" },
        { label: "D1", name: "d1" },
        { label: "D2", name: "d2" },
        { label: "E", name: "e" }
    ];

    return (
        <div className={styles.container}>
            <p className={styles.title}>Nº de Depósitos Inspecionados</p>
            <div className={styles.row}>
                {campos.map((campo, index) => (
                    <Input
                        key={index}
                        label={campo.label}
                        name={campo.name}
                        type="number"
                        min={0}
                        max={99}
                        value={formData?.[campo.name]}
                        onChange={handleInputChange}
                        labelColor={"black"}
                        disabled={!isEditing}
                    />
                ))}
            </div>
            <div className={`${styles.row} ${styles.gap}`}>
                <Input
                    label={"Eliminado"}
                    name="eliminado"
                    type="number"
                    value={formData?.eliminado}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Imóveis Inspecionados (LI)"}
                    name="inspecionados"
                    type="number"
                    value={formData?.inspecionados}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
}