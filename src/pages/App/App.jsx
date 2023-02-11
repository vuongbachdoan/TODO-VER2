import { AppHeader } from "../../layout/app_header/AppHeader";
import { Body } from "./components/body/Body";
import { Sidebar } from "./components/sidebar/Sidebar";

import './App.scss';
import { useSelector } from "react-redux";

export const App = () => {
    const isCollapseSidebar = useSelector(state => state.appData.sidebarCollapse);

    return (
        <div className="app">
            <AppHeader />
            <div className="app-body">
                { !isCollapseSidebar && <Sidebar/> }
                <Body />
            </div>
        </div>
    );
}