import JsBarcode from "jsbarcode";

// Check digit calculation for EAN13
const calculateEAN13CheckDigit = (code: string) => {
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    sum += i % 2 === 0 ? parseInt(code[i], 10) : parseInt(code[i], 10) * 3;
  }
  return (10 - (sum % 10)) % 10;
};

// Check digit calculation for UPC
const calculateUPCCheckDigit = (code: string) => {
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    sum += i % 2 === 0 ? parseInt(code[i], 10) * 3 : parseInt(code[i], 10);
  }
  return (10 - (sum % 10)) % 10;
};

// Check digit calculation for EAN8
const calculateEAN8CheckDigit = (code: string) => {
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    sum += i % 2 === 0 ? parseInt(code[i], 10) * 3 : parseInt(code[i], 10);
  }
  return (10 - (sum % 10)) % 10;
};

export const generateBarcode = (format: string): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nums = "0123456789";

  let result = "";
  switch (format) {
    case "EAN13":
      for (let i = 0; i < 12; i++)
        result += nums.charAt(Math.floor(Math.random() * nums.length));
      result = result + calculateEAN13CheckDigit(result);
      break;
    case "UPC":
      for (let i = 0; i < 11; i++)
        result += nums.charAt(Math.floor(Math.random() * nums.length));
      result = result + calculateUPCCheckDigit(result);
      break;
    case "EAN8":
      for (let i = 0; i < 7; i++)
        result += nums.charAt(Math.floor(Math.random() * nums.length));
      result = result + calculateEAN8CheckDigit(result);
      break;
    case "CODE39":
    case "ITF14":
    default:
      for (let i = 0; i < 10; i++)
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      break;
  }
  return result;
};
