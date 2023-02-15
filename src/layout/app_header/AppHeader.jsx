import { useDispatch, useSelector } from 'react-redux';
import { toogleSidebar } from '../../redux/reducers/appReducer';
import { SearchField } from '../../shared/components/SearchField/SearchField';
import { ReactComponent as MenuIcon } from '../../assets/images/icon-menu.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/icon-home.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/icon-close.svg';

import './AppHeader.scss';

export const AppHeader = () => {
    const dispatch = useDispatch();
    const handleSidebar = () => {
        dispatch(toogleSidebar())
    }
    const isSidebarCollapse = useSelector((state) => state.appData.sidebarCollapse);

    return (
        <div className="navbar">
            <div className="header-left">
                <div className="btn__sidebar-collapse center btn-squared btn-primary cursor-pointer" onClick={handleSidebar}>
                    { isSidebarCollapse && <MenuIcon/> }
                    { !isSidebarCollapse && <CloseIcon/> }
                </div>
                <div className="navbar__home center btn-squared btn-primary">
                    <HomeIcon/>
                </div>
                <SearchField/>
            </div>
            <div className="header-right">
                <div className="user">
                    <img className='btn-rounded' src="https://i2.wp.com/buddymantra.com/wp-content/uploads/2018/04/user-icon-png-pnglogocom.png?fit=500%2C466&ssl=1" alt="user" />
                </div>
            </div>
        </div>
    );
}