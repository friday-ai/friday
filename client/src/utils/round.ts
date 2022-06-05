const round = (number: number, precision = 2) => {
  return Number(Number.parseFloat(String(number)).toFixed(precision));
};

export default round;
