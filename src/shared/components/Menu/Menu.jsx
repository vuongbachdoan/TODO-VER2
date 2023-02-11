import './Menu.scss';

export const CtMenu = ({ data }) => {
    return (
        <div className="ct__menu">
            {
                data.map((item) => {
                    return (
                        <div className="ct__menu-item prefixIcon suffixIcon">
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