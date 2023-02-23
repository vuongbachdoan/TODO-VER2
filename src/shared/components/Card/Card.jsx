import { CtButton } from '../Button/Button';
import './Card.scss';

export const CtCard = ({ data }) => {
    const handleCancel = () => {
        data.onCancel()
    }

    const handleSubmit = () => {
        data.onSubmit()
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
                    <CtButton onClick={handleCancel} data={{ description: 'Cancel', btnType: 'ct__btn-danger' }} />
                    <CtButton onClick={handleSubmit} data={{ description: 'Done' }} />
                </div>
            </div>
        </div>
    );
}
