{
  const util = require('util');
  const doLOG = false;

  function LOG(m1, o) {
    if (doLOG) console.error(m1, util.inspect(o, {depth: 99}));
    return o;
  }
}

SIGNAL
  = o:( s:SIGNALNAME / e:CONDSUBST / e:SUBST )+	{ return LOG('SIGNAL', o.flat().join('')); }

CONDSUBST
  = '$' '{' e:EXPR _ a:( ',' _ s:SIGNALNAME { return s} )+ '}'
						{ return LOG('CONDSUBST', a[e-1]); }

SUBST
  = '$' '{' e:EXPR '}'				{ return LOG('SUBST', e); }

EXPR = addOp

addOp
  = L:mulOp '+' R:addOp				{ return LOG('addOp+', L + R); }
  / L:mulOp '-' R:addOp				{ return LOG('addOp-', L - R); }
  / mulOp

mulOp
  = L:prim '*' R:mulOp				{ return LOG('mulOp*', L * R); }
  / L:prim '/' R:mulOp				{ return LOG('mulOp/', Math.floor(L / R)); }
  / prim

prim
  = VAR
  / NUMBER
  / '(' a:addOp ')'				{ return LOG('()', a); }

VAR
  = _ n:$([A-Za-z_] [A-Za-z0-9_]*) _		{ LOG('VAR', n); return options.vars[n]; }

NUMBER
  = _ n:[0-9]+ _				{ return LOG('NUMBER', parseInt(n.join(''), 10)); }

SIGNALNAME
  = n:$([-A-Za-z_#=<>.!~ ] [-A-Za-z0-9_#=<>.!~ ]* )
						{ return LOG('SIGNALNAME', n); }

_ = [ \t\n\r]*					{ return null; }
