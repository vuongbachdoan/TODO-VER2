import { useState } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/images/icon-add.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/images/icon-arrow_down.svg';
import { RenderIcon } from '../../utils/renderIcon';

import './TreeView.scss';

export const  
CtTreeView = ({ data, onClick, onDelete }) => {
    const [isOpenTree, setOpenTree] = useState(false);
    const handleOpenTree = (val) => {
        setOpenTree(val);
    }
    const handleFunc = () => {
        data.function()
    }

    const handleClick = (val) => {
        onClick(val);
    }

    const handleDelete = (val) => {
        onDelete(val)
    }

    return (
        <div className={`${isOpenTree ? "bg-gray" : ""} ct__treeview`}>
            <h5 className="col">Workspace</h5>
            <div className="col">
                <div className="row">
                    <AddIcon className="cursor-pointer" onClick={handleFunc} />
                    <ExpandIcon className={`cursor-pointer ${!isOpenTree ? "icon-90deg" : ""} ct__animate-solid`} onClick={() => handleOpenTree(!isOpenTree)} />
                </div>
            </div>

            <div className="ct__tree-childs">
                {
                    isOpenTree &&
                    data.children.map((child, index) => {
                        return (
                            <div key={index} className={`ct__tree-child element-theme-${child.colorTheme.replace('#', '')}`} onClick={() => handleClick(child)}>
                                {
                                    RenderIcon(child.prefixIcon)
                                }
                                <p className="col">{child.name}</p>
                                <span onClick={() => handleDelete(child._id)}>
                                    {
                                        RenderIcon(child.suffixIcon)
                                    }
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}