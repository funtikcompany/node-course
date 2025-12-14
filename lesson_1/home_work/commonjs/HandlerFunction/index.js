'use strict';

const returnCurrentName = (url, listOfNames) => {
  const key = url.replace('/', '');
  return `Hello ${key ? listOfNames[key] ?? 'World' : 'World'}`;
};

module.exports = returnCurrentName;
