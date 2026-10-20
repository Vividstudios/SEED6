import{T as _,n as yt}from"./nav-D8_gae0M.js";import{m as gt}from"./viewer-D9G44wzF.js";const ct=45,ft=30,tt=4,ot=Math.PI/180,vt=Math.sqrt(1.6);function X({scale:t,azimuth:e=ct,elevation:s=ft}){const i=e*ot,o=s*ot;return{sinA:Math.sin(i),cosA:Math.cos(i),sinE:Math.sin(o),cosE:Math.cos(o),k:t*vt}}function P([t,e,s],i){const{origin:o}=i,{sinA:n,cosA:a,sinE:l,cosE:d,k:h}=X(i);return[o[0]+(t*n-e*a)*h,o[1]+((t*a+e*n)*l-s*d)*h]}function xt(t){const{sinA:e,cosA:s}=X(t);return[s,e]}function bt([t,e,s],i){const{sinA:o,cosA:n,sinE:a,cosE:l}=X(i);return(t*n+e*o)*l+s*a}const J=t=>{const e=(Math.round(t*10)/10).toFixed(1).replace(/\.0$/,"");return e==="-0"?"0":e};function S(t,e=!1){return t.length?t.map(([s,i],o)=>`${o?"L":"M"}${J(s)} ${J(i)}`).join("")+(e?"Z":""):""}function $t({x:t,y:e,w:s,d:i,r:o},n=8){const a=Math.max(0,Math.min(o,s/2,i/2)),l=[[t+s-a,e+a,-90],[t+s-a,e+i-a,0],[t+a,e+i-a,90],[t+a,e+a,180]],d=[];for(const[h,p,k]of l){const b=a>0?n:0;for(let v=0;v<=b;v++){const f=(k+(b?90*v/b:45))*ot;d.push([h+a*Math.cos(f),p+a*Math.sin(f)])}}return d}function ht(t){let e=0;for(let s=0;s<t.length;s++){const[i,o]=t[s],[n,a]=t[(s+1)%t.length];e+=i*a-n*o}return e/2}const Z=t=>ht(t)<0?[...t].reverse():t;function wt(t){const e=[...t].sort((n,a)=>n[0]-a[0]||n[1]-a[1]);if(e.length<3)return e;const s=(n,a,l)=>(a[0]-n[0])*(l[1]-n[1])-(a[1]-n[1])*(l[0]-n[0]),i=[];for(const n of e){for(;i.length>=2&&s(i[i.length-2],i[i.length-1],n)<=0;)i.pop();i.push(n)}const o=[];for(let n=e.length-1;n>=0;n--){const a=e[n];for(;o.length>=2&&s(o[o.length-2],o[o.length-1],a)<=0;)o.pop();o.push(a)}return[...i.slice(0,-1),...o.slice(0,-1)]}function at(t,e){const s=t.length,i=[],o=t.findIndex((a,l)=>a!==t[(l+s-1)%s]);if(o<0)return t[0]===e?[Array.from({length:s+1},(a,l)=>l%s)]:[];let n=null;for(let a=0;a<s;a++){const l=(o+a)%s;t[l]===e?(n||(n=[l]),n.push((l+1)%s)):n&&(i.push(n),n=null)}return n&&i.push(n),i}function mt(t,e,s,i,o={}){const n=o.convex??!0,a=t.length,l=ht(t)>0,[d,h]=xt(i),{sinA:p,cosA:k}=X(i),b=t.map(([c,u],y)=>{const[E,B]=t[(y+1)%a],T=E-c,I=B-u,j=Math.hypot(T,I)||1;return l?[I/j,-T/j]:[-I/j,T/j]}),v=b.map(([c,u])=>c*d+u*h>1e-9),f=t.map(([c,u])=>P([c,u,e+s],i)),$=t.map(([c,u])=>P([c,u,e],i)),r=[],g=[];for(const c of at(v,!1))r.push(S(c.map(u=>f[u])));for(const c of at(v,!0))g.push(S(c.map(u=>f[u]))),s>0&&r.push(S(c.map(u=>$[u])));if(s>0)for(let c=0;c<a;c++)v[(c+a-1)%a]!==v[c]&&r.push(S([f[c],$[c]]));let m;if(n)m=S(wt([...f,...$]),!0);else{const c=[S(Z(f),!0),S(Z($),!0)];for(let u=0;u<a;u++){if(!v[u])continue;const y=(u+1)%a;c.push(S(Z([f[u],f[y],$[y],$[u]]),!0))}m=c.join("")}const A=Array.from({length:tt},()=>[]);if(s>0){const[c,u]=[-p,k];for(let y=0;y<a;y++){if(!v[y])continue;const[E,B]=b[y],T=(E*c+B*u+1)/2,I=Math.min(tt-1,Math.max(0,Math.floor(T*tt))),j=(y+1)%a;A[I].push(S(Z([f[y],f[j],$[j],$[y]]),!0))}}let H;if(o.bevel&&o.bevel>0){const c=o.bevel,y=t.map(([E,B],T)=>{const[I,j]=b[(T+a-1)%a],[Y,K]=b[T],R=I+Y,D=j+K,U=Math.hypot(R,D)||1;return[E-R/U*c,B-D/U*c]}).map(([E,B])=>P([E,B,e+s],i));H=at(v,!0).map(E=>S([f[E[0]],...E.slice(1,-1).map(B=>y[B]),f[E[E.length-1]]])).join("")}return{fill:m,outline:r.join(""),crease:g.join(""),top:S(Z(f),!0),shades:A.map(c=>c.join("")),bevel:H}}const kt=(t,e=8)=>$t(t,e);function C(t,e,s,i,o=8,n=0){return mt(kt(t,o),e,s,i,{convex:!0,bevel:n})}function Mt(t,e,s,i=40){return Array.from({length:i},(o,n)=>{const a=n/i*Math.PI*2;return[t+s*Math.cos(a),e+s*Math.sin(a)]})}function At(t,e,s,i,o,n,a=32,l=0){return mt(Mt(t,e,s,a),i,o,n,{convex:!0,bevel:l})}const q=(t,e,s)=>S([P(t,s),P(e,s)]);function Et(t,e,s,{pad:i=24,headroom:o=0,azimuth:n=ct,elevation:a=ft}={}){const l={origin:[0,0],scale:1,azimuth:n,elevation:a},d=t.map(r=>P(r,l)),h=d.map(([r])=>r),p=d.map(([,r])=>r),k=Math.min(...h),b=Math.max(...h),v=Math.min(...p),f=Math.max(...p),$=Math.min((e-i*2)/(b-k),(s-i*2-o)/(f-v));return{origin:[e/2-(k+b)/2*$,o+(s-o)/2-(v+f)/2*$],scale:$,azimuth:n,elevation:a}}const z=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),st=t=>Object.entries(t).filter(([,e])=>e!==void 0&&e!==!1).map(([e,s])=>` ${e}="${z(String(s))}"`).join("");function L(t,{tone:e="hi",crease:s="faint",halo:i=!1,lit:o=!1,flat:n=!1,className:a,inner:l=""}={}){const d=[];return i&&d.push(`<path class="iso-halo" d="${t.fill}"/>`),d.push(`<path class="iso-fill" d="${t.fill}"/>`),n||(t.shades.forEach((h,p)=>{h&&d.push(`<path class="iso-shade" data-shade="${p}" d="${h}"/>`)}),d.push(`<path class="iso-top" d="${t.top}"/>`)),s!=="none"&&t.crease&&d.push(`<path class="iso-line iso-crease" data-tone="${s}" d="${t.crease}"/>`),s!=="none"&&t.bevel&&d.push(`<path class="iso-line iso-bevel" data-tone="${s}" d="${t.bevel}"/>`),l&&d.push(l),d.push(`<path class="iso-line iso-edge" data-tone="${e}" d="${t.outline}"/>`),`<g${st({class:a?`iso-solid ${a}`:"iso-solid","data-lit":o?"":void 0,"data-seamless":t.seamless?"":void 0})}>${d.join("")}</g>`}function G(t,{tone:e="lo",dotted:s=!1,dashed:i=!1,flow:o=!1,className:n,free:a}={}){return t?`<path${st({class:n?`iso-line ${n}`:"iso-line","data-tone":e,"data-free":a===!0?"":a||void 0,"data-dotted":s?"":void 0,"data-dashed":i?"":void 0,"data-flow":o?"":void 0,d:t})}/>`:""}function St(t,e,{via:s=[],tone:i="lo",dotted:o=!1,dashed:n=!1,flow:a=!1,ends:l="both",size:d=1.2}={}){const h=S([t,...s,e]),p=([k,b])=>`<circle class="iso-wire-end" cx="${J(k)}" cy="${J(b)}" r="${d}"/>`;return`<g class="iso-wire" data-tone="${i}">${G(h,{tone:i,dotted:o,dashed:n,flow:a})}${l==="both"||l==="from"?p(t):""}${l==="both"||l==="to"?p(e):""}</g>`}function Tt({width:t,height:e,label:s,body:i,standalone:o=!1,className:n}){const a=o?`<style>${It}</style>`:"";return`<svg${st({xmlns:"http://www.w3.org/2000/svg",class:`iso-svg${o?" iso":""}${n?` ${n}`:""}`,"data-theme":o||void 0,viewBox:`0 0 ${t} ${e}`,role:"img","aria-label":s})}>${a}${Array.isArray(i)?i.join(""):i}</svg>`}function jt(t){return t==="raised"||t==="flat"||t==="lit"?`<svg class="iso-swatch" data-mark="${t}" viewBox="0 0 16 10" aria-hidden="true"><path d="${t==="flat"?"M2 6.5 8 3.5 14 6.5 8 9.5Z":"M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z"}"/>${t==="flat"?"":'<path class="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5"/>'}</svg>`:`<svg class="iso-swatch" data-mark="${t}" viewBox="0 0 16 10" aria-hidden="true"><path d="M1.5 5h13"/></svg>`}function Bt({fig:t,title:e,hint:s,readout:i="",keys:o=[],caption:n,body:a}){const l=(h,p,k="")=>`<span class="iso-plate-corner" data-corner="${h}"${k}>${z(p)}</span>`,d=o.length||n?`<figcaption class="iso-legend">${o.length?`<span class="iso-keys">${o.map(h=>`<span class="iso-key">${jt(h.mark)}${z(h.label)}</span>`).join("")}</span>`:""}${`<span class="iso-caption">${z(n)}</span>`}</figcaption>`:"";return`<figure class="iso-figure"><div class="iso-plate"><div class="iso-plate-corners" aria-hidden="true">${l("fig",t)}${e?l("title",e):""}${l("hint",s)}${l("readout",i," data-readout")}</div>${a}</div>${d}</figure>`}const It=`
.iso{
  --anatomy-page:#0b0b0b;--anatomy-card:#131313;--anatomy-text:#a3a3a3;--anatomy-strong:#e6e6e6;--anatomy-muted:#6e6e6e;
  --anatomy-paper:#131313;--anatomy-face:#1b1b1b;--anatomy-top:#1c1c1c;
  --anatomy-shade-0:#0f0f0f;--anatomy-shade-1:#121212;--anatomy-shade-2:#151515;--anatomy-shade-3:#181818;
  --anatomy-lit-top:#262626;--anatomy-lit-shade:#1d1d1d;
  --anatomy-hi:#d4d4d4;--anatomy-mid:#6a6a6a;--anatomy-lo:#3e3e3e;--anatomy-faint:#2a2a2a;--anatomy-lit:#ffffff;
  --anatomy-halo:#050505;--anatomy-halo-opacity:.9;--anatomy-dot:#e6e6e6;
  --anatomy-red:#ff6b6b;--anatomy-green:#6be0a0;--anatomy-blue:#6b9bff;
  --anatomy-weight:.6px;--anatomy-ease:cubic-bezier(.32,.72,0,1);
  --anatomy-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --anatomy-lift:inset 0 1px 0 0 #ffffff0a,inset 0 0 0 1px #ffffff06,0 0 0 1px #00000026,0 1px 1px -.5px #00000014,0 3px 3px -1.5px #00000014,0 6px 6px -3px #00000014,0 12px 12px -6px #00000014;
}
.iso[data-theme="light"]{
  --anatomy-page:#f2f2ef;--anatomy-card:#fbfbfa;--anatomy-text:#57575a;--anatomy-strong:#18181a;--anatomy-muted:#8c8c90;
  --anatomy-paper:#fbfbfa;--anatomy-face:#ffffff;--anatomy-top:#ffffff;
  --anatomy-shade-0:#dcdcd9;--anatomy-shade-1:#e5e5e2;--anatomy-shade-2:#ededea;--anatomy-shade-3:#f4f4f1;
  --anatomy-lit-top:#ffffff;--anatomy-lit-shade:#eeeeeb;
  --anatomy-hi:#26262a;--anatomy-mid:#8a8a8f;--anatomy-lo:#b4b4b8;--anatomy-faint:#d4d4d6;--anatomy-lit:#000000;
  --anatomy-halo:#8a8a80;--anatomy-halo-opacity:.32;--anatomy-dot:#3a3a3e;
  --anatomy-red:#e5484d;--anatomy-green:#30a46c;--anatomy-blue:#3e63dd;
  --anatomy-lift:inset 0 1px 0 0 #ffffff,0 0 0 1px #0000000f,0 1px 1px -.5px #0000000a,0 3px 3px -1.5px #0000000a,0 6px 6px -3px #0000000a,0 12px 12px -6px #0000000a;
}
.iso-svg{display:block;width:100%;height:auto;overflow:visible}
.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}
.iso-fill{fill:var(--anatomy-paper);stroke:none}
.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}
.iso-shade,.iso-top{stroke:none}
.iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
.iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
.iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
.iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
.iso-top{fill:var(--anatomy-top)}
.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}
.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}
.iso-solid[data-seamless]>.iso-shade,.iso-solid[data-seamless]>.iso-top{stroke-width:.4;stroke-linejoin:round}
.iso-solid[data-seamless]>.iso-shade[data-shade="0"]{stroke:var(--anatomy-shade-0)}
.iso-solid[data-seamless]>.iso-shade[data-shade="1"]{stroke:var(--anatomy-shade-1)}
.iso-solid[data-seamless]>.iso-shade[data-shade="2"]{stroke:var(--anatomy-shade-2)}
.iso-solid[data-seamless]>.iso-shade[data-shade="3"]{stroke:var(--anatomy-shade-3)}
.iso-solid[data-seamless]>.iso-top{stroke:var(--anatomy-top)}
.iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--anatomy-lit-top)}
.iso-solid[data-seamless][data-lit]>.iso-shade{stroke:var(--anatomy-lit-shade)}
.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}
.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}
.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}
.iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
.iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
.iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
.iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
.iso-line[data-tone="lit"]{stroke:var(--anatomy-lit)}
.iso-line[data-tone="red"]{stroke:var(--anatomy-red)}
.iso-line[data-tone="green"]{stroke:var(--anatomy-green)}
.iso-line[data-tone="blue"]{stroke:var(--anatomy-blue)}
.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}
.iso-line[data-dashed]{stroke-dasharray:3 3}
.iso-line[data-flow]{stroke-dasharray:2 6}
.iso-wire-end{fill:var(--anatomy-paper);stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight)}
.iso-wire[data-tone="hi"] .iso-wire-end{stroke:var(--anatomy-hi)}
.iso-wire[data-tone="mid"] .iso-wire-end{stroke:var(--anatomy-mid)}
.iso-wire[data-tone="faint"] .iso-wire-end{stroke:var(--anatomy-faint)}
.iso-wire[data-tone="lit"] .iso-wire-end{stroke:var(--anatomy-lit)}
.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}
.iso-dots[data-tone="hi"] circle{opacity:.85}
.iso-dots[data-tone="mid"] circle{opacity:.45}
.iso-dots[data-tone="lo"] circle{opacity:.22}
.iso-dots[data-tone="faint"] circle{opacity:.12}
.iso-face-text{fill:var(--anatomy-mid);font-family:var(--anatomy-mono);letter-spacing:.04em}
.iso-face-text[data-tone="hi"]{fill:var(--anatomy-hi)}
.iso-face-text[data-tone="lo"]{fill:var(--anatomy-lo)}
.iso-face-text[data-tone="faint"]{fill:var(--anatomy-faint)}
.tb-body{fill:var(--anatomy-shade-2);stroke:none}
.tb-shine{fill:var(--anatomy-top);stroke:none}
.tb-shade{fill:var(--anatomy-shade-0);stroke:none}
.tb-ring{fill:none;stroke:var(--anatomy-lo);stroke-width:.45;stroke-linecap:butt;stroke-linejoin:round}
.tb-ring[data-tone="mid"]{stroke:var(--anatomy-mid)}
.tb-ring[data-tone="faint"]{stroke:var(--anatomy-faint)}
.tb-ring[data-tone="hi"]{stroke:var(--anatomy-hi)}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
@keyframes iso-pulse{0%,100%{opacity:.18}12%{opacity:1}40%{opacity:.18}}
.iso-line[data-flow]{animation:iso-flow 1600ms linear infinite}
.iso-dots circle[data-pulse]{animation:iso-pulse 1600ms steps(1,end) infinite;animation-delay:var(--pulse-at,0ms)}
.iso-figure{margin:32px 0 36px}
.iso-plate{position:relative;padding:52px 24px;border-radius:0;background:var(--anatomy-card);box-shadow:0 0 0 1px var(--anatomy-mid);--anatomy-paper:var(--anatomy-card)}
.iso-plate-corners{position:absolute;inset:18px 20px;pointer-events:none}
.iso-plate-corner{position:absolute;color:var(--anatomy-muted);font-family:var(--anatomy-mono);font-size:10.5px;line-height:1;letter-spacing:.04em;white-space:nowrap}
.iso-plate-corner[data-corner="fig"]{top:0;left:0;color:var(--anatomy-text)}
.iso-plate-corner[data-corner="title"]{top:0;right:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="hint"]{bottom:0;left:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="readout"]{right:0;bottom:0;color:var(--anatomy-text);font-variant-numeric:tabular-nums}
.iso-plate .iso-svg{margin:0 auto}
.iso-legend{display:grid;gap:8px;margin-top:12px;color:var(--anatomy-muted);font-size:13px;line-height:1.55}
.iso-keys{display:flex;flex-wrap:wrap;gap:6px 18px}
.iso-key{display:inline-flex;align-items:center;gap:7px}
.iso-swatch{width:16px;height:10px;flex:none;overflow:visible}
.iso-swatch path{fill:none;stroke:var(--anatomy-hi);stroke-width:1;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
.iso-swatch[data-mark="raised"] path,.iso-swatch[data-mark="flat"] path{stroke:var(--anatomy-mid)}
.iso-swatch[data-mark="lit"] path{stroke:var(--anatomy-lit)}
.iso-swatch[data-mark="dim"] path{stroke:var(--anatomy-lo)}
.iso-swatch[data-mark="dotted"] path{stroke-dasharray:.01 3;stroke-width:1.4}
.iso-swatch[data-mark="dashed"] path{stroke-dasharray:3 2.5}
.iso-swatch[data-mark="red"] path{stroke:var(--anatomy-red)}
.iso-swatch[data-mark="green"] path{stroke:var(--anatomy-green)}
.iso-swatch[data-mark="blue"] path{stroke:var(--anatomy-blue)}
.iso-swatch-crease{stroke:var(--anatomy-lo)!important}
@media (max-width:560px){.iso-plate{padding:48px 12px 70px}.iso-plate-corner[data-corner="hint"]{bottom:18px}}
@media (prefers-reduced-motion:reduce){.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}
`,rt=760,lt=520,F=14,V=6,M=70,O=4*F+5*V,w=2*F+3*V;function Ft(t,e,s){const o=2*O+18,n=[[-30,-20,0],[o+40,w+30,0],[-30,-20,M+30],[o+40,w+30,M+30],[o+40,-20,0],[-30,w+30,0]],a=Et(n,rt,lt,{pad:30,headroom:20}),l=[],d=(r,g)=>l.push({depth:bt(r,a),svg:g}),h=[];h.push(L(C({x:-24,y:-14,w:o+48,d:w+28,r:3},-8,8,a),{tone:"mid",halo:!0}));const p=w+10;h.push(G(q([-20,p,.2],[o+20,p,.2],a),{tone:"lo",dashed:!0})),h.push(G(q([-20,p+6,.2],[o+20,p+6,.2],a),{tone:"lo",dotted:!0}));let k=0,b=0;for(let r=0;r<2;r++){const g=r*(O+18),m=e.nodes[r],A=r<t.nodes,H=!A,c=A&&m==null;d([g+O/2,w/2,0],`<g class="tray" data-node="${r}">`+L(C({x:g,y:0,w:O,d:w,r:2},0,6,a),{tone:H||c?"lo":"hi",crease:H?"none":"faint"})+"</g>");const u=P([g+O/2,w+22,0],a);if(h.push(`<text class="fig-label" x="${u[0].toFixed(1)}" y="${u[1].toFixed(1)}" text-anchor="middle">${H?"RESERVED BAY":`NODE ${"AB"[r]}${c?" · OFFLINE":""}`}</text>`),!H)for(let y=0;y<8;y++){const E=y%4,B=Math.floor(y/4),T=g+V+E*(F+V),I=V+B*(F+V),j=t.gpuGB;b+=j;const Y=m?m[y].lanes:[];let K=6,R=L(C({x:T,y:I,w:F,d:F,r:1.5},6,1.5,a),{tone:c?"faint":"mid",crease:"none"});const D=T+F/2,U=I+F/2;R+=G(q([D,U,7.5],[D,U,7.5+M],a),{tone:"faint",dotted:!0}),K=7.5;for(const N of Y){const nt=Math.max(1,N.gb/j*M);k+=N.gb;const it=N.flagship==="weights";R+=L(C({x:T+2,y:I+2,w:F-4,d:F-4,r:1},K,nt,a),{tone:N.flagship==="kv"||it?"hi":"mid",lit:it}),K+=nt}R+=L(At(D,U,1.2,7.5+M,1,a,12),{tone:"lo",crease:"none"});const ut=c?"offline":Y.length?Y.map(N=>`${N.label} · ${N.gb} GB`).join(" + "):"Free / spare";d([D,U,0],`<g class="gpu" tabindex="-1" data-info="${`Node ${"AB"[r]} · GPU ${y}: ${ut}`.replace(/"/g,"&quot;")}">${R}</g>`)}}d([-16,-6,0],L(C({x:-20,y:-10,w:8,d:8,r:1},0,M*.9,a),{tone:"mid"}));const v=P([-16,-6,M*.5],a);for(let r=0;r<t.nodes;r++){const g=P([r*(O+18)+4,2,3],a);h.push(""),d([-10,0,0],St(v,g,{tone:"lo",flow:!0,dashed:!0}))}const f=o+22;if(s==="rdhx"){d([f,w/2,0],L(C({x:f,y:-6,w:6,d:w+12,r:1},0,M*.95,a),{tone:"mid"}));for(let r=1;r<6;r++)d([f+7,w/2,0],G(q([f+6.2,-6+r*(w+12)/6,6],[f+6.2,-6+r*(w+12)/6,M*.9],a),{tone:"faint"}))}else if(s==="chimney")d([o/2,w/2,M+14],G(q([-6,-12,M+14],[o+6,-12,M+14],a)+q([o+6,-12,M+14],[o+6,-12,M+26],a),{tone:"lo",dashed:!0})),d([o+10,-10,0],L(C({x:o-10,y:-16,w:22,d:6,r:1},M+14,18,a),{tone:"mid"}));else{d([f,w/2,0],L(C({x:f,y:2,w:12,d:w-4,r:2},0,34,a),{tone:"mid"}));for(let r=0;r<t.nodes;r++){const g=r*(O+18);d([f-2,-2,0],G(q([f,4,20],[g+O/2,4,20],a),{tone:"blue",flow:!0})),d([f-2,-2,0],G(q([f,w-4,26],[g+O/2,w-4,26],a),{tone:"red",flow:!0}))}}l.sort((r,g)=>r.depth-g.depth);const $=h.join("")+l.map(r=>r.svg).join("");return{svg:Tt({width:rt,height:lt,label:`${t.short} rack: GPU memory allocation, ${e.label}`,body:$}),used:k,total:b}}function Ht(t,e,s,i){let o=0,n=!1,a=!0,l=0;const d=matchMedia("(prefers-reduced-motion: reduce)").matches,h=[{mark:"lit",label:"Flagship weights"},{mark:"raised",label:"KV cache / services"},{mark:"dotted",label:"GPU HBM capacity"},{mark:"dashed",label:"Power feed / airflow"}];t.innerHTML=Bt({fig:s,title:e.short.toUpperCase(),hint:"← → modes · hover a GPU",keys:h,caption:"Column height = HBM allocated ÷ usable capacity per GPU. Allocations and kW are design estimates.",body:'<div class="fig-stage" tabindex="0" role="group" aria-label="Failover figure; use arrow keys to change mode"></div>'})+`<div class="fig-modes" role="tablist">${e.modes.map((m,A)=>`<button role="tab" data-i="${A}">${m.label}</button>`).join("")}</div><p class="fig-note" aria-live="polite"></p>`;const p=t.querySelector(".fig-stage"),k=t.querySelector("[data-readout]"),b=t.querySelector(".fig-note"),v=[...t.querySelectorAll(".fig-modes button")];let f="";const $=()=>{const m=e.modes[o],A=Ft(e,m,i());p.innerHTML=A.svg,p.classList.remove("swap"),p.offsetWidth,d||p.classList.add("swap"),f=`${m.label.toUpperCase()} · HBM ${(A.used/1e3).toFixed(2)} / ${(A.total/1e3).toFixed(2)} TB · ~${m.kw} kW EST`,k.textContent=f,b.textContent=m.note,v.forEach((H,c)=>H.setAttribute("aria-selected",String(c===o)))},r=m=>{o=(m+e.modes.length)%e.modes.length,$()},g=()=>{n=!0,clearInterval(l)};return v.forEach(m=>m.addEventListener("click",()=>{g(),r(+m.dataset.i)})),p.addEventListener("keydown",m=>{m.key==="ArrowRight"&&(g(),r(o+1),m.preventDefault()),m.key==="ArrowLeft"&&(g(),r(o-1),m.preventDefault())}),p.addEventListener("pointerover",m=>{const A=m.target.closest(".gpu");A&&(k.textContent=A.dataset.info)}),p.addEventListener("pointerleave",()=>{k.textContent=f}),d||(l=window.setInterval(()=>{!n&&a&&!document.hidden&&r(o+1)},4500),new IntersectionObserver(m=>{a=m[0].isIntersecting}).observe(t)),$(),{rerender:$}}const pt=document.body.dataset.tier,W=_.findIndex(t=>t.id===pt),x=_[W];var dt;let Q=(dt=x.variants)==null?void 0:dt[0];const et=t=>`<dl class="kv">${t.map(([e,s])=>`<dt>${e}</dt><dd>${s}</dd>`).join("")}</dl>`;document.querySelector("#app").innerHTML=yt(pt)+`
<header class="hero" style="background-image:linear-gradient(90deg,#050607 25%,#05060700 75%),url(./img/${x.render})">
  <p class="eyebrow">${x.family} · Tier ${W+1} of ${_.length}</p><h1>${x.name}</h1><p class="lede">${x.tagline}</p>
  ${x.variants?`<div class="variant" role="radiogroup" aria-label="Cooling variant">${x.variants.map((t,e)=>`<button role="radio" aria-checked="${e===0}" data-v="${e}">${t.label}</button>`).join("")}</div>`:""}
</header>
<section class="sec"><h2>How the rack carries the workload</h2><p class="sub">Each column is one GPU. The bright segment is the flagship model's weights; the rest is KV cache or other services. Step through the modes to see what happens when a node or GPU is lost.</p><div id="fig"></div></section>
<section class="sec"><h2>The real build in 3D</h2><p class="sub">Exported from the Blender build (Draco-compressed glTF). Drag to orbit, scroll to zoom.${x.variants?" The A/E switch above swaps the model: A is the air-cooled build with RDHx, E is the direct-liquid build.":""}</p><div class="viewer" id="viewer"></div></section>
<section class="sec grid3"><div><h3>Specification</h3>${et(x.specs)}</div><div><h3>Power</h3>${et(x.power)}</div><div><h3>Cooling and mass</h3>${et(x.coolingRows)}</div></section>
<section class="sec"><h3>Bill of materials (no pricing)</h3><ul class="bom">${x.bom.map(t=>`<li>${t}</li>`).join("")}</ul><p class="fine">Figures marked as design estimates are calculated values, not measurements. HBM: ${x.gpuGBNote}.</p></section>
<section class="sec"><h2>Renders · 4K Cycles</h2><div class="gallery">${x.shots.map(t=>`<a href="./img/${t.file}" target="_blank" rel="noopener"><img loading="lazy" src="./img/${t.file}" alt="${t.caption}"><span>${t.caption}</span></a>`).join("")}</div></section>
<footer class="foot"><a href="./index.html">← Overview</a>${_[W+1]?`<a href="./${_[W+1].id}.html">${_[W+1].short} →</a>`:""}</footer>`;const Lt=Ht(document.querySelector("#fig"),x,`FIG ${W+1}`,()=>Q?Q.cooling:x.cooling),Ot=gt(document.querySelector("#viewer"),`./glb/${x.glb}`);document.querySelectorAll(".variant button").forEach(t=>t.addEventListener("click",()=>{Q=x.variants[+t.dataset.v],document.querySelectorAll(".variant button").forEach(e=>e.setAttribute("aria-checked",String(e===t))),Lt.rerender(),Ot.load(`./glb/${Q.id==="E"?"R01_E.glb":x.glb}`)}));
