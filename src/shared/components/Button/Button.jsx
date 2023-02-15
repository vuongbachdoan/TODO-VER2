import './Button.scss';

export const CtButton = ({ data, onClick }) => {
    const handeClick = () => {
        onClick()
    }

    return (
        <div className={`${data.btnType} ${data.class} ct__button outline prefixIcon cursor-pointer`} onClick={handeClick}>
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