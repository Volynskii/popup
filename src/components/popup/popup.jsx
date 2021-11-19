import React, {useRef, useState} from 'react';
import './popup.scss';
import cx from "classnames";
import NumberWithSpaces from "../../helpers/NumSpaces";
import Validate from "../../helpers/Validate";

const Popup = ({handleClosePopup}) => {

    const inputEl = useRef(null);
    const [salary,setSalary] = useState('');

    const handleChangeInput = (sum) => {
        const pureSum = sum.replace('₽', '');
        setSalary(pureSum.replace(/\s+/g, ''))
    };

    const COST_OF_HOUSE = 2000000;
    const TAX_DEDUCTION = COST_OF_HOUSE * 0.13;

    const [allPayments,setAllPayments] = useState([]);

    const handleChangePayments = (salary) => {
        if(salary < 1000 || salary === '') {
            return;
        }
        setAllPayments(handleCalculatePayments(salary));
    };

    const handleCalculatePayments = (salary) => {
        if (salary < 0) {
            return
        }
        const payments = [];
        const ONE_YEAR_PAYMENT = salary * 12 * 0.13;
        let maxTaxes = TAX_DEDUCTION;
        while (maxTaxes > ONE_YEAR_PAYMENT) {
            payments.push(ONE_YEAR_PAYMENT);
            maxTaxes = maxTaxes - ONE_YEAR_PAYMENT;
        }
        return [...payments, maxTaxes];
    };

    return (
        <>
            <article className="popup">
                <div className="popup__wrapper">
                    <span className="close-button" onClick={handleClosePopup}/>
                    <span className="popup__title">Налоговый вычет</span>
                    <p className="popup__description">Используйте налоговый вычет
                        чтобы погасить ипотеку досрочно. Размер
                        налогового вычета составляет
                        не более 13% от своего
                        официального годового дохода.</p>

                    <span className="popup__input-title">Ваша зарплата в месяц</span>

                    <div className="input-container">
                        <input
                            ref={inputEl}
                            value={`${NumberWithSpaces(salary)}`}
                            onChange={(evt) => handleChangeInput(evt.target.value)}
                            onPaste={e => e.preventDefault()}
                            onKeyPress={(evt) => Validate(evt)}
                            onBlur={() => inputEl.current !== document.activeElement ?
                                inputEl.current.value = `${NumberWithSpaces(salary)} ${salary > 0 ?'₽': ''}`
                                : ''}
                            onFocus={() => inputEl.current.value = `${NumberWithSpaces(salary)}`}
                            placeholder="Введите данные" className="input" type="text"
                            maxLength={8}
                        />

                    </div>

                    <span onClick={() => handleChangePayments(salary)}
                        className="popup__calculate-button">Рассчитать</span>

                    <article className="popup__payments">
                        {allPayments.map((item, index) => {
                            const endOfItemName = () => {
                                if (index + 1 === 2) {
                                    return 'ой'
                                }
                                if (index + 1 === 3) {
                                    return 'ий'
                                }
                                return 'ый'
                            };
                            return (
                                <div key={index} className="popup__payments__item">
                                    <input defaultChecked={true}  type="checkbox" className="subscribeNews"
                                            id={`subscribeNews${index}`}
                                           name="subscribe"
                                           value="newsletter"/>
                                    <label htmlFor={`subscribeNews${index}`}>{item} рублей
                                        в {index + 1}-{endOfItemName()} год</label>
                                </div>
                            )
                        })}
                    </article>
                    <article className="popup__wrapper-filter-buttons">
                        <span className="popup__calculate-button clr-black">Что уменьшаем?</span> <br/>

                        <div className="popup__filter-buttons">
    <span
        className={cx(`popup__filter-buttons__button`, {
            [`active-button`]: true})}>Платеж</span>
                            <span className="popup__filter-buttons__button">Срок</span>
                        </div>
                    </article>
                    <button onClick={() => handleChangePayments(salary)}
                            className="popup__add-button">Добавить
                    </button>
                </div>
            </article>
        </>
    );
};

export default Popup;
