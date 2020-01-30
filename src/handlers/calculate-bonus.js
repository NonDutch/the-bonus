import {
  COMPANY_BASE_BONUS,
  calculateBonus as calcBonus
} from "../config/bonus-scheme";

const getNumber = n => (Number.isInteger(n) ? n : 0);

function getTotalHours(hours, predict) {
  const values = Object.values(hours);

  if (predict) {
    const totalFilled = values.filter(hour => hour !== 0);
    const hoursSum = totalFilled.reduce((acc, val) => acc + getNumber(val), 0);
    const monthsWorked = totalFilled.length;
    const average = hoursSum / monthsWorked;

    return average * 12;
  }

  return values.reduce((acc, val) => acc + getNumber(val), 0);
}

export function calculateBonus(hours) {
  return calcBonus(hours);
}

export function calculateBonusPerMonth(hours, predict) {
  const totalHours = getTotalHours(hours, predict);
  return calculateBonus(totalHours);
}

export default COMPANY_BASE_BONUS;
