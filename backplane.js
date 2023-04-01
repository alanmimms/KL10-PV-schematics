'use strict';

const fs = require('fs');
const util = require('util');
const pegjs = require('pegjs');
const pegutil = require('pegjs-util');

const grammar = fs.readFileSync('./expr.pegjs', 'utf8');
const parser = pegjs.generate(grammar, {trace: false} );

const naturalSortCollator = new Intl.Collator('en', {numeric: true});


const {hasCACHE} = require('./options.js');

module.exports = {
// Module utilization for CPU bay is PDF p.10.
// 
// Option wire list is PDF p.555.
// * EMPTY 50Hz
// * EMPTY Cache avail
// * EMPTY Channel avail
// * ASSERT KL10-PV CPU
// * EMPTY? Master oscillator
// * ASSERT Serial number (12 bits) = 0o1234
//
// CRAM names PDF p.398.
  name: "KL10PV",
  hasCACHE,
  serialNumber: 0o1234,
  globalVars: {B: 1},
  slots: [
    null,							// 0 There is no slot #0
    null,							// 1 cables BC11A M919, BC20C M9006, BC20C M9006
    null,							// 2 cables BC20C M9006, BC20C M9006, spare
    null,							// 3 cables BC20C M9006, BC20C M9006, spare
    null,							// 4 TR0 E&C BUS TRAN M8516
    null,							// 5 TR0 E&C BUS TRAN M8516
    null,							// 6 TR0 E&C BUS TRAN M8516
    null,							// 7 TR0 S BUS TRAN M8519
    null,							// 8 TR0 S BUS TRAN M8519
    {module: "chc", dec: "M8533"},				// 9
    {module: "crc", dec: "M8535"},				// 10
    {module: "ccl", dec: "M8536"},				// 11
    {module: "ccw", dec: "M8534"},				// 12
    null,							// 13 BLANK
    {module: "mb0", dec: "M8517", vars: {N: 12}},		// 14
    {module: "mb0", dec: "M8517", vars: {N: 6}},		// 15
    {module: "mb0", dec: "M8517", vars: {N: 0}},		// 16
    hasCACHE ?							// 17
      {module: "cac", dec: "M8521"} :
      {module: "ch0", dec: "M8549YH"},
    null,							// 18 BLANK
    hasCACHE ?							// 19
      {module: "cac", dec: "M8521"} :
      {module: "ch0", dec: "M8549YH"},
    {module: "mbz", dec: "M8537"},				// 20
    {module: "mbx", dec: "M8529YA", vars: {N: 30}},		// 21
    {module: "mbc", dec: "M8531YA", vars: {N: 22}},		// 22
    {module: "csh", dec: "M8513YA", vars: {N: 22}},		// 23
    hasCACHE ?							// 24
      {module: "cac", dec: "M8521"} :
      {module: "ch0", dec: "M8549YH"},
    hasCACHE ?							// 25
      {module: "cac", dec: "M8521"} :
      {module: "ch0", dec: "M8549YH"},
    null,							// 26 BLANK
    hasCACHE ?							// 27
      {module: "cha", dec: "M8514"} :
      {module: "ch0a", dec: "M8549YE"},
    hasCACHE ?							// 28
      {module: "chx", dec: "M8515"} :
      {module: "ch0x", dec: "M8549YF"},
    {module: "pma", dec: "M8518YA"},				// 29
    {module: "pag", dec: "M8520YA"},				// 30
    {module: "pic", dec: "M8532"},				// 31
    {module: "clk", dec: "M8526YA", vars: {N: 30}},		// 32
    {module: "mtr", dec: "M8538", vars: {N: 18}},		// 33
    {module: "apr", dec: "M8545"},				// 34
    {module: "con", dec: "M8525", vars: {N: 18}},		// 35
    {module: "ctl", dec: "M8543", vars: {N: 24}},		// 36
    null,							// 37 BLANK
    {module: "vma", dec: "M8542", vars: {N: 13}},		// 38
    {module: "edp", dec: "M8512", vars: {N: 30}},		// 39
    {module: "crm", dec: "M8548", vars: {N: 16, M: 30}},	// 40
    {module: "edp", dec: "M8512", vars: {N: 24}},		// 41
    {module: "crm", dec: "M8548", vars: {N: 12, M: 24}},	// 42
    {module: "edp", dec: "M8512", vars: {N: 18}},		// 43
    {module: "crm", dec: "M8548", vars: {N: 8, M: 18}},		// 44
    {module: "cra", dec: "M8541", vars: {N: 0}},		// 45
    {module: "shm", dec: "M8540"},				// 46
    {module: "mcl", dec: "M8544", vars: {N: 18}},		// 47
    {module: "ird", dec: "M8522", vars: {N: 12}},		// 48
    {module: "edp", dec: "M8512", vars: {N: 12}},		// 49
    {module: "crm", dec: "M8548", vars: {N: 4, M: 12}},		// 50
    {module: "edp", dec: "M8512", vars: {N: 6}},		// 51
    {module: "crm", dec: "M8548", vars: {N: 0, M: 6}},		// 52
    {module: "edp", dec: "M8512", vars: {N: 0}},		// 53
    {module: "scd", dec: "M8524", vars: {N: 2}},		// 54
  ],
};

const signals = {};
const BP = module.exports;

// Decorate each slot with its pin definitions if they exist as, e.g.,
// module of name like M8512.js. During this process, substitute the
// values of the `vars` list in the signal names.
BP.slots.forEach((slot, slotNumber) => {

  if (slot) {
    const slotVars = {...slot.vars, ...BP.globalVars};
    const modName = `./${slot.dec}.js`;

    if (fs.existsSync(modName)) {
      const pinsTemplate = require(modName);

      if (pinsTemplate) {
	console.log(`// SLOT ${slotNumber}`);

	// Replace references to the names in `varName` in each signal
	// with the value for the variable and evaluate and substitute
	// the result of any expressions in the result. XXX
	slot.pins = Object.entries(pinsTemplate).reduce((cur, [name, signal]) => {
	  const parseResult = pegutil.parse(parser, signal, {vars: slotVars});

	  if (parseResult.error !== null) {
	    console.error(`\
ERROR: signal syntax
${pegutil.errorMessage(parseResult.error, true).replace(/^/mg, 'ERROR: ')}`);
	  }

	  if (false) {		// Verbose
	    console.log(`
${name}: signal='${signal}', vars=${util.inspect(slotVars)}
     result='${parseResult.ast}'`);
	  } else {
	    console.log(`${name}: ${parseResult.ast}`);
	  }

	  signal = parseResult.ast;
	  cur[name] = signal;
	  if (!signals[signal]) signals[signal] = [];
	  signals[signal].push({
	    slot,
	    slotNumber,
	    pin: name,
	  });
	  return cur;
	}, {});
      }
    }
  }
});


console.log(`

Signals:
${Object.entries(signals)
  .sort(sigEntSort)
  .map(([signal, o]) => `${signal}: ${o.map(sp => `${sp.slot.module}.${sp.slotNumber}.${sp.pin}`)}`).join('\n')}
`);


function sigEntSort(s1, s2) {
  return naturalSortCollator.compare(s1[0], s2[0]);
}
