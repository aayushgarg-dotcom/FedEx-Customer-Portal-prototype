// Shared brand token engine for the Customer Portal.
// One source of truth for reading the persisted brand, deriving sensible
// defaults, and applying every token as CSS variables + injected global rules
// so all portal pages (Settings preview, Login, Search, Home, Results,
// Tracking, Dashboard) render the same customer branding.
//
// Persisted shape (localStorage 'fk_brand_v3'):
//   { name, brandMark, accent, logoUrl, url, showCompany, sections,
//     accent2, surface, font, fontLink, fontFaces, radius, border, pageBg }
//   - font: Google/known family name, or 'Custom' when uploaded faces are used
//   - fontLink: Google Fonts stylesheet href (null for uploaded/system)
//   - fontFaces: [{ role:'body'|'heading'|'label', weight, dataUrl }]
//   - radius: 'sharp' | 'rounded' | 'pill'
//   - border: 'none' | 'subtle' | 'defined'

export const FEDEX_DEFAULT = {
  name:'FedEx', brandMark:'FX', accent:'#4D148C',
  logoUrl:'assets/fedex-logo.png', url:'fedex.com',
  showCompany:false
};

// ---- color helpers ---------------------------------------------------------
function clean(hex){ const h=String(hex||'').replace('#',''); return /^[0-9a-fA-F]{3}$/.test(h)?h.split('').map(c=>c+c).join(''):(/^[0-9a-fA-F]{6}$/.test(h)?h:null); }
function toRgb(hex){ const h=clean(hex); if(!h) return null; return { r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16) }; }
function toHex(r,g,b){ const c=x=>('0'+Math.max(0,Math.min(255,Math.round(x))).toString(16)).slice(-2); return '#'+c(r)+c(g)+c(b); }
export function inkOn(hex){ const c=toRgb(hex); if(!c) return '#ffffff'; return (0.2126*c.r+0.7152*c.g+0.0722*c.b)/255>0.62?'#16181D':'#ffffff'; }
function rgbToHsl(r,g,b){ r/=255;g/=255;b/=255; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); let h,s,l=(mx+mn)/2; if(mx===mn){h=s=0;} else { const d=mx-mn; s=l>0.5?d/(2-mx-mn):d/(mx+mn); switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;} h/=6;} return {h:h*360,s:s*100,l:l*100}; }
function hslToHex(h,s,l){ h/=360;s/=100;l/=100; const q=l<0.5?l*(1+s):l+s-l*s, p=2*l-q; const f=t=>{ if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; }; return toHex(f(h+1/3)*255, f(h)*255, f(h-1/3)*255); }
function mixWhite(hex, amt){ const c=toRgb(hex); if(!c) return '#ffffff'; return toHex(c.r+(255-c.r)*amt, c.g+(255-c.g)*amt, c.b+(255-c.b)*amt); }

function deriveSecondary(primary){ const c=toRgb(primary); if(!c) return '#0E65E5'; const {h,s,l}=rgbToHsl(c.r,c.g,c.b); return hslToHex((h+28)%360, Math.min(92,s+4), Math.max(30,Math.min(58,l>50?l-14:l+14))); }
function deriveSurface(primary){ return mixWhite(primary, 0.90); }

// ---- radius / border maps --------------------------------------------------
const RADIUS = { sharp:{btn:'3px',card:'6px',pill:'6px'}, rounded:{btn:'10px',card:'16px',pill:'999px'}, pill:{btn:'999px',card:'20px',pill:'999px'} };
function borderVals(kind, primary){
  if(kind==='none') return { w:'0px', color:'transparent' };
  if(kind==='defined'){ const c=toRgb(primary)||{r:20,g:22,b:29}; return { w:'1.5px', color:'rgba('+c.r+','+c.g+','+c.b+',.28)' }; }
  return { w:'1px', color:'#E9EAEB' }; // subtle
}

// ---- read + normalize ------------------------------------------------------
export function readBrand(){
  let b = { ...FEDEX_DEFAULT };
  try { const s = localStorage.getItem('fk_brand_v3'); if (s) b = JSON.parse(s); } catch(e){}
  return withDefaults(b);
}
export function withDefaults(b){
  b = b || {};
  const accent = clean(b.accent) ? ('#'+clean(b.accent)) : '#4D148C';
  const accent2 = clean(b.accent2) ? ('#'+clean(b.accent2)) : deriveSecondary(accent);
  const surface = clean(b.surface) ? ('#'+clean(b.surface)) : deriveSurface(accent);
  const radius = ['sharp','rounded','pill'].includes(b.radius) ? b.radius : 'rounded';
  const border = ['none','subtle','defined'].includes(b.border) ? b.border : 'subtle';
  const pageBg = clean(b.pageBg) ? ('#'+clean(b.pageBg)) : '#F5F6F8';
  return {
    ...b,
    accent, accent2, surface, radius, border, pageBg,
    font: b.font || null,
    fontLink: b.fontLink || null,
    fontFaces: Array.isArray(b.fontFaces) ? b.fontFaces : [],
    logoUrl: b.logoUrl || null,
    name: b.name || 'FedEx',
    brandMark: b.brandMark || 'FX',
    showCompany: b.showCompany === true
  };
}

