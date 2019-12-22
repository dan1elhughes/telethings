// Convert booleans to numbers in the input object.
module.exports = obj => {
  const copy = { ...obj };

  for (const [key, value] of Object.entries(copy)) {
    if (typeof value === "boolean") {
      copy[key] = value ? 1 : 0;
    }
  }

  return copy;
};
