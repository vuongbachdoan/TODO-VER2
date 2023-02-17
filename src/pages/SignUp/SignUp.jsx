import { Link, useNavigate } from "react-router-dom";
import { CtButton } from "../../shared/components/Button/Button";
import { CtInput, CtPassword } from "../../shared/components/Input/Input";
import { useState } from "react";
import { useEffect } from "react";
import { validateEmail } from "../../shared/utils/validateEmail";
import { AuthService } from "../../shared/services/authService";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/appReducer";

export const SignUp = () => {
    const dispatch = useDispatch();
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
    const [passwordConfirmed, getConfirmPasswordValue] = useState('');
    const handleConfirmPasswordValue = (val) => {
        getConfirmPasswordValue(val);
    }

    useEffect(() => {
        if(password.length >= 8 && passwordConfirmed.length >=8 && passwordConfirmed === password) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }, [password, passwordConfirmed])

    const createUser = () => {
        if(isPasswordValid) {
            const user = {
                email: email,
                password: password,
            }
            AuthService.signUp(user)
                .then((res) => {
                    console.log(res.data);
                    dispatch(setToken(res.data));
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
                    <h3>Create your account</h3>
                    <p className="ct__desctiption">Work better with todoist.</p>
                    <CtInput data={{ label: "Email", required: true, getInput: (val) => handleEmailValue(val), description: isEmailValid ? "" : "Email is invalid", placeholder: "abc@domain.com" }} />
                    <CtPassword data={{ label: "Password", required: true, getInput: (val) => handlePasswordValue(val) }} />
                    <CtPassword data={{ label: "Confirm password", required: true, getInput: (val) => handleConfirmPasswordValue(val), description: isPasswordValid || passwordConfirmed.length === 0 ? "" : "Invalid password" }} />
                    {/* <Link to={"/app"}><CtButton data={{ description: "Sign Up", btnType: "ct__btn-success", class: "ct__my-1" }} onClick={createUser} /></Link> */}
                    <CtButton data={{ description: "Sign Up", btnType: "ct__btn-success", class: "ct__my-1" }} onClick={createUser} />

                    <p className="ct__desctiption">
                        Have an account, <Link to={"/"}>login</Link>.
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