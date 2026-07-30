const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); addEventListener('resize', resize);
function roundedRectPath(x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.arcTo(x+w, y, x+w, y+r, r);
  ctx.lineTo(x+w, y+h-r);
  ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
  ctx.lineTo(x+r, y+h);
  ctx.arcTo(x, y+h, x, y+h-r, r);
  ctx.lineTo(x, y+r);
  ctx.arcTo(x, y, x+r, y, r);
  ctx.closePath();
}
function fillOval(cx, cy, rx, ry, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(0.01,rx), Math.max(0.01,ry), 0, 0, Math.PI*2);
  ctx.fill();
}

function pixelNetHead(cx, cy, size, frameColor, netColor, borderWidth){
  const half = size/2;
  const r = size*0.18;
  roundedRectPath(cx-half, cy-half, size, size, r);
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = frameColor;
  ctx.stroke();
  ctx.strokeStyle = netColor;
  ctx.lineWidth = 1.5;
  const inner = half - borderWidth*0.8;
  const divisions = 4;
  for(let i = 1; i < divisions; i++){
    const p = -inner + (i * (inner*2)) / divisions;
    ctx.beginPath(); ctx.moveTo(cx+p, cy-inner); ctx.lineTo(cx+p, cy+inner); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-inner, cy+p); ctx.lineTo(cx+inner, cy+p); ctx.stroke();
  }
}
// ICONS 
const ICONS = {
  juice: `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C9 6 5 10.5 5 14.5A7 7 0 0 0 19 14.5C19 10.5 15 6 12 2z"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.4 13a7.4 7.4 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.3 2.9a7.6 7.6 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.4 7.4 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1L11 21h4l.3-2.9c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5-2.1-1.6zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="15" height="15"><path stroke="currentColor" stroke-width="3.2" stroke-linecap="round" d="M5 5l14 14M19 5L5 19"/></svg>`,
  incense: `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 21V9M8.5 3.5c1 1.6 1 2.7 0 4.3M12 2.5c1 1.8 1 3 0 4.8M15.5 3.5c1 1.6 1 2.7 0 4.3"/><rect x="6" y="20" width="12" height="2.2" rx="1.1" fill="currentColor"/></svg>`,
  bugFood: `<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="13" rx="9" ry="8" fill="currentColor"/><circle cx="9" cy="12" r="1.1" fill="rgba(0,0,0,0.28)"/><circle cx="15" cy="10.5" r="1.1" fill="rgba(0,0,0,0.28)"/><circle cx="13.5" cy="16" r="1.1" fill="rgba(0,0,0,0.28)"/></svg>`,
  moreSwat: `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="10" width="20" height="4" rx="1.4" fill="currentColor"/><path fill="currentColor" d="M2 12l4-4v8zM22 12l-4-4v8z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/></svg>`,
  swatterPlastic: `<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="12" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  swatterWire: `<svg viewBox="0 0 24 24" width="20" height="20"><rect x="5" y="2" width="14" height="12" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><line x1="9" y1="2" x2="9" y2="14" stroke="currentColor" stroke-width="1"/><line x1="15" y1="2" x2="15" y2="14" stroke="currentColor" stroke-width="1"/><line x1="5" y1="6" x2="19" y2="6" stroke="currentColor" stroke-width="1"/><line x1="5" y1="10" x2="19" y2="10" stroke="currentColor" stroke-width="1"/><line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  swatterZap: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M13 2 5 13h5l-1 9 9-13h-5z"/></svg>`,
  swatterGold: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2l2.5 5.7 6.2.6-4.7 4.1 1.4 6.1L12 15.4 6.6 18.5 8 12.4 3.3 8.3l6.2-.6z"/></svg>`,
  swatterLaser: `<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="12" rx="5" fill="none" stroke="currentColor" stroke-width="2.4"/><path fill="currentColor" d="M9 6h6v2H9zM9 9h6v2H9z"/><line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  cursor: `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="#fbf3e3" stroke="#3a2718" stroke-width="1.6" stroke-linejoin="round" d="M4 2 L4 20.5 L8.7 16 L11.8 22.6 L15.2 21 L12 14.4 L19 14.4 Z"/></svg>`,
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ''; });
// ---------------------------------------------------------------------
// FLY TYPE REGISTRY  (call defineFlyType to add a new kind of bug)
//
// Every field below can be passed in cfg — anything you omit falls back
// to the default shown here.
//
//   name         display name (not shown in-game yet, but used by tooling)
//   bodyColor / eyeColor   drawing colors
//   baseJuice    juice earned per kill, before multipliers
//   baseHealth   hits required to kill, before "Bug Food" bonus
//   speed        px/sec horizontal drift
//   size         base sprite size in px
//   weight       spawn chance is weight / (sum of all unlocked weights).
//                Bigger number = more common. 100 is "normal".
//
//   -- gating: a fly only enters the spawn pool once ALL of these pass --
//   unlockAt            total juice ever earned needed (0 = always unlocked)
//   requiresUpgrade     id of an upgrade that must be bought at least once
//   requiresUpgradeLevel  level needed for that upgrade (default 1)
const FLY_TYPES = {};
function defineFlyType(id, cfg){
  FLY_TYPES[id] = Object.assign({
    id,
    name: 'Fly',
    bodyColor: '#3d3a3f',
    eyeColor: '#111111',
    baseJuice: 1,
    baseHealth: 1,
    speed: 80,        // px/sec horizontal drift
    size: 20,
    weight: 100,       // spawn weight (relative)
    unlockAt: 0,               // totalEarned needed to appear at all
    requiresUpgrade: null,     // upgrade id that must be owned
    requiresUpgradeLevel: 1,   // level of that upgrade required
  }, cfg);
}
// Is this fly currently allowed to spawn?
function isFlyUnlocked(type){
  if(state.totalEarned < type.unlockAt) return false;
  if(type.requiresUpgrade){
    const lvl = state.upgrades[type.requiresUpgrade] || 0;
    if(lvl < type.requiresUpgradeLevel) return false;
  }
  return true;
}
// Effective spawn weight = base weight + any bonus granted by upgrade
function effectiveFlyWeight(type){
  const bonus = (derived.flyWeightBonus && derived.flyWeightBonus[type.id]) || 0;
  return Math.max(0, type.weight + bonus);
}
defineFlyType('housefly', {
  name:'Housefly', bodyColor:'#3d3a3f', eyeColor:'#111',
  baseJuice:1, baseHealth:1, speed:90, size:20, weight:100
});
defineFlyType('Gold Fly',{
  name:'Gold Fly', bodyColor:'#f2b632', eyeColor:'#111',
  baseJuice:5, baseHealth:2, speed:90, size:20, weight:100,
  requiresUpgrade:'goldIncense', requiresUpgradeLevel:1,
});
defineFlyType('Cosmic Fly',{
  name:'Cosmic Fly', bodyColor:'#4400ff', eyeColor:'#111',
  baseJuice:20, baseHealth:5, speed:100, size:20, weight:100,
  requiresUpgrade:'cosmicIncense', requiresUpgradeLevel:1,
})
const SWATTER_TYPES = [
  { id:'plastic', name:'Plastic Swatter', cost:0,      dmg:1, color:'#d9603b', net:'#3a2718', glow:null,      icon:ICONS.swatterPlastic },
  { id:'wire',    name:'Wire Swatter',    cost:250,    dmg:2, color:'#8a8f98', net:'#2a2d31', glow:null,      icon:ICONS.swatterWire },
  { id:'zapper',  name:'Electric Zapper', cost:5000,   dmg:4, color:'#3b7fd9', net:'#bfe6ff', glow:'#7fd9ff', icon:ICONS.swatterZap },
  { id:'laser',  name:'Laser Swatter',  cost:120000, dmg:8, color:'#f2b632', net:'#ff0000', glow:'#ff523f', icon:ICONS.swatterLaser },
];
//
//   name / icon / desc / section   shop display
//   baseCost, costScale   cost = baseCost * costScale^level (rounded up)
//   maxLevel      hard cap on purchases — this IS "limited amount of
//                 purchases". Leave it off (Infinity) for no limit.
//   unlockAt      total juice ever earned needed for this upgrade to even
//                 show up in the shop. 0 = visible from the start.
//
//   effects       array of stat modifiers — this is what makes new
//                 upgrades "just work" without editing recompute().
//                 Each entry looks like:
//                   { stat: 'spawnInterval', perLevel: -0.045 }
//                 which means: every level subtracts 0.045 from the
//                 "spawnInterval" stat. Available stats (see recompute):
//                   spawnInterval  seconds between spawns (lower=faster)
//                   juiceMult      multiplier on juice per kill
//                   healthBonus    extra hit points added to every fly
//                   swatScale      size multiplier of the swatter
//                   goldChance     chance (0-1) any fly rolls "golden"
//                   goldMult       juice/health multiplier for golden flies
//                   flyWeight:<flyTypeId>   spawn-weight bonus for one
//                                            specific fly type, e.g.
//                                            'flyWeight:Gold Fly'
//
//                 For anything that isn't a simple straight line per
//                 level (like "one bonus every 6 levels"), use fn instead
//                 of perLevel:  { stat:'healthBonus', fn: lvl => Math.floor(lvl/6) }
//                 fn always receives the upgrade's current level and
//                 returns that stat's contribution.
//
//                 mode controls how it's combined into the stat:
//                   'add'  (default) — stats[stat] += delta
//                   'mult'           — stats[stat] *= (1 + delta)
//                   'set'            — stats[stat] = delta  (last one wins)
const UPGRADES = {};
const UPGRADE_ORDER = [];
function defineUpgrade(id, cfg){
  UPGRADES[id] = Object.assign({
    id, name:'Upgrade', icon:ICONS.sparkle, desc:'', section:'General',
    baseCost:10, costScale:1.15, level:0, maxLevel:Infinity,
    unlockAt:0, // total juice ever earned needed to reveal in shop
    effects:[], // see block comment above for the full mini-language
  }, cfg);
  UPGRADE_ORDER.push(id);
}
defineUpgrade('incense', {
  name:'Incense', icon:ICONS.incense, section:'Spawning',
  desc:'Lures a few more flies in per minute. Barely. Expensive stuff.',
  baseCost:80, costScale:1.75, maxLevel:40,
  unlockAt:0,
  effects:[ { stat:'spawnInterval', perLevel:-0.045 } ],
});
defineUpgrade('bugFood', {
  name:'Bug Food', icon:ICONS.bugFood, section:'Flies',
  desc:'Fattens up the flies — more juice per swat, but tougher hides.',
  baseCost:20, costScale:1.14, maxLevel:200,
  unlockAt:0,
  effects:[
    { stat:'juiceMult', perLevel:0.12 },
    { stat:'healthBonus', fn: lvl => Math.floor(lvl/6) }, // +1 HP every 6 levels
  ],
});
defineUpgrade('moreSwat', {
  name:'More Swat', icon:ICONS.moreSwat, section:'Swatter',
  desc:'Grows your swatter, widening your swing radius.',
  baseCost:25, costScale:1.16, maxLevel:100,
  unlockAt:0,
  effects:[ { stat:'swatScale', perLevel:0.045 } ],
});
defineUpgrade('goldIncense', {
  name:'Golden Incense', icon:ICONS.sparkle, section:'Spawning',
  desc:'A shimmering smoke that turns a slice of flies golden — worth a lot more, but built like a tank. Also the only way to attract actual Gold Flies.',
  baseCost:1000, costScale:2.15, maxLevel:20,
  unlockAt:800,
  effects:[
    { stat:'goldChance', perLevel:0.012 },
    { stat:'goldMult', fn: lvl => lvl > 0 ? (4*lvl + 3) : 0 }, // base 1 + this = 8, 12, 16...
    // once you own this, Gold Flies get much more common in the pool too
    { stat:'flyWeight:Gold Fly', perLevel:20 },
  ],
});
defineUpgrade('cosmicIncense',{
    name: 'Comsic Incense', icon: ICONS.sparkle, section: 'Spawning',
    desc: 'Don\'t breath it in',
    baseCost: 10000, costScale: 2.15, maxLevel: 20,
    unlockAt: 8000,
    effects: [
        { stat: 'cosmicChance', perLevel: 0.012 },
        { stat: 'cosmicMult', fn: lvl => lvl > 0 ? (4*lvl + 3) : 0 }, // base 1 + this = 8, 12, 16...
        // once you own this, Gold Flies get much more common in the pool too
        { stat: 'flyWeight:Cosmic Fly', perLevel: 20 },
    ],
})
const state = {
  juice: 0,
  totalEarned: 0,
  swatterTier: 0,
  upgrades: {}, // id -> level
  flies: [],
  particles: [],
  spawnTimer: 0,
};
UPGRADE_ORDER.forEach(id => state.upgrades[id] = 0);
//Intro
let gameStarted = false;
let reducedEffects = false;
let soundOn = true;
let shakeOn = true;
let shakeTime = 0;
const rawMouse = { x: innerWidth/2, y: innerHeight/2 }; // real cursor position, always tracked
let demoPhase = 'wait'; // wait -> flyIn -> smacked -> title -> (done, Play pressed)
let demoTimer = 0;
let demoFly = null;
let demoStrikeX = 0;
let demoJitterSeed = 0;
const derived = {}; // recomputed stats each frame from levels
// Base values before any upgrade effects are applied. Add a line here if
// you introduce a brand-new stat name in an upgrade's effects array.
const BASE_STATS = {
  spawnInterval: 2.2,
  juiceMult: 1,
  healthBonus: 0,
  swatScale: 1,
  goldChance: 0,
  goldMult: 1,
};
function recompute(){
  const stats = Object.assign({}, BASE_STATS);
  const flyWeightBonus = {};
  for(const id of UPGRADE_ORDER){
    const up = UPGRADES[id];
    const level = state.upgrades[id] || 0;
    if(!level || !up.effects) continue;
    for(const eff of up.effects){
      const delta = eff.fn ? eff.fn(level) : (eff.perLevel || 0) * level;
      if(eff.stat.startsWith('flyWeight:')){
        const flyId = eff.stat.slice('flyWeight:'.length);
        flyWeightBonus[flyId] = (flyWeightBonus[flyId] || 0) + delta;
        continue;
      }
      if(eff.mode === 'mult'){
        stats[eff.stat] = (stats[eff.stat] ?? 1) * (1 + delta);
      } else if(eff.mode === 'set'){
        stats[eff.stat] = delta;
      } else {
        stats[eff.stat] = (stats[eff.stat] || 0) + delta;
      }
    }
  }
  derived.flyWeightBonus = flyWeightBonus;
  derived.spawnInterval  = Math.max(0.35, stats.spawnInterval);
  derived.juiceMult      = stats.juiceMult;
  derived.healthBonus    = stats.healthBonus;
  derived.swatScale      = stats.swatScale; // grows the whole swatter, head + handle together
  derived.swatRadius     = 31 * derived.swatScale;  // hit radius matches the visual head size
  derived.goldChance     = Math.min(0.45, stats.goldChance);
  derived.goldMult       = stats.goldMult;
  derived.swatter        = SWATTER_TYPES[state.swatterTier];
}
recompute();
function costFor(id){
  const up = UPGRADES[id];
  return Math.ceil(up.baseCost * Math.pow(up.costScale, up.level));
}
// SAVE / LOAD
const SAVE_KEY = 'swat_game_save_v1';
function save(){
  try{
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      juice: state.juice, totalEarned: state.totalEarned,
      swatterTier: state.swatterTier, upgrades: state.upgrades,
    }));
  }catch(e){}
}
function load(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return;
    const d = JSON.parse(raw);
    state.juice = d.juice || 0;
    state.totalEarned = d.totalEarned || 0;
    state.swatterTier = d.swatterTier || 0;
    Object.assign(state.upgrades, d.upgrades || {});
  }catch(e){}
}
load();
recompute();
setInterval(save, 4000);
// Whether there's *meaningful* saved progress worth resuming — not just
// "a save key exists", since save() autosaves every 4s even at all-zeros
// once the interval starts. This is what decides whether "Resume Game"
// shows up at all.
function hasMeaningfulSave(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return false;
    const d = JSON.parse(raw);
    const upgradeLevels = d.upgrades ? Object.values(d.upgrades).reduce((a,b)=>a+(b||0),0) : 0;
    return (d.totalEarned > 0) || (d.juice > 0) || (d.swatterTier > 0) || upgradeLevels > 0;
  }catch(e){ return false; }
}
// FLY SPAWNING
function weightedFlyType(){
  const keys = Object.keys(FLY_TYPES).filter(k => isFlyUnlocked(FLY_TYPES[k]));
  if(keys.length === 0) return FLY_TYPES[Object.keys(FLY_TYPES)[0]]; // safety net
  const total = keys.reduce((s,k)=>s+effectiveFlyWeight(FLY_TYPES[k]),0);
  let r = Math.random()*total;
  for(const k of keys){ r -= effectiveFlyWeight(FLY_TYPES[k]); if(r<=0) return FLY_TYPES[k]; }
  return FLY_TYPES[keys[0]];
}
function spawnFly(){
  const type = weightedFlyType();
  const fromLeft = Math.random() < 0.5;
  const y = 80 + Math.random() * (canvas.height - 200);
  const isGold = Math.random() < derived.goldChance;
  const health = Math.max(1, Math.round((type.baseHealth + derived.healthBonus) *
      (isGold ? Math.sqrt(derived.goldMult) : 1)));
  const juice = type.baseJuice * derived.juiceMult * (isGold ? derived.goldMult : 1);
  const fly = {
    type, x: fromLeft ? -40 : canvas.width + 40, y,
    vx: (fromLeft ? 1 : -1) * (type.speed * (0.7 + Math.random()*0.6)),
    vy: (Math.random()-0.5) * 20,
    wobble: Math.random()*Math.PI*2,
    size: type.size * (isGold ? 1.15 : 1),
    isGold, health, maxHealth: health, juice,
    alive: true, squish: 0, // squish>0 = death animation progress
  };
  state.flies.push(fly);
  return fly;
}

const swatter = { x: innerWidth/2, y: innerHeight*0.6, smush: 0 };
let optionsOpen = false;

function isMenuUp(){
  return optionsOpen || (!gameStarted && demoPhase === 'title');
}
addEventListener('mousemove', e => {
  rawMouse.x = e.clientX; rawMouse.y = e.clientY;
  if(gameStarted && !isMenuUp()){ swatter.x = e.clientX; swatter.y = e.clientY; }
});
addEventListener('touchmove', e => {
  if(!e.touches[0]) return;
  rawMouse.x = e.touches[0].clientX; rawMouse.y = e.touches[0].clientY;
  if(gameStarted && !isMenuUp()){ swatter.x = e.touches[0].clientX; swatter.y = e.touches[0].clientY; }
}, {passive:true});
function doSwat(x, y){
  swatter.smush = 1; // triggers the slam/flatten animation, no rotation
  const r = derived.swatRadius;
  let hitAny = false;
  for(const f of state.flies){
    if(!f.alive || f.squish > 0) continue;
    const dx = f.x - x, dy = f.y - y;
    if(dx*dx + dy*dy <= r*r){
      hitAny = true;
      f.health -= derived.swatter.dmg;
      if(f.health <= 0){
        killFly(f);
      } else {
        spawnHitSpark(f.x, f.y);
        playBlip(260, 0.05);
      }
    }
  }
  if(!hitAny) spawnMissMark(x,y);
}
function killFly(f){
  f.alive = false;
  f.squish = 0.001;
  const gained = Math.round(f.juice * 10) / 10;
  state.juice += gained;
  state.totalEarned += gained;
  spawnSmush(f.x, f.y, f.isGold);
  floatJuiceText(f.x, f.y, gained, f.isGold);
  playBlip(f.isGold ? 520 : 140, 0.12);
  if(shakeOn) shakeTime = f.isGold ? 0.28 : 0.15;
}
canvas.addEventListener('mousedown', e => { if(gameStarted && !isMenuUp()) doSwat(e.clientX, e.clientY); });
canvas.addEventListener('touchstart', e => {
  if(gameStarted && !isMenuUp() && e.touches[0]) doSwat(e.touches[0].clientX, e.touches[0].clientY);
}, {passive:true});

function spawnSmush(x,y,gold){
  const baseColor = gold ? '255,210,63' : '122,44,44';
  const count = reducedEffects ? 6 : 14;
  for(let i=0;i<count;i++){
    const a = Math.random()*Math.PI*2, sp = 40+Math.random()*140;
    state.particles.push({
      x,y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp - 40,
      life:1, decay: 1.1+Math.random()*0.8, size: 3+Math.random()*3,
      color: baseColor, grav:true,
    });
  }
  state.particles.push({ x,y, vx:0,vy:0, life:1, decay:2.2, size:34, color: baseColor, ring:true });
}
function spawnHitSpark(x,y){
  for(let i=0;i<4;i++){
    const a = Math.random()*Math.PI*2;
    state.particles.push({ x,y, vx:Math.cos(a)*70, vy:Math.sin(a)*70, life:1, decay:2.5, size:3, color:'255,255,255', grav:false });
  }
}
function spawnMissMark(x,y){
  state.particles.push({ x,y, vx:0,vy:-20, life:1, decay:2.5, size:6, color:'120,120,120', grav:false, miss:true });
}
const floatLayer = document.getElementById('floatText');
function floatJuiceText(x,y,amount,gold){
  const el = document.createElement('div');
  el.textContent = (gold?'\u2605 ':'') + '+' + fmt(amount);
  el.style.cssText = `position:absolute; left:${x}px; top:${y}px; transform:translate(-50%,-50%);
    font-size:${gold?13:11}px; color:${gold?'#ffd23f':'#c6ff5c'};
    font-family:'Press Start 2P','Courier New',monospace;
    text-shadow:2px 2px 0 #000; pointer-events:none; transition: all 0.9s steps(10); z-index:16;`;
  floatLayer.appendChild(el);
  requestAnimationFrame(()=>{
    el.style.top = (y-50)+'px';
    el.style.opacity = '0';
  });
  setTimeout(()=> el.remove(), 950);
}
// NUMBER FORMATTING
function fmt(n){
  if(n < 1000) return (Math.round(n*10)/10).toString();
  const units = ['K','M','B','T','Qa','Qi'];
  let u = -1;
  while(n >= 1000 && u < units.length-1){ n/=1000; u++; }
  return n.toFixed(2) + units[u];
}
// SMUSH sound
let audioCtx = null;
function playBlip(freq, dur){
  if(!soundOn) return;
  try{
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20,freq*0.5), t+dur);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t+dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t); osc.stop(t+dur);
  }catch(e){}
}
// UPDATE LOOP
let lastTime = performance.now();
function update(dt){
  recompute();
  if(!gameStarted){
    updateDemo(dt);
  } else {
    state.spawnTimer -= dt;
    if(state.spawnTimer <= 0){
      spawnFly();
      state.spawnTimer = derived.spawnInterval * (0.85 + Math.random()*0.3);
    }
  }
  for(const f of state.flies){
    if(f.squish > 0){
      f.squish += dt*3;
      continue;
    }
    f.wobble += dt*6;
    f.x += f.vx * dt;
    f.y += f.vy * dt + Math.sin(f.wobble)*0.6;
  }
  state.flies = state.flies.filter(f => f.squish > 0 ? f.squish < 1 : (f.x > -60 && f.x < canvas.width+60));
  for(const p of state.particles){
    p.x += p.vx*dt; p.y += p.vy*dt;
    if(p.grav) p.vy += 260*dt;
    p.life -= dt*p.decay*0.5;
  }
  state.particles = state.particles.filter(p => p.life > 0);
  // smush decays back to 0 quickly — a slam, not a sustained pose
  if(swatter.smush > 0){ swatter.smush -= dt*5; if(swatter.smush<0) swatter.smush=0; }
  if(shakeTime > 0){ shakeTime -= dt*4; if(shakeTime<0) shakeTime=0; }
}
//Intro
function updateDemo(dt){
  demoTimer += dt;
  if(demoPhase === 'wait' && demoTimer > 0.6){
    demoPhase = 'flyIn';
    demoTimer = 0;
    demoFly = spawnFly();
    demoFly.isGold = false;
    demoFly.health = demoFly.maxHealth = 1;
    demoFly.x = -40;
    demoFly.y = canvas.height * (0.35 + Math.random()*0.25);
    demoFly.vx = 190 + Math.random()*60;
    demoFly.vy = (Math.random()-0.5) * 40;
    demoStrikeX = canvas.width * (0.34 + Math.random()*0.24);
    demoJitterSeed = Math.random()*100;
  } else if(demoPhase === 'flyIn' && demoFly){
    // the swatter genuinely tracks the fly's live position — not a fixed
    // point — with a jittery, erratic chase feel rather than a smooth ease
    const dx = demoFly.x - swatter.x, dy = demoFly.y - swatter.y;
    swatter.x += dx * Math.min(1, dt*8) + Math.sin((demoTimer+demoJitterSeed)*14) * 5;
    swatter.y += dy * Math.min(1, dt*8) + Math.cos((demoTimer+demoJitterSeed)*17) * 5;
    if(demoFly.x >= demoStrikeX){
      doSwat(demoFly.x, demoFly.y);
      demoPhase = 'smacked';
      demoTimer = 0;
    }
  } else if(demoPhase === 'smacked' && demoTimer > 0.5){
    showTitleCard();
  }
}
// Reveals the title card. Pulled into its own function so both the normal
// end-of-demo path and the watchdog below can call it safely — calling it
// twice is harmless since classList.add is idempotent.
function showTitleCard(){
  if(demoPhase === 'title') return;
  demoPhase = 'title';
  document.getElementById('homeOverlay').classList.add('show');
  document.getElementById('optionsBtn').classList.add('visible');
  updateCursorMode();
}

