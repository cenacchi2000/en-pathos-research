import { dinner, callbacks, followUps, personaTraits, traitConnections } from "./dinner.js?v=56";

const el = id => document.getElementById(id);
const status = el("status");
const history = [];
let onboarding;
let session, supportNote, group, busy = false;
const condition = new URLSearchParams(location.search).get("condition");
const conditions = ["full", "video-only", "no-persona", "factorial", "personalization"];
const personalization = condition === "personalization";
const fixedCondition = conditions.includes(condition);
const options = ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"];

function question(target, name, title, choices, evaluation = false, allowNA = evaluation) {
  const label = document.createElement("label");
  const select = document.createElement("select");
  select.name = name;
  select.required = evaluation;
  label.textContent = title;
  select.add(new Option(evaluation ? "Choose a rating" : "Skip", ""));
  choices.forEach((choice, i) => select.add(new Option(choice, i + (evaluation ? 1 : 0))));
  if (allowNA) select.add(new Option("Not applicable", "na"));
  label.append(select);
  el(target).append(label);
}

async function json(response) {
  if (!response.ok && !response.headers.get("Content-Type")?.includes("application/json"))
    throw new Error("Study service unavailable. Please try again.");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

const backendReady = location.hostname.endsWith("github.io")
  ? fetch("./backend.json", {cache: "no-store"}).then(json).then(config => {
      const endpoint = new URL(config.origin);
      if (endpoint.protocol !== "https:") throw new Error("The conversation service needs a secure connection.");
      return endpoint.origin;
    })
  : Promise.resolve(location.origin);
backendReady.catch(() => {});
async function apiUrl(path) {
  return (await backendReady) + "/api/" + path;
}

async function post(path, data) {
  return json(await fetch(await apiUrl(path), {
    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data),
  }));
}

Promise.all(["evaluation.json", "pets.json", "emoharbor.json"].map(async url => json(await fetch(url))))
  .then(([evaluation, pets, emoharbor]) => {
    evaluation.forEach(([key, title]) => question("evaluation-questions", key, title, options, true));
    for (let i = pets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pets[i], pets[j]] = [pets[j], pets[i]];
    }
    for (const [key, title] of pets) {
      const label = document.createElement("label");
      label.textContent = title;
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = 0;
      slider.max = 100;
      slider.step = 1;
      slider.value = 50;
      slider.name = key;
      slider.dataset.answered = "false";
      const output = document.createElement("output");
      output.textContent = "Choose a rating";
      const markAnswered = () => {
        slider.dataset.answered = "true";
        output.textContent = slider.value + " / 100";
      };
      slider.addEventListener("input", markAnswered);
      slider.addEventListener("change", markAnswered);
      slider.addEventListener("click", markAnswered);
      label.append(slider, output);
      el("pets-questions").append(label);
    }
    emoharbor.forEach(([key, title, anchors]) =>
      question("emoharbor-questions", key, title, anchors.map((anchor, i) => (i + 1) + " — " + anchor), true, false));
    el("consent").disabled = false;
  }).catch(error => { status.textContent = error.message; });

el("group-selection").onsubmit = async event => {
  event.preventDefault();
  if (personalization && !session) {
    const button = event.currentTarget.querySelector("button");
    button.disabled = true;
    try {
      ({session, onboarding} = await post("start", {condition, consent: el("early-consent").checked}));
    } catch (error) {
      status.textContent = error.message;
      return;
    } finally {
      button.disabled = false;
    }
  }
  group = fixedCondition ? 1 : Number(el("group").value);
  el("group-selection").hidden = true;
  el("intake").hidden = false;
  translateDinner();
  if (group === 2 || condition === "no-persona") {
    el("persona-game").hidden = true;
    el("control-start-title").hidden = false;
    el("control-model-note").hidden = fixedCondition;
    el("conversation-consent").hidden = false;
    el("consent").focus();
    return;
  }
  if (onboarding === "direct") {
    revealDeck();
    return;
  }
  import("./dinner-scene.js?v=68").then(({mountDinnerScene}) => {
    mountDinnerScene(el("dinner-table"));
  }).catch(() => el("dinner-table").classList.remove("has-dinner-scene"));
};

