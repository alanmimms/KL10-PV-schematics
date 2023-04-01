'use strict';
module.exports = {
  AR1: '# ${N+0} H',
  AP1: '# ${N+1} H',
  BA1: '# ${N+2} H',
  AP2: '# ${N+3} H',
  AV2: '# ${N+4} H',
  AU2: '# ${N+5} H',
  DK2: '${(N+199)/100,AD 34 H,ADX ${N-2} H}',
  ES2: '${(N+199)/100,AD 35 H,AX ${N-1} H}',
  CS2: '${(N+199)/100,ADX 34 H,MQ ${N-2} H}',
  DF2: '${(N+199)/100,ADX 35 H,MQ ${N-1} H}',
  BS2: '${(N+199)/100,HI,NC}',
  CN2: '${B,GND ECL,GND CLK}',
  AA2: '${B,NC,${N/6+1,GND ECL,GND ECL,GND ECL,GND CLK TIEDOWN,GND ECL,GND ECL}',
  AV1: '${B,NC,GND ECL}',
  BA2: '${B,NC,GND ECL}',
  BV1: '${B,NC,GND ECL}',
  CA2: '${B,NC,GND ECL}',
  CV1: '${B,NC,GND ECL}',
  DA2: '${B,NC,GND ECL}',
  DV1: '${B,NC,GND ECL}',
  EA2: '${B,NC,GND ECL}',
  EV1: '${B,NC,GND ECL}',
  FA2: '${B,NC,GND ECL}',
  FV1: '${B,NC,GND ECL}',
  EL2: '${N/6+1,AD EX -01 H,AD 05 H,AD 11 H,AD 17 H,AD 23 H,AD 29 H}',
  CP2: '${N/6+1,AD EX -02 H,AD 04 H,AD 10 H,AD 16 H,AD 22 H,AD 28 H}',
  DH2: '${N/6+1,CTL AR 00-08 LOAD L,CTL AR 00-08 LOAD L,CTL AR 09-17 LOAD L,CTL ARR LOAD B L,CTL ARR LOAD B L,CTL ARR LOAD B L}',
  EK2: '${N/6+1,CTL AR 00-08 LOAD L,CTL AR 09-17 LOAD L,CTL AR 09-17 LOAD ,CTL ARR LOAD A L,CTL ARR LOAD A L,CTL ARR LOAD A L}',
  EH2: '${N/6+1,CTL AR 00-11 CLR H,CTL AR 00-11 CLR H,CTL AR 12-17 CLR H,CTL ARR CLR H,CTL ARR CLR H,CTL ARR CLR H}',
  CE2: '${N/18+1,CON FM WRITE 00-17 L,CON FM WRITE 18-35 L}',
  FE2: '${N/18+1,CTL AD TO EBUS L H,CTL AD TO EBUS R}',
  EN1: '${N/18+1,CTL ARL SEL 1 H,CTL ARR SEL 1 H}',
  EK1: '${N/18+1,CTL ARL SEL 2 H,CTL ARR SEL 2 H}',
  ER1: '${N/18+1,CTL ARL SEL 4 H,CRAM ARM SEL 4 A H}',
  FJ1: '${N/18+1,CTL ARXL SEL 1 H,CTL ARXR SEL 1 H}',
  FD2: '${N/18+1,CTL ARXML SEL 2 H,CTL ARXR SEL 2 H}',
  BM1: '${N/30+1 BR ${N+6} A H,BRX 00 H}',
  EP1: '${N/30+1,AD ${N+6} H,ADX 00 H}',
  AL1: '${N/30+1,AD CRY ${N+6} H,AD CRY 36 B H}',
  CJ1: '${N/30+1,ADX ${N+6} H,MQ 00 H}',
  AK1: '${N/30+1,ADX CRY ${N+6} H,CTL ADX CRY 36 H}',
  BK1: '${N/30+1,AR ${N+6} H,ARX 00 H}',
  BL1: '${N/30+1,AR ${N+7} h,ARX 01 H}',
  CD1: '${N/30+1,MQ ${N+6} H,AD CRY -02 A H}',
  BN1: '-CRAM ADA DIS ${N}',
  CK1: 'AD ${N+0} A H',
  CN1: 'AD ${N+0} A L',
  EP2: 'AD ${N+0} H',
  AT2: 'AD ${N+0}-${N+5}=0 H',
  DL1: 'AD ${N+1} H',
  DR2: 'AD ${N+2} H',
  DR1: 'AD ${N+3} H',
  CF2: 'AD ${N+4} A H',
  CP1: 'AD ${N+4} H',
  CE1: 'AD ${N+5} A H',
  EL1: 'AD ${N+5} H',
  AM1: 'AD CG ${N+0} H',
  AM2: 'AD CG ${N+2} H',
  AJ1: 'AD CP ${N+0} H',
  AF1: 'AD CP ${N+2} H',
  CU2: 'AD CRY ${N+1} H',
  CT2: 'AD CRY ${N+1} L',
  CR1: 'AD EX ${N-1} H',
  CV2: 'AD EX ${N-2} H',
  CL2: 'AD OVERFLOW ${N} L',
  CF1: 'ADX ${N+0} A H',
  CJ2: 'ADX ${N+0} H',
  DK1: 'ADX ${N+4} H',
  ES1: 'ADX ${N+5} H',
  AL2: 'ADX CG ${N+0} H',
  AK2: 'ADX CG ${N+3} H',
  AE1: 'ADX CP ${N+0} H',
  AF2: 'ADX CP ${N+3} H',
  FP2: 'APR FM ADR 1 H',
  FS1: 'APR FM ADR 2 H',
  FN1: 'APR FM ADR 4 H',
  FR2: 'APR FM ADR 10 H',
  FR1: 'APR FM BLOCK 1 H',
  FM1: 'APR FM BLOCK 2 H',
  FP1: 'APR FM BLOCK 4 H',
  FJ2: 'AR ${N+0} A H',
  FT2: 'AR ${N+0} B H',
  FS2: 'AR ${N+0} C H',
  BK2: 'AR ${N+0} H',
  DM2: 'AR ${N+1} 0 D H',
  FC1: 'AR ${N+1} A H',
  FU2: 'AR ${N+1} B H',
  FV2: 'AR ${N+1} C H',
  BL2: 'AR ${N+1} H',
  FF2: 'AR ${N+2} A H',
  CL1: 'AR ${N+2} B H',
  CH2: 'AR ${N+2} C H',
  EU2: 'AR ${N+3} A H',
  CK2: 'AR ${N+3} B H',
  CM1: 'AR ${N+3} C H',
  EV2: 'AR ${N+4} A H',
  FK1: 'AR ${N+4} B H',
  FK2: 'AR ${N+4} C H',
  ET2: 'AR ${N+5} A H',
  FL2: 'AR ${N+5} B H',
  FL1: 'AR ${N+5} C H',
  EM2: 'ARMM ${N+0} H',
  EA1: 'ARMM ${N+1} H',
  EE1: 'ARMM ${N+2} H',
  DD2: 'ARMM ${N+3} H',
  DE1: 'ARMM ${N+4} H',
  EF2: 'ARMM ${N+5} H',
  AS2: 'ARX ${N+0} A H',
  BR2: 'ARX ${N+0} B H',
  EJ2: 'ARX ${N+0} H',
  AS1: 'ARX ${N+1} A H',
  CM2: 'ARX ${N+1} B H',
  BD2: 'ARX ${N+1} H',
  DC1: 'ARX ${N+2} H',
  AJ2: 'ARX ${N+3} H',
  AC1: 'ARX ${N+4} H',
  AA1: 'ARX ${N+5} H',
  EJ1: 'ARX ${N+6} H',
  BD1: 'ARX ${N+7} H',
  BM2: 'BR ${N+0} H',
  BE2: 'BRX ${N+0} H',
  BE1: 'BRX ${N+6} H',
  EM1: 'CACHE DATA ${N+0} B H',
  ED2: 'CACHE DATA ${N+1} B H',
  EE2: 'CACHE DATA ${N+2} B H',
  DD1: 'CACHE DATA ${N+3} B H',
  DL2: 'CACHE DATA ${N+4} B H',
  CC1: 'CACHE DATA ${N+5} B H',
  CR2: 'CLK EDP ${N+0} H',
  AN1: 'CRAM AD BOOL ${N} H',
  AD2: 'CRAM AD SEL 1 ${N} H',
  AH2: 'CRAM AD SEL 2 ${N} H',
  AE2: 'CRAM AD SEL 4 ${N} H',
  AD1: 'CRAM AD SEL 8 ${N} H',
  BJ1: 'CRAM ADA SEL 1 ${N} H',
  BF2: 'CRAM ADA SEL 2 ${N} H',
  BT2: 'CRAM ADB SEL 1 ${N} H',
  BS1: 'CRAM ADB SEL 2 ${N} H',
  FF1: 'CRAM ARXML SEL 4 ${N/18+1,00,06} H',
  DJ2: 'CRAM BR LOAD A H',
  AR2: 'CRAM BRX LOAD A H',
  BR1: 'CTL ARX LOAD H',
  BU2: 'CTL MQ SEL 1 H',
  BV2: 'CTL MQ SEL 2 H',
  DN1: 'CTL MQM EN H',
  DJ1: 'CTL MQM SEL 1 H',
  DM1: 'CTL MQM SEL 2 H',
  FD1: 'DIAG 04 A H',
  FA1: 'DIAG 05 A H',
  FE1: 'DIAG 06 A H',
  EF1: 'DIAG READ FUNC 12 X H',
  DV2: 'EBUS D${N+0} E H',
  DS2: 'EBUS D${N+1} E H',
  DT2: 'EBUS D${N+2} E H',
  DA1: 'EBUS D${N+3} E H',
  DP2: 'EBUS D${N+4} E H',
  DU2: 'EBUS D${N+5} E H',
  FM2: 'EDP FM PARITY ${N+0}-${N+5} H',
  CT1: 'GND ECL',
  CD2: 'MQ ${N+0} H',
  CS1: 'MQ ${N+4} H',
  DF1: 'MQ ${N+5} H',
  ED1: 'SH ${N+0} H',
  EC1: 'SH ${N+1} H',
  DS1: 'SH ${N+2} H',
  DE2: 'SH ${N+4} H',
  CA1: 'SH ${N+5} H',
  DB1: 'V-2.0',
  CU1: 'V-5.2',
  BP2: 'VMA HELD OR PC ${N+3} H',
  BC1: 'VMA HELD OR PC ${N+5} H',
  BJ2: 'VMA HELD OR PC 0 H',
  BH2: 'VMA HELD OR PC 1 H',
  BF1: 'VMA HELD OR PC 2 H',
  BP1: 'VMA HELD OR PC 4 H'
};
