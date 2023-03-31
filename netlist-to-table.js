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
	const j1 = net.node.find(node => node.ref == 'P1');
	if (!j1) return null;
	if (!j1.pintype || NC.test(j1.pintype)) return null;

	// If we end up with a name that starts with '<' it was a
	// unnamed backplane pin reference. Use the ref and
	// pinfunction of the first node name of this net that is
	// not P1 instead.
	let name;
	if (net.name[0] === '<') {
	  const nameNode = net.node.find(node => node.ref != 'P1');
	  if (nameNode) name = `${nameNode.ref}-${nameNode.pinfunction}`;
	} else {
	  name = net.name.replace(/\s*<[^>]*>/g, '');
	}

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
