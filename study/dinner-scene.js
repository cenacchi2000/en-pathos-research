import * as THREE from "./three.module.min.js";

const material = (color, roughness = .8) => new THREE.MeshStandardMaterial({color, roughness});
const sphere = new THREE.SphereGeometry(1, 24, 16);
const cube = new THREE.BoxGeometry(1, 1, 1);
const cylinder = new THREE.CylinderGeometry(1, 1, 1, 48);

function mesh(parent, geometry, finish, position, scale) {
  const part = new THREE.Mesh(geometry, finish);
  part.position.set(...position);
  part.scale.set(...scale);
  part.castShadow = true;
  part.receiveShadow = true;
  parent.add(part);
  return part;
}

function guest(scene, x, z, turn, skinColor, shirtColor, hairColor, hairstyle) {
  const person = new THREE.Group();
  person.position.set(x, 0, z);
  person.rotation.y = turn;
  scene.add(person);
  const skin = material(skinColor);
  const shirt = material(shirtColor);
  const hair = material(hairColor);
  const trousers = material(0x30313b);
  const chair = material(0x764735);
  const shoes = material(0x46302a);
  mesh(person, cube, chair, [0,.46,-.1], [.56,.09,.56]);
  mesh(person, cube, chair, [0,.84,-.38], [.56,.61,.08]);
  const body = new THREE.Group();
  person.add(body);
  const arms = [];
  const reaching = [];
  const legs = [];
  for (const side of [-1,1]) {
    for (const depth of [-.32,.13]) mesh(person,cube,chair,[side*.22,.22,depth],[.055,.45,.055]);
    const thigh = mesh(body,sphere,trousers,[0,0,0],[1,1,1]);
    const shin = mesh(body,sphere,trousers,[0,0,0],[1,1,1]);
    const shoe = mesh(body,sphere,shoes,[0,0,0],[.071,.041,.106]);
    legs.push({thigh, shin, shoe, side});
  }
  const torso = mesh(body,sphere,shirt,[0,.81,-.055],[.255,.35,.16]);
  mesh(body,cylinder,skin,[0,1.13,-.015],[.078,.13,.074]);
  for (const side of [-1,1]) {
    const arm = new THREE.Group();
    arm.position.set(side*.224,.99,.015);
    arm.rotation.z = side*.24;
    body.add(arm);
    mesh(arm,sphere,shirt,[0,-.12,0],[.077,.15,.075]);
    arm.forearm = mesh(arm,sphere,skin,[0,-.23,.078],[.048,.046,.112]);
    arms.push(arm);
    const reach = new THREE.Group();
    body.add(reach);
    const plateHand = new THREE.Group();
    reach.add(plateHand);
    mesh(plateHand,sphere,skin,[0,0,0],[.029,.014,.036]);
    for (let finger=0;finger<4;finger++) {
      mesh(plateHand,sphere,skin,[-side*(.023+.003*(finger%2)),.004,(finger-1.5)*.014],
        [.023,.007,.0065]);
    }
    const thumb = mesh(plateHand,sphere,skin,[-side*.010,.017,.027],[.011,.017,.008]);
    thumb.rotation.z = side*.34;
    reaching.push({
      group:reach,
      upper:mesh(reach,sphere,shirt,[0,0,0],[1,1,1]),
      lower:mesh(reach,sphere,skin,[0,0,0],[1,1,1]),
      palm:mesh(reach,sphere,skin,[0,0,0],[.052,.037,.043]),
      plateHand,
    });
  }
  const head = new THREE.Group();
  head.position.set(0,1.31,.012);
  body.add(head);
  if (hairstyle === "long") mesh(head,sphere,hair,[0,-.025,-.121],[.169,.221,.102]);
  mesh(head,sphere,skin,[0,0,0],[.152,.185,.139]);
  mesh(head,sphere,hair,[0,.10,-.044],[.156,.114,.132]);
  const tuft = mesh(head,sphere,hair,[-.056,.106,.053],[.113,.058,.092]);
  tuft.rotation.z = -.27;
  if (hairstyle === "bun") mesh(head,sphere,hair,[0,.155,-.126],[.084,.09,.079]);
  const iris = material(hairColor,.45);
  const pupils = material(0x261b19,.35);
  const white = material(0xf6e9da,.35);
  const eyeGroups = [];
  head.scale.set(.94,.96,.94);
  for (const side of [-1,1]) {
    mesh(head,sphere,skin,[side*.145,-.01,-.006],[.03,.049,.026]);
    const eye = new THREE.Group();
    eye.position.set(side*.053,.014,.126);
    head.add(eye);
    mesh(eye,sphere,white,[0,0,0],[.023,.010,.010]);
    mesh(eye,sphere,iris,[0,0,.009],[.009,.009,.004]);
    mesh(eye,sphere,pupils,[0,0,.013],[.004,.004,.002]);
    const brow = mesh(head,sphere,hair,[side*.052,.039,.125],[.023,.004,.007]);
    brow.rotation.z = side*.07;
    eyeGroups.push(eye);
  }
  mesh(head,sphere,skin,[0,-.026,.135],[.028,.035,.031]);
  const mouth = mesh(head,sphere,material(0x783f38),[0,-.075,.126],[.038,.009,.012]);
  return {person, body, arms, reaching, legs, torso, head, mouth, eyeGroups};
}

