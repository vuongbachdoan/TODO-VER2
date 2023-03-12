import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/images/icon-search.svg";

import "./SearchField.scss";

export const SearchField = () => {
    const [isFocusing, setFocusing] = useState(false);
    const handleFocusing = (val) => {
        setFocusing(val);
    }

    return (
        <div className={`${isFocusing ? "ct__focusing" : ""} ct__search-field`}>
            <SearchIcon />
            <input className="ct__search-input" type="text" placeholder='Search' onFocus={() => handleFocusing(true)} onBlur={() => handleFocusing(false)}/>
        </div>
    );
}