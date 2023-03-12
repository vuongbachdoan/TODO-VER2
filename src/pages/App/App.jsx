import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace, toogleAddingWorkspace, updateWorkspaces } from "../../redux/reducers/appReducer";
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

const BodyAddWorkspaceCard = ({ getData }) => {
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



    const handleInput = (type, val) => {
        getData(type, val)
    }

    const [isExpandSelectingColor, setExpandSelectingColor] = useState(true)

    const [selectedColor, setSelectedColor] = useState("#ccc");

    const handleExpandSelectingIcon = (val, color) => {
        setExpandSelectingColor(val);
        setSelectedColor(color);
        handleInput("color", color);
    }


    const [selectedIcon, setSelectedIcon] = useState("workspace");
    const handleSelectedIcon = (key) => {
        handleInput("icon", key);
        setSelectedIcon((iconMap.filter((item) => item.text === key)[0]).text);
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
            <CtInput data={{ label: "Workspace name", placeholder: "ex: my-workspace", required: true, getInput: (val) => handleInput("input", val) }} />
        </>
    );
}

export const App = () => {
    const isCollapseSidebar = useSelector(state => state.appData.sidebarCollapse);
    const isAddingWorkspace = useSelector(state => state.appData.addingWorkspaceHide);
    const userData = JSON.parse(localStorage.getItem('user'))

    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(toogleAddingWorkspace(false))
    }

    const [workspace, setWorkspace] = useState({})
    const handleVal = (type, val) => {
        if(type === "input") {
            setWorkspace({
                ...workspace,
                name: val
            })
        } else if(type === "icon") {
            setWorkspace({
                ...workspace,
                prefixIcon: val
            })
        } else if(type === "color") {
            setWorkspace({
                ...workspace,
                colorTheme: val
            })
        }
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
                    Promise.all([
                        dispatch(addWorkspace(res.data)),
                        dispatch(toogleAddingWorkspace(false))
                    ])
                })
        }
    }

    useEffect(() => {
        WorkspaceService.getWorkspaces(userData.id)
            .then(res => {
                dispatch(updateWorkspaces(res.data));
                dispatch(setCurrentWorkspace(res.data.length === 0 ? "" : res.data[0]._id))
            })
    }, [userData]);

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
                            body: <BodyAddWorkspaceCard getData={(type, val) => handleVal(type, val)} />,
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