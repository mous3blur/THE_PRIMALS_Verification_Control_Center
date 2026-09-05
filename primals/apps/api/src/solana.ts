import {Connection,PublicKey} from '@solana/web3.js';
import {cfg} from './config.js';
const connection=new Connection(cfg.rpc,'confirmed');
export async function countCollectionNfts(owner:string){if(!cfg.collection) throw new Error('COLLECTION_ADDRESS is not configured');
 // DAS is intentionally queried server-side; production deployments should use a reliable indexed RPC provider.
 const body={jsonrpc:'2.0',id:'primals',method:'getAssetsByOwner',params:{ownerAddress:owner,page:1,limit:1000,displayOptions:{showCollectionMetadata:true}}};
 const r=await fetch(cfg.rpc,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
 if(!r.ok) throw new Error('RPC request failed');
 const j:any=await r.json(); if(j.error) throw new Error(j.error.message||'RPC error');
 const items=j.result?.items||[];
 return items.filter((a:any)=>a.grouping?.some((g:any)=>g.group_key==='collection'&&g.group_value===cfg.collection)).length;
}
export function assertWallet(s:string){new PublicKey(s)}
