import { CtMenu } from '../../../../shared/components/Menu/Menu';
import {ReactComponent as TodayIcon} from '../../../../assets/images/icon-today.svg';

import './Sidebar.scss';
import { CtTreeView } from '../../../../shared/components/TreeView/TreeView';
import { useDispatch } from 'react-redux';
import { toogleAddingWorkspace } from '../../action';

const data = [
    {
        description: 'Today',
        prefixIcon: <TodayIcon />
    }
]

export const Sidebar = () => {
    const dispatch = useDispatch()
    const handleAddingWorkspace = () => {
        dispatch(toogleAddingWorkspace());
    }

    return (
        <div className="app-sidebar">
            <CtMenu data={data}/>
            <div className="wrap-treeview">
                <CtTreeView data={{
                    function: () => handleAddingWorkspace(),
                    children: [
                        "Something"
                    ]
                }}/>
            </div>
        </div>
    );
}