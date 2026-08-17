import { Disclosure, DisclosureList } from "@components/Disclosure";

/**
 * FAQ — revelação progressiva sobre o componente Disclosure.
 * Cantos retos, fio de 1px, "+" em cobre (brandbook §04). Sem sombra,
 * sem raio, sem cinza genérico.
 */
export default function FAQ({ items }) {
    return (
        <DisclosureList>
            {items.map((item, index) => (
                <Disclosure key={index} title={item.question}>
                    {typeof item.answer === "string" ? (
                        <p>{item.answer}</p>
                    ) : (
                        item.answer
                    )}
                </Disclosure>
            ))}
        </DisclosureList>
    );
}
