import { useState } from "react";
import { ReactComponent as EyeIcon } from "../../../assets/images/icon-eye.svg";
import { ReactComponent as EyeCrossIcon } from "../../../assets/images/icon-eye_cross.svg";

import './Input.scss';

export const CtPassword = ({ data }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const tooglePassword = () => {
        setPasswordVisible(!isPasswordVisible);
    }
    return (
        <div className="ct__input-wrapper">
            <h6 className="ct__input-label">
                {data.label} <span style={{ color: "red" }}>{data.required ? "*" : ""}</span>
            </h6>
            <div className="ct__input-field">
                <input className="ct__input-text" type={`${isPasswordVisible ? "text" : "password"}`} placeholder={data.placeholder} />
                <div className="ct__input-suffix_icon">
                    {isPasswordVisible && <EyeIcon className="cursor-pointer" onClick={tooglePassword} />}
                    {!isPasswordVisible && <EyeCrossIcon className="cursor-pointer" onClick={tooglePassword} />}
                </div>
            </div>
        </div>
    );
}

export const CtInput = ({ data }) => {
    return (
        <div className={`ct__input-wrapper ${data.class}`}>
            <h5 className="ct__input-label">
                {data.label} <span style={{ color: "red" }}>{data.required ? "*" : ""}</span>
            </h5>
            <div className="ct__input-field">
                <div className="ct__input-prefix_icon">
                    {data.suffixIcon}
                </div>
                <input className="ct__input-text" type="text" placeholder={data.placeholder} />
                <div className="ct__input-suffix_icon">
                    {data.suffixIcon}
                </div>
            </div>
        </div>
    );
}