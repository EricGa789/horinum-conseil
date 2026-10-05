'use strict';
const DEMO_PROFILE = document.documentElement.dataset.profile;
const DEMO_KEY = 'horinum-portfolio-' + DEMO_PROFILE;
let horinumSelectedClient = {id: 1, nom: 'Client fictif', email: 'demo@example.invalid', telephone: ''};
let horinumDiagnosticId = 1;
window.SKIP_CLIENT_STEP = true;
const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || '{}'); } catch { return {}; } };
async function horinumFetch(){ return {ok:true, json:async()=>horinumSelectedClient}; }
async function horinumSaveDiagnostic(profile, data){
  try { localStorage.setItem(DEMO_KEY, JSON.stringify(data)); document.getElementById('demo-status').textContent='Brouillon sauvegardé localement'; }
  catch { document.getElementById('demo-status').textContent='Stockage indisponible dans ce navigateur'; }
  return {id:1};
}
async function horinumLoadDiagnostic(){ return {clientId:1,reponses:readDemo()}; }
function horinumInjectClientStep(profile, callback){ callback(); }
async function horinumAskAssistant(){
  return {reponse:'Démonstration locale : le dispositif de mission utilisait Claude par API. Ici, aucune question ni pièce jointe n’est transmise. Les encarts ⓘ du questionnaire permettent d’explorer l’aide intégrée ; cette réponse est illustrative.'};
}
async function horinumGenerateReport(){
  const crit = CHECKS.filter(c=>gr(c.i)==='d').map(c=>c.l);
  const warn = CHECKS.filter(c=>gr(c.i)==='wn').map(c=>c.l);
  return {rapportTexte:'RESTITUTION LOCALE DE DÉMONSTRATION\n\nCe texte est assemblé dans le navigateur, sans IA.\n\nPoints signalés par les règles du questionnaire :\n'+(crit.join('\n')||'Aucun point critique renseigné.')+'\n\nPoints à examiner :\n'+(warn.join('\n')||'Aucun point de vigilance renseigné.')+'\n\nLes champs non complétés restent à examiner. Ce cas fictif illustre le flux de collecte et de restitution.'};
}
function demoExample(){
  for(const k of Object.keys(D))delete D[k];
  for(const step of S)for(const f of step.f){
    if(f.tp==='r' && f.o && f.o.length)D[f.i]=f.o[0].v;
  }
  Object.assign(D,{date:'2026-07-08',nom:'Camille Exemple',prenom_nom:'Camille Exemple',structure:'Structure fictive',activite:'Exemple pédagogique',backup_exist:'ko',registre:'ko',mfa_mail:'ko',points_constates:'Exemple fictif : examiner les sauvegardes et les accès.',reco:'Vérifier les informations pendant la mission.'});
  document.querySelectorAll('.sel').forEach(e=>e.classList.remove('sel'));
  hydrateAll();horinumSaveDiagnostic(DEMO_PROFILE,D);goStep(0);
}
function demoReset(){
  try{localStorage.removeItem(DEMO_KEY);}catch{}
  window.location.href=window.location.pathname;
}
window.addEventListener('DOMContentLoaded',()=>{
  Object.assign(D,readDemo());hydrateAll();
  clientEmail=horinumSelectedClient.email;clientTelephone='';
  if(Object.keys(D).length)document.getElementById('demo-status').textContent='Brouillon local restauré';
});
