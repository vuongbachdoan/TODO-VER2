import { useDispatch, useSelector } from "react-redux";
import { toogleAddingWorkspace } from "../../redux/reducers/appReducer";
import { AppHeader } from "../../layout/app_header/AppHeader";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Body } from "./components/body/Body";
import { CtCard } from "../../shared/components/Card/Card";
import { CtInput } from "../../shared/components/Input/Input";
import { ReactComponent as InformationIcon } from "../../assets/images/icon-information.svg";
import { addWorkspace } from "../../redux/reducers/appReducer";

import './App.scss';
import { useEffect, useState } from "react";
import { WorkspaceService } from "../../shared/services/workspaceService";

const BodyAddWorkspaceCard = ({ getVal }) => {
    const handleInput = (val) => {
        getVal(val);
    }

    return (
        <CtInput data={{ label: "Workspace name", placeholder: "ex: my-workspace", required: true, getInput: (val) => handleInput(val) }} />
    );
}

export const App = () => {
    const accessToken = useSelector(state => state.appData.userData.access_token);
    const isCollapseSidebar = useSelector(state => state.appData.sidebarCollapse);
    const isAddingWorkspace = useSelector(state => state.appData.addingWorkspaceHide);
    const userData = useSelector((state) => state.appData.userData)

    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(toogleAddingWorkspace(false))
    }
    const handleSubmit = () => {
        WorkspaceService.createWorkspace({
            name: workspace,
            ownerId: userData.id,
            prefixIcon: "bag"
        })
            .then(res => {
                dispatch(addWorkspace(res.data))
                dispatch(toogleAddingWorkspace(false))
            })
    }

    useEffect(() => {
        WorkspaceService.getWorkspaces(userData.id)
            .then(res => dispatch(addWorkspace(res.data)))
    }, [accessToken, userData, dispatch]);

    const [workspace, setWorkspace] = useState('')
    const handleVal = (val) => {
        setWorkspace(val);
    }

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
                    <CtCard
                        data={{
                            title: "Add workspace",
                            subTitle: <InformationIcon />,
                            body: <BodyAddWorkspaceCard getVal={(val) => handleVal(val)} />,
                            class: "",
                            onCancel: handleCancel,
                            onSubmit: handleSubmit
                        }}
                    />
                </div>
            }
        </div>
    );
}