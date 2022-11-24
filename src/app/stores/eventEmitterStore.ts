import { observable } from 'mobx';

type Func = (params: any) => any;

export interface IEventEmitterStore {
    _events: Record<string, Array<Func>>;
    on: (name: string, listener: Func) => any;
    removeListener: (name: string, listener: Func) => any;
    emit: (name: string, data?: any) => any;
}

const eventEmitterStore = observable<IEventEmitterStore>({
    _events: {},

    on(name: string, listener: Func) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    },

    removeListener(name: string, listenerToRemove: Func) {
        if (!this._events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListeners = (listener: any) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    },

    emit(name: string, data?: any) {
        if (!this._events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }

        const fireCallbacks = (callback: Func) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    },
});

export default eventEmitterStore;
