import type { RaceSnapshot } from './types';
const CHANNEL='react-race.v1';
export type WireMessage={type:'SNAPSHOT';payload:RaceSnapshot}|{type:'REQUEST_SNAPSHOT'};
export class RaceBridge {
 private channel:BroadcastChannel|null=null; private listeners=new Set<(message:WireMessage)=>void>();
 constructor(){this.open();}
 private open():BroadcastChannel|null {if(!this.channel&&'BroadcastChannel'in globalThis){const channel=new BroadcastChannel(CHANNEL);channel.onmessage=e=>this.listeners.forEach(fn=>fn(e.data as WireMessage));this.channel=channel;}return this.channel;}
 subscribe(fn:(message:WireMessage)=>void){this.open();this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 send(message:WireMessage){const channel=this.open();if(!channel)return;try{channel.postMessage(message);}catch(error){if(!(error instanceof DOMException)||error.name!=='InvalidStateError')throw error;channel.close();this.channel=null;const recovered=this.open();recovered?.postMessage(message);}}
 publish(snapshot:RaceSnapshot){try{localStorage.setItem('react-race.snapshot.v1',JSON.stringify(snapshot));}catch{}this.send({type:'SNAPSHOT',payload:snapshot});}
 requestSnapshot(){this.send({type:'REQUEST_SNAPSHOT'});}
 close(){this.channel?.close();this.channel=null;this.listeners.clear();}
}
export function readSnapshot():RaceSnapshot|null {try{const raw=localStorage.getItem('react-race.snapshot.v1');return raw?JSON.parse(raw) as RaceSnapshot:null;}catch{return null;}}
