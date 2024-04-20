import { getHoraAtual } from '@/src/scripts/getHoraAtual';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
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
                    name={"data.quarteirao"}
                    type="text"
                    value={formData?.data?.quarteirao}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Lado"}
                    name={"data.lado"}
                    type="text"
                    value={formData?.data?.lado}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>
            <Input
                label={"Logradouro"}
                name={"data.logradouro"}
                type="text"
                value={formData?.data?.logradouro}
                onChange={handleInputChange}
                labelColor={"black"}
                disabled={!isEditing}
            />
            <div className={styles.row}>
                <Input
                    label={"Número"}
                    name={"data.numero"}
                    value={formData?.data?.numero}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Compl."}
                    name={"data.complemento"}
                    value={formData?.data?.complemento}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.row}>
                <Input
                    label={"Horário de entrada"}
                    name={"data.horario"}
                    type="time"
                    value={formData?.data?.horario}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                    onClick={() => setFormData({ ...formData, data: { ...formData.data, horario: getHoraAtual() } })}
                />
                <Select
                    label={"Tipo do Imóvel"}
                    options={imovelOptions}
                    value={formData?.data?.imovel}
                    onChange={(o) => setFormData({ ...formData, data: { ...formData.data, imovel: o } })}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.row}>
                <Select
                    label={"Visita"}
                    options={visitaOptions}
                    value={formData?.data?.visita}
                    onChange={(o) => setFormData({ ...formData, data: { ...formData.data, visita: o } })}
                    disabled={!isEditing}
                />
                <Select
                    label={"Pendência"}
                    options={pendenciaOptions}
                    value={formData?.data?.pendencia}
                    onChange={(o) => setFormData({ ...formData, data: { ...formData.data, pendencia: o } })}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
}