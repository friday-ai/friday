const contains = (first: string[], second: string[]): boolean => {
  const indexArray = first.map((el) => {
    return second.indexOf(el);
  });
  return indexArray.indexOf(-1) === -1;
};

// eslint-disable-next-line import/prefer-default-export
export { contains };
