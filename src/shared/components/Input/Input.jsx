import { useState } from "react";
import { ReactComponent as EyeIcon } from "../../../assets/images/icon-eye.svg";
import { ReactComponent as EyeCrossIcon } from "../../../assets/images/icon-eye_cross.svg";

import './Input.scss';
import { useEffect } from "react";

export const CtPassword = ({ data }) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const tooglePassword = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    const [errorMessage, setErrorMessage] = useState("");

    const [passwordValue, setPasswordValue] = useState("");
    useEffect(() => {
        if(passwordValue.length >= 8 || passwordValue.length === 0) {
            setErrorMessage(null);
        } else {
            setErrorMessage("Password must be greater than 8 characters");
        }
    }, [passwordValue])
    const handlePasswordValue = (val) => {
        setPasswordValue(val);
        data.getInput(val);
    }

    return (
        <div className="ct__input-wrapper">
            <h6 className="ct__input-label">
                {data.label} <span style={{ color: "red" }}>{data.required ? "*" : ""}</span>
            </h6>
            <div className="ct__input-field">
                <input className="ct__input-text" type={`${isPasswordVisible ? "text" : "password"}`} placeholder={data.placeholder} onChange={(e) => handlePasswordValue(e.target.value)}/>
                <div className="ct__input-suffix_icon">
                    {isPasswordVisible && <EyeIcon className="cursor-pointer" onClick={tooglePassword} />}
                    {!isPasswordVisible && <EyeCrossIcon className="cursor-pointer" onClick={tooglePassword} />}
                </div>
            </div>
            <p className="ct__input-description">
                {errorMessage ?? data.description}
            </p>
        </div>
    );
}

export const CtInput = ({ data }) => {
    const handleInputValue = (val) => {
        data.getInput(val)
    }

    return (
        <div className={`ct__input-wrapper ${data.class}`}>
            <h6 className="ct__input-label">
                {data.label} <span style={{ color: "red" }}>{data.required ? "*" : ""}</span>
            </h6>
            <div className="ct__input-field">
                <div className="ct__input-prefix_icon">
                    {data.suffixIcon}
                </div>
                <input className="ct__input-text" type="text" placeholder={data.placeholder} onChange={(e) => handleInputValue(e.target.value)} />
                <div className="ct__input-suffix_icon">
                    {data.suffixIcon}
                </div>
            </div>
            <p className="ct__input-description">
                {data.description}
            </p>
        </div>
    );
}