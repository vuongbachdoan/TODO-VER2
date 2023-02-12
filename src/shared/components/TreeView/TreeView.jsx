import { useState } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/images/icon-add.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/images/icon-arrow_down.svg';

import './TreeView.scss';

export const CtTreeView = ({ data }) => {
    const [isOpenTree, setOpenTree] = useState(false);
    const handleOpenTree = (val) => {
        setOpenTree(val);
    }
    const handleFunc = () => {
        data.function()
    }

    return (
        <div className={`${isOpenTree ? "bg-gray" : ""} ct__treeview`}>
            <h5 className="col">Workspace</h5>
            <div className="col">
                <div className="row">
                    <AddIcon className="cursor-pointer" onClick={handleFunc}/>
                    <ExpandIcon className={`cursor-pointer ${!isOpenTree ? "icon-90deg" : ""} ct__animate-solid`} onClick={() => handleOpenTree(!isOpenTree)} />
                </div>
            </div>

            {
                isOpenTree &&
                data.children.map((child) => {
                    return (
                        <div className="ct__tree-childs">
                            <div className="ct__tree-child">
                                <h5 className="col">{child}</h5>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}