const choices = [];
const followChoices = [];
const kept = new Set();
const language = el("game-language");
const tr = (english, italian) => language.value === "it" ? italian : english;
const local = pair => tr(...pair);
const stages = [
  {until: 3, label: ["Arriving", "L’arrivo"], setting: "arrival"},
  {until: 10, label: ["Dinner", "A tavola"], setting: "dinner"},
  {until: 12, label: ["Dessert", "Il dolce"], setting: "dessert"},
  {until: 15, label: ["Goodbyes", "I saluti"], setting: "goodbye"},
];
let step = 0;
let started = false;
const dinnerMoments = ["arrival", "oven", "bread", "water", "spill", "meeting",
  "tray", "music", "week", "joke", "cake", "clearing", "memory", "numbers", "goodbye"];

function translateDinner() {
  el("persona-game").lang = language.value;
  el("dinner-table").dataset.playerName = tr("You","Tu");
  const labels = {
    "persona-heading": ["Dinner at Sam’s", "A cena da Sam"],
    "game-intro": ["You’re having dinner at your friend Sam’s and meeting Maya and Leo for the first time.", "Sei a cena dal tuo amico Sam e incontri Maya e Leo per la prima volta."],
    "deck-heading": ["What your profile looks like", "Com’è il tuo profilo"],
    "deck-instructions": ["The first decision in each scene suggests a possible trait. The follow-up moves the story along. Each card connects an action to a way of noticing, understanding or helping someone. Choose what fits you in real life. The traits you confirm form your profile for this conversation. The game explores your style of empathy and gives no empathy score.", "La prima decisione di ogni scena suggerisce una possibile caratteristica. La seconda fa proseguire la storia. Ogni scheda collega un’azione a un modo di accorgerti di un bisogno, capire qualcuno o dare una mano. Spunta ciò in cui ti riconosci. Le caratteristiche che confermi formano il profilo per questa conversazione. Il gioco esplora il tuo stile di empatia senza assegnarti un punteggio."],
    "profile-model-use": personalization
      ? ["The study randomly varies whether the assistant receives your confirmed cards.", "Lo studio assegna a caso se l’assistente riceve le schede che confermi."]
      : condition === "factorial"
      ? ["The study randomly varies whether confirmed cards and pacing cues guide the reply. Your answers may be used to guide replies.", "Lo studio assegna a caso se usare le schede confermate e i segnali di ritmo nella risposta. Le tue risposte possono orientare la conversazione."]
      : group === 2
      ? ["In the control group, the assistant responds without using your profile.", "Nel gruppo di controllo, l’assistente risponde senza usare il tuo profilo."]
      : ["The assistant uses your confirmed traits as context when they relate to what you say. For example, if you value high standards, it may help you compare what happened with what you expected of yourself.", "L’assistente tiene conto delle caratteristiche che confermi quando sono pertinenti a ciò che racconti. Per esempio, se per te contano gli standard personali, può aiutarti a confrontare ciò che è successo con quello che ti aspettavi da te."],
    "profile-values-title": ["You might also be interested in these", "Potrebbero interessarti anche questi valori"],
    "control-start-title": ["Start the control conversation", "Inizia la conversazione di controllo"],
    "control-model-note": ["The control assistant responds without a personal profile.", "L’assistente di controllo risponde senza un profilo personale."],
    "profile-scenes-title": ["Possible traits suggested by your choices", "Caratteristiche suggerite dalle tue scelte"],
    "study-recording-notice": ["Each spoken turn sends a microphone recording and eight webcam frames to the study server. The server transcribes your speech. In the body-cue condition, it uses head and upper-body movement to guide pacing. Your study group, turn count and questionnaire scores are recorded.", "A ogni turno parlato, il server dello studio riceve la registrazione del microfono e otto fotogrammi della webcam e trascrive ciò che dici. Nella condizione che usa i segnali corporei, i movimenti della testa e del busto aiutano a regolare il ritmo della risposta. Vengono registrati il gruppo, il numero di turni e le risposte al questionario."],
    "consent-label": ["I consent to take part and open the conversation.", "Acconsento a partecipare e ad aprire la conversazione."],
  };
  for (const [id, words] of Object.entries(labels)) el(id).textContent = local(words);
}

