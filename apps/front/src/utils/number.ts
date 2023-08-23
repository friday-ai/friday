export const round = (number: number, precision = 2) => {
  return Number(Number.parseFloat(String(number)).toFixed(precision));
};

// To avoid linter errors, but temporary
export default round;
