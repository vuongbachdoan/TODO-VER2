import {ReactComponent as TodayIcon} from '../../../../assets/images/icon-today.svg';
import { CtMenu } from '../../../../shared/components/Menu/Menu';

import './Sidebar.scss';

const data = [
    {
        description: 'Today',
        prefixIcon: <TodayIcon />
    }
]

export const Sidebar = () => {
    return (
        <div className="app-sidebar">
            <CtMenu data={data}/>
        </div>
    );
}