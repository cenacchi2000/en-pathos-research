// Scene text and dialogue are bilingual. Support preferences stay in English for the reply model.
export const dinner = [
  {
    title: ["At Sam’s door", "Alla porta di Sam"],
    scene: ["Your friend Sam opens the door. Maya is already there. You’ve never met her, and Leo is on his way.", "Il tuo amico Sam apre la porta. Maya è già lì. Non l’hai mai incontrata e Leo sta arrivando."],
    moves: [
      [["Introduce yourself to Maya", "Ti presenti a Maya"], ["Maya: “Nice to meet you! I only know Sam here, so I’m glad you came.”", "Maya: «Piacere! Qui conosco solo Sam, quindi mi fa piacere che tu sia qui.»"], ["A friendly opening", "Un inizio cordiale"], "Help me find an easy way to start talking."],
      [["Stay with Sam while you settle in", "Resti con Sam mentre ti ambienti"], ["Sam: “Come with me to the kitchen. I’ll introduce you when Leo gets here.”", "Sam: «Vieni con me in cucina. Vi presento quando arriva Leo.»"], ["Time to settle in", "Tempo per ambientarmi"], "Give me a moment to get comfortable."],
      [["Ask Sam to introduce you", "Chiedi a Sam di presentarvi"], ["Sam: “Maya, come meet my friend!”", "Sam: «Maya, vieni che ti presento!»"], ["A warm introduction", "Una presentazione calorosa"], "Help me ease into a new situation."],
    ],
  },
  {
    title: ["While dinner cooks", "Mentre la cena cuoce"],
    scene: ["Sam checks the oven. Dinner needs another ten minutes. Leo has just arrived.", "Sam controlla il forno. Mancano dieci minuti alla cena. Leo è appena arrivato."],
    moves: [
      [["Offer to set the table with Sam", "Ti offri di apparecchiare con Sam"], ["Sam: “Thanks. Plates are in the cupboard. I’ll get the glasses.”", "Sam: «Grazie. I piatti sono nella credenza. Io prendo i bicchieri.»"], ["Something concrete to do", "Qualcosa di concreto da fare"], "Offer one concrete thing I can do next."],
      [["Sit with Leo and chat", "Ti siedi con Leo a chiacchierare"], ["Leo: “I got caught in the rain. Does it always come down this hard here?”", "Leo: «Mi sono preso tutta la pioggia. Qui viene sempre giù così forte?»"], ["A little company", "Un po’ di compagnia"], "Start with a little conversation before offering advice."],
      [["Offer Leo a towel for his wet jacket", "Offri a Leo un asciugamano per la giacca bagnata"], ["Leo: “Thanks. I’ll hang it by the door.”", "Leo: «Grazie. La appendo vicino alla porta.»"], ["Notice what would help", "Notare cosa può essere d’aiuto"], "Notice one practical need I may have overlooked."],
    ],
  },
  {
    title: ["Making room", "Facciamo spazio"],
    scene: ["Maya stands by the table. She says it takes her a little while to feel at ease in a new group. How do you make her feel welcome?", "Maya è in piedi accanto al tavolo. Dice che le ci vuole un po’ per sentirsi a suo agio in un gruppo nuovo. Come la fai sentire benvenuta?"],
    moves: [
      [["Invite Maya to join the conversation", "Inviti Maya a unirsi alla conversazione"], ["Maya: “Thanks. I was listening and wanted to join in.” She takes a seat.", "Maya: «Grazie. Vi ascoltavo e mi andava di partecipare.» Si siede."], ["Be included", "Sentirmi incluso"], "Include me without putting me on the spot."],
      [["Tell her you felt a little awkward when you arrived too", "Le dici che anche tu all’inizio ti sentivi un po’ in imbarazzo"], ["Maya: “I’m glad you said that.” She smiles and sits down.", "Maya: «Mi fa piacere che tu l’abbia detto.» Sorride e si siede."], ["Feel less alone", "Sentirmi meno solo"], "Help me feel less alone by acknowledging that an awkward moment is understandable."],
      [["Show her the free chair and give her a moment", "Le indichi la sedia libera e le lasci un momento"], ["Maya: “Thanks, I’ll sit here.” She settles in while the others keep talking.", "Maya: «Grazie, mi siedo qui.» Si accomoda mentre gli altri continuano a parlare."], ["Settle in at my own pace", "Ambientarmi con i miei tempi"], "Give me space to join in when I feel ready."],
    ],
  },
  {
    title: ["Something to drink", "Qualcosa da bere"],
    scene: ["Leo reaches for the pitcher. Your empty glass is next to it.", "Leo prende la caraffa. Il tuo bicchiere vuoto è lì accanto."],
    moves: [
      [["Ask Leo to pour you some water", "Chiedi a Leo di versarti dell’acqua"], ["Leo: “Of course. Tell me when.”", "Leo: «Certo. Dimmi quando basta.»"], ["Help I can ask for", "Un aiuto che posso chiedere"], "Help me put a specific request into words."],
      [["Wait your turn and pour it yourself", "Aspetti il tuo turno e te la versi"], ["Leo leaves the pitcher next to your glass.", "Leo lascia la caraffa accanto al tuo bicchiere."], ["Room to do it myself", "Spazio per fare da me"], "Leave me room to act on my own."],
      [["Hold out your glass so Leo can see it", "Porgi il bicchiere verso Leo"], ["Leo catches your eye and tips the pitcher toward your glass.", "Leo incrocia il tuo sguardo e inclina la caraffa verso il bicchiere."], ["Pick up a small cue", "Cogliere un piccolo segnale"], "Notice understated cues without making me explain everything."],
    ],
  },
  {
    title: ["A little spill", "Un bicchiere rovesciato"],
    scene: ["You nudge your glass and spill some water. Maya lifts the bread basket out of the way.", "Urti il bicchiere e rovesci un po’ d’acqua. Maya sposta il cestino del pane."],
    moves: [
      [["Ask Maya to pass a cloth", "Chiedi a Maya di passarti uno strofinaccio"], ["Maya: “Here you go. I’ll hold the basket while you wipe.”", "Maya: «Eccolo. Tengo io il cestino mentre asciughi.»"], ["Help with the immediate problem", "Una mano con il problema concreto"], "Help me deal with the immediate problem first."],
      [["Smile and grab a napkin", "Sorridi e prendi un tovagliolo"], ["Sam moves your glass back from the edge. Everyone carries on talking.", "Sam allontana il bicchiere dal bordo. Tutti riprendono a parlare."], ["Keep things in perspective", "Ridimensionare l’imprevisto"], "Help me see a small mistake in proportion."],
      [["Ask Sam where the cloths are", "Chiedi a Sam dove sono gli strofinacci"], ["Sam: “In the drawer by the sink. I’ll steady the glasses.”", "Sam: «Nel cassetto accanto al lavello. Tengo fermi i bicchieri.»"], ["Point me to what I need", "Indicarmi cosa mi serve"], "Point me to the resource I need to handle the situation."],
    ],
  },
  {
    title: ["A rough day", "Una giornata storta"],
    scene: ["Leo says a meeting went badly and he’s been thinking about it all evening.", "Leo racconta che una riunione è andata male e che ci pensa da tutta la sera."],
    moves: [
      [["Acknowledge how frustrating it sounds", "Gli dici che sembra davvero frustrante"], ["Leo: “Yeah. Thanks for letting me get that off my chest.”", "Leo: «Già. Grazie, avevo bisogno di dirlo.»"], ["Feel heard first", "Sentirmi ascoltato prima"], "Acknowledge what’s difficult before looking for a fix."],
      [["Ask what made the meeting feel that way", "Gli chiedi cosa gli ha dato quell’impressione"], ["Leo: “Mostly the silence at the end. I don’t actually know what they thought.”", "Leo: «Soprattutto il silenzio alla fine. In realtà non so cosa abbiano pensato.»"], ["Check the interpretation", "Verificare l’impressione"], "Help me check whether my interpretation fits what happened."],
      [["Point out that one meeting doesn’t define his work", "Gli ricordi che una riunione non definisce il suo lavoro"], ["Leo: “True. I’d forgotten the last one went pretty well.”", "Leo: «È vero. Avevo dimenticato che la precedente era andata piuttosto bene.»"], ["See the bigger picture", "Vedere il quadro più ampio"], "Help me put one setback in the context of what else has gone well."],
    ],
  },
  {
    title: ["Two dishes, one hot tray", "Due piatti e una teglia calda"],
    scene: ["Sam is carrying a hot tray and asks where to put it. The middle of the table is crowded.", "Sam arriva con una teglia calda e chiede dove appoggiarla. Il centro del tavolo è pieno."],
    moves: [
      [["Clear a spot at your end", "Fai spazio dalla tua parte"], ["Sam sets down the tray and hands you the serving spoon.", "Sam appoggia la teglia e ti passa il cucchiaio da portata."], ["Take one small step", "Fare un piccolo passo"], "Offer one manageable step I can take now."],
      [["Ask everyone to slide their plates back", "Chiedi a tutti di spostare un po’ i piatti"], ["Everyone shifts their plates. Sam puts the tray where everyone can reach.", "Tutti spostano i piatti. Sam mette la teglia dove possono arrivarci tutti."], ["Share the effort", "Dividere lo sforzo"], "Help me share a task when it is easier together."],
      [["Point out the trivet on the sideboard", "Indichi il sottopentola sulla credenza"], ["Sam sets the tray on the trivet, away from the crowded table.", "Sam appoggia la teglia sul sottopentola, lontano dal tavolo affollato."], ["Find a safer alternative", "Trovare un’alternativa più sicura"], "Help me find a simple alternative when my first option is awkward."],
    ],
  },
  {
    title: ["Turning down the music", "Abbassiamo la musica"],
    scene: ["Sam likes having music at dinner, but Maya is leaning forward to hear Leo.", "A Sam piace tenere la musica durante la cena, ma Maya deve sporgersi per sentire Leo."],
    moves: [
      [["Suggest keeping it on at a lower volume", "Proponi di tenerla a volume più basso"], ["Sam lowers the volume. Maya sits back and can still hear the conversation.", "Sam abbassa il volume. Maya si riappoggia allo schienale e riesce a seguire."], ["Find a middle ground", "Trovare un compromesso"], "Help me find a way forward that respects both priorities."],
      [["Suggest pausing it while you talk", "Proponi di spegnerla mentre parlate"], ["Sam pauses the music. Leo picks up where he left off.", "Sam mette in pausa la musica. Leo riprende da dove si era interrotto."], ["Make the next step clear", "Rendere chiaro il prossimo passo"], "Help me simplify when there are too many competing demands."],
      [["Suggest moving the speaker farther from Maya", "Proponi di spostare la cassa più lontano da Maya"], ["Sam moves the speaker to the shelf. Maya can hear Leo from her seat.", "Sam sposta la cassa sullo scaffale. Maya riesce a sentire Leo dal suo posto."], ["Change the situation", "Cambiare la situazione"], "Look for a practical change to the situation itself."],
    ],
  },
  {
    title: ["You’re asked about your week", "Ti chiedono com’è andata la settimana"],
    scene: ["Maya asks about your week. One thing has been on your mind, but you’re still figuring out how you feel about it.", "Maya ti chiede com’è andata la settimana. C’è una cosa a cui continui a pensare, ma non hai ancora capito bene come ti senti."],
    moves: [
      [["Share just the part you’re comfortable with", "Racconti solo la parte che ti va di condividere"], ["Maya listens and gives you time to finish.", "Maya ti ascolta e ti lascia il tempo di finire."], ["Choose how much to share", "Scegliere quanto raccontare"], "Let me share as much as I’m comfortable sharing."],
      [["Say it’s been a lot and leave the details for later", "Dici che è stata intensa e lasci i dettagli per dopo"], ["Maya: “Fair enough. I hope you get a chance to breathe this weekend.”", "Maya: «Ci sta. Spero che questo fine settimana tu riesca a tirare il fiato.»"], ["Less pressure to explain", "Meno pressione a spiegarmi"], "Help with what I already shared without pushing for more details."],
      [["Talk about a small thing that went well", "Racconti una piccola cosa che è andata bene"], ["Maya: “I’m glad you had that moment in the middle of it.”", "Maya: «Mi fa piacere che in mezzo a tutto ci sia stato quel momento.»"], ["Start with something manageable", "Partire da qualcosa di semplice"], "Give me a lighter entry point when a topic feels difficult."],
    ],
  },
  {
    title: ["A joke lands awkwardly", "Una battuta cade male"],
    scene: ["Someone makes a joke about being late. Leo goes quiet and looks down at his plate.", "Qualcuno fa una battuta sui ritardatari. Leo si zittisce e guarda il piatto."],
    moves: [
      [["Check in with Leo quietly", "Chiedi a Leo sottovoce se va tutto bene"], ["Leo: “I’m okay. I was just thinking about how long it took to get here.”", "Leo: «Tutto bene. Pensavo solo a quanto ci ho messo per arrivare.»"], ["Check gently", "Verificare con tatto"], "Check a concern gently before assuming what someone feels."],
      [["Give him space and keep the conversation open", "Gli lasci spazio e lasci aperta la conversazione"], ["When he’s ready, Leo asks Sam for the recipe.", "Quando se la sente, Leo chiede la ricetta a Sam."], ["Space to rejoin", "Spazio per rientrare nella conversazione"], "Give me the option to rejoin when I’m ready."],
      [["Bring Leo back in by asking about his trip", "Coinvolgi di nuovo Leo chiedendogli del tragitto"], ["Leo tells you about the shortcut he usually takes.", "Leo ti racconta della scorciatoia che prende di solito."], ["Offer a gentle way back", "Offrire un modo discreto per rientrare"], "Offer a low-pressure way back into a difficult conversation."],
    ],
  },
  {
    title: ["The last slice", "L’ultima fetta"],
    scene: ["There’s one slice of cake left. Both you and Maya say it looks good.", "È rimasta una fetta di torta. Sia tu che Maya dite che ha un bell’aspetto."],
    moves: [
      [["Suggest cutting it in half", "Proponi di tagliarla a metà"], ["Maya: “Deal. I’ll grab two little plates.”", "Maya: «Affare fatto. Prendo due piattini.»"], ["A fair option", "Un’opzione equa"], "Help me find a fair option when two people want the same thing."],
      [["Offer Maya the last slice", "Offri a Maya l’ultima fetta"], ["Maya: “Thanks! I’ll take it if you’re sure.”", "Maya: «Grazie! La prendo, se sei sicuro.»"], ["Decide what matters to me", "Decidere cosa conta per me"], "Help me act on what matters to me in the moment."],
      [["Ask if Sam wants the slice too", "Chiedi se anche Sam vuole la fetta"], ["Sam: “I’m fine, thanks. You two can share it.”", "Sam: «Io sono a posto, grazie. Dividetela pure.»"], ["Check who else is affected", "Verificare chi altro è coinvolto"], "Help me check who else needs to be considered."],
    ],
  },
  {
    title: ["Dessert is over", "Il dolce è finito"],
    scene: ["Sam starts collecting the plates. You’ve had a long day and still have to get home.", "Sam inizia a raccogliere i piatti. Hai avuto una giornata lunga e devi ancora tornare a casa."],
    moves: [
      [["Offer to clear the plates together", "Ti offri di sparecchiare con Sam"], ["Sam: “Thanks. Just the plates is plenty. I’ll deal with the rest tomorrow.”", "Sam: «Grazie. Bastano i piatti. Al resto penso domani.»"], ["Make the effort manageable", "Rendere lo sforzo gestibile"], "Help me narrow a task to something manageable."],
      [["Thank Sam and say you need to head home soon", "Ringrazi Sam e dici che tra poco devi andare"], ["Sam: “Of course. Sit a minute while I bring your coat.”", "Sam: «Certo. Siediti un attimo mentre ti porto il cappotto.»"], ["Respect my limits", "Rispettare i miei limiti"], "Help me recognize when I’ve done enough."],
      [["Carry your own plate to the kitchen", "Porti il tuo piatto in cucina"], ["Sam points you to the sink and thanks you as you head back.", "Sam ti indica il lavello e ti ringrazia mentre torni indietro."], ["Do what I can comfortably do", "Fare ciò che riesco a fare"], "Help me contribute within the time and energy I have."],
    ],
  },
  {
    title: ["Something said in confidence", "Una confidenza"],
    scene: ["Maya tells you quietly that she’s thinking of changing jobs. She’s only told a few people and asks you to keep it between you.", "Maya ti confida a bassa voce che sta pensando di cambiare lavoro. Lo ha detto a poche persone e ti chiede di tenerlo per te."],
    moves: [
      [["Reassure her it stays between you", "Le assicuri che resta tra voi"], ["Maya: “Thanks. I’m not ready for everyone to know.”", "Maya: «Grazie. Non sono pronta a dirlo a tutti.»"], ["Privacy before details", "Prima la riservatezza"], "Respect my privacy before asking for details."],
      [["Ask what makes the decision difficult", "Le chiedi che cosa rende difficile la decisione"], ["Maya: “I like the people there. It’s the work I’m unsure about.”", "Maya: «Mi piacciono le persone lì. È il lavoro che non mi convince.»"], ["Name the real dilemma", "Mettere a fuoco il dubbio"], "Help me separate the parts of a difficult decision."],
      [["Give her room to leave it there", "Le lasci spazio per fermarsi lì"], ["Maya: “That’s all I wanted to say for now.”", "Maya: «Per ora volevo solo dirti questo.»"], ["Let a disclosure be enough", "Poter dire solo quello che voglio"], "Let me share something without needing to explain it further."],
    ],
  },
  {
    title: ["How to get home", "Come tornare a casa"],
    scene: ["Sam notices the rain has started again and asks whether you’d like company on the way to the station.", "Sam nota che ha ripreso a piovere e ti chiede se vuoi compagnia fino alla stazione."],
    moves: [
      [["Ask Sam to walk with you", "Chiedi a Sam di accompagnarti"], ["Sam: “Of course. I’ll grab my umbrella.”", "Sam: «Certo. Prendo l’ombrello.»"], ["Practical company", "Compagnia concreta"], "Offer practical company when it would make a task easier."],
      [["Ask about the quickest route", "Chiedi qual è il percorso più rapido"], ["Sam shows you the covered route on his phone.", "Sam ti mostra sul telefono il percorso al coperto."], ["One clear direction", "Un’indicazione chiara"], "Give me enough information to handle the next step myself."],
      [["Say you’d like the walk to yourself", "Dici che preferisci fare la strada da solo"], ["Sam: “Of course. There’s an umbrella by the door if you need it.”", "Sam: «Certo. Se ti serve, c’è un ombrello vicino alla porta.»"], ["Support without hovering", "Aiuto senza invadenza"], "Offer help I can accept without giving up time to myself."],
    ],
  },
  {
    title: ["At the door again", "Di nuovo alla porta"],
    scene: ["Sam walks you to the door and thanks you for coming.", "Sam ti accompagna alla porta e ti ringrazia per essere venuto."],
    moves: [
      [["Thank Sam for having everyone over", "Ringrazi Sam per avervi invitato"], ["Sam: “I’m glad you came. Get home safe.”", "Sam: «Sono contento che tu sia qui. Buon rientro.»"], ["End with warmth", "Chiudere con calore"], "End with a short, genuine acknowledgment."],
      [["Offer to host next time", "Ti offri di ospitare la prossima volta"], ["Sam: “I’d love that. We can figure out the details another day.”", "Sam: «Mi piacerebbe. Ai dettagli pensiamo un altro giorno.»"], ["Leave with a next step", "Lasciarci con un prossimo passo"], "Close with one practical next step when it fits."],
      [["Send Sam a quick thank-you once you’re home", "Mandi un breve messaggio di ringraziamento a Sam quando arrivi a casa"], ["Sam replies: “Glad you made it home. Thanks for coming.”", "Sam risponde: «Mi fa piacere che tu sia a casa. Grazie di essere venuto.»"], ["Follow up in my own time", "Farmi sentire con i miei tempi"], "Give me room to follow up when I have had time to think."],
    ],
  },
];

