export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const phoneRegex =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const accessTokenLifeTime = 1000 * 60 * 60;

export const refreshTokenLifeTime = 1000 * 60 * 60 * 24 * 7;
