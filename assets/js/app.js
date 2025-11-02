function initApp(){
  // ===== Background initializer (unchanged logic) =====
  (function(){
    const root = document.documentElement;

    const BG_VARS = [
      '--bg-col-ATM-01','--bg-col-ATM-02','--bg-col-ATM-03','--bg-col-ATM-04','--bg-col-ATM-05','--bg-col-ATM-06','--bg-col-ATM-07','--bg-col-ATM-08','--bg-col-ATM-09',
      '--bg-col-CNT-01','--bg-col-CNT-02','--bg-col-CNT-03','--bg-col-CNT-04','--bg-col-CNT-05','--bg-col-CNT-06','--bg-col-CNT-07','--bg-col-CNT-08','--bg-col-CNT-09',
      '--bg-col-COM-01','--bg-col-COM-02','--bg-col-COM-03','--bg-col-COM-04','--bg-col-COM-05','--bg-col-COM-06','--bg-col-COM-07','--bg-col-COM-08','--bg-col-COM-09','--bg-col-COM-10','--bg-col-COM-11','--bg-col-COM-12','--bg-col-COM-13','--bg-col-COM-14','--bg-col-COM-15','--bg-col-COM-16','--bg-col-COM-17','--bg-col-COM-18','--bg-col-COM-19','--bg-col-COM-20',
      '--bg-col-DMG-01','--bg-col-DMG-02','--bg-col-DMG-03','--bg-col-DMG-04','--bg-col-DMG-05','--bg-col-DMG-06','--bg-col-DMG-07','--bg-col-DMG-08','--bg-col-DMG-09','--bg-col-DMG-10','--bg-col-DMG-11','--bg-col-DMG-12','--bg-col-DMG-13','--bg-col-DMG-14','--bg-col-DMG-15','--bg-col-DMG-16','--bg-col-DMG-17','--bg-col-DMG-18','--bg-col-DMG-19','--bg-col-DMG-20','--bg-col-DMG-21','--bg-col-DMG-22','--bg-col-DMG-23','--bg-col-DMG-24',
      '--bg-col-FLX-01','--bg-col-FLX-02','--bg-col-FLX-03','--bg-col-FLX-04','--bg-col-FLX-05','--bg-col-FLX-06','--bg-col-FLX-07','--bg-col-FLX-08','--bg-col-FLX-09','--bg-col-FLX-10',
      '--bg-col-GDE-01','--bg-col-GDE-02','--bg-col-GDE-03','--bg-col-GDE-04','--bg-col-GDE-05','--bg-col-GDE-06','--bg-col-GDE-07','--bg-col-GDE-08','--bg-col-GDE-09','--bg-col-GDE-10','--bg-col-GDE-11','--bg-col-GDE-12','--bg-col-GDE-13','--bg-col-GDE-14','--bg-col-GDE-15','--bg-col-GDE-16','--bg-col-GDE-17',
      '--bg-col-HIB-01','--bg-col-HIB-02','--bg-col-HIB-03','--bg-col-HIB-04','--bg-col-HIB-05','--bg-col-HIB-06','--bg-col-HIB-07','--bg-col-HIB-08','--bg-col-HIB-09','--bg-col-HIB-10','--bg-col-HIB-11','--bg-col-HIB-12','--bg-col-HIB-13','--bg-col-HIB-14',
      '--bg-col-LIF-01','--bg-col-LIF-02','--bg-col-LIF-03','--bg-col-LIF-04','--bg-col-LIF-05','--bg-col-LIF-06','--bg-col-LIF-07','--bg-col-LIF-08',
      '--bg-col-MEM-01','--bg-col-MEM-02','--bg-col-MEM-03','--bg-col-MEM-04','--bg-col-MEM-05','--bg-col-MEM-06','--bg-col-MEM-07','--bg-col-MEM-08','--bg-col-MEM-09','--bg-col-MEM-10','--bg-col-MEM-11',
      '--bg-col-NAV-01','--bg-col-NAV-02','--bg-col-NAV-03','--bg-col-NAV-04','--bg-col-NAV-05','--bg-col-NAV-06','--bg-col-NAV-07','--bg-col-NAV-08','--bg-col-NAV-09',
      '--bg-col-VEH-01','--bg-col-VEH-02','--bg-col-VEH-03','--bg-col-VEH-04','--bg-col-VEH-05','--bg-col-VEH-06','--bg-col-VEH-07','--bg-col-VEH-08','--bg-col-VEH-09','--bg-col-VEH-10','--bg-col-VEH-11','--bg-col-VEH-12'
    ];

    function parseHSV(str){
      const m = str.trim().match(/^(-?\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%$/);
      if(!m) return null;
      const h = parseFloat(m[1]);
      const s = parseFloat(m[2]) / 100;
      const v = parseFloat(m[3]) / 100;
      return [h, s, v];
    }
    function hsvToHsl(h, s, v){
      const l = v * (1 - s/2);
      const denom = Math.min(l, 1 - l);
      const sHsl = (denom === 0) ? 0 : ((v - l) / denom);
      return [h, Math.max(0, Math.min(1, sHsl)), Math.max(0, Math.min(1, l))];
    }
    const pickRandom = arr => arr[Math.floor(Math.random()*arr.length)];

    function applyRandom(){
      for(let i=0;i<5;i++){
        const v = pickRandom(BG_VARS);
        const raw = getComputedStyle(root).getPropertyValue(v);
        const hsv = raw ? parseHSV(raw) : null;
        if(hsv){
          const [h, sHsl, l] = hsvToHsl(hsv[0], hsv[1], hsv[2]);
          const css = `hsl(${Math.round(((h%360)+360)%360)} ${Math.round(sHsl*100)}% ${Math.round(l*100)}%)`;
          root.style.setProperty('--colBG', css);
          return;
        }
      }
      applySolid();
    }
    function applySolid(){
      const c = (getComputedStyle(root).getPropertyValue('--colBG') || '#171d32').trim();
      root.style.setProperty('--colBG', c);
    }

    const mode = (getComputedStyle(root).getPropertyValue('--bg-mode') || 'random').trim();
    if (mode === 'solid') applySolid(); else applyRandom();
  })();

  // ===== Canvas + camera orbit (runs after partial is in the DOM) =====
  const wrap  = document.getElementById('wrap');
  const stack = document.getElementById('stack');

  // Expose and run layout now (load may have already fired)
  window.adjustLayout = function adjustLayout(){
    const fits = stack.offsetHeight + 1 <= window.innerHeight;
    if (fits) wrap.classList.add('vcenter'); else wrap.classList.remove('vcenter');
  };
  window.addEventListener('resize', window.adjustLayout);
  // react to async height changes (fonts, images, HUD)
  const roStack = new ResizeObserver(window.adjustLayout);
  roStack.observe(stack);
  // fonts can change metrics; recalc when ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(window.adjustLayout);
  }
  // run immediately after init
  window.adjustLayout();

  const cv  = document.getElementById('cv');
  const ctx = cv.getContext('2d');

  // Match canvas pixel size to CSS --max-w (square)
  let W = 0, H = 0;
  function sizeCanvasToCSS(){
    const cssMax = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--max-w')) || 1000;
    cv.width  = cssMax;
    cv.height = cssMax;
    W = cv.width; H = cv.height;
  }
  sizeCanvasToCSS();
  window.addEventListener('resize', sizeCanvasToCSS);

  const HUD = document.getElementById('hud');
  const roCanvas = new ResizeObserver(() => { W = cv.width; H = cv.height; });
  roCanvas.observe(cv);

  const targetMs = 33; // ~30fps

  // Projection mode
  let ORTHO = false;
  let ISO_SCALE = 1;
  const FIT_MARGIN = 1.20;

  // Camera
  const cam = {
    thetaX: -6 * Math.PI/180,
    thetaY:  7 * Math.PI/180,
    thetaZ: 10 * Math.PI/180,
    dist: 200,
    f: 2000,
    get cx(){ return W/2; },
    get cy(){ return H/2; }
  };

  // Flip the camera to the opposite side of the bay
  cam.thetaY += Math.PI;

  // Axis rotations
  function rotY(p,t){ const c=Math.cos(t), s=Math.sin(t); return [ p[0]*c + p[2]*s, p[1], -p[0]*s + p[2]*c ]; }
  function rotX(p,t){ const c=Math.cos(t), s=Math.sin(t); return [ p[0], p[1]*c - p[2]*s, p[1]*s + p[2]*c ]; }
  function rotZ(p,t){ const c=Math.cos(t), s=Math.sin(t); return [ p[0]*c - p[1]*s, p[0]*s + p[1]*c, p[2] ]; }

  // Projection
  function project(p){
    let q = rotZ(p, cam.thetaZ);
    q = rotY(q, cam.thetaY);
    q = rotX(q, cam.thetaX);

    if (ORTHO){
      return [ cam.cx + ISO_SCALE * q[0], cam.cy - ISO_SCALE * q[1], q[2] ];
    } else {
      const z = q[2] + cam.dist;
      if (!isFinite(z) || Math.abs(z) < 1e-3) return null;
      return [ cam.cx + cam.f * q[0] / z, cam.cy - cam.f * q[1] / z, z ];
    }
  }

  // Blender Z-up → scene mapping: [x,y,z] → [x, z, −y]
  function mapBlenderToScene(v){ return [ v[0], v[2], -v[1] ]; }

  let mappedCurves = [];
  let bbox = null;

  (function prepareCurves(){
    // accept either a global CURVES_DATA or window.CURVES_DATA
    const hasData =
      (typeof CURVES_DATA !== 'undefined' && CURVES_DATA && Array.isArray(CURVES_DATA.curves)) ||
      (typeof window !== 'undefined' && window.CURVES_DATA && Array.isArray(window.CURVES_DATA.curves));

    if (!hasData) {
      console.warn('[curves] No CURVES_DATA found or it has no .curves array');
      mappedCurves = [];
      return;
    }

    const SRC = (typeof CURVES_DATA !== 'undefined' && CURVES_DATA) ? CURVES_DATA : window.CURVES_DATA;

    mappedCurves = SRC.curves.map(c => ({
      name: c.name,
      splines: c.splines.map(s => ({
        cyclic: !!s.cyclic,
        points: s.points.map(p => ({
          co: mapBlenderToScene(p.co),
          hL: mapBlenderToScene(p.hL),
          hR: mapBlenderToScene(p.hR),
        }))
      }))
    }));

    const mins = [ +Infinity, +Infinity, +Infinity ];
    const maxs = [ -Infinity, -Infinity, -Infinity ];
    for (const c of mappedCurves){
      for (const s of c.splines){
        for (const p of s.points){
          for (let k=0;k<3;k++){
            const v = p.co[k];
            if (v < mins[k]) mins[k] = v;
            if (v > maxs[k]) maxs[k] = v;
          }
        }
      }
    }
    const center  = [ (mins[0]+maxs[0])/2, (mins[1]+maxs[1])/2, (mins[2]+maxs[2])/2 ];
    const extents = [ maxs[0]-mins[0], maxs[1]-mins[1], maxs[2]-mins[2] ];
    const radius  = Math.max(...extents) * 0.5 || 1;
    bbox = { min:mins, max:maxs, center, radius };

    // recenter to origin (with small Z offset for viewer)
    for (const c of mappedCurves){
      for (const s of c.splines){
        for (const p of s.points){
          const OFF_Z = -30;
          p.co = [ p.co[0]-center[0], p.co[1]-center[1], (p.co[2]-center[2])+OFF_Z ];
          p.hL = [ p.hL[0]-center[0], p.hL[1]-center[1], (p.hL[2]-center[2])+OFF_Z ];
          p.hR = [ p.hR[0]-center[0], p.hR[1]-center[1], (p.hR[2]-center[2])+OFF_Z ];
        }
      }
    }

    if (ORTHO){
      ISO_SCALE = (Math.min(cv.width, cv.height) * FIT_MARGIN) / (2 * (radius || 1));
    }
  })();

  function drawCurves(){
    if (!mappedCurves || !mappedCurves.length) return;

    const styles = getComputedStyle(document.documentElement);
    const bayWidth = parseFloat(styles.getPropertyValue('--bay-thickness')) || 2;
    const inkColor = (styles.getPropertyValue('--colMain') || '#ffffff').trim();

    ctx.save();
    ctx.lineWidth = bayWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = inkColor;
    ctx.globalAlpha = 0.9;

    const lineTo = (a,b)=>{ ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); };

    for (const curve of mappedCurves){
      for (const sp of curve.splines){
        const Praw = sp.points.map(p=>{
          const C = project(p.co);
          const L = p.hL ? project(p.hL) : null;
          const R = p.hR ? project(p.hR) : null;
          return C ? { co:[C[0],C[1]], hL: L? [L[0],L[1]]: null, hR: R? [R[0],R[1]]: null } : null;
        }).filter(Boolean);
        if (Praw.length < 2) continue;

        const hasAllHandles = Praw.every(q => q.hL && q.hR);
        if (hasAllHandles){
          ctx.beginPath();
          ctx.moveTo(Praw[0].co[0], Praw[0].co[1]);
          for (let i=1;i<Praw.length;i++){
            const a=Praw[i-1], b=Praw[i];
            ctx.bezierCurveTo(a.hR[0],a.hR[1], b.hL[0],b.hL[1], b.co[0],b.co[1]);
          }
          if (sp.cyclic){
            const a=Praw[Praw.length-1], b=Praw[0];
            ctx.bezierCurveTo(a.hR[0],a.hR[1], b.hL[0],b.hL[1], b.co[0],b.co[1]);
          }
          ctx.stroke();
        } else {
          for (let i=1;i<Praw.length;i++){ lineTo(Praw[i-1].co, Praw[i].co); }
          if (sp.cyclic){ lineTo(Praw[Praw.length-1].co, Praw[0].co); }
        }
      }
    }

    ctx.restore();
  }

  const fmtDeg = (v) => {
    let d = (v * 180 / Math.PI) % 360;
    if (d < 0) d += 360;
    return d.toFixed(2).padStart(6, '0');
  };
  function updateHUD(){
    if (!HUD) return;
    HUD.innerHTML =
      `<div class="hud-group">
         <div>CO/ORD;PLOT 3</div>
         <div class="sep" aria-hidden="true"></div>
       </div>` +
      `<div>mode ${ORTHO ? 'ORTHO' : 'PERS'}</div>` +
      `<div>θZ ${fmtDeg(cam.thetaZ)}°</div>` +
      `<div>θY ${fmtDeg(cam.thetaY)}°</div>` +
      `<div>θX ${fmtDeg(cam.thetaX)}°</div>`;
  }

  function render(){
    ctx.clearRect(0,0,cv.width,cv.height);
    drawCurves();
    updateHUD();
    window.adjustLayout();
  }

  let last = 0;
  function loop(ts){
    if (ts - last >= targetMs){
      const step = (0.02 + 0.55 * 0.06) * Math.PI / 180;
      cam.thetaX += step * -0.2;
      cam.thetaY += step * -0.1;
      cam.thetaZ += step * -5;
      render();
      last = ts;
    }
    requestAnimationFrame(loop);
  }

  render();
  requestAnimationFrame(loop);
}
