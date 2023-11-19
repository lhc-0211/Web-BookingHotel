import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import userReducer from "./userReducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import siteReducer from './siteReducer';
import hotelReducer from './hotelReducer';
import guestReducer from './guestReducer';
import companyReducer from './companyReducer';
import roomReducer from './roomReducer';


// import categoryReducer from './categoryReducer';

import { persistReducer } from 'redux-persist';

const history = createBrowserHistory();

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const rootReducer = combineReducers({
    router: (state = history) => state, // Replace the connectRouter with a simple state assignment
    user: persistReducer(userPersistConfig, userReducer),
    site: siteReducer,
    hotel: hotelReducer,
    guest: guestReducer,
    company: companyReducer,
    room: roomReducer,
});

export default rootReducer;