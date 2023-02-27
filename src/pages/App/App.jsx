import { useDispatch, useSelector } from "react-redux";
import { toogleAddingWorkspace, updateWorkspaces } from "../../redux/reducers/appReducer";
import { AppHeader } from "../../layout/app_header/AppHeader";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Body } from "./components/body/Body";
import { CtCard } from "../../shared/components/Card/Card";
import { CtInput } from "../../shared/components/Input/Input";
import { ReactComponent as InformationIcon } from "../../assets/images/icon-information.svg";
import { addWorkspace } from "../../redux/reducers/appReducer";

import './App.scss';
import React, { useEffect, useState } from "react";
import { WorkspaceService } from "../../shared/services/workspaceService";
import { ReactComponent as MessageIcon } from "../../assets/images/message.svg";
import { ReactComponent as RestIcon } from "../../assets/images/rest.svg";
import { ReactComponent as MusicPlayIcon } from "../../assets/images/musicplay.svg";
import { ReactComponent as NoteIcon } from "../../assets/images/noteadd.svg";
import { ReactComponent as PersonalCardIcon } from "../../assets/images/personalcard.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";
import { ReactComponent as DocumentIcon } from "../../assets/images/tabledocument.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/images/arrowright.svg";
import { ReactComponent as WorkspaceIcon } from "../../assets/images/workspace.svg";

const BodyAddWorkspaceCard = ({ getVal }) => {
    const colorMap = [
        {
            color: "#858585",
            text: "color description"
        },
        {
            color: "#42ec72",
            text: "color description"
        },
        {
            color: "#27e85e",
            text: "color description"
        },
        {
            color: "#41eca7",
            text: "color description"
        },
        {
            color: "#2d5fdc",
            text: "color description"
        },
        {
            color: "#7242ec",
            text: "color description"
        },
        {
            color: "#fa4141",
            text: "color description"
        },
        {
            color: "#e83939",
            text: "color description"
        },
        {
            color: "#ec9442",
            text: "color description"
        }
    ]

    const iconMap = [
        {
            icon: <WorkspaceIcon />,
            text: "workspace"
        },
        {
            icon: <MessageIcon />,
            text: "message"
        },
        {
            icon: <RestIcon />,
            text: "rest"
        },
        {
            icon: <MusicPlayIcon />,
            text: "music_play"
        },
        {
            icon: <NoteIcon />,
            text: "note"
        },
        {
            icon: <PersonalCardIcon />,
            text: "personal_card"
        },
        {
            icon: <ProfileIcon />,
            text: "profile"
        },
        {
            icon: <DocumentIcon />,
            text: "document"
        }
    ]



    const handleInput = (val) => {
        getVal({
            name: val,
            suffixIcon: "delete",
            prefixIcon: selectedIcon,
            colorTheme: selectedColor
        });
    }

    const [isExpandSelectingColor, setExpandSelectingColor] = useState(true)

    const [selectedColor, setSelectedColor] = useState("#ccc");

    const handleExpandSelectingIcon = (val, color) => {
        setExpandSelectingColor(val);
        setSelectedColor(color);
    }


    const [selectedIcon, setSelectedIcon] = useState("workspace");
    const handleSelectedIcon = (key) => {
        setSelectedIcon((iconMap.filter((item) => item.text === key)[0]).text)
    }

    return (
        <>
            <div className="theme-icon__picker">
                <div className="theme-icon__picker-body">
                    <div className="picker-color">
                        {
                            !isExpandSelectingColor &&
                            <div
                                key={selectedColor}
                                className="picker-color__item"
                                style={{ backgroundColor: selectedColor }}
                                onClick={() => handleExpandSelectingIcon(
                                    false,
                                    selectedColor
                                )}
                            >
                            </div>
                        }
                        {
                            isExpandSelectingColor &&
                            colorMap.map((item) => {
                                return (
                                    <div
                                        key={item.color}
                                        className="picker-color__item"
                                        style={{ backgroundColor: item.color }}
                                        onClick={() => handleExpandSelectingIcon(
                                            false,
                                            item.color
                                        )}
                                    >
                                    </div>
                                )
                            })
                        }
                        <div className="picker-color_expand">
                            <ArrowRightIcon onClick={() => handleExpandSelectingIcon(
                                !isExpandSelectingColor,
                                "#ccc"
                            )} style={{ transform: `rotateZ(${isExpandSelectingColor ? "180deg" : "0deg"})` }} />
                        </div>
                    </div>
                    <div className="picker-icon">
                        {
                            iconMap.map((item) => {
                                return (
                                    <div
                                        key={item.text}
                                        className={`picker-icon__item ${item.text === selectedIcon ? "clicked-icon" : ""}`}
                                        onClick={() => handleSelectedIcon(item.text)}
                                    >
                                        {item.icon}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <CtInput data={{ label: "Workspace name", placeholder: "ex: my-workspace", required: true, getInput: (val) => handleInput(val) }} />
        </>
    );
}

export const App = () => {
    const isCollapseSidebar = useSelector(state => state.appData.sidebarCollapse);
    const isAddingWorkspace = useSelector(state => state.appData.addingWorkspaceHide);
    const userData = useSelector((state) => state.appData.userData)

    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(toogleAddingWorkspace(false))
    }
    const handleSubmit = () => {
        if (workspace !== {}) {
            WorkspaceService.createWorkspace({
                name: workspace.name ?? "My Workspace",
                ownerId: userData.id,
                prefixIcon: workspace.prefixIcon ?? "workspace",
                suffixIcon: workspace.suffixIcon ?? "delete",
                colorTheme: workspace.colorTheme ?? "#858585"
            })
                .then(res => {
                    console.log(res.data)
                    Promise.all([
                        dispatch(addWorkspace(res.data)),
                        dispatch(toogleAddingWorkspace(false))
                    ])
                })
        }
    }

    // const [userData, setUserData] = useState({});
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userData));
        const user = JSON.parse(localStorage.getItem('user'));
        // setUserData(user);
        WorkspaceService.getWorkspaces(user.id)
            .then(res => {
                console.log(res.data);
                dispatch(updateWorkspaces(res.data));
            })
    }, [userData]);

    const [workspace, setWorkspace] = useState({})
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