export const callbacks = {
  2: {step: 0, lines: [
    ["Maya waves to you from the other side of the table.", "Maya ti fa un cenno dall’altra parte del tavolo."],
    ["Sam introduces you to Maya properly as you sit down.", "Sam ti presenta davvero a Maya mentre vi sedete."],
    ["Maya picks up the conversation you started at the door.", "Maya riprende la conversazione iniziata all’ingresso."],
  ]},
  12: {step: 5, lines: [
    ["Leo adds that it helped to say something about his meeting and feel heard.", "Leo aggiunge che gli ha fatto bene parlare della riunione e sentirsi ascoltato."],
    ["Leo adds that talking about the meeting helped him realize he didn’t know how it went for everyone else.", "Leo aggiunge che parlare della riunione gli ha fatto capire che non sa come sia andata per gli altri."],
    ["Leo says he can remember a meeting that went well, too.", "Leo dice che gli è tornata in mente anche una riunione andata bene."],
  ]},

};

export const followUps = [
  [
    [["Ask Maya how she knows Sam", "Chiedi a Maya come conosce Sam"], ["Maya says they met at a cooking class. Sam laughs and says they burned their first pizza.", "Maya racconta che si sono conosciuti a un corso di cucina. Sam ride e dice che hanno bruciato la loro prima pizza."]],
    [["Ask Sam what’s for dinner", "Chiedi a Sam cosa c’è per cena"], ["Sam says he’s making a tray of roast vegetables and heads to check the oven.", "Sam dice che ha preparato una teglia di verdure arrosto e va a controllare il forno."]],
  ],
  [
    [["Carry the bread to the table", "Porti il pane a tavola"], ["Sam takes the basket from you and passes it around.", "Sam prende il cestino e lo passa agli altri."]],
    [["Ask Leo to pick a seat with you", "Chiedi a Leo di scegliere dove sedervi"], ["Leo points to two seats and pulls out a chair.", "Leo indica due posti e sposta una sedia."]],
  ],
  [
    [["Ask Maya an easy question about herself", "Fai a Maya una domanda semplice per conoscerla"], ["Maya mentions she goes running on Sundays. Leo says he knows a good route.", "Maya dice che la domenica va a correre. Leo le dice che conosce un bel percorso."]],
    [["Let Maya listen until she feels ready to talk", "Lasci che Maya ascolti finché non le va di parlare"], ["Maya listens for a while, then asks Leo about getting here in the rain.", "Maya ascolta ancora un po’, poi chiede a Leo com’è stato arrivare con la pioggia."]],
  ],
  [
    [["Offer to refill Maya’s glass", "Ti offri di riempire il bicchiere di Maya"], ["Maya nudges her glass toward you.", "Maya ti avvicina il bicchiere."]],
    [["Set the pitcher down for everyone", "Appoggi la caraffa dove tutti possono prenderla"], ["Leo moves the bread basket to make room.", "Leo sposta il cestino del pane per fare spazio."]],
  ],
  [
    [["Ask for a dry napkin", "Chiedi un tovagliolo asciutto"], ["Sam passes you one from the stack.", "Sam te ne passa uno dalla pila."]],
    [["Move your glass away from the edge", "Allontani il bicchiere dal bordo"], ["Maya puts the bread basket back once the table is dry.", "Maya rimette il cestino al suo posto quando il tavolo è asciutto."]],
  ],
  [
    [["Ask Leo whether he wants a second opinion", "Chiedi a Leo se vuole un secondo parere"], ["Leo says he’d like one another time and reaches for his plate.", "Leo dice che gli farebbe piacere un’altra volta e prende il piatto."]],
    [["Give Leo a moment and pass the bread", "Lasci un momento a Leo e gli passi il pane"], ["Leo takes a slice and the conversation pauses for a moment.", "Leo prende una fetta e la conversazione si ferma per un momento."]],
  ],
  [
    [["Serve the people nearest the tray", "Servi chi è più vicino alla teglia"], ["Maya holds out her plate.", "Maya ti porge il piatto."]],
    [["Hand Sam the serving spoon", "Passi il cucchiaio da portata a Sam"], ["Sam serves the first helping and passes the spoon on.", "Sam serve la prima porzione e passa il cucchiaio."]],
  ],
  [
    [["Ask Maya if she can hear now", "Chiedi a Maya se ora riesce a sentire"], ["Maya nods and picks up the conversation.", "Maya annuisce e riprende la conversazione."]],
    [["Invite Leo to finish what he was saying", "Inviti Leo a finire quello che stava dicendo"], ["Leo finishes his story and asks how your week went.", "Leo finisce il racconto e ti chiede com’è andata la settimana."]],
  ],
  [
    [["Ask Maya about her week", "Chiedi a Maya della sua settimana"], ["Maya tells you about a neighbour who helped her out.", "Maya ti racconta di una vicina che le ha dato una mano."]],
    [["Bring up the food and ask for the recipe", "Parli della cena e chiedi la ricetta"], ["Sam tells you what went into the tray.", "Sam ti dice cosa ha messo nella teglia."]],
  ],
  [
    [["Offer Leo another helping", "Offri a Leo un’altra porzione"], ["Leo thanks you and passes his plate.", "Leo ti ringrazia e ti porge il piatto."]],
    [["Ask Sam what’s for dessert", "Chiedi a Sam cosa c’è per dolce"], ["Sam brings the cake over to the table.", "Sam porta la torta a tavola."]],
  ],
  [
    [["Offer to bring the dessert plates", "Ti offri di portare i piattini"], ["Maya holds the cake platter while you bring them.", "Maya tiene il vassoio mentre porti i piattini."]],
    [["Ask if anyone wants coffee with dessert", "Chiedi se qualcuno vuole un caffè con il dolce"], ["Leo says yes and follows Sam to the kitchen.", "Leo dice di sì e segue Sam in cucina."]],
  ],
  [
    [["Take the empty glasses to the kitchen", "Porti i bicchieri vuoti in cucina"], ["Sam shows you where to leave them and comes back to the table with you.", "Sam ti indica dove lasciarli e torna al tavolo con te."]],
    [["Sit back down and thank Sam for dinner", "Ti risiedi e ringrazi Sam per la cena"], ["Sam joins you and asks what you’d do again next time.", "Sam torna da te e chiede cosa rifaresti la prossima volta."]],
  ],
  [
    [["Stay with Maya for a moment", "Resti ancora un momento con Maya"], ["Maya appreciates having your attention before Sam brings up the rain.", "Maya apprezza che tu le abbia dedicato un momento prima che Sam parli della pioggia."]],
    [["Let the conversation return to the table", "Lasci che la conversazione torni al gruppo"], ["Maya joins the others as Sam glances outside and notices the rain.", "Maya torna con gli altri mentre Sam guarda fuori e nota la pioggia."]],
  ],
  [
    [["Check when the next train leaves", "Controlli quando parte il prossimo treno"], ["There’s plenty of time. You head to the door with Sam.", "C’è ancora tempo. Vai verso la porta con Sam."]],
    [["Get ready to leave while the rain eases", "Ti prepari a uscire mentre la pioggia diminuisce"], ["Sam walks you to the door as the rain lets up.", "Sam ti accompagna alla porta mentre la pioggia si attenua."]],
  ],
];

