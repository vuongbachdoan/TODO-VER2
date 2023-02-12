import { CtButton } from '../Button/Button';
import './Card.scss';

export const CtCard = ({ data }) => {
    const handleFunc = () => {
        data.function()
    }

    return (
        <div className={`${data.class} ct__wrap_card`}>
            <div className="ct__card_title">
                <p>{data.title}</p>
                {data.subTitle} {/** For custom link or icon */}
            </div>
            <div className="ct__card_body">
                {data.body}
                <div className="ct__card_footer row">
                    <CtButton onClick={handleFunc} data={{ description: 'Cancel', btnType: 'ct__btn-danger' }} />
                    <CtButton onClick={handleFunc} data={{ description: 'Add task' }} />
                </div>
            </div>
        </div>
    );
}
