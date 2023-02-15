import { Link } from "react-router-dom";
import { CtButton } from "../../shared/components/Button/Button";
import { CtInput, CtPassword } from "../../shared/components/Input/Input";

import "./Login.scss";

export const Login = ( ) => {

    return (
        <div className="login">
            <div className="login__row">
                <div className="login__left">
                    <h3>Login with your account</h3>
                    <p className="ct__desctiption">Work better with todoist.</p>
                    <CtInput data={{label: "Email", required: true}}/>
                    <CtPassword data={{label: "Password", required: true}}/>
                    <Link to="/app"><CtButton data={{description: "Login", btnType: "ct__btn-success", class:"ct__my-1"}}/></Link>

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