function action(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.onclick = handler;
  el("game-actions").append(button);
  return button;
}

function renderDinner() {
  const {label, setting} = stages.find(stage => step < stage.until);
  const panel = el("game-panel");
  const table = el("dinner-table");
  table.dataset.musicPaused = choices[7] === 1 ? "true" : "false";
  delete table.dataset.speaker;
  table.dataset.moment = started ? dinnerMoments[step] : "arrival";
  if (choices[step] === undefined) delete table.dataset.replyChoice;
  else table.dataset.replyChoice = choices[step];
  el("dinner-table").dataset.setting = setting;
  el("dinner-stage").textContent = local(label);
  el("card-progress").textContent = started ? tr("Scene ", "Scena ") + (step + 1) + " / " + dinner.length : "";
  el("dinner-progress").value = choices.length;
  el("game-actions").replaceChildren();
  el("story-result").hidden = true;
  el("dinner-callback").hidden = true;
  panel.dataset.setting = setting;
  if (!started) {
    el("card-title").textContent = tr("Sam opens the door", "Sam apre la porta");
    el("card-story").textContent = tr("Dinner is still in the oven. Maya is in the kitchen and Leo hasn’t arrived yet.", "La cena è ancora in forno. Maya è in cucina e Leo non è ancora arrivato.");
    action(tr("Go inside", "Entra"), () => {
      started = true;
      el("conversation-consent").hidden = true;
      renderDinner();
      el("card-title").focus();
    });
    return;
  }

  const scene = dinner[step];
  el("card-title").textContent = local(scene.title);
  el("card-story").textContent = local(scene.scene);
  const callback = callbacks[step];
  if (step > 0) {
    const fromLastScene = local(followUps[step - 1][followChoices[step - 1]][1]);
    const earlier = callback ? " " + local(callback.lines[choices[callback.step]]) : "";
    el("dinner-callback").textContent = fromLastScene + earlier;
    el("dinner-callback").hidden = false;
  }

  const choice = choices[step];
  if (choice === undefined) {
    scene.moves.forEach(([label], index) => action(local(label), () => {
      choices.push(index);
      if (step === dinner.length - 1) {
        if (!table.classList.contains("has-dinner-scene")) {
          revealDeck();
          return;
        }
        table.addEventListener("dinner-departed",revealDeck,{once:true});
        renderDinner();
        table.scrollIntoView({block:"nearest"});
        return;
      }
      renderDinner();
      el("story-result").focus();
    }));
    return;
  }

  const [labelText, reply] = scene.moves[choice];
  const speaker = local(reply).match(/^(Sam|Maya|Leo)\b/)?.[1];
  if (speaker) table.dataset.speaker = speaker;
  const reaction = el("story-result");
  reaction.textContent = local(labelText) + "  ·  " + local(reply);
  reaction.hidden = false;
  if (step === dinner.length - 1) return;
  followUps[step].forEach(([label], index) => action(local(label), () => {
    followChoices.push(index);
    step++;
    renderDinner();
    el("card-title").focus();
  }));
}

