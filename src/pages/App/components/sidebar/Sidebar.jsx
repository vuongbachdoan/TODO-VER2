import { useDispatch, useSelector } from 'react-redux';
import { setCurrentWorkspace, toogleAddingWorkspace, updateWorkspaces } from '../../../../redux/reducers/appReducer';
import { CtMenu } from '../../../../shared/components/Menu/Menu';
import { CtTreeView } from '../../../../shared/components/TreeView/TreeView';
import { ReactComponent as TodayIcon } from '../../../../assets/images/icon-today.svg';

import './Sidebar.scss';
import { useEffect, useState } from 'react';
import { WorkspaceService } from '../../../../shared/services/workspaceService';
import { TaskService } from '../../../../shared/services/taskService';

const data = [
    {
        description: 'Today',
        prefixIcon: <TodayIcon />
    }
]

export const Sidebar = () => {
    const workspaces = useSelector((state) => state.appData.workspaces);
    const currentWorkspace = useSelector((state) => state.appData.currentWorkspace);
    const dispatch = useDispatch()
    const handleAddingWorkspace = () => {
        dispatch(toogleAddingWorkspace(true));
    }

    const [activeColor, setActiveColor] = useState("");
    const handleClick = (item) => {
        dispatch(setCurrentWorkspace(item._id));
    }

    const userData = JSON.parse(localStorage.getItem('user'))
    const deleteWorkspace = (workspaceId) => {
        WorkspaceService.deleteWorkspace(workspaceId).then(
            () => {
                console.log(userData.id)
                WorkspaceService.getWorkspaces(userData.id)
                    .then(
                        (res) => {
                            console.log(res.data)
                            dispatch(updateWorkspaces(res.data))
                        }
                    )
            }
        )
    }
    return (
        <div className="app-sidebar">
            <CtMenu data={data} onClick={(val) => handleClick(val)} />
            <div className="wrap-treeview">
                <CtTreeView
                    data={{
                        function: () => handleAddingWorkspace(),
                        children: workspaces,
                        color: { activeColor }
                    }}
                    onClick={(val) => handleClick(val)}
                    onDelete={(val) => deleteWorkspace(val)}
                />
            </div>
        </div>
    );
}