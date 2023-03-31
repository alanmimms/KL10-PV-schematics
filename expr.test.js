const fs = require('fs');
const util = require('util');
const pegjs = require('pegjs');

const grammar = fs.readFileSync('./expr.pegjs', 'utf8');
const parser = pegjs.generate(grammar, {trace: false} );

const vars = {N: 3, M: 4321};   // XXX for testing

//const text = 'ABC abc <> #42 this is M=${M} ${N/6+1, one, two, three, four, five, six} END';
const text = 'ABC ${N,one,two,three,four,five,six,seven,eight,nine,ten} ${(M+7)/2}';
console.log(`result=`, util.inspect(parser.parse(text, {vars}), {depth: 99}));

