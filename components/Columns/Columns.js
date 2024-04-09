import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";

const ColumnData = [
    {
        id: uuid(),
        title: "Monaly",
        icon: "carbon:user-avatar-filled-alt",
        content:
            "Adorei o nosso papo, muito bom e produtivo!!!"
    },
    {
        id: uuid(),
        title: "Tainá",
        icon: "carbon:user-avatar-filled-alt",
        content:
            "Eu amei a mentoria, pois foi essencial para me nortear no planejamento do meu ano."
    },
    {
        id: uuid(),
        title: "Clara",
        icon: "carbon:user-avatar-filled-alt",
        content:
            "Passando aqui para agradecer pela mentoria de hoje, foi muitp proveitosa e me gerou vários insights, ansiosa pelas próximas :) "
    }
];

export const Columns = () => {
    return (
        <SectionContainer className="benefits-lists grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {ColumnData.map((item) => (
                <div
                    id={item.id}
                    key={item.id}
                    className="benefits-list--item text-[#737373] text-left"
                >
                    <Icon icon={item.icon} className="mb-4 w-10 h-10 my-2" />
                    <h3 className="text-xl mb-2 font-medium text-black">
                        {item.title}
                    </h3>
                    <p>{item.content}</p>
                    <o className="flex">
                        <Icon
                            icon="solar:star-bold"
                            className="h-10 mr-1 text-secondary-500"
                        />
                        <Icon
                            icon="solar:star-bold"
                            className="h-10 mr-1 text-secondary-500"
                        />
                        <Icon
                            icon="solar:star-bold"
                            className="h-10 mr-1 text-secondary-500"
                        />
                        <Icon
                            icon="solar:star-bold"
                            className="h-10 mr-1 text-secondary-500"
                        />
                        <Icon
                            icon="solar:star-bold"
                            className="h-10 mr-1 text-secondary-500"
                        />
                    </o>
                </div>
            ))}
        </SectionContainer>
    );
};
