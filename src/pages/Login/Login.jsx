import { Link, useNavigate } from "react-router-dom";
import { CtButton } from "../../shared/components/Button/Button";
import { CtInput, CtPassword } from "../../shared/components/Input/Input";

import "./Login.scss";
import { useEffect, useState } from "react";
import { validateEmail } from "../../shared/utils/validateEmail";
import { AuthService } from "../../shared/services/authService";

export const Login = ( ) => {
    const navigate = useNavigate();

    const [email, getEmailValue] = useState('');
    const handleEmailValue = (val) => {
        getEmailValue(val);
    }

    const [isEmailValid, setIsEmailValid] = useState(true);
    useEffect(() => {
        setIsEmailValid(validateEmail(email));
    }, [email])

    const [password, getPasswordValue] = useState('');
    const handlePasswordValue = (val) => {
        getPasswordValue(val);
    }

    const [isPasswordValid, setIsPasswordValid] = useState(true);

    useEffect(() => {
        if(password.length >= 8) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }, [password])

    const handleLogin = () => {
        if(isPasswordValid) {
            const user = {
                email: email,
                password: password,
            }
                
            AuthService.logIn(user)
                .then((res) => {
                    console.log(res);
                    navigate('/app');
                })
                .catch((err) => console.log(err));
        } else {
            console.warn("Can't create user!")
        }
        
    }

    return (
        <div className="login">
            <div className="login__row">
                <div className="login__left">
                    <h3>Login with your account</h3>
                    <p className="ct__desctiption">Work better with todoist.</p>
                    <CtInput data={{ label: "Email", required: true, getInput: (val) => handleEmailValue(val), description: isEmailValid ? "" : "Email is invalid", placeholder: "abc@domain.com" }} />
                    <CtPassword data={{ label: "Password", required: true, getInput: (val) => handlePasswordValue(val) }} />
                    <CtButton data={{description: "Login", btnType: "ct__btn-success", class:"ct__my-1"}} onClick={handleLogin}/>

                    <p className="ct__desctiption">
                        Don't have an account, <Link to={"/sign-up"}>create</Link>.
                    </p>
                </div>
                <div className="login__right">
                    <div className="bg-content">
                        {/* <h3 className="ct__text-white">Interactive Login</h3>
                        <div className="bg-action_btns row">
                            <ArrowIcon className="bg-action_btn" style={{transform: "rotateZ(90deg)"}}/>
                            <ArrowIcon className="bg-action_btn" style={{transform: "rotateZ(-90deg)"}}/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}