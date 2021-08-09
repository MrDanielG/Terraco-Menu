import React, { PropsWithChildren, useContext, useState } from 'react';
import CardActions from '../components/card/CardActions';
import CardInfo from '../components/card/CardInfo';
import ParentCard from '../components/card/ParentCard';


interface CardData<T = unknown> {
    data: T;
}

export function createParentCardContext<T = unknown>() {
    return React.createContext<CardData<T> | null>>(null);
}


/* export function useParentCard<T>() {
 *     return useContext(createParentCardContext<T>());
 * }
 * 
 * 
 * export function ParentCardProvider<T = unknown>(
 *     props: PropsWithChildren<CardData<T>>
 * ) {
 *     console.log(props.data);
 * 
 *     return (
 *         <ParentCardContext.Provider value={props.data}>
 *             {props.children}
 *         </ParentCardContext.Provider>
 *     );
 * } */

/* export function ParentCard<T = unknown>(props: PropsWithChildren<CardData<T>>) {
 *     return <ParentCardProvider {...props} />;
 * }
 * 
 * interface Person {
 *     name: string;
 * }
 * const Greeter = () => {
 *     const { data } = useParentCard<Person>();
 *     return <h1>Hello {data?.name}</h1>;
 * };
 * <ParentCard data={{ name: 'Daniel' }}>
 *     <Greeter />
 * </ParentCard>; */
