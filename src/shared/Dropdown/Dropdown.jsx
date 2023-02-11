import { ReactComponent as DownIcon } from "../../assets/images/icon-down.svg";

import './Dropdown.scss';

export const CtDropdown = ({ data }) => {
    return (
        <div className="ct__dropdown prefixIcon suffixIcon outline">
            <div className="row">
                <DownIcon />
                Tag
            </div>
            <div className="row">
                {/* <DownIcon /> */}
            </div>

            <div className="ct__dropdown-wrapper outline">
                <div className="ct__dropdown-options">
                    {
                        data.map((item) => {
                            return (
                                <div className="ct__dropdown-option">
                                    <div className="row">
                                        {item.prefixIcon}
                                        {item.label}
                                    </div>
                                    <div className="row">
                                        {item.suffixIcon}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}