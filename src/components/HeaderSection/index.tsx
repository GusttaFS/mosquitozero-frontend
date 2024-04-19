import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import styles from './styles.module.scss';

export function HeaderSection({ handleInputChange, isEditing, formData, setFormData }) {
    const imovelOptions = [
        { "value": "Residencial", "label": "Residencial" },
        { "value": "Comercial", "label": "Comercial" },
        { "value": "Terreno Baldio", "label": "Terreno Baldio" },
        { "value": "Ponto Estrategico", "label": "Ponto Estrategico" },
        { "value": "Outro", "label": "Outro" },
    ];

    const visitaOptions = [
        { "value": "Normal", "label": "Normal" },
        { "value": "Recuperação", "label": "Recuperação" },
    ];

    const pendenciaOptions = [
        { "value": "Recusado", "label": "Recusado" },
        { "value": "Fechado", "label": "Fechado" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Input
                    label="N° do Quart."
                    name={"quarteirao"}
                    type="text"
                    value={formData.quarteirao}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Lado"}
                    name={"lado"}
                    type="text"
                    value={formData.lado}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>
            <Input
                label={"Logradouro"}
                name={"logradouro"}
                type="text"
                value={formData.logradouro}
                onChange={handleInputChange}
                labelColor={"black"}
                disabled={!isEditing}
            />
            <div className={styles.row}>
                <Input
                    label={"Número"}
                    name={"numero"}
                    value={formData.numero}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Compl."}
                    name={"complemento"}
                    value={formData.complemento}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.row}>
                <Input
                    label={"Horário de entrada"}
                    name="horario"
                    type="time"
                    value={formData.horario}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Select
                    label={"Tipo do Imóvel"}
                    options={imovelOptions}
                    value={formData.imovel}
                    onChange={(o) => setFormData({ ...formData, imovel: o })}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.row}>
                <Select
                    label={"Visita"}
                    options={visitaOptions}
                    value={formData.visita}
                    onChange={(o) => setFormData({ ...formData, visita: o })}
                    disabled={!isEditing}
                />
                <Select
                    label={"Pendência"}
                    options={pendenciaOptions}
                    value={formData.pendencia}
                    onChange={(o) => setFormData({ ...formData, pendencia: o })}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
}