import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import styles from './styles.module.scss';

export function VisitationSection({ handleInputChange, formData, setFormData }) {
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

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Select
                    label={"Tipo do Imóvel:"}
                    options={imovelOptions}
                    value={formData?.data?.imovel}
                    onChange={(o) => setFormData({ ...formData, data: { ...formData.data, imovel: o } })}
                    disabled={false}
                    labelColor='black'
                />
                <Select
                    label={"Visita:"}
                    options={visitaOptions}
                    value={formData?.data?.visita}
                    onChange={(o) => setFormData({ ...formData, data: { ...formData.data, visita: o } })}
                    disabled={false}
                    labelColor='black'
                />
            </div>
            <div className={styles.row}>
                <Input
                    label="N° do Quart.:"
                    name={"data.quarteirao"}
                    type="text"
                    value={formData?.data?.quarteirao}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={false}
                />
                <Input
                    label={"Lado:"}
                    name={"data.lado"}
                    type="text"
                    value={formData?.data?.lado}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={false}
                />
            </div>
            <Input
                label={"Logradouro:"}
                name={"data.logradouro"}
                type="text"
                value={formData?.data?.logradouro}
                onChange={handleInputChange}
                labelColor={"black"}
                disabled={false}
            />
            <div className={styles.row}>
                <Input
                    label={"Número:"}
                    name={"data.numero"}
                    value={formData?.data?.numero}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={false}
                />
                <Input
                    label={"Compl.:"}
                    name={"data.complemento"}
                    value={formData?.data?.complemento}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={false}
                />
            </div>
        </div>
    );
}