export const personaTraits = [
  [[["I make the first move", "Faccio il primo passo"], ["In an unfamiliar conversation, finding the first words is often the hardest part.", "In una conversazione nuova, trovare le prime parole è spesso la parte più difficile."]], [["I settle in gradually", "Mi ambiento poco alla volta"], ["I tend to observe before joining when a situation catches me off guard.", "Quando una situazione mi coglie di sorpresa, osservo prima di partecipare."]], [["I look for a familiar connection", "Cerco un punto di riferimento"], ["I feel more at ease in a new group when someone helps me work out who knows whom.", "In un gruppo nuovo mi sento più a mio agio quando capisco chi conosce chi."]]],
  [[["I start by doing something useful", "Inizio facendo qualcosa di utile"], ["When things feel uncertain or urgent, taking one concrete step helps me find my footing.", "Se tutto sembra incerto o urgente, un piccolo passo concreto mi aiuta a orientarmi."]], [["I connect through conversation", "Creo un legame parlando"], ["A few unhurried words can help me trust someone before we start trying to solve a problem.", "Scambiare due parole con calma mi aiuta a fidarmi prima di cercare una soluzione."]], [["I notice practical needs", "Noto i bisogni pratici"], ["When someone is struggling, I often notice a small practical thing that could make their day easier.", "Se qualcuno è in difficoltà, spesso noto un piccolo aiuto pratico che potrebbe alleggerirgli la giornata."]]],
  [[["I value being invited in", "Apprezzo un invito a partecipare"], ["When I’m quiet in a group, an opening to contribute can make me feel welcome.", "Se in gruppo parlo poco, un’occasione per dire la mia mi fa sentire benvenuto."]], [["I connect through shared experience", "Mi avvicina condividere esperienze"], ["Knowing that someone else has felt awkward too helps me talk about my own discomfort.", "Sapere che anche qualcun altro si è sentito in imbarazzo mi aiuta a parlarne."]], [["I join at my own pace", "Partecipo con i miei tempi"], ["I may listen for a while before speaking, even when I’m interested in the conversation.", "Posso ascoltare a lungo prima di parlare, anche se la conversazione mi interessa."]]],
  [[["I ask directly for what I need", "Chiedo aiuto in modo diretto"], ["It’s easier for me to ask for help when I can say exactly what I need and when.", "Chiedo aiuto più volentieri se riesco a dire con precisione cosa mi serve e per quando."]], [["I try things on my own", "Mi piace provare da solo"], ["If I think I can handle a task, I prefer getting the missing information and trying it myself.", "Se penso di potermela cavare, preferisco avere l’informazione che manca e provare da solo."]], [["I signal needs quietly", "Comunico i bisogni con discrezione"], ["I sometimes express a need with a gesture or a pause rather than spelling it out.", "A volte comunico un bisogno con un gesto o una pausa prima di dirlo a parole."]]],
  [[["I deal with the immediate problem first", "Affronto prima il problema immediato"], ["When something goes wrong, I feel steadier after dealing with the practical effect.", "Quando qualcosa va storto, mi sento più tranquillo dopo aver affrontato le conseguenze pratiche."]], [["I put small mistakes in perspective", "Ridimensiono i piccoli errori"], ["I feel better when I can separate what actually went wrong from what I fear it says about me.", "Mi aiuta distinguere cosa è andato storto da quello che temo dica di me."]], [["I look for the right resource", "Cerco la risorsa giusta"], ["When I lack information, finding one reliable person or source is more useful to me than broad advice.", "Se mi manca un’informazione, mi aiuta più trovare una persona o una fonte affidabile che ricevere consigli generici."]]],
  [[["I want to feel understood first", "Prima voglio sentirmi capito"], ["After a setback, I’m more receptive to solutions once someone has understood what made it hard for me.", "Dopo una delusione, ascolto più volentieri le soluzioni quando qualcuno ha capito cosa mi è pesato davvero."]], [["I check my interpretation", "Verifico le mie impressioni"], ["When I read a silence or a look as criticism, I like to check what evidence I actually have.", "Se interpreto un silenzio come una critica, mi aiuta verificare quali elementi concreti ho."]], [["I look at the bigger picture", "Guardo il quadro più ampio"], ["After one bad outcome, I find it useful to recall a concrete example of something that went well.", "Dopo un esito negativo, mi aiuta ricordare un episodio concreto in cui è andata bene."]]],
  [[["I make progress in small steps", "Procedo a piccoli passi"], ["When a task feels too big, setting a small, visible goal helps me get started.", "Se un compito sembra troppo grande, partire da un obiettivo piccolo e visibile mi aiuta a cominciare."]], [["I like sharing the effort", "Mi piace condividere lo sforzo"], ["For something difficult, I’m more likely to start when the work can be divided clearly.", "Davanti a un compito difficile parto più volentieri se possiamo dividerci il lavoro con chiarezza."]], [["I look for a workable alternative", "Cerco un’alternativa praticabile"], ["If the obvious plan is awkward, I’d rather find a simpler way to reach the same goal.", "Se la strada più ovvia è scomoda, preferisco trovare un modo più semplice per ottenere lo stesso risultato."]]],
  [[["I look for a middle ground", "Cerco un punto d’incontro"], ["When two people disagree, I’m interested in what matters most to each of them.", "Se due persone non sono d’accordo, mi interessa capire che cosa conta di più per ognuna."]], [["I make space by simplifying", "Creo spazio semplificando"], ["When priorities compete, I feel clearer after deciding what can wait.", "Quando ci sono tante priorità, ragiono meglio dopo aver capito cosa può aspettare."]], [["I change what’s making things harder", "Intervengo su ciò che complica le cose"], ["If noise or a crowded setting makes something harder, I prefer adjusting the situation first.", "Se il rumore o un luogo affollato complicano le cose, preferisco intervenire prima sull’ambiente."]]],
  [[["I choose what to share", "Scelgo quanto raccontare"], ["I can talk about a sensitive subject without wanting to share every part of the story.", "Posso parlare di un tema delicato senza voler raccontare ogni dettaglio."]], [["I don’t like having to explain twice", "Mi pesa dover spiegare di nuovo"], ["When I’ve already described the problem, I’d rather start from what I said than retell the whole story.", "Quando ho già descritto il problema, preferisco partire da ciò che ho detto senza ricominciare da capo."]], [["I open up through small moments", "Mi apro partendo da piccole cose"], ["On a difficult day, it can be easier for me to talk about one ordinary moment than the whole day.", "In una giornata difficile mi è più facile raccontare un piccolo momento che tutta la giornata."]]],
  [[["I check in with tact", "Verifico con tatto"], ["If someone goes quiet, I prefer a discreet question to putting them on the spot.", "Se qualcuno si chiude in silenzio, preferisco una domanda discreta a richiamare l’attenzione su di lui."]], [["I need room to return", "Mi serve spazio per riprendere"], ["If I step back from a discussion, I usually want to rejoin when I feel ready.", "Se mi allontano da una discussione, in genere voglio poter rientrare quando me la sento."]], [["I reconnect through a neutral topic", "Riprendo attraverso un tema neutro"], ["After an awkward moment, an ordinary question can make it easier for me to take part again.", "Dopo un momento imbarazzante, una domanda semplice può rendermi più facile tornare a partecipare."]]],
  [[["I look for a fair share", "Cerco una divisione equa"], ["When two people want the same thing, I think about what would feel fair to each person.", "Se due persone desiderano la stessa cosa, mi chiedo cosa sarebbe equo per entrambe."]], [["I know what matters to me in the moment", "Tengo conto di ciò che conta per me"], ["Even in a small decision, the outcome I care about may be different from what others expect.", "Anche in una scelta piccola, può importarmi un esito diverso da quello che gli altri si aspettano."]], [["I think about who else is affected", "Penso a chi altro è coinvolto"], ["Before deciding, I consider whether someone who will be affected has had a chance to speak.", "Prima di decidere, considero se chi ne sarà coinvolto ha avuto modo di dire la sua."]]],
  [[["I scale effort to my energy", "Adatto lo sforzo alle energie"], ["When I’m tired, I’d rather handle the part that is genuinely useful and leave the rest for later.", "Quando sono stanco, preferisco fare la parte che serve davvero e lasciare il resto a dopo."]], [["I need permission to stop", "Mi aiuta riconoscere quando basta"], ["I can feel guilty about stopping even when I’ve already done what was necessary.", "Posso sentirmi in colpa a fermarmi anche quando ho già fatto ciò che serviva."]], [["I contribute within my limits", "Contribuisco nei miei limiti"], ["When I can’t stay long, I’m happy to help with something I can finish in the time I have.", "Se posso restare poco, do volentieri una mano con qualcosa che riesco a finire."]]],
  [[["I’m careful with confidences", "Tengo alla riservatezza"], ["When I tell someone something sensitive, I may want to keep names or extra details private.", "Quando racconto qualcosa di delicato, posso voler tenere per me nomi o altri dettagli."]], [["I separate the parts of a dilemma", "Distinguo i diversi aspetti di un dubbio"], ["A decision is easier for me when I can separate what feels right about it from what I stand to lose.", "Una decisione mi è più chiara se distinguo cosa mi sembra giusto da cosa temo di perdere."]], [["I can share without wanting to go further", "Posso confidarmi e fermarmi lì"], ["Sometimes telling someone what is going on is enough for me for now.", "A volte mi basta raccontare a qualcuno cosa sta succedendo e lasciare il resto a un altro momento."]]],
  [[["I appreciate practical company", "Apprezzo una compagnia concreta"], ["A hard task can feel more manageable to me when someone offers to do part of it alongside me.", "Un compito difficile mi pesa meno se qualcuno si offre di farne una parte insieme a me."]], [["I want enough information to go on alone", "Mi basta l’informazione per proseguire da solo"], ["If I prefer to handle something myself, a route, time or specific fact can be all the help I need.", "Se preferisco sbrigarmela da solo, un percorso, un orario o un dato preciso può essere tutto l’aiuto che mi serve."]], [["I need time to myself", "Ho bisogno di tempo per me"], ["After a social evening or a difficult conversation, being alone for a while helps me recharge.", "Dopo una serata in compagnia o un discorso difficile, stare un po’ da solo mi aiuta a ricaricarmi."]]],
  [[["I value a warm ending", "Do valore a un saluto caloroso"], ["At the end of a difficult conversation, I can be satisfied with one sincere acknowledgment.", "Alla fine di un discorso difficile, posso sentirmi soddisfatto con un solo riconoscimento sincero."]], [["I like leaving with a next step", "Mi piace uscire con un prossimo passo"], ["If we made a decision, I remember the conversation better when I know what to do first.", "Se abbiamo deciso qualcosa, la conversazione mi resta più chiara se so cosa fare per prima cosa."]], [["I follow up in my own time", "Mi faccio sentire quando sono pronto"], ["After a meaningful conversation, I may prefer to think it over before getting back in touch.", "Dopo una conversazione importante, posso preferire rifletterci prima di farmi risentire."]]],
];

