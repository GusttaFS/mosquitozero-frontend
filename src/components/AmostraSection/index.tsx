import { Input } from '../ui/Input';
import styles from './styles.module.scss';

export function AmostraSection({ handleInputChange, isEditing, formData }) {

    return (
        <div className={styles.container}>
            <p className={styles.title}>Coleta amostra</p>
            <div className={styles.column}>
                <div className={styles.amostra}>
                    <p className={styles.subtitle}>N° da amostra</p>
                    <div className={styles.row}>
                        <Input
                            label={"Inicial"}
                            name="amostra.inicial"
                            type="text"
                            value={formData?.amostra?.inicial}
                            onChange={handleInputChange}
                            labelColor={"black"}
                            disabled={!isEditing}
                        />
                        <Input
                            label={"Final"}
                            name="amostra.final"
                            type="text"
                            value={formData?.amostra?.final}
                            onChange={handleInputChange}
                            labelColor={"black"}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <Input
                    label={"Qtde tubitos"}
                    name="amostra.tubitos"
                    type="number"
                    value={formData?.amostra?.tubitos}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
}