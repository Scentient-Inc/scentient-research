/** Public deterministic example. No natural-language parsing or model inference. */
export const fixture = Object.freeze({id:'greenhouse-001',account:'A greenhouse. Damp soil. Green stems.',exclusions:[],preferences:{floralPerfumes:'liked'},events:[]});
export function freshEncounter(){return structuredClone(fixture)}
export function applyCorrection(encounter,correction){
 if(!encounter || typeof encounter.id!=='string' || !Array.isArray(encounter.events) || !Array.isArray(encounter.exclusions))throw new TypeError('Invalid encounter');
 if(!correction || correction.encounterId!==encounter.id)throw new Error('Correction belongs to a different encounter');
 if(correction.source!=='participant' || correction.scope!=='encounter')throw new Error('Only participant-authored encounter corrections are accepted');
 if(correction.kind!=='exclude' || typeof correction.value!=='string' || !correction.value.trim())throw new Error('Unsupported correction');
 if(typeof correction.id!=='string'||!correction.id.trim())throw new Error('Correction ID required');
 const existing=encounter.events.find(e=>e.id===correction.id);
 if(existing){if(JSON.stringify(existing)!==JSON.stringify(correction))throw new Error('Conflicting correction ID');return structuredClone(encounter)}
 const next=structuredClone(encounter);
 if(!next.exclusions.includes(correction.value))next.exclusions.push(correction.value);
 next.events.push(structuredClone(correction));
 return next;
}
export const exampleCorrection=Object.freeze({id:'correction-001',encounterId:'greenhouse-001',source:'participant',scope:'encounter',kind:'exclude',value:'flowers',account:'No flowers in this memory. I still like floral perfumes.'});
