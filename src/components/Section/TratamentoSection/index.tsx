import { Input } from '../../ui/Input';
import styles from './styles.module.scss';


export function TratamentoSection({ handleInputChange, isEditing, formData }) {

    const larvicidas = [
        { name: "larvcd1" },
        { name: "larvcd2" },
    ];

    return (
        <div className={styles.container}>
            <p className={styles.title}>Tratamento</p>
            <div className={`${styles.row} ${styles.gap}`}>
                <Input
                    label={"Depósitos Eliminados"}
                    name="tratamento.qtd_dep_elimind"
                    type="number"
                    min={0}
                    max={99}
                    value={formData?.tratamento?.qtd_dep_elimind}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
                <Input
                    label={"Imóveis Tratados"}
                    name="tratamento.imoveis_tratd"
                    type="number"
                    min={0}
                    max={99}
                    value={formData?.tratamento?.imoveis_tratd}
                    onChange={handleInputChange}
                    labelColor={"black"}
                    disabled={!isEditing}
                />
            </div>

            <div className={styles.tratamento}>
                <p className={styles.focal}>Focal</p>
                {larvicidas.map((larvicida, index) => (
                    <div key={index} className={styles.larvicidaContainer}>
                        <b className={styles.subtitle}>Larvicida({index + 1})</b>
                        <div className={styles.larvicidadeInfo}>
                            <div className={styles.InfoTop}>
                                <Input
                                    label={"Tipo"}
                                    name={`tratamento.tipo_${larvicida.name}`}
                                    type="text"
                                    value={formData?.tratamento?.[`tipo_${larvicida.name}`]}
                                    onChange={handleInputChange}
                                    labelColor={"black"}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className={styles.InfoBottom}>
                                <Input
                                    label={"Qtde. (Gramas)"}
                                    name={`tratamento.qtd_grms_${larvicida.name}`}
                                    type="number"
                                    min={0}
                                    max={99}
                                    value={formData?.tratamento?.[`qtd_grms_${larvicida.name}`]}
                                    onChange={handleInputChange}
                                    labelColor={"black"}
                                    disabled={!isEditing}
                                />
                                <Input
                                    label={"Qtde. Dep. Trat."}
                                    name={`tratamento.qtd_dep_trat_${larvicida.name}`}
                                    type="number"
                                    min={0}
                                    max={99}
                                    value={formData?.tratamento?.[`qtd_dep_trat_${larvicida.name}`]}
                                    onChange={handleInputChange}
                                    labelColor={"black"}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <p className={styles.perifocal}>Perifocal</p>
                <div className={styles.adulticidaContainer}>
                    <b className={styles.subtitle}>Adulticida</b>
                    <div className={styles.adulticidaInfo}>
                        <div className={styles.InfoTop}>
                            <Input
                                label={"Tipo"}
                                name="tratamento.tipo_adultcd"
                                type="text"
                                value={formData?.tratamento?.tipo_adultcd}
                                onChange={handleInputChange}
                                labelColor={"black"}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className={styles.InfoBottom}>
                            <Input
                                label={"Qtde. Cargas"}
                                name="tratamento.qtd_crgs_adultcd"
                                type="number"
                                min={0}
                                max={99}
                                value={formData?.tratamento?.qtd_crgs_adultcd}
                                onChange={handleInputChange}
                                labelColor={"black"}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}