// Build the CSS font-family stack for a set of tokens.
export function fontStack(t){
  if (t.fontFaces && t.fontFaces.length) return '"FKPortalFont", "Lato", LatoLocal, sans-serif';
  if (t.font) return '"'+t.font+'", "Lato", LatoLocal, sans-serif';
  return 'lato, LatoLocal, sans-serif';
}
export function googleFontHref(family){
  if(!family) return null;
  const fam = family.trim().replace(/\s+/g,'+');
  return 'https://fonts.googleapis.com/css2?family='+fam+':wght@400;500;600;700;800;900&display=swap';
}

// ---- apply -----------------------------------------------------------------
// Applies tokens to `root` (an element). Sets CSS vars, tags the root with
// [data-pf], injects/updates a global rules <style>, loads the Google font,
// and registers uploaded @font-face rules.
export function applyBrand(root, tokens){
  const t = withDefaults(tokens);
  if (root && root.setAttribute){
    root.setAttribute('data-pf','');
    const rad = RADIUS[t.radius] || RADIUS.rounded;
    const bd = borderVals(t.border, t.accent);
    const set = (k,v)=>root.style.setProperty(k,v);
    set('--accent', t.accent);        set('--accent-ink', inkOn(t.accent));
    set('--accent-2', t.accent2);     set('--accent-2-ink', inkOn(t.accent2));
    set('--surface', t.surface);
    set('--portal-font', fontStack(t));
    set('--radius', rad.btn);
    set('--radius-card', rad.card);
    set('--radius-pill', rad.pill);
    set('--widget-border-w', bd.w);
    set('--widget-border-color', bd.color);
    set('--page-bg', t.pageBg);
  }
  injectGlobalRules();
  loadFont(t);
  return t;
}

function injectGlobalRules(){
  let el = document.getElementById('fk-brand-rules');
  if (el) return;
  el = document.createElement('style');
  el.id = 'fk-brand-rules';
  el.textContent = [
    '[data-pf] *{font-family:var(--portal-font) !important;}',
    '[data-pf] button{border-radius:var(--radius) !important;}',
    '[data-pf] input:not([type=checkbox]):not([type=radio]),[data-pf] textarea,[data-pf] select{border-radius:var(--radius) !important;}',
    '[data-pf] [data-card]{border-radius:var(--radius-card) !important;border-width:var(--widget-border-w) !important;border-color:var(--widget-border-color) !important;border-style:solid !important;}',
    '[data-pf] [data-surface]{background:var(--surface) !important;}',
    // Secondary color on text buttons/links disabled for now — kept for easy restore.
    // '[data-pf] [data-accent2]{color:var(--accent-2) !important;}',
    '[data-pf] [data-accent2-bg]{background:var(--accent-2) !important;color:var(--accent-2-ink) !important;}'
  ].join('\n');
  (document.head || document.documentElement).appendChild(el);
}

function loadFont(t){
  // Google / system family via <link>
  const href = t.fontLink || (t.font && !(t.fontFaces && t.fontFaces.length) ? googleFontHref(t.font) : null);
  let link = document.getElementById('fk-brand-font');
  if (href){
    if (!link){ link = document.createElement('link'); link.id='fk-brand-font'; link.rel='stylesheet'; document.head.appendChild(link); }
    if (link.getAttribute('href') !== href) link.setAttribute('href', href);
  } else if (link){ link.remove(); }

  // Uploaded faces via @font-face(dataUrl)
  let face = document.getElementById('fk-brand-face');
  if (t.fontFaces && t.fontFaces.length){
    const css = t.fontFaces.map(f=>(
      '@font-face{font-family:"FKPortalFont";font-weight:'+(f.weight||400)+';font-style:normal;font-display:swap;src:url('+f.dataUrl+');}'
    )).join('\n');
    if (!face){ face = document.createElement('style'); face.id='fk-brand-face'; document.head.appendChild(face); }
    if (face.textContent !== css) face.textContent = css;
  } else if (face){ face.remove(); }
}

export const RADIUS_MAP = RADIUS;
