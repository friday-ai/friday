const randomStr = (minLength = 0, acc = ''): string => {
  if (acc.length <= minLength) {
    const str = Math.random().toString(36).slice(2);
    return randomStr(minLength, acc.concat(str));
  }

  return acc.slice(0, minLength);
};

export default randomStr;