function revealDeck() {
  el("conversation-consent").hidden = false;
  el("persona-heading").hidden = true;
  el("game-intro").hidden = true;
  el("persona-game").setAttribute("aria-labelledby", "deck-heading");
  el("game-scene").hidden = true;
  el("game-deck").hidden = false;
  const values = [
    [["Getting results and meeting my own standards", "Raggiungere risultati e rispettare i miei standard"], "I value achievement and meeting my own standards."],
    [["How people I care about see me", "Come mi vedono le persone a cui tengo"], "I care how people important to me see me."],
    [["Making my own decisions", "Prendere le mie decisioni"], "I value making my own decisions."],
    [["Feeling close to others", "Sentirmi vicino alle altre persone"], "I value closeness and connection."],
    [["Keeping things stable and predictable", "Avere stabilità e prevedibilità"], "I value stability and predictability."],
    [["Learning and improving over time", "Imparare e migliorare nel tempo"], "I value learning and improving over time."],
    [["Being fair to everyone involved", "Essere equi con tutte le persone coinvolte"], "I care about being fair to everyone involved."],
    [["Having time and energy for myself", "Avere tempo ed energie per me"], "I value having time and energy for myself."],
  ];
  const valueExamples = [
    ["After a setback, I may focus on the gap between what happened and the result I was aiming for.", "Dopo un insuccesso posso concentrarmi sulla distanza tra ciò che è successo e il risultato che volevo."],
    ["A silence or brief comment from someone I respect can stay with me longer than the event itself.", "Un silenzio o un commento breve da parte di chi stimo può pesarmi più dell’episodio stesso."],
    ["I like hearing different viewpoints, but I need to make the final trade-off myself.", "Mi piace sentire punti di vista diversi, ma voglio scegliere io quale compromesso accettare."],
    ["When plans change or someone pulls away, I may care more about the relationship than about the original plan.", "Quando un piano cambia o qualcuno si allontana, il rapporto può contarmi più del piano iniziale."],
    ["When something is uncertain, knowing what is settled and when I’ll hear more helps me stay grounded.", "Quando qualcosa è incerto, sapere cosa è deciso e quando avrò novità mi aiuta a orientarmi."],
    ["When something goes wrong, I like to identify one thing I could try differently the next time.", "Quando qualcosa va storto, mi aiuta trovare una cosa da provare a fare diversamente la prossima volta."],
    ["Before settling on a solution, I want to consider who carries the burden and who has had a chance to speak.", "Prima di scegliere una soluzione, voglio capire chi ne porta il peso e chi ha avuto la possibilità di parlare."],
    ["When I have too many commitments, I feel better after freeing time for what matters most.", "Quando ho troppi impegni, mi sento meglio se riesco a liberare tempo per le cose che contano davvero."],
  ];
  const profileCard = (index,option) => {
    const [title,description] = personaTraits[index][option];
    return {
      title, description, statement: description[0],
      scene: dinner[index].title, action: dinner[index].moves[option][0],
      reason: traitConnections[index][option],
    };
  };
  const selectedMoves = choices.map((choice,index) => profileCard(index,choice));
  const gameCards = personalization
    ? personaTraits.flatMap((traits, index) => traits.map((_, option) => {
      const card = profileCard(index, option);
      return choices[index] === option ? card : {...card, scene: undefined};
    }))
    : selectedMoves;
  if (personalization) {
    el("deck-instructions").textContent = tr(
      "Choose the statements that fit you. You may choose none.",
      "Scegli le affermazioni che ti descrivono. Puoi anche non sceglierne nessuna.");
    el("profile-scenes-title").textContent = tr("Support preferences", "Preferenze di supporto");
  }
  const groups = [
    ["game-keeps", gameCards],
    ["profile-values", values.map(([title,statement],index) =>
      ({title,statement,description:valueExamples[index]}))],
  ];
  const checkboxes = [];
  const selectAll = el("select-all-profile");
  const updateSelectAll = () => {
    selectAll.textContent = checkboxes.every(checkbox => checkbox.checked)
      ? tr("Deselect all flashcards", "Deseleziona tutte le flashcard")
      : tr("Select all flashcards", "Seleziona tutte le flashcard");
  };
  for (const [target, options] of groups) {
    const container = el(target);
    container.replaceChildren();
    for (const {title,statement,description,scene,action: sceneAction,reason} of options) {
      const row = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = statement;
      checkbox.checked = kept.has(statement);
      checkboxes.push(checkbox);
      checkbox.onchange = () => {
        if (checkbox.checked) kept.add(statement);
        else kept.delete(statement);
        updateSelectAll();
      };
      const heading = document.createElement("strong");
      heading.textContent = local(title);
      const detail = document.createElement("span");
      detail.textContent = local(description);
      row.append(checkbox, heading, detail);
      if (scene) {
        const origin = document.createElement("span");
        origin.className = "profile-origin";
        const sceneName = document.createElement("strong");
        sceneName.textContent = local(scene);
        const actionText = document.createElement("span");
        actionText.textContent = tr("You chose: ", "Hai scelto: ") + local(sceneAction);
        const connection = document.createElement("span");
        connection.className = "profile-connection";
        connection.textContent = local(reason);
        origin.append(sceneName,actionText,connection);
        row.append(origin);
      }
      container.append(row);
    }
  }
  selectAll.onclick = () => {
    const checked = checkboxes.some(checkbox => !checkbox.checked);
    for (const checkbox of checkboxes) {
      checkbox.checked = checked;
      checkbox.onchange();
    }
  };
  updateSelectAll();
  el("deck-heading").focus();
}

