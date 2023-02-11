import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice(
    {
        name: 'appData',
        initialState: {
            sidebarCollapse: false,
            currentRoute: 'today',
            tasks: []
        },
        reducers: {
            changeCurrentRoute: (state, action) => {
                state.currentRoute = action.payload;
            },
            toogleSidebar: (state) => {
                state.sidebarCollapse = !state.sidebarCollapse;
            },
            setTasks: (state, action) => {
                state.tasks = [...state.tasks, action.payload];
            }
        }
    },
)

export const { changeCurrentRoute, toogleSidebar, setTasks } = appSlice.actions;
export default appSlice.reducer;