'use strict';

const fs = require('fs');
const util = require('util');

const BP = require('./backplane.js');

const pinLetters = `A,C,D,E,F,J,K,L,M,N,P,R,S,V`.split(',');

const pinList = 'A,B,C,D,E,F'
      .split(',')
      .map(section => ['1', '2']
	   .map(side => pinLetters
		.map(letter => `${section}${letter}${side}`)))

console.log('pinList=', util.inspect(pinList));


const netlist = BP.slots.map((slot, slotNo) => {
  if (!slot) return null;

  return {
    slotNo,
    pins: {}
  };
});
