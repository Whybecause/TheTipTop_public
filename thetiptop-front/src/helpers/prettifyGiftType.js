export const prettifyGiftType = (str) => {
  if (str === undefined) {
    return '';
  }
  const value = str.replace(/-/g, ' ').replace(/the/g, 'thé').split(' ');
  const final = value.map((t) => {
    return t[0].toUpperCase() + t.substring(1);
  });
  return final.join(' ');
};
