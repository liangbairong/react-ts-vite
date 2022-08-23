import React from 'react';
import { AppContext } from '../context';

export const useStore = <T>(context: React.Context<T>): T => {
    const store = React.useContext<T>(context || AppContext);
    if (!store) {
        throw new Error('You have forgot to use StoreProvider, shame on you.');
    }
    return store;
};

export const useStageStore = <T>(context: React.Context<T>): T => {
    const store = React.useContext<T>(context);
    if (!store) {
        throw new Error('You have forgot to use StoreProvider, shame on you.');
    }
    return store;
};
