const contains = (first: string[], second: string[]): boolean => {
  const indexArray = first.map((el) => {
    return second.indexOf(el);
  });
  return indexArray.indexOf(-1) === -1;
};

export { contains };
