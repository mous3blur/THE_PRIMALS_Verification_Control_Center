export type Tier={name:string;threshold:number};
export const tiers:Tier[]=[{name:'The Dark',threshold:1},{name:'The Light',threshold:5},{name:'The Infected',threshold:10},{name:'The Enlightened',threshold:20},{name:'The Ascended',threshold:50}];
export type Mode='STACKING'|'HIGHEST_TIER_ONLY';
export function rolesFor(count:number,mode:Mode){const hit=tiers.filter(t=>count>=t.threshold);return mode==='STACKING'?hit.map(x=>x.name):(hit.length?[hit.at(-1)!.name]:[])}
