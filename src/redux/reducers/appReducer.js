import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice(
    {
        name: 'appData',
        initialState: {
            sidebarCollapse: false,
            currentRoute: 'today',
            currentWorkspace: "",
            addingWorkspaceHide: false,
            tasks: [],
            userData: {},
            workspaces: []
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
            toogleAddingWorkspace: (state, action) => {
                state.addingWorkspaceHide = action.payload;
            },
            setUserData: (state, action) => {
                state.userData = action.payload;
            },
            addWorkspace: (state, action) => {
                state.workspaces = [...state.workspaces, action.payload];
            },
            updateWorkspaces: (state, action) => {
                state.workspaces = action.payload;
            },
            updateTasks: (state, action) => {
                state.tasks = action.payload;
            },
            setCurrentWorkspace: (state, action) => {
                state.currentWorkspace = action.payload;
            }
        }
    },
)

export const { 
    changeCurrentRoute, 
    toogleSidebar, 
    setTasks, 
    toogleAddingWorkspace, 
    addWorkspace, 
    setUserData, 
    updateWorkspaces, 
    updateTasks,
    setCurrentWorkspace } = appSlice.actions;
export default appSlice.reducer;