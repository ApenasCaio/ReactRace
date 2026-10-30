export type RacePhase = 'MENU' | 'READY' | 'COUNTDOWN' | 'RACING' | 'RESULTS';
export type PlayerId = 1 | 2;
export interface CarState { speed:number; gear:number; efficiency:number; distance:number; penalized:boolean; rpm:number; reactionMs:number|null; falseStart:boolean; finishedAt:number|null; }
export interface Player { id:PlayerId; name:string; carSkin:string; car:CarState; }
export interface GearChangeEvidence { gear:number; elapsedMs:number; rpm:number; perfect:boolean; }
export interface RaceResult { id:string; date:string; names:[string,string]; winner:PlayerId|null; reactions:[number|null,number|null]; falseStarts:[boolean,boolean]; elapsedMs:number|null; finishGapMs:number|null; finishTimes?:[number|null,number|null]; gearChanges?:[GearChangeEvidence[],GearChangeEvidence[]]; }
export interface RaceSnapshot { protocol:1; raceId:string|null; sequence:number; phase:RacePhase; players:Player[]; light:0|1|2|3; countdownMs:number|null; elapsedMs:number; winner:PlayerId|null; message:string; lastResult:RaceResult|null; history:RaceResult[]; garageStages?:['name'|'car'|'ready','name'|'car'|'ready']; }
