import React from 'react';

import appStore, { IStore } from '../stores/appStore';

export const AppContext = React.createContext<IStore>(appStore);
