import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import reduxThunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const middleware = [reduxThunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);

export { store, persistor };
