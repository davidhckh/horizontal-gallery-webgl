export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

export function map(
  number,
  min1,
  max1,
  min2,
  max2,
  round = false,
  constrainMin = true,
  constrainMax = true
) {
  if (constrainMin && number < min1) {
    return min2;
  }

  if (constrainMax && number > max1) {
    return max2;
  }

  const number1 = (number - min1) / (max1 - min1);
  const number2 = number1 * (max2 - min2) + min2;

  if (round) {
    return Math.round(number2);
  }

  return number2;
}
