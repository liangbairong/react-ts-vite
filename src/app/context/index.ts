import React from 'react';

import appStore, { IStore } from '../stores/appStore';



import luckyStore, { LuckyStoreProps } from '../stores/luckyStore';

import PendantStore, { PendantStoreProps } from '../stores/pendantStore';

export const AppContext = React.createContext<IStore>(appStore);



export const LuckyStageContext = React.createContext<LuckyStoreProps>(luckyStore);

export const PendantStageContext = React.createContext<PendantStoreProps>(PendantStore);
