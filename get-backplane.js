'use strict';

const fs = require('fs');

const outName = 'backplane.dp.list';

const RE = /"(?<net>[^"<]*)\<(?<pin>[A-F][A-Z][12])\>"/;
const fileNames = 'DP01,DP02,DP03,DP04,M8512-0-DP'.split(',').map(f => `${f}.kicad_sch`);
const nets = {};


fileNames.forEach(fileName => {

  const content = fs.readFileSync(fileName, 'utf-8');

  content.split(/\n/).forEach(line => {
    const m = line.match(RE);
    if (!m) return;

    let {net, pin} = m.groups;
    if (!net) return;
    net = net.trim();

    if (nets[pin] && nets[pin] != net) {
      console.error(`Pin <${pin}> defined with net "${nets[pin]}" and net "${net}"`);
    }

    nets[pin] = net;
  });
});


let lastSplit = '';
fs.writeFileSync(outName, `\
Sorted by pin:\
${Object.keys(nets)
  .sort(pinSort)
  .map(k => {
    const split = k[0] + k[2];
    const s = `${lastSplit !== split ? '\n' : ''}${k}: ${nets[k]}`;
    lastSplit = split;
    return s;
  })
  .join('\n')}

Sorted by signal:
${Object.entries(nets).sort(signalSort).map(([k, v]) => `${k}: ${v}`).join('\n')}
`, {
  encoding: 'utf8',
  mode: 0o664,
  flag: 'w',
});


function pinSort(p1, p2) {
  const s1 = p1[0].concat(p1[2], p1[1]);
  const s2 = p2[0].concat(p2[2], p2[1]);
  return s1 > s2 ? 1 : (s1 == s2 ? 0 : -1);
}


function signalSort(p1, p2) {
  const s1 = p1[1];
  const s2 = p2[1];
  return s1 > s2 ? 1 : (s1 == s2 ? 0 : -1);
}
