import { useSprings } from '@react-spring/core';
import { SpringValue } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';

export const useSwipe = <T extends unknown>(numSprings: number, onSwipe: (args?: T) => any) => {
    // Create the amount of springs animations needed
    const [springs, api] = useSprings(numSprings, () => ({ x: 0 }));

    // Create the drag event with it's respective parameters
    const bind = useDrag(({ args: [index, id], active, movement: [mx], cancel }) => {
        api.start((i) => i === index && { x: active ? mx : 0, immediate: active });
        // When X axix hits 200 on a swipe, the props function will trigger
        if (mx == -200) {
            console.log(index, id);
            cancel();
            onSwipe(id);
        }
    });
    return [springs, bind] as [
        {
            x: SpringValue<number>;
        }[],
        (...args: any[]) => ReactEventHandlers
    ];
};
