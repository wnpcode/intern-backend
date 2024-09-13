const generatePassword = (
  passwordLength,
  useCapitalAToZ,
  useLowerAToZ,
  useNumeric
) => {
  if (passwordLength < 3) {
    return "(invalid)";
  }

  if (!useCapitalAToZ && !useLowerAToZ && !useNumeric) {
    return "(invalid)";
  }

  let result = "";

  const method = randomizeUntil(3);

  if (method === 0 && useCapitalAToZ) {
    const randomNumber = randomizeUntil(26);
    const sumWithLetterA = "A".charCodeAt() + randomNumber;
    const newCharacter = String.fromCharCode(sumWithLetterA);
    result += newCharacter;
  }

  if (method === 1 && useLowerAToZ) {
    const randomNumber = randomizeUntil(26);
    const sumWithLowerA = "a".charCodeAt() + randomNumber;
    const newCharacter = String.fromCharCode(sumWithLowerA);
    result += newCharacter;
  }

  if (method === 2 && useNumeric) {
    const randomNumber = randomizeUntil(10);
    const sumWithLetterZero = "0".charCodeAt() + randomNumber;
    const newCharacter = String.fromCharCode(sumWithLetterZero);
    result += newCharacter;
  }

  return result;
};

const randomizeUntil = (untilNumber) => {
  return Math.floor(Math.random() * untilNumber);
};

module.exports = { generatePassword };
