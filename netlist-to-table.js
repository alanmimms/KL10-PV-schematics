'use strict';
const fs = require('fs');
const util = require('util');
const kicadNetlistToJson = require('kicad-netlist-to-json');

const rawNetlist = fs.readFileSync('M8512-0-DP.net', 'utf8');
const exported = kicadNetlistToJson(rawNetlist);
const nets = exported['export'].nets.net;

const NC = /\bno_connect\b/;

const netList = nets
      .map(net => {
	net.node = Array.isArray(net.node) ? net.node : [net.node];
	const j1 = net.node.find(node => node.ref == 'J1');
	if (!j1) return null;
	if (!j1.pintype || NC.test(j1.pintype)) return null;
	const name = net.name;
//	console.error(`${util.inspect(j1)}`);
	return `${j1.pinfunction}: "${name}",`
      })
      .filter(e => e !== null)
      .sort(pinSort);

console.log(`${netList.join('\n')}`);


function pinSort(p1, p2) {
  const s1 = p1[0].concat(p1[2], p1[1]);
  const s2 = p2[0].concat(p2[2], p2[1]);
  return s1 > s2 ? 1 : (s1 == s2 ? 0 : -1);
}
