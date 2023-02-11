import { useDispatch } from 'react-redux';
import './Button.scss';
import { setTasks } from '../../../pages/App/action';

export const CtButton = ({ data }) => {
    const dispatch = useDispatch();
    const handeClick = () => {
        dispatch(setTasks("Learn the basics with the easy-to-follow Getting Started Guide 🔗"))
    }

    return (
        <div className={`${data.btnType} ct__button outline prefixIcon cursor-pointer`} onClick={handeClick}>
            <div className="row">
                {data.prefixIcon}
                {data.description}
            </div>
            <div className="row">
                {data.suffixIcon}
            </div>
        </div>
    );
}