export function mountDinnerScene(host) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.prepend(renderer.domElement);
  host.classList.add("has-dinner-scene");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x352827);
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 25);
  const views = {
    arrival: [[1.72,2.37,5.0],[-.32,1.03,-.25]],
    oven: [[-1.88,1.89,3.28],[-.88,1.08,-.59]],
    bread: [[.48,1.83,2.74],[.10,1.16,-.77]],
    water: [[2.92,1.68,2.06],[.98,1.04,-.41]],
    spill: [[.93,2.34,2.64],[.25,.81,.28]],
    meeting: [[2.67,1.51,1.98],[1.06,1.09,-.47]],
    tray: [[-2.04,1.71,2.42],[-.94,1.06,-.13]],
    music: [[2.15,2.36,4.85],[0,.99,-.21]],
    week: [[2.27,2.34,4.73],[.19,1.01,-.20]],
    joke: [[2.97,1.48,1.57],[1.10,1.09,-.48]],
    cake: [[1.44,2.36,2.82],[.07,.88,-.07]],
    clearing: [[-2.27,1.81,2.55],[-.95,1.03,-.18]],
    memory: [[.59,1.51,2.62],[-.10,1.16,-.86]],
    numbers: [[-2.03,1.66,2.49],[-1.02,1.04,-.19]],
    goodbye: [[1.64,2.40,5.11],[-.23,1.01,-.35]],
  };
  const wideShots = new Set(["arrival","music","week","goodbye"]);
  const aimedAt = new THREE.Vector3();
  const fromPosition = new THREE.Vector3();
  const fromTarget = new THREE.Vector3();
  const toPosition = new THREE.Vector3();
  const toTarget = new THREE.Vector3();
  camera.position.fromArray(views.arrival[0]);
  aimedAt.fromArray(views.arrival[1]);
  camera.lookAt(aimedAt);
  let cameraMoveStarted = 0;
  let activeView;
  let wasFirstPerson = false;
  const eyeDirection = new THREE.Vector3();
  let arrivalLookTime;
  let arrivalYaw = 0;
  const tableFocus = {
    water: [.70,.99,-.10],
    spill: [.42,.80,.39],
    tray: [-.53,.96,.11],
    cake: [.10,.91,.04],
    clearing: [-.47,.94,.16],
  };

  function updateView(moment,time,walking,snap) {
    const focus = tableFocus[moment];
    const firstPerson = walking || Boolean(focus);
    const shot = firstPerson ? "first-person" : "third-person";
    if (host.dataset.pointOfView !== shot) host.dataset.pointOfView = shot;
    const {head,body} = guests.You;
    head.visible = !firstPerson;
    const fov = firstPerson ? (camera.aspect<1.55 ? 69 : 55) : (camera.aspect<1.55 ? 43 : 34);
    const near = firstPerson ? .035 : .1;
    if (camera.fov !== fov || camera.near !== near) {
      camera.fov = fov;
      camera.near = near;
      camera.updateProjectionMatrix();
    }
    const entering = moment === "arrival" && walking;
    if (!entering) arrivalLookTime = undefined;
    if (firstPerson) {
      head.localToWorld(camera.position.set(0,.027,entering ? 0 : .128));
      if (walking) {
        body.getWorldDirection(eyeDirection);
        if (entering) {
          // Let the gaze follow the turn without inheriting every change in body heading.
          const heading = Math.atan2(eyeDirection.x,eyeDirection.z);
          if (arrivalLookTime === undefined) {
            arrivalYaw = heading;
          } else {
            const elapsed = THREE.MathUtils.clamp((time-arrivalLookTime)/1000,0,.05);
            const difference = Math.atan2(Math.sin(heading-arrivalYaw),Math.cos(heading-arrivalYaw));
            const limit = 1.35*elapsed;
            arrivalYaw += THREE.MathUtils.clamp(
              difference*(1-Math.exp(-elapsed/.34)),-limit,limit);
          }
          arrivalLookTime = time;
          eyeDirection.set(Math.sin(arrivalYaw),0,Math.cos(arrivalYaw));
          camera.position.addScaledVector(eyeDirection,.128);
        }
        aimedAt.copy(camera.position).addScaledVector(eyeDirection,2.2);
        aimedAt.y -= .16;
      } else {
        aimedAt.fromArray(focus);
      }
      camera.lookAt(aimedAt);
      activeView = null;
    } else {
      moveCamera(moment,time,snap || wasFirstPerson);
    }
    wasFirstPerson = firstPerson;
  }

  function moveCamera(moment,time,snap) {
    const [position,target] = views[moment] || views.arrival;
    if (moment !== activeView) {
      activeView = moment;
      fromPosition.copy(camera.position);
      fromTarget.copy(aimedAt);
      toPosition.fromArray(position);
      toTarget.fromArray(target);
      cameraMoveStarted = snap ? time-940 : time;
    }
    const elapsed = Math.max(0,time-cameraMoveStarted);
    const blend = snap ? 1 : ease(elapsed/940);
    camera.position.copy(fromPosition).lerp(toPosition,blend);
    aimedAt.copy(fromTarget).lerp(toTarget,blend);
    if (!snap && !wideShots.has(moment)) {
      camera.position.lerp(aimedAt,.033*ease((elapsed-940)/5200));
    }
    camera.lookAt(aimedAt);
  }

  scene.add(new THREE.HemisphereLight(0xffedd9,0x666571,1.55));
  const warm = new THREE.DirectionalLight(0xffcd9e,2.0);
  warm.position.set(-2,4,2);
  warm.castShadow = true;
  warm.shadow.mapSize.set(1024,1024);
  warm.shadow.bias = -.00035;
  scene.add(warm);
  const windowLight = new THREE.DirectionalLight(0xabc4ef,.85);
  windowLight.position.set(3,2,-2);
  scene.add(windowLight);
  const lampLight = new THREE.PointLight(0xffbc76,9,4);
  lampLight.position.set(0,2.06,0);
  scene.add(lampLight);

  mesh(scene,cube,material(0x6e4c3f),[0,-.075,0],[12,.15,12]);
  const wall = material(0x6f5146);
  const trim = material(0x492e28);
  const frame = material(0xb68857);
  const doorway = {left:-2.45, right:-1.85, height:1.86, depth:-2.39};
  for (const [left,right] of [[-5,doorway.left],[doorway.right,5.60]]) {
    const middle = (left+right)/2;
    mesh(scene,cube,wall,[middle,1.6,-2.45],[right-left,3.2,.12]);
    for (const y of [.12,.76]) mesh(scene,cube,trim,[middle,y,-2.37],[right-left,.055,.06]);
  }
  const doorCenter = (doorway.left+doorway.right)/2;
  mesh(scene,cube,wall,[doorCenter,2.53,-2.45],[.60,1.34,.12]);
  for (const edge of [doorway.left,doorway.right]) {
    mesh(scene,cube,frame,[edge,.94,doorway.depth],[.067,1.88,.17]);
  }
  mesh(scene,cube,frame,[doorCenter,doorway.height,doorway.depth],[.67,.078,.17]);
  mesh(scene,cube,frame,[doorCenter,.008,doorway.depth],[.58,.016,.16]);

  const hall = material(0x69746a);
  const hallwayRunner = material(0x824f42);
  mesh(scene,cube,hall,[doorCenter,1.32,-4.16],[2.51,2.64,.10]);
  mesh(scene,cube,hall,[-3.17,1.32,-3.31],[.10,2.64,1.66]);
  mesh(scene,cube,hall,[-1.22,1.32,-3.31],[.10,2.64,1.66]);
  mesh(scene,cube,hallwayRunner,[doorCenter,.008,-3.25],[.43,.016,1.40]);
  mesh(scene,cube,frame,[doorCenter,1.18,-4.07],[.44,.59,.07]);
  mesh(scene,cube,material(0xd4bd91),[doorCenter,1.18,-4.025],[.33,.48,.024]);
  const hallLight = new THREE.PointLight(0xffca8b,8,3.2);
  hallLight.position.set(doorCenter,1.74,-3.43);
  scene.add(hallLight);
  mesh(scene,sphere,new THREE.MeshBasicMaterial({color:0xffd7a1}),
    [doorCenter,1.83,-3.43],[.10,.075,.10]);
  mesh(scene,cube,frame,[.94,1.73,-2.37],[.83,.98,.075]);
  const rainCanvas = document.createElement("canvas");
  rainCanvas.width = 160;
  rainCanvas.height = 190;
  const rainInk = rainCanvas.getContext("2d");
  const rainSky = rainInk.createLinearGradient(0,0,0,190);
  rainSky.addColorStop(0,"#263b59");
  rainSky.addColorStop(1,"#617b89");
  const rainTexture = new THREE.CanvasTexture(rainCanvas);
  rainTexture.colorSpace = THREE.SRGBColorSpace;
  const viewOutside = new THREE.Mesh(new THREE.PlaneGeometry(.73,.88),
    new THREE.MeshBasicMaterial({map:rainTexture,toneMapped:false}));
  viewOutside.position.set(.94,1.73,-2.306);
  scene.add(viewOutside);
  let lastRainFrame = -Infinity;
  function drawRain(time) {
    if (time-lastRainFrame<45) return;
    lastRainFrame = time;
    rainInk.fillStyle = rainSky;
    rainInk.fillRect(0,0,160,190);
    rainInk.fillStyle = "#263b44";
    rainInk.beginPath();
    rainInk.moveTo(0,158);
    for (let x=0;x<=160;x+=8) rainInk.lineTo(x,140+Math.sin(x*.077)*7+Math.cos(x*.235)*4);
    rainInk.lineTo(160,190);
    rainInk.lineTo(0,190);
    rainInk.fill();
    rainInk.strokeStyle = "#bad5ea86";
    rainInk.lineWidth = 1.15;
    rainInk.beginPath();
    for (let i=0;i<37;i++) {
      const x = (i*47.3)%166;
      const y = (i*63.4+time*(.105+i%4*.025))%211-13;
      rainInk.moveTo(x,y);
      rainInk.lineTo(x-3.8,y+11+i%4*2);
    }
    rainInk.stroke();
    rainTexture.needsUpdate = true;
  }
  mesh(scene,cube,frame,[.94,1.73,-2.29],[.032,.88,.026]);
  mesh(scene,cube,frame,[.94,1.73,-2.29],[.73,.033,.026]);
  const curtainRod = mesh(scene,cylinder,material(0xa98356),[.94,2.298,-2.19],[.018,1.13,.018]);
  curtainRod.rotation.z = Math.PI/2;
  const curtainCloth = new THREE.MeshStandardMaterial({color:0xc3a27f,roughness:1,side:THREE.DoubleSide});
  for (const x of [.48,1.40]) {
    const fabric = new THREE.PlaneGeometry(.23,1.065,24,15);
    const points = fabric.attributes.position;
    for (let index=0;index<points.count;index++) {
      const horizontal = points.getX(index);
      const vertical = points.getY(index);
      const hem = Math.PI*(horizontal/.23+.5);
      points.setX(index,horizontal*(1.1-.23*Math.cos(vertical*4)));
      points.setY(index,vertical+(.5-vertical)*.022*Math.cos(hem*6));
      points.setZ(index,.029*Math.cos(hem*6));
    }
    fabric.computeVertexNormals();
    const curtain = new THREE.Mesh(fabric,curtainCloth);
    curtain.position.set(x,1.747,-2.172);
    curtain.castShadow = true;
    curtain.receiveShadow = true;
    scene.add(curtain);
  }


  const walnut = material(0x814628,.55);
  mesh(scene,cylinder,walnut,[0,.73,0],[1.17,.12,.82]);
  mesh(scene,cylinder,walnut,[0,.37,0],[.14,.71,.14]);
  mesh(scene,cylinder,walnut,[0,.055,0],[.49,.075,.38]);
  mesh(scene,cube,material(0x794843),[0,.794,0],[.42,.012,1.49]);
  const brass = material(0xc49b52,.3);
  const linen = material(0xe2c7a6);
  const greenery = material(0x456a4d);
  const petals = [material(0xd97b68),material(0xeec27c),material(0xe3a4a1)];
  mesh(scene,cube,frame,[-1.15,1.88,-2.36],[.52,.40,.055]);
  mesh(scene,cube,material(0xebc7a0),[-1.15,1.88,-2.325],[.45,.33,.02]);
  mesh(scene,sphere,greenery,[-1.15,1.85,-2.305],[.15,.075,.014]);
  mesh(scene,sphere,petals[0],[-1.09,1.92,-2.30],[.049,.054,.018]);

  // The sideboard sits against the wall, outside the aisle used during arrivals.
  const cabinet = material(0x584234,.61);
  const cabinetFront = material(0x8e6246,.56);
  const pottery = material(0xddcdb1,.49);
  mesh(scene,cube,cabinet,[2.02,.42,-2.17],[1.23,.84,.39]);
  mesh(scene,cube,walnut,[2.02,.86,-2.16],[1.29,.06,.43]);
  for (const x of [1.72,2.32]) {
    mesh(scene,cube,cabinetFront,[x,.45,-1.967],[.53,.61,.033]);
    mesh(scene,sphere,brass,[x+(x<2 ? .17 : -.17),.57,-1.936],[.021,.021,.018]);
  }
  for (let index=0;index<5;index++) {
    mesh(scene,cylinder,pottery,[1.54,.900+index*.017,-2.15],[.142,.017,.142]);
  }
  const playerX = 2.00;
  const playerZ = -2.15;
  const recordBase = material(0x493630,.55);
  const recordFinish = material(0x221e24,.30);
  mesh(scene,cube,recordBase,[playerX,.923,playerZ],[.43,.064,.33]);
  const record = new THREE.Group();
  record.position.set(playerX-.027,.965,playerZ);
  scene.add(record);
  mesh(record,cylinder,recordFinish,[0,0,0],[.132,.014,.132]);
  mesh(record,cylinder,petals[1],[0,.009,0],[.043,.005,.043]);
  mesh(record,cube,pottery,[-.018,.013,0],[.032,.004,.011]);
  mesh(scene,cylinder,brass,[playerX+.157,.973,playerZ-.081],[.023,.027,.023]);
  const tonearm = mesh(scene,cube,brass,[playerX+.098,.988,playerZ-.040],[.156,.013,.016]);
  tonearm.rotation.y = .59;
  const noteCanvas = document.createElement("canvas");
  noteCanvas.width = noteCanvas.height = 96;
  const noteInk = noteCanvas.getContext("2d");
  noteInk.font = "bold 70px Georgia, serif";
  noteInk.textAlign = "center";
  noteInk.textBaseline = "middle";
  noteInk.fillStyle = "#ffe6af";
  noteInk.fillText("♫",48,51);
  const noteTexture = new THREE.CanvasTexture(noteCanvas);
  noteTexture.colorSpace = THREE.SRGBColorSpace;
  const musicNotes = Array.from({length:3},() => {
    const note = new THREE.Sprite(new THREE.SpriteMaterial({map:noteTexture,transparent:true,depthWrite:false}));
    scene.add(note);
    return note;
  });
  mesh(scene,cylinder,material(0x94624e),[2.36,.984,-2.16],[.095,.187,.095]);
  for (let index=0;index<5;index++) {
    const leaf = mesh(scene,sphere,greenery,[2.36+(index-2)*.040,1.13+index%2*.05,-2.15],
      [.036,.09,.031]);
    leaf.rotation.z = (index-2)*-.37;
  }
  mesh(scene,cube,cabinet,[2.19,1.45,-2.28],[.87,.044,.22]);
  for (const [index,x] of [1.94,2.16,2.37].entries()) {
    mesh(scene,cylinder,petals[index],[x,1.526,-2.27],[.055,.11,.055]);
    const handle = mesh(scene,new THREE.TorusGeometry(.035,.008,8,20),petals[index],[x+.057,1.529,-2.26],[1,1,1]);
    handle.rotation.y = .28;
  }
  mesh(scene,cube,frame,[2.28,1.99,-2.365],[.58,.53,.07]);
  mesh(scene,cube,linen,[2.28,1.99,-2.323],[.50,.45,.026]);
  mesh(scene,sphere,petals[1],[2.37,2.064,-2.304],[.068,.068,.01]);
  mesh(scene,sphere,greenery,[2.24,1.892,-2.301],[.16,.095,.012]);
  mesh(scene,cube,wall,[-3.35,1.6,-.2],[.12,3.2,4.35]);
  mesh(scene,cube,trim,[-3.278,.129,-.2],[.043,.07,4.35]);
  const consoleZ = 1.06;
  const consoleX = -3.04;
  mesh(scene,cube,cabinet,[consoleX,.71,consoleZ],[.34,.10,1.18]);
  mesh(scene,cube,walnut,[consoleX,.785,consoleZ],[.39,.05,1.23]);
  for (const x of [-3.16,-2.91]) {
    for (const z of [.54,1.58]) mesh(scene,cube,cabinet,[x,.35,z],[.057,.70,.057]);
  }
  mesh(scene,cube,walnut,[consoleX,.25,consoleZ],[.31,.035,1.08]);
  for (const [index,z] of [.73,.82,.90,1.00].entries()) {
    const book = mesh(scene,cube,petals[index%3],[-3.05,.365,z],[.20,.196+index*.02,.06]);
    book.rotation.x = (index-1)*.045;
    mesh(scene,cube,linen,[-2.946,.364,z],[.008,.17+index*.02,.041]);
  }
  mesh(scene,cylinder,pottery,[consoleX,.88,1.40],[.094,.14,.094]);
  for (const [index,z] of [1.33,1.37,1.42,1.47].entries()) {
    const leaf = mesh(scene,sphere,greenery,[consoleX+.02,index%2*.036+1.035,z],[.052,.106,.037]);
    leaf.rotation.x = (index-1.5)*.37;
  }
  mesh(scene,cylinder,brass,[consoleX,.824,.64],[.097,.025,.097]);
  mesh(scene,cylinder,brass,[consoleX,.96,.64],[.014,.25,.014]);
  mesh(scene,new THREE.CylinderGeometry(.071,.132,.17,28),linen,[consoleX,1.105,.64],[1,1,1]);
  mesh(scene,cylinder,new THREE.MeshBasicMaterial({color:0xffd7a6}),
    [consoleX,1.026,.64],[.112,.011,.112]);
  const consoleLight = new THREE.PointLight(0xffbc80,2.8,1.65);
  consoleLight.position.set(consoleX+.08,1.035,.64);
  scene.add(consoleLight);

  // Claude Monet, The Beach at Sainte-Adresse (1867). Art Institute of Chicago, public domain.
  const paintingZ = .74;
  const paintingY = 1.94;
  mesh(scene,cube,frame,[-3.263,paintingY,paintingZ],[.074,1.16,1.57]);
  mesh(scene,cube,trim,[-3.220,paintingY,paintingZ],[.016,1.09,1.49]);
  const paintingTexture = new THREE.TextureLoader().load("data:image/jpeg;base64,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", () => draw());
  paintingTexture.colorSpace = THREE.SRGBColorSpace;
  paintingTexture.anisotropy = Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const painting = new THREE.Mesh(new THREE.PlaneGeometry(1.43,1.044),
    new THREE.MeshStandardMaterial({map:paintingTexture,roughness:.92}));
  painting.position.set(-3.209,paintingY,paintingZ);
  painting.rotation.y = Math.PI/2;
  scene.add(painting);

  // Keep the right-hand aisle open between the dining table and the furniture.
  mesh(scene,cube,wall,[5.55,1.60,.57],[.11,3.20,6.06]);
  mesh(scene,cube,trim,[5.477,.13,.57],[.045,.070,6.06]);

  const bookcase = new THREE.Group();
  bookcase.position.set(5.24,0,1.44);
  bookcase.rotation.y = -Math.PI/2;
  scene.add(bookcase);
  for (const x of [-.55,.55]) {
    mesh(bookcase,cube,cabinet,[x,.52,0],[.056,1.04,.37]);
  }
  mesh(bookcase,cube,cabinet,[0,.52,-.172],[1.1,1.04,.035]);
  for (const y of [.12,.49,.98]) {
    mesh(bookcase,cube,walnut,[0,y,0],[1.16,.048,.40]);
  }
  const bookCovers = [greenery,petals[1],petals[0],material(0x566e86)];
  for (const [row,count] of [[.143,5],[.514,7]]) {
    for (let index=0;index<count;index++) {
      const h = .16 + index%3*.043;
      mesh(bookcase,cube,bookCovers[index%4],[-.46+.093*index,row+h/2,.033],[.075,h,.22]);
    }
  }
  mesh(bookcase,sphere,pottery,[.30,1.073,.055],[.088,.068,.087]);
  mesh(bookcase,cylinder,brass,[-.27,1.016,.030],[.076,.023,.076]);
  mesh(bookcase,cylinder,brass,[-.27,1.135,.030],[.012,.230,.012]);
  mesh(bookcase,new THREE.CylinderGeometry(.061,.12,.137,24),linen,[-.27,1.28,.030],[1,1,1]);
  mesh(bookcase,cylinder,new THREE.MeshBasicMaterial({color:0xffd7a6}),[-.27,1.217,.030],[.098,.011,.098]);
  const readingLight = new THREE.PointLight(0xffbc80,3.1,1.85);
  readingLight.position.set(5.10,1.225,1.22);
  scene.add(readingLight);

  const armchair = new THREE.Group();
  armchair.position.set(4.45,0,2.27);
  armchair.rotation.y = -1.18;
  scene.add(armchair);
  const upholstery = material(0x587370);
  for (const x of [-.225,.225]) {
    for (const z of [-.22,.22]) mesh(armchair,cube,cabinet,[x,.12,z],[.054,.24,.054]);
  }
  mesh(armchair,cube,upholstery,[0,.31,0],[.57,.22,.58]);
  mesh(armchair,sphere,upholstery,[0,.432,.01],[.273,.074,.258]);
  mesh(armchair,sphere,upholstery,[0,.64,-.215],[.284,.286,.093]);
  for (const x of [-.278,.278]) {
    mesh(armchair,sphere,upholstery,[x,.51,.015],[.073,.106,.24]);
  }
  const cushion = mesh(armchair,sphere,petals[1],[.045,.603,-.123],[.159,.165,.059]);
  cushion.rotation.z = -.16;

  mesh(scene,cube,frame,[5.472,1.87,1.49],[.055,.55,.72]);
  mesh(scene,cube,linen,[5.436,1.87,1.49],[.018,.49,.66]);
  mesh(scene,sphere,petals[1],[5.423,1.962,1.59],[.009,.065,.065]);
  mesh(scene,sphere,greenery,[5.418,1.792,1.45],[.011,.103,.215]);

  // The walking camera looks toward this end of the room on the way to the table.
  const loungeWallZ = 5.64;
  mesh(scene,cube,wall,[1.10,1.60,loungeWallZ],[8.9,3.20,.12]);
  mesh(scene,cube,wall,[-3.35,1.60,3.81],[.12,3.20,3.70]);
  mesh(scene,cube,wall,[5.55,1.60,4.62],[.11,3.20,2.04]);
  mesh(scene,cube,trim,[-3.271,.13,3.81],[.043,.07,3.70]);
  mesh(scene,cube,trim,[5.477,.13,4.62],[.045,.07,2.04]);
  mesh(scene,cube,trim,[1.10,.13,loungeWallZ-.08],[8.9,.07,.045]);

  const lounge = new THREE.Group();
  lounge.position.set(-1.54,0,4.76);
  scene.add(lounge);
  const sofaFabric = material(0x596d61);
  const sofaSeat = material(0x708274);
  const throwFabric = material(0x996759);
  for (const x of [-.86,.86]) {
    for (const z of [-.27,.27]) mesh(lounge,cube,walnut,[x,.105,z],[.08,.21,.08]);
    mesh(lounge,cube,sofaFabric,[x*1.12,.43,0],[.19,.42,.76]);
  }
  mesh(lounge,cube,sofaFabric,[0,.29,.02],[1.95,.29,.73]);
  mesh(lounge,cube,sofaFabric,[0,.62,.30],[1.96,.57,.19]);
  for (const x of [-.435,.435]) {
    mesh(lounge,cube,sofaSeat,[x,.457,-.028],[.83,.13,.59]);
    mesh(lounge,sphere,sofaSeat,[x,.655,.205],[.405,.235,.11]);
  }
  const throwPillow = mesh(lounge,sphere,throwFabric,[-.62,.615,.065],[.19,.17,.083]);
  throwPillow.rotation.z = .24;
  const sofaPillow = mesh(lounge,sphere,linen,[.65,.604,.056],[.16,.145,.077]);
  sofaPillow.rotation.z = -.33;

  const loungeRug = material(0x886259);
  mesh(scene,cylinder,loungeRug,[-1.44,.007,4.01],[1.32,.013,.83]);
  const loungeBorder = mesh(scene,new THREE.RingGeometry(.91,.931,64),frame,
    [-1.44,.014,4.01],[1.32,.83,1]);
  loungeBorder.rotation.x = -Math.PI/2;

  const loungeLampX = -.16;
  const loungeLampZ = 4.87;
  mesh(scene,cylinder,brass,[loungeLampX,.044,loungeLampZ],[.18,.087,.18]);
  mesh(scene,cylinder,brass,[loungeLampX,.84,loungeLampZ],[.021,1.59,.021]);
  mesh(scene,new THREE.CylinderGeometry(.14,.26,.30,32),linen,
    [loungeLampX,1.64,loungeLampZ],[1,1,1]);
  mesh(scene,cylinder,new THREE.MeshBasicMaterial({color:0xffd7a6}),
    [loungeLampX,1.496,loungeLampZ],[.235,.012,.235]);
  const loungeLight = new THREE.PointLight(0xffc391,5.2,3.1);
  loungeLight.position.set(loungeLampX,1.47,loungeLampZ-.09);
  scene.add(loungeLight);

  for (const [i,x] of [-2.29,-1.53,-.77].entries()) {
    const y = i === 1 ? 1.91 : 1.82;
    mesh(scene,cube,frame,[x,y,5.55],[.57,.66,.065]);
    mesh(scene,cube,linen,[x,y,5.508],[.49,.58,.02]);
    for (const side of [-1,1]) {
      const leaf = mesh(scene,sphere,i===1 ? sofaSeat : greenery,
        [x+side*.089,y+.055*side,5.486],[.078,.174,.012]);
      leaf.rotation.z = side*.61;
    }
  }

  // Dress the long wall visible when the player turns toward the dining table.
  const plantX = 4.82;
  const plantZ = 3.49;
  mesh(scene,new THREE.CylinderGeometry(.19,.14,.36,28),throwFabric,
    [plantX,.18,plantZ],[1,1,1]);
  mesh(scene,cylinder,trim,[plantX,.356,plantZ],[.167,.014,.167]);
  for (const [i, angle] of [0,1.1,2.2,3.3,4.4,5.5].entries()) {
    const leaf = mesh(scene,sphere,i%2 ? greenery : sofaSeat,
      [plantX+.17*Math.cos(angle),.61+.078*(i%3),plantZ+.17*Math.sin(angle)],
      [.079,.29,.051]);
    leaf.rotation.set(.47*Math.sin(angle),0,-.47*Math.cos(angle));
  }
  for (const [i,z] of [-.38,.29].entries()) {
    const y = i ? 1.75 : 1.96;
    mesh(scene,cube,frame,[5.468,y,z],[.054,.58,.48]);
    mesh(scene,cube,linen,[5.434,y,z],[.019,.50,.40]);
    mesh(scene,sphere,i ? throwFabric : sofaFabric,[5.419,y-.025,z],[.01,.118,.128]);
    mesh(scene,sphere,petals[1],[5.418,y+.091,z+.075],[.01,.051,.052]);
  }

  const rug = material(0x744b4b);
  mesh(scene,cylinder,rug,[.02,.003,.10],[1.83,.006,1.35]);
  const rugEdge = mesh(scene,new THREE.RingGeometry(.94,.957,96),material(0xb6856d),
    [.02,.0062,.10],[1.83,1.35,1]);
  rugEdge.rotation.x = -Math.PI/2;

  const vase = material(0x53746d,.28);
  mesh(scene,sphere,vase,[-.29,.871,-.22],[.071,.081,.071]);
  for (const [index,dx] of [-.047,0,.047].entries()) {
    const stem = mesh(scene,cylinder,greenery,[-.29+dx,.993,-.22],[.008,.15,.008]);
    stem.rotation.z = -dx*5;
    mesh(scene,sphere,petals[index],[-.29+dx*1.4,1.075+index*.025,-.22],[.033,.028,.034]);
  }
  const flames = [];
  const wax = material(0xf7ddac);
  const fire = new THREE.MeshBasicMaterial({color:0xffc465});
  for (const [x,z] of [[.28,-.18],[-.20,.26]]) {
    mesh(scene,cylinder,brass,[x,.81,z],[.059,.025,.059]);
    mesh(scene,cylinder,wax,[x,.884,z],[.021,.14,.021]);
    const flame = mesh(scene,sphere,fire,[x,.972,z],[.012,.023,.012]);
    flame.castShadow = false;
    const light = new THREE.PointLight(0xff9f4f,.22,.72);
    light.position.set(x,.981,z);
    scene.add(light);
    flames.push({flame,light});
  }

  const china = material(0xffebce,.36);
  const steel = material(0xa7a9a8,.26);
  const tea = material(0xd99b60,.23);
  const placeGlasses = [];
  const platedStarter = new THREE.Group();
  const platedMain = new THREE.Group();
  const platedDessert = new THREE.Group();
  scene.add(platedStarter,platedMain,platedDessert);
  const potatoes = material(0xd4a659);
  const carrots = material(0xc86f3e);
  const cakeFilling = material(0xb77958);
  const icing = material(0xf0d6aa);
  for (const [x,z] of [[-.63,-.45],[.77,-.05],[0,-.57],[.03,.56]]) {
    mesh(scene,cylinder,china,[x,.811,z],[.151,.029,.151]);
    mesh(scene,cylinder,material(0xfaf1e4),[x,.826,z],[.103,.009,.103]);
    mesh(scene,cube,steel,[x+.18,.809,z],[.018,.013,.20]);
    mesh(scene,cube,linen,[x-.19,.804,z+.01],[.055,.014,.17]);
    mesh(scene,cube,steel,[x-.19,.820,z+.03],[.015,.012,.12]);
    for (const tine of [-.012,0,.012]) mesh(scene,cube,steel,[x-.19+tine,.821,z-.048],[.005,.01,.041]);
    placeGlasses.push(mesh(scene,cylinder,tea,[x-.13,.860,z-.15],[.042,.136,.042]));
    const toast = mesh(platedStarter,cube,potatoes,[x-.022,.846,z],[.087,.028,.058]);
    toast.rotation.y = -.32;
    for (const [dx,dz] of [[-.044,-.012],[-.017,.014],[.007,-.006],[.046,.028]]) {
      mesh(platedStarter,sphere,carrots,[x+dx,.865,z+dz],[.015,.009,.013]);
    }
    mesh(platedStarter,sphere,greenery,[x+.053,.841,z-.035],[.024,.011,.016]);
    for (const [dx,dz] of [[-.034,-.026],[.014,-.030],[-.025,.024]]) {
      mesh(platedMain,sphere,potatoes,[x+dx,.852,z+dz],[.024,.023,.021]);
    }
    for (const [dx,dz] of [[.046,.016],[.025,.048]]) {
      const carrot = mesh(platedMain,cube,carrots,[x+dx,.842,z+dz],[.037,.024,.018]);
      carrot.rotation.y = .6;
    }
    mesh(platedMain,sphere,greenery,[x-.049,.844,z+.048],[.026,.016,.015]);
    const wedge = new THREE.CylinderGeometry(.058,.058,.038,3);
    mesh(platedDessert,wedge,cakeFilling,[x,.850,z],[1,1,1]);
    mesh(platedDessert,wedge,icing,[x,.873,z],[1,.22,1]);
  }
  const platter = mesh(scene,cylinder,china,[0,.819,.03],[.19,.036,.19]);
  const food = new THREE.Group();
  food.position.copy(platter.position);
  scene.add(food);
  for (let i=0;i<7;i++) {
    const angle = i*2.4;
    mesh(food,sphere,material(i%2 ? 0xb96437 : 0xba9447),
      [Math.cos(angle)*.105,.027,Math.sin(angle)*.105],[.048,.035,.043]);
  }
  const bulb = new THREE.MeshBasicMaterial({color:0xffd49b});
  mesh(scene,cylinder,trim,[0,2.58,0],[.014,.72,.014]);
  mesh(scene,new THREE.CylinderGeometry(.12,.29,.25,48),material(0x8d5939),[0,2.17,0],[1,1,1]);
  mesh(scene,cylinder,bulb,[0,2.048,0],[.24,.016,.24]);

  const guests = {
    Sam: guest(scene,-1.31,-.35,1.08,0xc98761,0x476853,0x402a20,"short"),
    Maya: guest(scene,-.15,-1.03,.12,0x8f543e,0xab5f4e,0x261c22,"long"),
    Leo: guest(scene,1.21,-.62,-.91,0xd9a17a,0x4c657e,0x392920,"bun"),
    You: guest(scene,-.59,.96,2.65,0xbe835e,0xc69638,0x352621,"short"),
  };
  const cat = new THREE.Group();
  const ginger = material(0xac7248);
  const muzzle = material(0xe9cfac);
  const darkCat = material(0x473025);
  const nose = material(0x704840);
  const amber = material(0xb8a35d,.36);
  const earPink = material(0xc18477);
  const tabbyBase = new THREE.Color(0xbd8557);
  const tabbyStripe = new THREE.Color(0x684332);
  const furColor = new THREE.Color();
  const tabby = new THREE.MeshStandardMaterial({vertexColors:true,roughness:.94});
  function colorFur(geometry, sample) {
    const points = geometry.attributes.position;
    const colors = [];
    for (let index=0;index<points.count;index++) {
      furColor.copy(tabbyBase).lerp(tabbyStripe,sample(index,points));
      colors.push(furColor.r,furColor.g,furColor.b);
    }
    geometry.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));
    return geometry;
  }

  scene.add(cat);
  const catBody = new THREE.Group();
  cat.add(catBody);
  const coat = colorFur(new THREE.SphereGeometry(1,64,40),(index,points) => {
    const back = THREE.MathUtils.smoothstep(points.getY(index),-.45,.35);
    const stripes = Math.cos(27*points.getZ(index)+4.3*points.getY(index)+2*points.getX(index)**2);
    return .70*back*THREE.MathUtils.smoothstep(stripes,.39,.90);
  });
  mesh(catBody,coat,tabby,[0,.194,-.031],[.077,.084,.179]);
  mesh(catBody,sphere,ginger,[0,.19,.101],[.072,.094,.082]);
  mesh(catBody,sphere,ginger,[0,.184,-.137],[.080,.083,.082]);
  mesh(catBody,sphere,muzzle,[0,.146,.128],[.049,.060,.052]);
  const catHead = new THREE.Group();
  catHead.position.set(0,.239,.158);
  catBody.add(catHead);
  mesh(catHead,sphere,ginger,[0,0,0],[.057,.055,.052]);
  const earShape = new THREE.Shape();
  earShape.moveTo(-.027,0);
  earShape.quadraticCurveTo(-.02,.037,-.009,.056);
  earShape.quadraticCurveTo(.013,.047,.027,0);
  earShape.closePath();
  const earShell = new THREE.ExtrudeGeometry(earShape,{depth:.009,bevelEnabled:true,bevelThickness:.003,bevelSize:.003,bevelSegments:2,steps:1});
  const earInner = new THREE.ShapeGeometry(earShape);
  const whiskerInk = new THREE.LineBasicMaterial({color:0xf2d7b1,transparent:true,opacity:.78});
  for (const side of [-1,1]) {
    const ear = mesh(catHead,earShell,ginger,[side*.042,.031,-.014],[1,1,1]);
    ear.rotation.z = -side*.24;
    mesh(ear,earInner,earPink,[0,.006,.012],[.65,.70,1]);
    mesh(catHead,sphere,amber,[side*.028,.008,.043],[.014,.009,.009]);
    mesh(catHead,sphere,darkCat,[side*.029,.008,.051],[.004,.007,.003]);
    mesh(catHead,sphere,muzzle,[side*.016,-.019,.042],[.022,.015,.024]);
    for (let i=0;i<3;i++) {
      const whisker = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(side*.024,-.013-i*.004,.060),
        new THREE.Vector3(side*.051,-.012-i*.006,.072),
        new THREE.Vector3(side*.083,-.013-i*.011,.059),
      ]);
      catHead.add(new THREE.Line(whisker,whiskerInk));
    }
  }
  mesh(catHead,new THREE.ConeGeometry(.012,.010,3),nose,[0,-.012,.066],[1,1,.43]).rotation.z=Math.PI;
  const catLegs = [];
  for (const side of [-1,1]) {
    for (const front of [-1,1]) {
      const upper = mesh(cat,sphere,ginger,[0,0,0],[1,1,1]);
      const lower = mesh(cat,sphere,ginger,[0,0,0],[1,1,1]);
      const paw = mesh(cat,sphere,muzzle,[0,0,0],[.022,.013,.031]);
      catLegs.push({upper,lower,paw,side,front});
    }
  }
  const tail = new THREE.Group();
  tail.position.set(0,.207,-.169);
  catBody.add(tail);
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(),new THREE.Vector3(.010,.048,-.076),
    new THREE.Vector3(.035,.118,-.144),new THREE.Vector3(.067,.177,-.186),
    new THREE.Vector3(.096,.175,-.211),
  ]);
  const tailMesh = new THREE.TubeGeometry(tailCurve,28,.018,8,false);
  const tailPoints = tailMesh.attributes.position;
  const tipPoint = new THREE.Vector3();
  for (let ring=0;ring<=28;ring++) {
    const fraction = ring/28;
    tailCurve.getPointAt(fraction,tipPoint);
    for (let point=0;point<9;point++) {
      const index = ring*9+point;
      const taper = 1-.70*fraction**2;
      tailPoints.setXYZ(index,tipPoint.x+(tailPoints.getX(index)-tipPoint.x)*taper,
        tipPoint.y+(tailPoints.getY(index)-tipPoint.y)*taper,tipPoint.z+(tailPoints.getZ(index)-tipPoint.z)*taper);
    }
  }
  colorFur(tailMesh,index => .72*THREE.MathUtils.smoothstep(Math.cos(Math.floor(index/9)*1.45),.20,.82));
  mesh(tail,tailMesh,tabby,[0,0,0],[1,1,1]);
  const leftCatPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.62,0,3.75),new THREE.Vector3(-2.56,0,1.86),
    new THREE.Vector3(-2.48,0,.93),new THREE.Vector3(-2.66,0,.73),
    new THREE.Vector3(-2.75,0,1.20),new THREE.Vector3(-2.80,0,2.22),
    new THREE.Vector3(-3.32,0,3.44),
  ],false,"centripetal");
  const rightCatPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(4.65,0,.49),new THREE.Vector3(3.06,0,.33),
    new THREE.Vector3(2.30,0,-.18),new THREE.Vector3(2.13,0,-.58),
    new THREE.Vector3(2.71,0,-.75),new THREE.Vector3(4.68,0,-.83),
  ],false,"centripetal");
  const catTravel = new THREE.Vector3();
  function animateCat(elapsed,path) {
    const progress = (elapsed-350)/6900;
    cat.visible = Boolean(path) && progress>=0 && progress<1;
    if (!cat.visible) return;
    path.getPointAt(progress,cat.position);
    path.getTangentAt(progress,catTravel);
    cat.rotation.y = Math.atan2(catTravel.x,catTravel.z);
    const stride = progress*path.getLength()/.30;
    const rise = .006*Math.cos(stride*Math.PI*4);
    catBody.position.y = rise;
    for (const {upper,lower,paw,side,front} of catLegs) {
      const phase = (stride+(side===-1 ? .5 : 0)+(front===-1 ? .27 : 0))%1;
      const swing = phase>.64 ? (phase-.64)/.36 : 0;
      const footTravel = phase<=.64 ? .096-.192*phase/.64 : -.096+.192*ease(swing);
      const lift = Math.sin(Math.PI*swing)*.044;
      const x = side*.049;
      const rootZ = front===1 ? .107 : -.124;
      const hip = new THREE.Vector3(x,.172+rise,rootZ);
      const ankle = new THREE.Vector3(x,.026+lift,rootZ+footTravel);
      const knee = hip.clone().lerp(ankle,.49);
      knee.z += front===1 ? -.022 : .031;
      aimLimb(upper,hip,knee,front===1 ? .019 : .025);
      aimLimb(lower,knee,ankle,.012);
      paw.position.set(x,.014+lift,ankle.z+.012);
    }
    tail.rotation.y = .19*Math.sin(stride*Math.PI*.85);
    tail.rotation.x = .09*Math.cos(stride*Math.PI);
    catHead.rotation.y = .16*Math.sin(progress*Math.PI*3);
    catHead.rotation.x = .055*Math.cos(stride*Math.PI*2);
  }

  const nameTags = Object.fromEntries(Object.keys(guests).map(name => {
    const tag = document.createElement("span");
    tag.className = "dinner-name-tag";
    tag.textContent = name;
    tag.setAttribute("aria-hidden","true");
    host.append(tag);
    return [name,tag];
  }));
  const tagPosition = new THREE.Vector3();

  function alignNameTags() {
    for (const [name,{head,body}] of Object.entries(guests)) {
      const tag = nameTags[name];
      head.localToWorld(tagPosition.set(0,.29,0)).project(camera);
      tag.hidden = !head.visible || !body.visible || Math.abs(tagPosition.x)>1.05 || Math.abs(tagPosition.y)>1.05 || tagPosition.z>1;
      tag.style.left = (tagPosition.x*.5+.5)*100+"%";
      tag.style.top = (.5-tagPosition.y*.5)*100+"%";
      if (name === "You") tag.textContent = host.dataset.playerName || "You";
    }
  }

  const props = {};
  function prop(name, build) {
    const group = new THREE.Group();
    group.visible = false;
    scene.add(group);
    props[name] = group;
    build(group);
  }
  const glass = material(0x91c4d3,.26);
  prop("door", group => {
    mesh(group,cube,material(0x9b653f),[-.29,.92,0],[.57,1.83,.075]);
    mesh(group,sphere,material(0xe6ba73),[-.50,1,.06],[.033,.033,.033]);
  });
  prop("oven", group => {
    mesh(group,cube,material(0x706050),[0,.51,0],[.75,1.02,.51]);
    mesh(group,cube,material(0xd7bca1),[0,1.03,0],[.79,.065,.55]);
    mesh(group,cube,steel,[0,.62,.266],[.59,.62,.028]);
    mesh(group,cube,material(0x403536,.28),[0,.57,.283],[.49,.33,.022]);
    mesh(group,cube,new THREE.MeshBasicMaterial({color:0xa75932}),[0,.56,.298],[.37,.22,.008]);
    mesh(group,cube,steel,[0,.78,.318],[.43,.025,.048]);
    for (const x of [-.15,0,.15]) {
      const knob = mesh(group,cylinder,steel,[x,.887,.298],[.023,.032,.023]);
      knob.rotation.x = Math.PI/2;
    }
  });
  prop("bread", group => {
    mesh(group,cylinder,material(0xa67445),[0,.02,0],[.15,.058,.115]);
    for (const x of [-.07,0,.07]) mesh(group,sphere,material(0xe8ba71),[x,.065,0],[.045,.038,.075]);
  });
  function vessel(group, radius, height) {
    const profile = [[0,0],[radius*.87,0],[radius,height],[radius-.007,height],[radius*.87-.007,.009],[0,.009]]
      .map(([x,y]) => new THREE.Vector2(x,y));
    mesh(group,new THREE.LatheGeometry(profile,28),glass,[0,0,0],[1,1,1]);
  }
  prop("pitcher", group => {
    vessel(group,.072,.15);
    mesh(group,cube,glass,[.075,.094,0],[.105,.025,.028]);
  });
  prop("stream", group => mesh(group,cylinder,glass,[0,0,0],[.012,.19,.012]));
  prop("cup", group => vessel(group,.043,.11));
  const water = new THREE.MeshPhysicalMaterial({color:0xaad5dc,roughness:.16,transparent:true,opacity:.58,depthWrite:false});
  prop("spill", group => {
    for (const [x,z,width,depth] of [[0,0,.085,.05],[.052,.019,.047,.034],[.021,-.039,.038,.026]]) {
      const patch = mesh(group,sphere,water,[x,.002,z],[width,.0025,depth]);
      patch.castShadow = false;
    }
  });
  const drops = Array.from({length:7},(_,index) => {
    const drop = mesh(scene,sphere,water,[0,0,0],[.006,.009,.006]);
    drop.castShadow = false;
    drop.visible = false;
    return drop;
  });
  prop("tray", group => {
    mesh(group,cube,steel,[0,.02,0],[.35,.035,.25]);
    for (const side of [-1,1]) {
      mesh(group,cube,steel,[side*.204,.031,0],[.014,.012,.071]);
      for (const z of [-.035,.035]) {
        mesh(group,cube,steel,[side*.188,.031,z],[.048,.012,.012]);
      }
    }
    for (const x of [-.09,.02,.12]) mesh(group,sphere,material(0xbd773f),[x,.052,0],[.043,.027,.062]);
  });
  prop("speaker", group => {
    mesh(group,cube,material(0x302a34),[0,.07,0],[.13,.14,.1]);
    mesh(group,cylinder,steel,[0,.07,.054],[.034,.012,.034]).rotation.x = Math.PI/2;
  });
  prop("cake", group => {
    mesh(group,cylinder,china,[0,.012,0],[.115,.022,.115]);
    const slice = new THREE.CylinderGeometry(.088,.088,.066,3,1,false,0,Math.PI*2);
    mesh(group,slice,material(0xd99b68),[0,.055,0],[1,1,1]);
    mesh(group,slice,material(0xf3dac0),[0,.09,0],[1,.12,1]);
  });
  prop("plates", group => {
    for (let index=0;index<3;index++) mesh(group,cylinder,china,[0,index*.025,0],[.14,.021,.14]);
  });
  prop("phone", group => {
    mesh(group,cube,material(0x2b2930),[0,0,0],[.075,.013,.14]);
    mesh(group,cube,glass,[0,.008,0],[.062,.006,.115]);
  });

  function setProp(name, x, y, z, tilt = 0, yaw = 0) {
    const object = props[name];
    object.visible = true;
    object.position.set(x,y,z);
    object.rotation.set(0,yaw,tilt);
  }

  function gesture(name, side, lift, sweep = 0) {
    const arm = guests[name].arms[side];
    arm.rotation.x = -lift;
    arm.rotation.z = (side ? .24 : -.24) + sweep;
  }

  const joint = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const up = new THREE.Vector3(0,1,0);
  function legSegment(part, x, y1, z1, y2, z2, width) {
    part.position.set(x,(y1+y2)/2,(z1+z2)/2);
    direction.set(0,y2-y1,z2-z1);
    part.scale.set(width,direction.length()/2+.037,width);
    part.quaternion.setFromUnitVectors(up,joint.copy(direction).normalize());
  }

  function aimLimb(part, from, to, width) {
    part.position.copy(from).lerp(to,.5);
    direction.subVectors(to,from);
    part.scale.set(width,direction.length()/2+.025,width);
    part.quaternion.setFromUnitVectors(up,joint.copy(direction).normalize());
  }

  const collisionPoint = new THREE.Vector3();
  function overTable(point) {
    return (point.x/1.20)**2 + (point.z/.85)**2 < 1;
  }

  function keepHandsAboveTable() {
    for (const {arms} of Object.values(guests)) {
      for (const arm of arms) {
        if (!arm.visible) continue;
        const forearm = arm.forearm;
        // Check the ends and centre of the forearm before lowering a gesture.
        for (let correction=0;correction<12;correction++) {
          const isIntersecting = [-.72,0,.72].some(along => {
            forearm.localToWorld(collisionPoint.set(0,0,along));
            return overTable(collisionPoint) && collisionPoint.y<.837;
          });
          if (!isIntersecting) break;
          arm.rotation.x -= .095;
        }
      }
    }
  }

  function hold(name, index, propName, x, y, z) {
    const {body, arms, reaching} = guests[name];
    const object = props[propName];
    const arm = reaching[index];
    const target = body.worldToLocal(object.localToWorld(new THREE.Vector3(x,y,z)));
    const side = index ? 1 : -1;
    const shoulder = new THREE.Vector3(side*.224,.99,.015);
    const elbow = shoulder.clone().lerp(target,.52);
    elbow.y -= .075;
    elbow.x += side*.035;
    body.localToWorld(collisionPoint.copy(elbow));
    if (overTable(collisionPoint) && collisionPoint.y<.85) {
      elbow.y += .85-collisionPoint.y;
    }
    arms[index].visible = false;
    arm.group.visible = true;
    aimLimb(arm.upper,shoulder,elbow,.072);
    const supportingDish = propName === "plates" || propName === "tray";
    const wrist = supportingDish ? target.clone().lerp(elbow,.12) : target;
    aimLimb(arm.lower,elbow,wrist,supportingDish ? .031 : .044);
    arm.palm.visible = !supportingDish;
    arm.plateHand.visible = supportingDish;
    arm.palm.position.copy(target);
    if (supportingDish) arm.plateHand.position.copy(target);
  }

  const ease = value => {
    const t = THREE.MathUtils.clamp(value,0,1);
    return t*t*(3-2*t);
  };

  function pose(name, rise = 0, offset = 0, gait = 0, motion = 0) {
    const {body, legs} = guests[name];
    const lift = .24*rise;
    body.position.set(offset,lift,-.16*rise);
    body.rotation.set(0,0,0);
    for (const {thigh, shin, shoe, side} of legs) {
      const x = side*.108;
      const step = (gait+(side>0 ? .5 : 0))%1;
      const travel = step<.62 ? .115-.23*step/.62 : -.115+.23*ease((step-.62)/.38);
      const clearance = step<.62 ? 0 : .076*Math.sin(Math.PI*(step-.62)/.38);
      const kneeY = THREE.MathUtils.lerp(.475,.43-lift,rise)+motion*.28*clearance;
      const kneeZ = THREE.MathUtils.lerp(.31,.06,rise)+motion*.58*travel;
      const ankleZ = THREE.MathUtils.lerp(.35,.03,rise)+motion*travel;
      const ankleY = .069-lift+motion*clearance;
      legSegment(thigh,x,.575,-.025,kneeY,kneeZ,.073);
      legSegment(shin,x,kneeY,kneeZ,ankleY,ankleZ,.055);
      shoe.position.set(x,.041-lift+motion*clearance,ankleZ+.045);
      shoe.rotation.x = motion*(step<.62 ? 0 : -.23*Math.sin(Math.PI*(step-.62)/.38));
    }
  }

  const player = guests.You;
  const entryStart = new THREE.Vector3(-2.15,0,-2.70);
  const chairSide = player.person.localToWorld(new THREE.Vector3(.68,0,-.16));
  const entryPath = new THREE.CatmullRomCurve3([
    entryStart,new THREE.Vector3(-2.16,0,-2.29),
    new THREE.Vector3(-2.23,0,-1.17),new THREE.Vector3(-2.25,0,.35),
    new THREE.Vector3(-1.89,0,.96),chairSide,
  ],false,"centripetal");
  const routePoint = new THREE.Vector3();
  const routeTangent = new THREE.Vector3();

  const leo = guests.Leo;
  const leoPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(5.15,0,-.65),new THREE.Vector3(3.12,0,-.75),
    new THREE.Vector3(2.14,0,-.81),
    leo.person.localToWorld(new THREE.Vector3(.68,0,-.16)),
  ],false,"centripetal");
  const maya = guests.Maya;
  const mayaPath = new THREE.CatmullRomCurve3([
    maya.person.localToWorld(new THREE.Vector3(.77,0,-.42)),
    maya.person.localToWorld(new THREE.Vector3(.73,0,-.29)),
    maya.person.localToWorld(new THREE.Vector3(.68,0,-.16)),
  ],false,"centripetal");

  function walkToSeat(name, path, elapsed, walkDuration, reverse = false) {
    const actor = guests[name];
    const seconds = Math.max(0,elapsed)/1000;
    const pause = .72;
    const travel = THREE.MathUtils.clamp((seconds-pause)/walkDuration,0,1);
    const offset = reverse ? ease(seconds/pause) : 1-ease((seconds-pause-walkDuration)/.84);
    const sit = reverse ? 1-offset : ease((seconds-pause-walkDuration-.20)/.64);
    const u = reverse ? 1-travel : travel;
    const routeDistance = travel*path.getLength();
    const moving = Math.min(ease(travel*12),ease((1-travel)*12));
    pose(name,1-sit,0,routeDistance/.43,moving);
    if ((!reverse && travel >= 1) || (reverse && travel <= 0)) {
      actor.body.position.x = .68*offset;
      return;
    }
    path.getPointAt(u,routePoint);
    path.getTangentAt(u,routeTangent);
    if (reverse) routeTangent.negate();
    const heading = Math.atan2(routeTangent.x,routeTangent.z);
    const seatedHeading = actor.person.rotation.y;
    const delta = Math.atan2(Math.sin(heading-seatedHeading),Math.cos(heading-seatedHeading));
    const facing = reverse ? ease(travel*7) : ease((1-travel)*6);
    actor.body.rotation.y = delta*facing;
    actor.person.worldToLocal(routePoint);
    actor.body.position.x = routePoint.x;
    actor.body.position.z = routePoint.z;
    const swing = Math.sin(routeDistance/.43*2*Math.PI)*.38*moving;
    gesture(name,0,swing);
    gesture(name,1,-swing);
  }

  const moments = {
    arrival(t) {
      pose("Sam",true,-.63);
      gesture("Sam",1,1.15*t,.63*t);
      gesture("Maya",0,.7*t,-.4*t);
    },
    oven(t) {
      pose("Sam",true,-.63);
      guests.Sam.head.rotation.y = -.55*t;
      gesture("Sam",0,1.1*t,-.2*t);

    },
    bread(t) {
      const {person} = guests.Sam;
      const basket = person.localToWorld(new THREE.Vector3(-.22,.799+.07*Math.sin(Math.PI*t),.46+.05*t));
      setProp("bread",basket.x,basket.y,basket.z,0,person.rotation.y);
      if (t<.97) hold("Sam",0,"bread",0,.019,-.112);
      guests.Maya.head.rotation.y = .3-.6*t;
    },
    water(t) {
      const choice = host.dataset.replyChoice;
      const cupX = .82;
      const cupZ = -.09;
      setProp("cup",cupX,.793,cupZ);
      if (choice === "0" || choice === "2") {
        setProp("pitcher",.94-.022*t,.793+.235*t,-.27+.18*t,.95*t);
        hold("Leo",0,"pitcher",.065,.078,-.04);
        if (t>.83) {
          const spout = props.pitcher.localToWorld(new THREE.Vector3(-.067,.139,0));
          const target = new THREE.Vector3(cupX,.875,cupZ);
          const stream = props.stream;
          stream.visible = true;
          stream.position.copy(spout).lerp(target,.5);
          direction.subVectors(target,spout);
          stream.scale.y = direction.length()/.19;
          stream.quaternion.setFromUnitVectors(up,joint.copy(direction).normalize());
        }
      } else if (choice === "1") {
        setProp("pitcher",.94+.018*t,.793+.046*Math.sin(Math.PI*t),-.27+.08*t);
        if (t<.97) hold("Leo",0,"pitcher",.065,.078,-.04);
      } else {
        setProp("pitcher",.94,.793,-.27);
        gesture("Leo",0,.76*t);
      }
    },
    spill(t) {
      const knocked = ease((t-.09)/.36);
      const tilt = Math.PI*.49*knocked;
      const touch = Math.sin(Math.PI*ease(t/.32));
      setProp("cup",.36+.031*knocked,.793+.043*Math.sin(tilt),.42,-tilt);
      gesture("You",0,.65*touch,-.18*touch);
      setProp("bread",-.51-.12*ease((t-.20)/.46),.799,-.40);
      if (t>.20 && t<.69) hold("Maya",1,"bread",.02,.049,-.10);
      if (t>.26) {
        setProp("spill",.52,.793,.43);
        const spread = .04+.96*ease((t-.26)/.61);
        props.spill.scale.set(spread,1,spread);
      }
      drops.forEach((drop,index) => {
        const flight = (t-.23-index*.017)/.36;
        if (flight<=0 || flight>=1) return;
        drop.visible = true;
        drop.position.set(.435+(.10+index*.013)*flight,
          .8+.065*Math.sin(Math.PI*flight)+.049*(1-flight),.426+(index-3)*.013*flight);
      });
    },
    meeting(t) {
      guests.Leo.head.rotation.x = .14*t;
      gesture("Leo",0,.92*t,-.29*t);
      gesture("Leo",1,.6*t,.30*t);
      guests.Sam.head.rotation.y = -.36*t;
    },
    tray(t) {
      const placing = host.dataset.replyChoice !== undefined;
      const {person} = guests.Sam;
      const trayPosition = person.localToWorld(new THREE.Vector3(
        .015, 1.045-(placing ? .253*t : 0), .36+(placing ? .21 : .05)*t
      ));
      setProp("tray",trayPosition.x,trayPosition.y,trayPosition.z,0,person.rotation.y);
      if (!placing || t<.97) {
        hold("Sam",0,"tray",-.221,.021,0);
        hold("Sam",1,"tray",.221,.021,0);
      }
    },
    music(t) {
      setProp("speaker",-.58+.09*t,.791,-.38);
      guests.Maya.torso.rotation.x = .19*t;
      guests.Maya.head.position.z = .012+.051*t;
      if (t>.2 && t<.96) hold("Sam",1,"speaker",-.06,.065,0);
    },
    week(t) {
      guests.Maya.head.rotation.z = -.17*t;
      gesture("Maya",1,.97*t,.31*t);
      guests.Leo.head.rotation.y = .28*t;
    },
    joke(t) {
      guests.Leo.head.rotation.x = .43*t;
      guests.Leo.head.position.y = 1.31-.045*t;
      gesture("Sam",0,.7*(1-t),-.23);
    },
    cake(t) {
      setProp("cake",.02,.801,.03);
      gesture("Maya",0,1.03*t,-.2*t);
      guests.Maya.head.rotation.x = .16*t;
    },
    clearing(t) {
      setProp("plates",-.76-.20*t,.823+.15*t,.01-.09*t);
      props.plates.rotation.y = guests.Sam.person.rotation.y;
      hold("Sam",0,"plates",-.147,-.024,-.009);
      hold("Sam",1,"plates",.147,-.024,-.009);
    },
    memory(t) {
      gesture("Maya",1,.52*t,.12*t);
      guests.Maya.head.rotation.y = -.30*t;
      guests.Maya.head.rotation.x = .15*t;
    },
    numbers(t) {
      setProp("phone",-.66,.804+.18*t,-.14,-.40*t);
      hold("Sam",1,"phone",.027,-.012,-.035);
      guests.Maya.head.rotation.x = .23*t;
    },
    goodbye(t) {
      pose("Sam",true,-.64-.09*t);
      gesture("Sam",1,1.85,.59*Math.sin(t*7));
      if (host.dataset.replyChoice === "0") {
        setProp("phone",.36,.804,.40);
      }
    },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let activeMoment;
  let activeChoice;
  let began = 0;
  let sceneBegan = 0;
  let departureReported = false;

  function draw(time = performance.now()) {
    const moment = host.dataset.moment;
    const choice = host.dataset.replyChoice;
    if (moment !== activeMoment) sceneBegan = time;
    if (moment !== activeMoment || choice !== activeChoice) {
      activeMoment = moment;
      activeChoice = choice;
      began = time;
    }
    guests.Leo.body.visible = moment !== "arrival";
    for (const [index,{flame,light}] of flames.entries()) {
      const flicker = reduced.matches ? 0 : Math.sin(time/86+index*1.7);
      flame.scale.y = .023 + .004*flicker;
      flame.rotation.z = .16*flicker;
      light.intensity = .22 + .035*flicker;
    }
    const speaking = host.dataset.speaker;
    for (const [name, guest] of Object.entries(guests)) {
      const {head,mouth,arms,reaching,torso,eyeGroups} = guest;
      const active = name === speaking && !reduced.matches;
      pose(name);
      head.position.set(0,1.31,.012);
      head.rotation.set(active ? .07*Math.sin(time/190) : 0,0,0);
      torso.rotation.x = 0;
      const blinkPhase = (time + name.charCodeAt(0)*215)%4800;
      const blink = !reduced.matches && blinkPhase<150 ? Math.sin(Math.PI*blinkPhase/150) : 0;
      eyeGroups.forEach(eye => { eye.scale.y = 1-.93*blink; });
      mouth.scale.y = active ? .009+.006*Math.abs(Math.sin(time/105)) : .009;
      arms.forEach((arm,side) => {
        arm.visible = true;
        reaching[side].group.visible = false;
        gesture(name,side,0);
      });
    }
    Object.values(props).forEach(object => { object.visible = false; });
    drops.forEach(drop => { drop.visible = false; });
    const cycle = ((Math.max(0,time-began)/4600)%1)*2*Math.PI;
    const progress = reduced.matches ? .9 : .5-.5*Math.cos(cycle);
    const elapsed = reduced.matches ? 6200 : time-sceneBegan;
    const leaving = moment === "goodbye" && choice !== undefined;
    const departureElapsed = reduced.matches ? 6400 : Math.max(0,time-began);
    guests.You.body.visible = !leaving || departureElapsed < 5080;
    const doorOpen = moment === "arrival"
      ? ease(elapsed/680)*(1-ease((elapsed-2400)/710))
      : leaving ? ease((departureElapsed-3200)/680)*(1-ease((departureElapsed-5080)/820)) : 0;
    setProp("door",doorway.right,0,doorway.depth,0,-1.46*doorOpen);
    setProp("oven",-.93,0,-2.11,0,.13);
    moments[moment]?.(moment === "spill" ? ease(elapsed/2000) : progress);
    if (moment === "arrival" || moment === "oven") pose("Maya",1,.77);
    if (moment === "bread") {
      if (choice === undefined) pose("Maya",1,.77);
      else walkToSeat("Maya",mayaPath,reduced.matches ? 6200 : time-began,.55);
    }
    if (moment === "oven") walkToSeat("Leo",leoPath,elapsed,3.4);
    if (moment === "arrival" || leaving) {
      walkToSeat("You",entryPath,leaving ? departureElapsed : elapsed,4.3,leaving);
    } else if (host.dataset.replyChoice !== undefined) {
      gesture("You",1,.26+.52*progress,.27*progress);
      guests.You.head.rotation.y = -.18*progress;
    }
    keepHandsAboveTable();
    placeGlasses[3].visible = moment !== "water" && moment !== "spill";
    platter.visible = !["tray","cake","clearing","numbers","goodbye"].includes(moment);
    platedStarter.visible = ["bread","water","spill","meeting"].includes(moment) || (moment === "tray" && (choice === undefined || progress<=.87));
    platedMain.visible = ["music","week","joke"].includes(moment) || (moment === "tray" && choice !== undefined && progress>.87);
    platedDessert.visible = moment === "cake" && choice !== undefined;
    food.visible = host.dataset.setting === "dinner" && platter.visible && !platedMain.visible;
    const playing = ["bread","water","spill","meeting","tray","music","week","joke","cake"].includes(moment)
      && host.dataset.musicPaused !== "true";
    if (playing && !reduced.matches) record.rotation.y = -(time/1000)*Math.PI*1.11;
    musicNotes.forEach((note,index) => {
      note.visible = playing;
      if (!playing) return;
      const float = reduced.matches ? (index+1)/4 : (time/3400+index/3)%1;
      note.position.set(playerX+.095*Math.sin(float*5+index),1.06+float*.61,playerZ+.12);
      note.scale.setScalar(.125+float*.045);
      note.material.opacity = Math.sin(float*Math.PI)*.87;
    });
    const catPath = {music:leftCatPath, week:rightCatPath}[moment];
    animateCat(elapsed,reduced.matches ? null : catPath);
    const walking = !reduced.matches && (
      (moment === "arrival" && elapsed>=750 && elapsed<5030) ||
      (leaving && departureElapsed>=730 && departureElapsed<4980)
    );
    updateView(moment,time,walking,reduced.matches);
    drawRain(reduced.matches ? 0 : time);
    renderer.render(scene,camera);
    alignNameTags();
    if (leaving && departureElapsed>=6320 && !departureReported) {
      departureReported = true;
      host.dispatchEvent(new Event("dinner-departed"));
    }
  }

  function resize() {
    const {clientWidth:width,clientHeight:height} = host;
    if (!width || !height) return;
    renderer.setSize(width,height,false);
    camera.aspect = width/height;
    camera.fov = camera.aspect < 1.55 ? 43 : 34;
    camera.updateProjectionMatrix();
    draw();
  }
  resize();
  new ResizeObserver(resize).observe(host);
  new MutationObserver(() => draw()).observe(host,{attributes:true,attributeFilter:["data-setting","data-speaker","data-moment","data-reply-choice","data-player-name","data-music-paused"]});
  new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting && !reduced.matches ? draw : null);
    if (entry.isIntersecting) resize();
  }).observe(host);
  renderer.domElement.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    renderer.setAnimationLoop(null);
    host.classList.remove("has-dinner-scene");
    renderer.domElement.hidden = true;
    host.dispatchEvent(new Event("dinner-departed"));
  });
}
