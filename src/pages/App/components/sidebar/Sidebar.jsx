import { useDispatch } from 'react-redux';
import { toogleAddingWorkspace } from '../../../../redux/reducers/appReducer';
import { CtMenu } from '../../../../shared/components/Menu/Menu';
import { CtTreeView } from '../../../../shared/components/TreeView/TreeView';
import {ReactComponent as TodayIcon} from '../../../../assets/images/icon-today.svg';

import './Sidebar.scss';

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