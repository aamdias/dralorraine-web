import { useState } from "react";

const items = [
    "Conferi o programa, a edição e os comunicados mais recentes.",
    "Relacionei cada atividade ao critério e ao comprovante correspondente.",
    "Revisei nomes, datas, assinaturas e legibilidade dos documentos.",
    "Conferi o formulário oficial, a ordem dos anexos e o Lattes atualizado.",
    "Abri o PDF final, conferi o tamanho e planejei o envio com antecedência."
];

export default function DocumentChecklist() {
    const [checked, setChecked] = useState([]);
    return (
        <fieldset className="my-8 border border-line bg-sand p-5 sm:p-8">
            <legend className="px-2 text-base font-medium text-ink">
                Minha conferência antes do envio
            </legend>
            <p className="mb-5 text-base leading-6 text-stone">
                Marque conforme revisar. Esta lista é um apoio à organização,
                não uma validação pela banca. As marcações valem enquanto esta
                página estiver aberta.
            </p>
            <div className="divide-y divide-line">
                {items.map((item, index) => (
                    <label
                        key={item}
                        className="flex cursor-pointer items-start gap-4 py-4 text-base leading-7 text-slate"
                    >
                        <input
                            type="checkbox"
                            checked={checked.includes(index)}
                            onChange={(event) =>
                                setChecked(
                                    event.target.checked
                                        ? [...checked, index]
                                        : checked.filter(
                                              (value) => value !== index
                                          )
                                )
                            }
                            className="mt-1.5 h-5 w-5 shrink-0 accent-ink"
                        />
                        <span>{item}</span>
                    </label>
                ))}
            </div>
            <p
                role="status"
                className="mb-0 mt-5 border-t border-line pt-5 text-base font-medium text-copper-dark"
            >
                {checked.length} de {items.length} etapas conferidas
            </p>
        </fieldset>
    );
}
