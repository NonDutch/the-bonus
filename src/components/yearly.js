import React, { useState } from "react";
import months, { initialState } from "../utils/months";
import BASE_BONUS, { calculateBonus } from "../handlers/calculate-bonus";

function Monthly() {
  const [partTime, setPartTime] = useState(false);
  const [hours, setHours] = useState(1700);

  const setWorkedHours = e => {
    const { value } = e.target;
    if (value.length > 4) return;

    setHours(value);
  };

  return (
    <>
      <h1 className="dashboard__title">Fill the yearly total hours</h1>

      <div className="dashboard__items dashboard__items--single">
        <div className="dashboard__item dashboard__item--single">
          <input
            type="number"
            className="dashboard__input dashboard__input--single"
            value={hours}
            onChange={setWorkedHours}
          />
        </div>
      </div>

      {/* <div className="dashboard__actions">
        <label>
          <input
            type="checkbox"
            onChange={e => setPartTime(e.target.checked)}
            checked={partTime}
          />
          <span className="dashboard__predict">Part-time</span>
        </label>
      </div> */}

      <h2 className="dashboard__result">
        {calculateBonus(hours).toLocaleString("nl-NL", {
          style: "currency",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          currency: "EUR"
        })}
        -
      </h2>
    </>
  );
}

export default Monthly;
