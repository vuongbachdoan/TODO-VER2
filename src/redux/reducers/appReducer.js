import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice(
    {
        name: 'appData',
        initialState: {
            sidebarCollapse: false,
            currentRoute: 'today',
            addingWorkspaceHide: false,
            tasks: [],
            token: {},
            userData: {}
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
            },
            setToken: (state, action) => {
                state.token = action.payload;
            },
            setUserData: (state, action) => {
                state.userData = action.payload;
            }
        }
    },
)

export const { changeCurrentRoute, toogleSidebar, setTasks, toogleAddingWorkspace, setToken } = appSlice.actions;
export default appSlice.reducer;