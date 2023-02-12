import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice(
    {
        name: 'appData',
        initialState: {
            sidebarCollapse: false,
            currentRoute: 'today',
            addingWorkspaceHide: false,
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
            },
            toogleAddingWorkspace: (state) => {
                state.addingWorkspaceHide = !state.addingWorkspaceHide;
            }
        }
    },
)

export const { changeCurrentRoute, toogleSidebar, setTasks, toogleAddingWorkspace } = appSlice.actions;
export default appSlice.reducer;