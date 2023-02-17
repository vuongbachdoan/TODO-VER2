import { useDispatch, useSelector } from "react-redux";
import { toogleAddingWorkspace } from "../../redux/reducers/appReducer";
import { AppHeader } from "../../layout/app_header/AppHeader";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Body } from "./components/body/Body";
import { CtCard } from "../../shared/components/Card/Card";
import { CtInput } from "../../shared/components/Input/Input";
import { ReactComponent as InformationIcon } from "../../assets/images/icon-information.svg";

import './App.scss';
import { useEffect } from "react";
import { UserService } from "../../shared/services/userService";

const BodyAddWorkspaceCard = () => {
    return (
        <CtInput data={{ label: "Workspace name", placeholder: "ex: my-workspace", required: true }} />
    );
}

export const App = () => {
    const accessToken = useSelector(state => state.appData.token.access_token); 
    const isCollapseSidebar = useSelector(state => state.appData.sidebarCollapse);
    const isAddingWorkspace = useSelector(state => state.appData.addingWorkspaceHide);
    const dispatch = useDispatch();
    const handleAddingWorkspace = () => {
        dispatch(toogleAddingWorkspace())
    }

    useEffect(() => {
        UserService.getAll(accessToken)
            .then((res) => console.log(res));
    }, [accessToken]);

    return (
        <div className="app">
            <AppHeader />
            <div className="app-body">
                {!isCollapseSidebar && <Sidebar />}
                <Body />
            </div>

            {
                isAddingWorkspace &&
                <div className="bg-darken">
                    <CtCard data={{ title: "Add workspace", subTitle: <InformationIcon />, body: <BodyAddWorkspaceCard />, class: "", function: handleAddingWorkspace }} />
                </div>
            }
        </div>
    );
}