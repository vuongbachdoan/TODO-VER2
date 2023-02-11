import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./action";

export default configureStore({
    reducer: {
        appData: appReducer
    }
})