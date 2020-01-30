import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import months, { initialState } from "../utils/months";
import BASE_BONUS, {
  calculateBonusPerMonth
} from "../handlers/calculate-bonus";

function Monthly({ addHours, getInitialHours }) {
  const [hours, setHours] = useState(initialState);
  const [latestHours, setLatestHours] = useState();
  const [predict, setPredict] = useState(false);
  const [debouncedHours] = useDebounce(latestHours, 500);

  const setMonth = (month, event) => {
    const { value } = event.target;

    if (value.length > 3) return;

    setHours({
      ...hours,
      [month]: value ? +value : ""
    });

    setLatestHours({ month, value });
  };

  useEffect(() => {
    const loadInitialHours = async () => setHours(await getInitialHours());
    loadInitialHours();
  }, []);

  useEffect(() => {
    if (debouncedHours?.month) {
      const { value, month } = debouncedHours;
      addHours(month, value ? +value : 0);
    }
  }, [debouncedHours]);

  const isCurrentMonth = month => {
    const monthName = months[new Date().getMonth()];
    return month === monthName;
  };

  const currentMonthClass = month =>
    isCurrentMonth(month) ? "dashboard__current" : "";

  return (
    <>
      <h1 className="dashboard__title">Fill your worked hours</h1>

      <div className="dashboard__items">
        {months.map(month => (
          <div className="dashboard__item" key={month}>
            <strong
              className={`dashboard__item-name ${currentMonthClass(month)}`}
            >
              {month}
            </strong>

            <input
              type="number"
              className="dashboard__input"
              value={hours[month]}
              onChange={event => setMonth(month, event)}
              autoFocus={isCurrentMonth(month)}
            />
          </div>
        ))}
      </div>

      <div className="dashboard__actions">
        <label title="We will predict the worked hours based in the hours you already worked. PS: The `0` will be not considered as valid, use 1 hour at least.">
          <input
            type="checkbox"
            onChange={e => setPredict(e.target.checked)}
            checked={predict}
          />
          <span className="dashboard__predict">Predict</span>
        </label>
      </div>

      <h2 className="dashboard__result">
        {calculateBonusPerMonth(hours, predict).toLocaleString("nl-NL", {
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