language.onchange = () => {
  translateDinner();
  if (el("game-deck").hidden) renderDinner();
  else revealDeck();
};
translateDinner();
renderDinner();
if (personalization) {
  el("early-consent-label").hidden = false;
  el("early-consent").required = true;
}
if (fixedCondition) {
  el("group-selection").querySelector("h2").textContent = "Before you begin";
  el("group-selection").querySelector("p").hidden = true;
  el("group").required = false;
  el("group").hidden = true;
  document.querySelector('label[for="group"]').hidden = true;
}

el("intake").onsubmit = event => event.preventDefault();
el("consent").onchange = async event => {
  const consent = event.currentTarget;
  if (!consent.checked || consent.disabled || el("conversation-consent").hidden) return;
  supportNote = (group === 2 || condition === "no-persona") ? "" : [...kept].join("\n");
  if (supportNote.length > 2400) {
    consent.checked = false;
    status.textContent = tr("Choose fewer traits before starting.", "Prima di iniziare, seleziona meno caratteristiche.");
    status.scrollIntoView({block:"nearest"});
    return;
  }
  el("consent").disabled = true;
  try {
    if (!session) ({session} = await post("start", {group, consent: el("consent").checked, ...(fixedCondition ? {condition} : {})}));
    el("intake").hidden = true;
    el("chat").hidden = false;
    status.textContent = "";
    el("send").focus();
  } catch (error) {
    status.textContent = error.message;
    consent.checked = false;
    consent.disabled = false;
    consent.focus();
  }
};

let stopRecording;