export const traitConnections = [
  [["Introducing yourself lowers the barrier to a first conversation and makes room for the other person to respond.", "Presentarti rende più facile iniziare a parlare e lascia all’altra persona lo spazio per rispondere."], ["Staying with a friend shows how familiarity can make a new social situation feel safer.", "Restare con un amico mostra come un legame familiare possa aiutare a sentirsi al sicuro in una situazione nuova."], ["Asking for an introduction shows that a trusted person can make it easier for two strangers to connect.", "Chiedere una presentazione mostra come una persona fidata possa facilitare l’incontro tra due sconosciuti."]],
  [["Setting the table shows how a concrete contribution can ease uncertainty for you and lighten someone else’s load.", "Apparecchiare mostra come un contributo concreto possa aiutarti a orientarti e alleggerire il lavoro di qualcun altro."], ["Sitting and chatting gives Leo company while he settles in, before either of you needs to fix anything.", "Sederti a chiacchierare offre compagnia a Leo mentre si ambienta, prima che ci sia qualcosa da risolvere."], ["Offering a towel responds to a visible practical need without requiring Leo to ask first.", "Offrire un asciugamano risponde a un bisogno concreto e visibile senza aspettare che Leo lo chieda."]],
  [["Inviting Maya makes it clear that she has a place in the conversation and can join in if she wants.", "Invitare Maya le fa capire che c’è posto per lei nella conversazione e può unirsi se lo desidera."], ["Sharing your own awkwardness lets Maya know that feeling uncomfortable in a new group is understandable.", "Raccontare il tuo imbarazzo fa capire a Maya che sentirsi a disagio in un gruppo nuovo è comprensibile."], ["Pointing out a seat makes it possible for Maya to join while giving her control over when to speak.", "Indicare un posto rende più facile unirsi al gruppo e lascia a Maya la scelta di quando parlare."]],
  [["Asking Leo for water makes your need clear and gives him a specific way to help.", "Chiedere dell’acqua a Leo rende chiaro il tuo bisogno e gli dà un modo preciso per aiutarti."], ["Pouring the water yourself suggests that sometimes the support you need is simply access to what lets you act.", "Versarti l’acqua suggerisce che a volte ti basta avere a disposizione quello che serve per fare da solo."], ["Holding out the glass shows how a small gesture can communicate a need when its meaning is clear from context.", "Porgere il bicchiere mostra come un gesto possa comunicare un bisogno quando il contesto lo rende chiaro."]],
  [["Asking for a cloth addresses the spill immediately. In some situations practical help makes it easier to settle down.", "Chiedere uno strofinaccio affronta subito l’imprevisto. In certe situazioni, un aiuto pratico rende più facile ritrovare la calma."], ["Wiping up and carrying on keeps a minor mishap from turning into the focus of the evening.", "Asciugare e andare avanti evita che una piccola svista diventi il centro della serata."], ["Finding out where the cloths are gives you the information you need to deal with the spill yourself.", "Sapere dove sono gli strofinacci ti dà l’informazione necessaria per affrontare l’imprevisto da solo."]],
  [["Acknowledging Leo’s frustration gives him a chance to feel understood before the conversation moves to advice.", "Riconoscere la frustrazione di Leo gli dà modo di sentirsi capito prima di passare ai consigli."], ["Asking about the meeting helps Leo separate what he observed from what he fears others thought.", "Chiedere della riunione aiuta Leo a distinguere ciò che ha osservato da quello che teme abbiano pensato gli altri."], ["Putting one meeting in context brings other evidence into view while leaving room for Leo’s disappointment.", "Mettere una riunione in prospettiva fa emergere altri elementi e lascia spazio alla delusione di Leo."]],
  [["Clearing one spot gives Sam somewhere safe to put the tray immediately, without reorganising the whole table.", "Liberare un punto dà subito a Sam un posto sicuro dove appoggiare la teglia, senza dover riorganizzare tutto il tavolo."], ["Asking everyone to move their plates shares a small effort so the finished arrangement works for the group.", "Chiedere a tutti di spostare i piatti distribuisce un piccolo sforzo e trova una sistemazione che funziona per il gruppo."], ["Suggesting the trivet sidesteps the crowded table and gives Sam a safer place for the hot tray.", "Indicare il sottopentola aggira il problema del tavolo affollato e dà a Sam un posto più sicuro per la teglia."]],
  [["Lowering the volume makes it easier for Maya to hear while keeping the music Sam enjoys.", "Abbassare il volume aiuta Maya a sentire e permette a Sam di tenere la musica che gli piace."], ["Pausing the music removes the immediate obstacle so the interrupted conversation can resume.", "Mettere in pausa la musica elimina l’ostacolo immediato e permette di riprendere la conversazione interrotta."], ["Moving the speaker changes the setting itself so Maya can take part more comfortably.", "Spostare la cassa cambia l’ambiente e permette a Maya di partecipare più comodamente."]],
  [["Sharing one part of your week shows that you can connect with someone while setting a limit on what you disclose.", "Raccontare una parte della settimana mostra che puoi entrare in relazione e scegliere quanto condividere."], ["Saying it’s been a lot communicates how you’re doing while giving you time to decide whether to say more.", "Dire che è stata una settimana intensa comunica come stai e ti lascia tempo per decidere se aggiungere altro."], ["Starting with a small positive moment gives Maya something concrete to respond to without requiring the whole story.", "Partire da un piccolo momento positivo dà a Maya qualcosa di concreto a cui rispondere, senza dover raccontare tutto."]],
  [["Checking privately gives Leo room to explain what his silence meant rather than having someone guess publicly.", "Chiedere in privato lascia a Leo lo spazio per chiarire il proprio silenzio, senza che altri lo interpretino davanti a tutti."], ["Keeping the conversation open lets Leo rejoin in his own time while still feeling part of the group.", "Lasciare aperta la conversazione permette a Leo di rientrare con i suoi tempi e di sentirsi parte del gruppo."], ["A simple question about the trip gives Leo a low-pressure way to talk after the awkward moment.", "Una domanda sul tragitto offre a Leo un modo semplice per tornare a parlare dopo il momento imbarazzante."]],
  [["Splitting the cake treats both appetites as legitimate and looks for a fair share.", "Dividere la torta riconosce il desiderio di entrambi e cerca una ripartizione equa."], ["Offering the slice shows that generosity can matter more to you in a particular moment than getting an equal share.", "Offrire la fetta suggerisce che, in quel momento, la generosità può contare per te più di ricevere una parte uguale."], ["Asking Sam checks whether someone who hasn’t spoken also has a stake in the decision.", "Chiedere a Sam verifica se anche una persona che non si è espressa è interessata alla decisione."]],
  [["Offering to clear plates turns a large cleanup into one concrete contribution the two of you can share.", "Offrirti di sparecchiare trasforma il riordino in un contributo concreto da dividere in due."], ["Letting Sam know you need to leave shows that you can appreciate the evening and be clear about your energy or time.", "Dire a Sam che devi andare mostra che puoi apprezzare la serata e comunicare con chiarezza i tuoi limiti."], ["Taking your own plate gives you a way to contribute within the time and energy you have.", "Portare il tuo piatto è un modo per contribuire nel tempo e con le energie che hai."]],
  [["Reassuring Maya about the confidence puts her privacy first and lets her decide who else hears it.", "Rassicurare Maya sulla confidenza dà priorità alla sua riservatezza e lascia a lei la scelta di chi informare."], ["Asking what makes the job decision hard helps Maya identify the different things she values.", "Chiedere cosa rende difficile la decisione sul lavoro aiuta Maya a distinguere i diversi aspetti che contano per lei."], ["Letting the subject rest respects Maya’s decision to share just one thing for now.", "Lasciare riposare l’argomento rispetta la decisione di Maya di condividere solo una cosa, per ora."]],
  [["Asking Sam to walk with you shows that being accompanied can itself be a concrete form of support.", "Chiedere a Sam di accompagnarti mostra che fare un tratto di strada insieme può essere una forma concreta di supporto."], ["Asking for the route shows how a precise piece of information can help you act independently.", "Chiedere il percorso mostra come un’informazione precisa possa aiutarti a proseguire in autonomia."], ["Choosing to walk alone makes it clear that you can value someone’s offer and still need time for yourself.", "Scegliere di tornare da solo chiarisce che puoi apprezzare l’offerta e aver comunque bisogno di tempo per te."]],
  [["Thanking Sam directly gives him a clear acknowledgment of what his invitation meant to you.", "Ringraziare Sam direttamente gli fa capire che significato ha avuto per te il suo invito."], ["Offering to host shows care through a concrete commitment to reciprocate.", "Offrirti di ospitare a tua volta esprime attenzione attraverso un impegno concreto a ricambiare."], ["Sending thanks later gives you space to find your words and still lets the other person know the evening mattered.", "Ringraziare più tardi ti dà tempo per trovare le parole e fa comunque sapere all’altra persona che la serata ha contato."]],
];