setTimeout(() => { if(!gameStarted) showTitleCard(); }, 4000);
// DRAW LOOP
function drawFly(f){
  const scale = f.squish>0 ? Math.max(0, 1-f.squish) : 1;
  if(f.squish > 0 && scale <= 0) return;
  ctx.save();
  ctx.translate(Math.round(f.x), Math.round(f.y));
  if(f.squish>0){ ctx.scale(1+f.squish*1.6, scale); ctx.globalAlpha = scale; }
  const s = f.size;
  if(f.isGold){ ctx.shadowColor = '#ffd23f'; ctx.shadowBlur = 10; }
  const bodyColor = f.isGold ? '#ffd23f' : f.type.bodyColor;
  const eyeColor  = f.isGold ? '#7a5c00' : f.type.eyeColor;
  // a soft blurred smear behind the body reads as "wings buzzing" without
  // needing a detailed wing shape
  const prevAlpha = ctx.globalAlpha;
  ctx.globalAlpha = prevAlpha * 0.35;
  fillOval(0, -s*0.1, s*0.5, s*0.32, '#e8f0ff');
  ctx.globalAlpha = prevAlpha;
  // body
  fillOval(0, 0, s*0.44, s*0.3, bodyColor);
  fillOval(-s*0.34, 0, s*0.2, s*0.18, bodyColor);
  // eyes
  fillOval(-s*0.36, -s*0.06, s*0.08, s*0.08, eyeColor);
  fillOval(-s*0.36, s*0.1, s*0.08, s*0.08, eyeColor);
  ctx.restore();
  // health pips for tanky bugs
  if(f.maxHealth > 1 && f.squish===0){
    const w = s*0.9, hpct = Math.max(0,f.health/f.maxHealth);
    roundedRectPath(f.x-w/2, f.y-s*0.75, w, 3, 1.5);
    ctx.fillStyle = '#000'; ctx.fill();
    roundedRectPath(f.x-w/2, f.y-s*0.75, w*hpct, 3, 1.5);
    ctx.fillStyle = f.isGold ? '#ffd23f' : '#8fff3e'; ctx.fill();
  }
}
function drawParticles(){
  for(const p of state.particles){
    ctx.globalAlpha = Math.max(0,p.life);
    if(p.ring){
      ctx.strokeStyle = `rgba(${p.color},${p.life})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(p.x,p.y, p.size*(1-p.life)+4, 0, Math.PI*2);
      ctx.stroke();
    } else if(p.miss){
      ctx.fillStyle = `rgba(${p.color},${p.life})`;
      ctx.font = "9px 'Press Start 2P', monospace";
      ctx.fillText('miss', p.x-16, p.y);
    } else {
      ctx.fillStyle = `rgba(${p.color},${p.life})`;
      ctx.fillRect(Math.round(p.x-p.size/2), Math.round(p.y-p.size/2), Math.round(p.size), Math.round(p.size));
    }
  }
  ctx.globalAlpha = 1;
}
// The swatter SLAMS FLAT toward the cursor point — squash, no rotation/twist.
// It's a classic square net-head swatter on a stick, like the real thing.
// "More Swat" scales the ENTIRE swatter uniformly via derived.swatScale.
function drawSwatter(){
  const sw = derived.swatter;
  const smush = swatter.smush; // 0 -> 1 -> 0 over a fraction of a second
  const baseHeadSize = 62;
  const baseHandleLen = 56;
  ctx.save();
  ctx.translate(Math.round(swatter.x), Math.round(swatter.y));
  // squash on impact, layered on top of the overall size scale — no rotation
  const scaleY = 1 - smush*0.55;
  const scaleX = 1 + smush*0.4;
  ctx.scale(derived.swatScale * scaleX, derived.swatScale * scaleY);
  // handle attaches flush to the bottom edge of the head — no overlap, no offset
  const handleStartY = baseHeadSize/2 - 6;
  const handleEndY = handleStartY + baseHandleLen;
  ctx.strokeStyle = '#5a4326';
  ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(0, handleStartY); ctx.lineTo(0, handleEndY); ctx.stroke();
  ctx.fillStyle = '#4a3320';
  ctx.fillRect(-5, handleEndY-4, 10, 10);
  if(sw.glow){ ctx.shadowColor = sw.glow; ctx.shadowBlur = 14; }
  pixelNetHead(0, 0, baseHeadSize, sw.color, sw.net, 6);
  ctx.shadowBlur = 0;
  ctx.restore();
}
function drawBackground(){
  const floorTop = canvas.height * 0.72;
  // wallpaper
  ctx.fillStyle = '#e6d2ad';
  ctx.fillRect(0, 0, canvas.width, floorTop);
  ctx.fillStyle = '#dcc493';
  const stripe = 46;
  for(let x = 0; x < canvas.width; x += stripe*2){
    ctx.fillRect(x, 0, stripe, floorTop);
  }
  // a simple window with sky, letting some outdoor light in — rounded frame
  // to match the softer, higher-quality retro look used everywhere else
  const winX = canvas.width - 220, winY = 60, winW = 150, winH = 110;
  roundedRectPath(winX-12, winY-12, winW+24, winH+24, 14);
  ctx.fillStyle = '#f6ecd8'; ctx.fill();
  roundedRectPath(winX, winY, winW, winH, 8);
  ctx.save(); ctx.clip();
  ctx.fillStyle = '#bfe6ff';
  ctx.fillRect(winX, winY, winW, winH);
  ctx.fillStyle = '#8fcf6a';
  ctx.fillRect(winX, winY + winH*0.7, winW, winH*0.3);
  ctx.restore();
  ctx.strokeStyle = '#f6ecd8'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(winX + winW/2, winY); ctx.lineTo(winX + winW/2, winY+winH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(winX, winY + winH/2); ctx.lineTo(winX+winW, winY + winH/2); ctx.stroke();
  // a little wall clock, because every kitchen has one
  ctx.fillStyle = '#f6ecd8';
  ctx.beginPath(); ctx.arc(140, 90, 34, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = '#4a3222'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(140, 90, 34, 0, Math.PI*2); ctx.stroke();
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(140,90); ctx.lineTo(140,70); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(140,90); ctx.lineTo(156,90); ctx.stroke();
  ctx.lineCap = 'butt';
  // baseboard trim
  ctx.fillStyle = '#f6ecd8';
  ctx.fillRect(0, floorTop - 10, canvas.width, 10);
  // wood floor with plank seams
  ctx.fillStyle = '#8a5a34';
  ctx.fillRect(0, floorTop, canvas.width, canvas.height - floorTop);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  const plank = 90;
  for(let x = -((Date.now()*0)|0); x < canvas.width; x += plank){
    ctx.fillRect(x, floorTop, 2, canvas.height - floorTop);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  for(let y = floorTop + 22; y < canvas.height; y += 26){
    ctx.fillRect(0, y, canvas.width, 2);
  }
}
function draw(){
  ctx.save();
  if(shakeTime > 0){
    const mag = shakeTime * 10;
    ctx.translate((Math.random()-0.5)*mag, (Math.random()-0.5)*mag);
  }
  drawBackground();
  for(const f of state.flies) drawFly(f);
  drawParticles();
  if(!isMenuUp()) drawSwatter();
  ctx.restore();
}
// MAIN LOOP
// Keeps the Options button visually attached to the title card — it tracks
// the card's actual on-screen position every frame (including through the
// drop/bounce animation) instead of guessing a fixed spot, so the two never
// look disconnected. During gameplay this is skipped entirely and CSS pins
// the button to the bottom-left corner instead.
function positionOptionsBtnForHome(){
  const card = document.querySelector('#homeOverlay .titleCard');
  const btn = document.getElementById('optionsBtn');
  if(!card || !btn) return;
  const rect = card.getBoundingClientRect();
  if(rect.width === 0) return; // not laid out yet
  btn.style.left = (rect.left + rect.width/2) + 'px';
  btn.style.top = (rect.bottom + 20) + 'px';
  btn.style.transform = 'translate(-50%,0)';
}
function loop(now){
  const dt = Math.min(0.05, (now - lastTime)/1000);
  lastTime = now;
  update(dt);
  draw();
  updateHUD();
  if(!gameStarted) positionOptionsBtnForHome();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
// HUD + SHOP UI
const juiceValEl = document.getElementById('juiceVal');
function updateHUD(){
  juiceValEl.textContent = fmt(state.juice);
}
const shopEl = document.getElementById('shop');
const upgradeListEl = document.getElementById('upgradeList');
document.getElementById('shopToggle').onclick = () => { shopEl.classList.add('open'); renderShop(); };
document.getElementById('closeShop').onclick = () => shopEl.classList.remove('open');
function buyUpgrade(id){
  const up = UPGRADES[id];
  const cost = costFor(id);
  if(up.level >= up.maxLevel) return;
  if(state.juice < cost) return;
  state.juice -= cost;
  state.upgrades[id]++;
  recompute();
  renderShop();
}
function buySwatterTier(){
  const next = SWATTER_TYPES[state.swatterTier+1];
  if(!next) return;
  if(state.juice < next.cost) return;
  state.juice -= next.cost;
  state.swatterTier++;
  recompute();
  renderShop();
}
function renderShop(){
  upgradeListEl.innerHTML = '';
  const sections = {};
  UPGRADE_ORDER.forEach(id => {
    const up = UPGRADES[id];
    if(state.totalEarned < up.unlockAt) return; // still locked
    (sections[up.section] = sections[up.section] || []).push(id);
  });
  for(const sectionName of Object.keys(sections)){
    const label = document.createElement('div');
    label.className = 'sectionLabel';
    label.textContent = sectionName;
    upgradeListEl.appendChild(label);
    for(const id of sections[sectionName]){
      const up = UPGRADES[id];
      const cost = costFor(id);
      const maxed = up.level >= up.maxLevel;
      const canAfford = state.juice >= cost;
      const div = document.createElement('div');
      div.className = 'upgrade' + (maxed ? ' maxed' : (canAfford ? '' : ' disabled'));
      div.innerHTML = `
        <div class="row1">
          <span><span class="icon">${up.icon}</span>${up.name}</span>
          <span class="lvl">Lv.${up.level}${maxed?' (MAX)':''}</span>
        </div>
        <div class="desc">${up.desc}</div>
        <div class="cost ${canAfford?'':'cant'}">${maxed ? '' : ('Cost: '+fmt(cost)+' '+ICONS.juice)}</div>
      `;
      if(!maxed) div.onclick = () => buyUpgrade(id);
      upgradeListEl.appendChild(div);
    }
  }
  const swLabel = document.createElement('div');
  swLabel.className = 'sectionLabel';
  swLabel.textContent = 'Swatter Type';
  upgradeListEl.appendChild(swLabel);
  const current = SWATTER_TYPES[state.swatterTier];
  const curDiv = document.createElement('div');
  curDiv.className = 'upgrade maxed';
  curDiv.innerHTML = `<div class="row1"><span><span class="icon">${current.icon}</span>${current.name}</span><span class="lvl">equipped</span></div>
    <div class="desc">Deals ${current.dmg} damage per swat.</div>`;
  upgradeListEl.appendChild(curDiv);
  const next = SWATTER_TYPES[state.swatterTier+1];
  if(next){
    const canAfford = state.juice >= next.cost;
    const div = document.createElement('div');
    div.className = 'upgrade' + (canAfford ? '' : ' disabled');
    div.innerHTML = `
      <div class="row1"><span><span class="icon">${next.icon}</span>${next.name}</span><span class="lvl">upgrade</span></div>
      <div class="desc">Deals ${next.dmg} damage per swat.</div>
      <div class="cost ${canAfford?'':'cant'}">Cost: ${fmt(next.cost)} ${ICONS.juice}</div>`;
    div.onclick = buySwatterTier;
    upgradeListEl.appendChild(div);
  } else {
    const div = document.createElement('div');
    div.className = 'lockedNote';
    div.textContent = 'You wield the ultimate swatter.';
    upgradeListEl.appendChild(div);
  }
}
setInterval(() => { if(shopEl.classList.contains('open')) renderShop(); }, 500);
renderShop();
// HOME SCREEN / OPTIONS BUTTON WIRING
const homeOverlay = document.getElementById('homeOverlay');
const optionsPanel = document.getElementById('optionsPanel');
const pixelCursorEl = document.getElementById('pixelCursor');
// the pixel-mouse replaces the swatter whenever a menu owns the pointer
function updateCursorMode(){
  document.body.classList.toggle('showPixelCursor', isMenuUp());
}
addEventListener('mousemove', e => {
  pixelCursorEl.style.transform = `translate(${e.clientX-3}px, ${e.clientY-3}px)`;
});
// Shared "leave the title card, enter gameplay" logic for both buttons.
function startGame(){
  homeOverlay.style.display = 'none';
  document.body.classList.add('playing');
  gameStarted = true;
  state.spawnTimer = 0.7;
  const btn = document.getElementById('optionsBtn');
  btn.style.left = ''; btn.style.top = ''; btn.style.transform = '';
  updateCursorMode();
}
const resumeBtn = document.getElementById('resumeBtn');
const newGameBtn = document.getElementById('newGameBtn');
// Resume only shows up if there's actually something to resume; otherwise
// New Game is the only button on the card.
resumeBtn.classList.toggle('hidden', !hasMeaningfulSave());
resumeBtn.onclick = startGame; // state was already loaded by load() at startup
newGameBtn.onclick = () => {
  localStorage.removeItem(SAVE_KEY);
  state.juice = 0;
  state.totalEarned = 0;
  state.swatterTier = 0;
  UPGRADE_ORDER.forEach(id => state.upgrades[id] = 0);
  recompute();
  startGame();
};
document.getElementById('optionsBtn').onclick = () => { optionsPanel.classList.add('show'); optionsOpen = true; updateCursorMode(); };
document.getElementById('closeOptions').onclick = () => { optionsPanel.classList.remove('show'); optionsOpen = false; updateCursorMode(); };
document.getElementById('soundToggle').onchange = (e) => { soundOn = e.target.checked; };
document.getElementById('shakeToggle').onchange = (e) => { shakeOn = e.target.checked; };
document.getElementById('effectsToggle').onchange = (e) => { reducedEffects = e.target.checked; };
document.getElementById('fullscreenBtn').onclick = () => {
  if(!document.fullscreenElement){ document.documentElement.requestFullscreen?.(); }
  else { document.exitFullscreen?.(); }
};
document.getElementById('backToMenu').onclick = () => {
  gameStarted = false;
  document.body.classList.remove('playing');
  homeOverlay.style.display = 'flex';
  homeOverlay.classList.add('show'); // skip re-running the intro, go straight to title
  document.getElementById('optionsBtn').classList.add('visible');
  demoPhase = 'title';
  optionsPanel.classList.remove('show');
  optionsOpen = false;
  updateCursorMode();
};
document.getElementById('resetProgress').onclick = () => {
  if(confirm('Reset all progress? This cannot be undone.')){
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
};