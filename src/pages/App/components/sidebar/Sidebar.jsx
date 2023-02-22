import { useDispatch, useSelector } from 'react-redux';
import { toogleAddingWorkspace } from '../../../../redux/reducers/appReducer';
import { CtMenu } from '../../../../shared/components/Menu/Menu';
import { CtTreeView } from '../../../../shared/components/TreeView/TreeView';
import {ReactComponent as TodayIcon} from '../../../../assets/images/icon-today.svg';

import './Sidebar.scss';
import { useEffect, useState } from 'react';
import { WorkspaceService } from '../../../../shared/services/workspaceService';

const data = [
    {
        description: 'Today',
        prefixIcon: <TodayIcon />
    }
]

export const Sidebar = () => {
    const dispatch = useDispatch()
    const handleAddingWorkspace = () => {
        dispatch(toogleAddingWorkspace(true));
    }
    const userId = useSelector((state) => state.appData.userData.id)

    const [workspaces, setWorkspaces] = useState([])
    useEffect(() => {
        WorkspaceService.getWorkspaces(userId)
            .then(
                (res) => setWorkspaces(res.data)
            )
    }, [workspaces, userId])

    return (
        <div className="app-sidebar">
            <CtMenu data={data}/>
            <div className="wrap-treeview">
                <CtTreeView data={{
                    function: () => handleAddingWorkspace(),
                    children: workspaces
                }}/>
            </div>
        </div>
    );
}