function encode(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

let cameraStream;
function closeCamera() {
  cameraStream?.getTracks().forEach(track => track.stop());
  cameraStream = undefined;
  el("preview").srcObject = null;
  el("camera").hidden = true;
}
window.addEventListener("pagehide", closeCamera);

async function capture() {
  const preview = el("preview");
  if (!cameraStream?.active) {
    cameraStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  }
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  let timer;
  try {
    preview.srcObject = cameraStream;
    el("camera").hidden = false;
    await preview.play();
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    const context = canvas.getContext("2d");
    const frames = [], chunks = [];
    function sample() {
      const scale = Math.min(canvas.width / preview.videoWidth, canvas.height / preview.videoHeight);
      const width = preview.videoWidth * scale, height = preview.videoHeight * scale;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(preview, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      frames.push(canvas.toDataURL("image/jpeg", 0.9).split(",")[1]);
    }
    const recorder = new MediaRecorder(new MediaStream(stream.getAudioTracks()), {audioBitsPerSecond: 48000});
    const done = new Promise((resolve, reject) => {
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = resolve;
      recorder.onerror = () => reject(new Error("Could not record the microphone."));
    });
    stopRecording = () => {
      if (recorder.state === "recording") recorder.stop();
      el("send").disabled = true;
    };
    recorder.start();
    sample();
    timer = setInterval(sample, 250);
    el("send").textContent = "Stop and send";
    el("send").disabled = false;
    status.textContent = "Recording voice and webcam…";
    await done;
    sample();
    const selected = Array.from({length: 8}, (_, i) => frames[Math.round(i * (frames.length - 1) / 7)]);
    return {frames: selected, audio: await encode(new Blob(chunks, {type: recorder.mimeType}))};
  } finally {
    clearInterval(timer);
    stopRecording = undefined;
    stream.getTracks().forEach(track => track.stop());

  }
}

function bubble(who, text, cls) {
  const entry = document.createElement("div");
  entry.className = "bubble " + cls;
  const title = document.createElement("h3");
  const body = document.createElement("p");
  title.textContent = who;
  body.textContent = text;
  entry.append(title, body);
  el("messages").append(entry);
  entry.scrollIntoView({block: "nearest"});
  return entry;
}

async function streamReply(payload, onEvent) {
  const response = await fetch(await apiUrl("turn"), {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "application/x-ndjson"},
    body: JSON.stringify(payload),
  });
  if (!response.ok || !response.headers.get("Content-Type")?.includes("application/x-ndjson")) {
    await json(response);
    throw new Error("The study did not return a conversation stream.");
  }
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      buffer += value;
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        const event = JSON.parse(line);
        if (event.type === "error") throw new Error(event.error);
        onEvent(event);
      }
    }
  } finally {
    reader.releaseLock();
  }
}

el("send").onclick = async () => {
  if (stopRecording) { stopRecording(); return; }
  if (busy || history.length >= 20) return;
  busy = el("send").disabled = el("end").disabled = true;
  let transcript, partial, completed;
  function unlock() {
    busy = false;
    el("send").textContent = "Record voice and webcam";
    el("send").disabled = history.length >= 20;
    el("end").disabled = history.length < 3;
    el("send").focus();
  }
  try {
    status.textContent = "Opening microphone and webcam…";
    const media = await capture();
    status.textContent = "Transcribing your speech…";
    await streamReply({session, ...media, support_note: supportNote, history: history.slice(-6)}, event => {
      if (event.type === "transcript") {
        transcript = bubble("You", event.text, "user");
        partial = bubble("Assistant", "", "assistant");
        status.textContent = "Assistant is replying…";
      } else if (event.type === "delta") {
        partial.querySelector("p").append(event.text);
        partial.scrollIntoView({block: "nearest"});
      } else if (event.type === "done") {
        completed = event;
        history.push([event.transcript, event.reply]);
        partial?.remove();
        bubble("Assistant", event.reply, "assistant");
        status.textContent = history.length < 3 ? history.length + " of 3 minimum turns" : "";
        unlock();

      }
    });
    if (!completed) throw new Error("The reply was interrupted. Please record again.");
  } catch (error) {
    if (!completed) {
      transcript?.remove();
      partial?.remove();
      status.textContent = error.message;
    }
  } finally {
    if (!completed) unlock();
  }
};

el("end").onclick = () => {
  closeCamera();
  el("chat").hidden = true;
  el("evaluation").hidden = false;
  status.textContent = "";
  el("evaluation").scrollIntoView();
};

el("evaluation").onsubmit = async event => {
  event.preventDefault();
  const button = el("evaluation").querySelector("button");
  const unanswered = el("pets-questions").querySelector('[data-answered="false"]');
  if (unanswered) {
    status.textContent = "Please choose a rating for each PETS item.";
    unanswered.focus();
    return;
  }
  const scores = Object.fromEntries([...new FormData(el("evaluation"))]
    .map(([key, value]) => [key, value === "na" ? null : Number(value)]));
  button.disabled = true;
  try {
    await post("finish", {session, scores});
    el("evaluation").hidden = true;
    el("thanks").hidden = false;
    status.textContent = "";
  } catch (error) { status.textContent = error.message; button.disabled = false; }
};
