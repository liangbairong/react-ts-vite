import React, { useEffect, useRef, useState } from 'react';
// import { AppContext } from '../context';

// export const useStore = <T>(context: React.Context<T>): T => {
//     const store = React.useContext<T>(context || AppContext);
//     if (!store) {
//         throw new Error('You have forgot to use StoreProvider, shame on you.');
//     }
//     return store;
// };

// export const useStageStore = <T>(context: React.Context<T>): T => {
//     const store = React.useContext<T>(context);
//     if (!store) {
//         throw new Error('You have forgot to use StoreProvider, shame on you.');
//     }
//     return store;
// };

export const useSkeletonState = (arr: Array<boolean> = []) => {
    const [f, setF] = useState(true);
    const t = useRef(Date.now());

    useEffect(() => {
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            const state = arr[i];
            if (!state) {
                index++;
            }
        }
        if (index === arr.length) {
            if (Date.now() - t.current >= 500) {
                setF(false);
            } else {
                console.log('222');
                setTimeout(() => {
                    setF(false);
                }, 500);
            }
        }
    }, arr);

    return f;
};
