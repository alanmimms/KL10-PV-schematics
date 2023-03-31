'use strict';
const fs = require('fs');
const util = require('util');
const kicadNetlistToJson = require('kicad-netlist-to-json');

const inName = process.argv[2];
const outName = process.argv[3];
const rawNetlist = fs.readFileSync(inName, 'utf8');
const exported = kicadNetlistToJson(rawNetlist);
const nets = exported['export'].nets.net;

const NC = /\bno_connect\b/;

const netList = nets
      .reduce((cur, net) => {
	net.node = Array.isArray(net.node) ? net.node : [net.node];
	const p1 = net.node.find(node => node.ref == 'P1');
	if (!p1) return cur;
	if (!p1.pintype || NC.test(p1.pintype)) return cur;

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

	cur[p1.pinfunction] = name.replace(/{slash}/g, '/');
	return cur;
      }, {});

fs.writeFileSync(outName, `\
'use strict';
module.exports = ${util.inspect(netList, {maxStringLength: 9999999, maxArrayLength: 9999})};
`, 'utf8');
