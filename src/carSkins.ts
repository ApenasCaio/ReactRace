export const CAR_SKINS = [
  {id:'crimson',name:'Rubi',tone:'#ef5261'},
  {id:'sunburst',name:'Sol',tone:'#f7cf45'},
  {id:'lime',name:'Lima',tone:'#52d76d'},
  {id:'violet',name:'Violeta',tone:'#b45df0'},
  {id:'cobalt',name:'Cobalto',tone:'#4d73ee'},
  {id:'racer-red',name:'Turbo',tone:'#f24945'},
  {id:'midnight',name:'Noturno',tone:'#88929e'},
  {id:'orange',name:'Laranja',tone:'#ff8b34'},
  {id:'silver',name:'Prata',tone:'#bfc5cc'},
  {id:'gold',name:'Ouro',tone:'#d6a648'},
  {id:'onyx',name:'Ônix',tone:'#686574'},
  {id:'pearl',name:'Pérola',tone:'#e7edf0'},
] as const;
export type CarSkinId=(typeof CAR_SKINS)[number]['id'];
export function isCarSkinId(value:string):value is CarSkinId{return CAR_SKINS.some(skin=>skin.id===value);}
