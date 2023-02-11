import { useState } from "react";
import { ReactComponent as DownIcon } from "../../../assets/images/icon-down.svg";

import './Dropdown.scss';

export const CtDropdown = ({ data }) => {
    const [isCollapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(true);
    }

    const [selectedTag, setSelectedTag] = useState(null);
    const selectTag = (item) => {
        setSelectedTag(item);
        setCollapse(false);
    }

    return (
        <div className="ct__dropdown prefixIcon suffixIcon outline">
            {
                !selectedTag &&
                <>
                    <div className="row">
                        {/* <DownIcon /> */}
                        Tag
                    </div>
                    <div className="row cursor-pointer" onClick={handleCollapse}>
                        <DownIcon />
                    </div>
                </>
            }

            {
                selectedTag &&
                <>
                    <div className="row">
                        {selectedTag.prefixIcon}
                        {selectedTag.label}
                    </div>
                    <div className="row cursor-pointer" onClick={handleCollapse}>
                        <DownIcon />
                    </div>
                </>
            }

            {
                isCollapse &&
                <div className="ct__dropdown-wrapper outline">
                    <div className="ct__dropdown-options">
                        <div className="ct__dropdown-option" onClick={() => selectTag(null)}>
                            <div className="row">
                                None
                            </div>
                            <div className="row">
                            </div>
                        </div>
                        {
                            data.map((item) => {
                                return (
                                    <div className="ct__dropdown-option" onClick={() => selectTag(item)}>
                                        <div className="row">
                                            {item.prefixIcon}
                                            {item.label}
                                        </div>
                                        <div className="row">
                                            {/* {item.suffixIcon} */}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
}