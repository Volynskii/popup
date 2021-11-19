import React, {useState} from "react";
import './main-page.scss';
import Popup from "../components/popup/popup";

export const MainPage = () => {

    const [isOpen,setIsOpen] = useState(true);
    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
<>
    <div className={!isOpen ? 'red-background': ''}>
        {!isOpen &&
        (
            <span className="red-square" onClick={handleOpenPopup}>
        <p>Налоговый вычет</p>
    </span>
        )}
        {isOpen &&
        (
           <Popup
               handleClosePopup={handleClosePopup}
           />
        )}
    </div>
        </>
    );
};
export default MainPage;
