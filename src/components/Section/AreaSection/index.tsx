import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import styles from './styles.module.scss';


export function AreaSection({ handleInputChange, formData, setFormData }) {
    const tipoOptions = [
        { "value": "Sede", "label": "Sede" },
        { "value": "Outros", "label": "Outros" },
    ];

    const atividadeOptions = [
        { "value": "LI", "label": "LI-Levantamento de índice" },
        { "value": "LI+T", "label": "LI+T-Levantamento de índice + Tratamento" },
        { "value": "PE", "label": "PE-Ponto Estratégico" },
        { "value": "T", "label": "T-Tratamento" },
        { "value": "DF", "label": "DF-Delimitação de Foco" },
        { "value": "PVE", "label": "PVE-Pesquisa Vetorial Especial" },
    ];

    return (
        <div className={styles.container}>
            <Select
                label={"Atividade:"}
                options={atividadeOptions}
                value={formData?.data?.atividade}
                onChange={(o) => setFormData({
                    ...formData,
                    data: {
                        ...formData.data,
                        atividade: o
                    }
                })}
                disabled={false}
                labelColor={"black"}
            />

            <Input
                label="Nome da localidade:"
                name={"data.nome_localidade"}
                type="text"
                value={formData?.data?.nome_localidade}
                onChange={handleInputChange}
                labelColor={"black"}
            />

            <div className={styles.row}>
                <Input
                    label={"Código:"}
                    name={"data.cdg_localidade"}
                    type="text"
                    value={formData?.data?.cdg_localidade}
                    onChange={handleInputChange}
                    labelColor={"black"}
                />
                <Input
                    label={"Categ. localid.:"}
                    name={"data.catg_localidae"}
                    type="text"
                    value={formData?.data?.catg_localidae}
                    onChange={handleInputChange}
                    labelColor={"black"}
                />
            </div>

            <Input
                label={"Município: "}
                name={"data.municipio"}
                type="text"
                value={formData?.data?.municipio}
                onChange={handleInputChange}
                labelColor={"black"}
            />

            <div className={styles.row}>
                <Input
                    label={"Zona"}
                    name={"data.zona"}
                    type="text"
                    value={formData?.data?.zona}
                    onChange={handleInputChange}
                    labelColor={"black"}
                />
                <Select
                    label={"Tipo:"}
                    options={tipoOptions}
                    value={formData?.data?.tipo}
                    onChange={(o) => setFormData({
                        ...formData,
                        data: {
                            ...formData.data,
                            tipo: o
                        }
                    })}
                    disabled={false}
                    labelColor={"black"}
                />
            </div>
        </div>
    );
}