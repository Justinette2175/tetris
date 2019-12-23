export const COLORS = {
  red: 0xf25346,
  white: 0xd8d0d1,
  orange: 0xf7d9aa,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

export const DIRECTIONS = Object.freeze({
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
});

export const normalize = (v, vmin, vmax, tmin, tmax) => {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
};

export const CUBE_WIDTH = 10;
export const ARCH_WIDTH = 20;
export const ARCH_HEIGHT = 30;

export default {
  COLORS,
  normalize,
  CUBE_WIDTH,
  DIRECTIONS
};
