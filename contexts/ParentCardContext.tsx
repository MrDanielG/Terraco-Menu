import React, { PropsWithChildren, useContext, useState } from 'react';

interface CardData<T = unknown> {
    data: T;
}

export function createParentCardContext<T = unknown>() {
    return React.createContext<CardData<T | null>>({ data: null });
}

export function useParentCard<T>() {
    return useContext(createParentCardContext<T>());
}

export function ParentCardProvider<T = unknown>(
    props: PropsWithChildren<CardData<T>>
) {
    const [data, setData] = useState<T>(props.data);
    const ParentCardContext = createParentCardContext<T>();
    return (
        <ParentCardContext.Provider value={{ data }}>
            {props.children}
        </ParentCardContext.Provider>
    );
}

export function ParentCard<T = unknown>(props: PropsWithChildren<CardData<T>>) {
    return <ParentCardProvider {...props} />;
}

interface Person {
    name: string;
}
const Greeter = () => {
    const { data } = useParentCard<Person>();
    return <h1>Hello {data?.name}</h1>;
};
<ParentCard data={{ name: 'Daniel' }}>
    <Greeter />
</ParentCard>;
