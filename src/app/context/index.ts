import React from 'react';

import appStore, { IStore } from '@Stores/appStore';
import qpStore, { IQpStore } from '@Stores/qpStore';
import pendantStore, { IPendantStore } from '@Stores/pendantStore';
import pointsStore, { IPointStore } from '@Stores/pointStore';
import eventEmitterStore, { IEventEmitterStore } from '@Stores/eventEmitterStore';

export const AppContext = React.createContext<IStore>(appStore);
export const QpContext = React.createContext<IQpStore>(qpStore);
export const PendantContext = React.createContext<IPendantStore>(pendantStore);
export const PointContext = React.createContext<IPointStore>(pointsStore);
export const EventEmitterContext = React.createContext<IEventEmitterStore>(eventEmitterStore);
