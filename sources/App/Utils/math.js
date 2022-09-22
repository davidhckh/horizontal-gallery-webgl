import gsap from "gsap";

export function clamp(number, min, max) {
  return gsap.utils.clamp(min, max, number);
}

export function lerp(p1, p2, t) {
  return gsap.utils.interpolate(p1, p2, t);
}

export function map(valueToMap, inMin, inMax, outMin, outMax) {
  return gsap.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap);
}
