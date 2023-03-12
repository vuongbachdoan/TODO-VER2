import './Menu.scss';

export const CtMenu = ({ data, onClick }) => {
    const handleClick = (val) => {
        onClick(val);
    }
    return (
        <div className="ct__menu">
            {
                data.map((item, index) => {
                    return (
                        <div key={index} className="ct__menu-item prefixIcon suffixIcon" onClick={()=>handleClick(item)}>
                            <div className="row">
                                {item.prefixIcon}
                                {item.description}
                            </div>
                            <div className="row">
                                {item.suffixIcon}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}