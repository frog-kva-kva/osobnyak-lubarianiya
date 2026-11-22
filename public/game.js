(() => {
 const root=document.querySelector("#game-root"); if(!root)return;
 root.innerHTML=`<section id="game">
 <div class="game-shell">
  <div class="game-heading"><div class="section-kicker">Особняк Лубарианийа</div><h2>Тайны <em>за закрытыми дверями</em></h2><p>История, в которой каждый гость хранит секрет.</p></div>
  <div class="game-panel">

   <section class="game-screen mansion-scene road-scene app-home-screen" id="menuScreen">
    <div class="scene-copy portrait-frame">
     <span class="frame-ornament frame-top">✦</span>
     <h3>Дорога к особняку</h3>
     <div class="scene-actions">
      <button id="menuNewGame" class="scene-button primary"><strong>Новая игра</strong></button>
      <button id="menuContinue" class="scene-button"><strong>Продолжить</strong></button>
      <button id="menuRoom" class="scene-button"><strong>Моя комната</strong></button>
      <button id="menuSettings" class="scene-button"><strong>Настройки</strong></button>
     </div>
     <span class="frame-ornament frame-bottom">❦</span>
    </div>
   </section>
   <section class="game-screen mansion-scene door-scene app-placeholder-screen" id="setupScreen" hidden>
    <div class="scene-content page-composition">
     <span class="scene-eyebrow">Дверь особняка</span><h3>Дверь особняка</h3>
     <div class="setup-layout">
      <div class="door-illustration" aria-hidden="true"><span>✦</span></div>
      <div class="setup-form">
       <div class="game-form-grid">
        <div class="game-field"><label for="playerName">Имя игрока</label><input id="playerName" maxlength="24" value="Хозяйка"></div>
        <div class="game-field"><label for="playerCount">Количество игроков</label><div class="game-range-line"><span>Участники</span><strong id="countValue">13</strong></div><input id="playerCount" type="range" min="10" max="20" value="13"></div>
       </div>
       <div class="game-field"><label>Набор ролей</label><div id="rolePreview" class="game-role-custom"></div></div>
       <div class="game-actions"><button class="game-primary" id="startGame">Начать игру</button><button class="game-secondary" data-app-screen="menuScreen">Назад</button></div>
       <p class="game-error" id="setupError" role="alert"></p>
      </div>
     </div>
    </div>
   </section>
   <section class="game-screen mansion-scene hall-scene app-placeholder-screen" id="continueScreen" hidden>
    <div class="scene-content page-composition hall-composition">
     <span class="scene-eyebrow">Холл особняка</span><h3>Холл особняка</h3>
     <div class="hall-gallery">
      <div class="hall-frame"><span>Ⅰ</span><strong>Сохранённые партии</strong><small>Здесь будут сохранённые игры</small></div>
      <div class="hall-frame"><span>Ⅱ</span><strong>Прошлые игры</strong><small>Здесь появится история партий</small></div>
     </div>
     <div class="game-actions"><button class="game-secondary" data-app-screen="menuScreen">Назад</button></div>
    </div>
   </section>
   <section class="game-screen mansion-scene bedroom-scene app-placeholder-screen" id="roomScreen" hidden>
    <div class="scene-content page-composition bedroom-composition">
     <span class="scene-eyebrow">Моя комната</span><h3>Моя комната</h3>
     <div class="bedroom-interior">
      <div class="bedroom-bed"><div class="bed-pillow"></div><div class="bed-cover"></div></div>
      <div class="bedroom-dresser"><strong>Статистика игр</strong><div class="dresser-drawer"></div><div class="dresser-drawer"></div><div class="dresser-drawer"></div><span>Сыграно партий: 0</span></div>
      <div class="bedroom-portrait"><span>♙</span><small>Портрет игрока</small></div>
     </div>
     <div class="room-collection-wrap"><h4>Находки из сновидений</h4><div id="roomCollection" class="room-collection"></div></div>
     <div class="game-actions"><button class="game-secondary" data-app-screen="menuScreen">Назад</button></div>
    </div>
   </section>
   <section class="game-screen mansion-scene study-scene app-placeholder-screen" id="settingsScreen" hidden>
    <div class="scene-content page-composition settings-composition">
     <span class="scene-eyebrow">Настройки</span><h3>Настройки особняка</h3>
     <div class="settings-ledger"><div><span>♫</span><strong>Звук и музыка</strong><small>Настройки звука появятся здесь</small></div><div><span>❖</span><strong>Оформление</strong><small>Настройки внешнего вида появятся здесь</small></div></div>
     <div class="game-actions"><button class="game-secondary" data-app-screen="menuScreen">Назад</button></div>
    </div>
   </section>
   <section class="game-screen play-scene" id="playScreen" hidden><div class="game-topline"><span id="roundLabel"></span><span id="aliveLabel"></span></div><h3 class="game-phase-title" id="phaseTitle"></h3><p class="game-story" id="phaseStory"></p><div class="game-role-reveal" id="roleReveal" hidden></div><div class="game-log" id="gameLog" aria-live="polite"></div><div id="actionArea"></div><div class="game-actions" id="phaseActions"></div></section>
   <section class="game-screen end-scene" id="endScreen" hidden><div class="game-result"><div class="end-ornament">✧ ❦ ✧</div><h3 id="endTitle"></h3><p id="endText"></p><div class="game-actions" style="justify-content:center"><button class="game-primary" id="newGame">Сыграть ещё раз</button><button class="game-secondary" id="showRoles">Посмотреть роли</button></div><div id="finalRoster" class="game-roster" hidden></div></div></section>
  </div>
 </div>
 </section>`;

 document.body.classList.add("game-app-ready");
 const $=s=>root.querySelector(s);
 const roleInfo={
 assassin:{name:"Убийца",team:"mafia",night:"kill",desc:"Вместе со вторым Убийцей выбирает общую цель. Убийцы знают друг друга."},
 maniac:{name:"Маньяк",team:"solo",night:"kill",desc:"Ночью выбирает игрока для устранения. Побеждает, если остаётся последним."},
 doctor:{name:"Доктор",team:"town",night:"heal",desc:"Ночью спасает одного игрока, включая себя."},
 butterfly:{name:"Бабочка",team:"town",night:"guard",desc:"Защищает выбранного игрока. Если Бабочка погибает, погибает и тот, кого она защищала."},
 host:{name:"Хозяин замка",team:"town",night:"block",desc:"Ночью запирает одного игрока в комнате: тот не может применить свою способность, но остаётся доступной целью для остальных действий."},
 detective:{name:"Сыщик",team:"town",night:"inspect",desc:"Проверяет игрока и узнаёт, относится ли тот к убийцам — Убийцам или Маньяку."},
 celebrity:{name:"Знаменитость",team:"town",night:null,desc:"Знает Фаната и не голосует против него."},
 fan:{name:"Фанат",team:"town",night:null,desc:"Знает Знаменитость и не голосует против неё."},
 loner:{name:"Одиночка",team:"solo",night:null,desc:"Побеждает индивидуально, если доживает до любой концовки."},
 crazy:{name:"Сумасшедший",team:"crazy",night:null,desc:"Побеждает, если его исключают дневным голосованием."},
 thief:{name:"Вор",team:"thief",night:"steal",desc:"Меняется ролями с выбранным игроком. Вместе с ролью переходят её способность и условие победы; роль Вора получает прежний обладатель выбранной роли."},
 citizen:{name:"Гость особняка",team:"town",night:null,desc:"Не имеет ночного действия. Помогает обитателям особняка раскрыть убийц."}
 };
 const roleOrder=["assassin","maniac","doctor","butterfly","host","detective","celebrity","fan","loner","crazy","thief","citizen"];
 const names=["Макс","Тёмный лорд","Просто парень","Лили","Агент Чой","Косуля","Принцесса лени","Лягушка","Боб","Лучший детектив","Шерлок","Ирэн","Полина","Элиас","Марта","Теодор","Ливия","Оскар","Изольда"];
 const traits=["наблюдательный","болтливый","осторожный","прямолинейный","мечтательный","недоверчивый","спокойный"];
 const dreamCatalog=[
{id:"lantern",type:"Предмет",icon:"🏮",name:"Старинный фонарь",dream:"Вам приснился старинный фонарь, мерцающий в тумане."},
{id:"key",type:"Предмет",icon:"🗝️",name:"Серебряный ключ",dream:"Вам приснился серебряный ключ на бархатной подушке."},
{id:"musicbox",type:"Предмет",icon:"🎼",name:"Музыкальная шкатулка",dream:"Вам приснилась музыкальная шкатулка с тихой мелодией."},
{id:"vase",type:"Предмет",icon:"🏺",name:"Лунная ваза",dream:"Вам приснилась фарфоровая ваза с узором-полумесяцем."},
{id:"bell",type:"Предмет",icon:"🔔",name:"Стеклянный колокольчик",dream:"Вам приснился стеклянный колокольчик."},
{id:"cat",type:"Питомец",icon:"🐈‍⬛",name:"Чёрный котёнок",dream:"Вам приснился маленький чёрный котёнок у камина."},
{id:"owl",type:"Питомец",icon:"🦉",name:"Совёнок",dream:"Вам приснился совёнок с янтарными глазами."},
{id:"moth",type:"Питомец",icon:"🦋",name:"Ночная бабочка",dream:"Вам приснилась ночная бабочка с серебристыми крыльями."},
{id:"mouse",type:"Питомец",icon:"🐁",name:"Белая мышка",dream:"Вам приснилась белая мышка из старой книги."},
{id:"fox",type:"Питомец",icon:"🦊",name:"Лисёнок",dream:"Вам приснился крошечный лисёнок под красным пледом."}
];
let pendingDreamReward=null;
let roomCollection=[];
try{roomCollection=JSON.parse(localStorage.getItem("lubarianiya-room-collection")||"[]");if(!Array.isArray(roomCollection))roomCollection=[];}catch(e){roomCollection=[];}
const saveRoomCollection=()=>{try{localStorage.setItem("lubarianiya-room-collection",JSON.stringify(roomCollection));}catch(e){}};
const renderRoomCollection=()=>{const box=$("#roomCollection");if(!box)return;box.innerHTML="";if(!roomCollection.length){const empty=document.createElement("p");empty.className="collection-empty";empty.textContent="Пока здесь ничего нет. Новые находки будут появляться после сновидений.";box.append(empty);return;}roomCollection.forEach(item=>{const card=document.createElement("div");card.className="collection-item "+(item.type==="Питомец"?"is-pet":"is-object");const icon=document.createElement("span"),name=document.createElement("strong"),type=document.createElement("small");icon.className="collection-icon";icon.textContent=item.icon;name.textContent=item.name;type.textContent=item.type;card.append(icon,name,type);box.append(card);});};
 let game=null,chosen=null,mode="classic";
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const alive=()=>game.players.filter(p=>p.alive);
 const me=()=>game.players.find(p=>p.isUser);
 const role=p=>roleInfo[p.role];
 const mafia=()=>alive().filter(p=>p.role==="assassin");
 const killers=()=>alive().filter(p=>["assassin","maniac"].includes(p.role));
 const screenIds=["menuScreen","continueScreen","roomScreen","settingsScreen","setupScreen","playScreen","endScreen"];
 const show=id=>{screenIds.forEach(x=>$("#"+x).hidden=x!==id);};
 root.querySelectorAll("[data-app-screen]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.appScreen)));
 $("#menuNewGame").onclick=()=>show("setupScreen");$("#menuContinue").onclick=()=>show("continueScreen");$("#menuRoom").onclick=()=>{renderRoomCollection();show("roomScreen");};$("#menuSettings").onclick=()=>show("settingsScreen");
 const log=(who,msg,kind)=>{const d=document.createElement("div"),sm=document.createElement("small"),st=document.createElement("strong"),sp=document.createElement("span");d.className="game-line"+(kind==="user"?" user-line":"");sm.textContent=kind==="system"?"Запись из дневника":kind==="user"?"Вы":"Гость";st.textContent=who;sp.textContent=" — "+msg;d.append(sm,st,sp);$("#gameLog").append(d);$("#gameLog").scrollTop=$("#gameLog").scrollHeight;};
 const phase=(title,story,label)=>{$("#phaseTitle").textContent=title;$("#phaseStory").textContent=story;$("#roundLabel").textContent=label;$("#aliveLabel").textContent=alive().length+" в игре";$("#playScreen").classList.toggle("phase-night",game.phase==="night");$("#playScreen").classList.toggle("phase-day",game.phase==="day");$("#gameLog").innerHTML="";$("#actionArea").innerHTML="";$("#phaseActions").innerHTML="";};
 const actionButton=(text,fn)=>{const b=document.createElement("button");b.className="game-primary";b.textContent=text;b.onclick=fn;$("#phaseActions").append(b);};
 const cards=(list)=>{const wrap=document.createElement("div");wrap.className="game-roster "+(game?.phase==="night"?"door-roster":"portrait-roster");list.forEach((p,i)=>{const b=document.createElement("button"),no=document.createElement("span"),nm=document.createElement("strong"),meta=document.createElement("span"),portrait=document.createElement("span");b.className="game-person"+(!p.alive?" dead":"");portrait.className="portrait-art";portrait.textContent=p.name.trim().slice(0,1).toUpperCase();b.disabled=!p.alive;no.className="person-number";no.textContent="№"+String(i+1).padStart(2,"0");nm.textContent=p.name+(p.isUser?" · вы":"");meta.textContent=p.isUser?"Вы":traits[p.trait];b.append(portrait,no,nm,meta);b.onclick=()=>{chosen=p.id;wrap.querySelectorAll("button").forEach(x=>x.classList.toggle("selected",x===b));};wrap.append(b);});return wrap;};
 const renderRolePreview=()=>{const box=$("#rolePreview");box.innerHTML="";roleOrder.forEach(id=>{const d=document.createElement("div");d.className="game-hint";d.textContent=roleInfo[id].name+" — "+roleInfo[id].desc;box.append(d);});};
 renderRolePreview();
 renderRoomCollection();
 const roleDeck=n=>{let deck=["assassin","assassin","maniac","doctor","butterfly","host","detective","celebrity","fan","loner","crazy","thief"];if(n<11){deck=["assassin","assassin","maniac","doctor","butterfly","host","detective","loner","thief"];if(n<7)deck=["assassin","maniac","doctor","detective"];}while(deck.length>n)deck.pop();while(deck.length<n)deck.push("citizen");return shuffle(deck);};
 const roleSummary=id=>roleInfo[id].name+". "+roleInfo[id].desc;
 $("#playerCount").addEventListener("input",()=>$("#countValue").textContent=$("#playerCount").value);
 $("#startGame").onclick=()=>{const n=+$("#playerCount").value,deck=roleDeck(n),guestNames=shuffle(names);const playerName=$("#playerName").value.trim()||"Хозяйка";game={round:1,phase:"day",players:deck.map((r,i)=>({id:i,name:i===0?playerName:guestNames[i-1],role:r,alive:true,isUser:i===0,trait:Math.floor(Math.random()*traits.length),suspicion:0,vote:null,knownKiller:false,knownKillerIds:[]})),lastNight:"",lastVotes:[],protected:null,protectedBy:null,celebrity:null,fan:null,lonerWins:false,crazyWon:false};game.celebrity=game.players.find(p=>p.role==="celebrity")?.id??null;game.fan=game.players.find(p=>p.role==="fan")?.id??null;$("#setupError").textContent="";$("#roleReveal").hidden=false;$("#roleReveal").textContent="Ваша роль: "+roleSummary(me().role)+(me().role==="celebrity"?" Вы знаете Фаната: "+(game.players.find(p=>p.role==="fan")?.name||"его пока нет")+".":me().role==="fan"?" Вы знаете Знаменитость: "+(game.players.find(p=>p.role==="celebrity")?.name||"её пока нет")+".":"");show("playScreen");day(true);};
 const isKiller=p=>["assassin","maniac"].includes(p.role);
 const voteTarget=(p)=>{const others=alive().filter(x=>x.id!==p.id&&!(p.role==="assassin"&&x.role==="assassin")&&!(p.role==="celebrity"&&x.role==="fan")&&!(p.role==="fan"&&x.role==="celebrity"));if(p.role==="crazy")return p.id;if(p.role==="assassin"){const partner=mafia().find(x=>x.id!==p.id);if(partner)return partner.vote;}if(p.role==="detective"&&p.knownKillerIds?.length){const k=others.find(x=>p.knownKillerIds.includes(x.id));if(k)return k.id;}const ranked=others.sort((a,b)=>(b.suspicion+Math.random()*2)-(a.suspicion+Math.random()*2));return ranked[0]?.id??null;};
 const checkEnd=()=>{if(game.crazyWon)return"crazy";const aliveNow=alive(),solo=aliveNow.find(p=>p.role==="loner");if(!aliveNow.some(p=>p.role==="assassin")&&!aliveNow.some(p=>p.role==="maniac"))return"town";if(aliveNow.some(p=>p.role==="maniac")&&aliveNow.length===1)return"maniac";if(aliveNow.some(p=>p.role==="assassin")&&aliveNow.length===mafia().length)return"mafia";if(aliveNow.length===1&&aliveNow[0].role==="loner")return"loner";if(aliveNow.length===2&&aliveNow.some(p=>p.role==="loner"))return"other";if(solo&&aliveNow.length<=2)return"other";if(mafia().length&&aliveNow.every(p=>p.role==="assassin"))return"mafia";return null;};
 function day(first=false){chosen=null;game.phase="day";show("playScreen");phase("День "+game.round,first?"Гости занимают места за длинным столом. Это первое знакомство — вчерашних голосований ещё не было.":"За окнами сереет утро. Гости собираются обсудить прошедшую ночь.","День "+game.round);if(first)log("Особняк","Все гости на месте. Начинается первая партия.","system");if(game.lastNight){log("Особняк",game.lastNight,"system");game.lastNight="";}const detective=me();if(detective.role==="detective"&&game.knownKiller){} 
 alive().filter(p=>!p.isUser).forEach(p=>{const target=alive().filter(x=>x.id!==p.id).sort((a,b)=>b.suspicion-a.suspicion)[0];let line;if(first)line=["Добрый вечер. Рад наконец познакомиться со всеми.","Какой необычный особняк… Надеюсь, вечер будет спокойным.","Я пока никого не знаю. Предлагаю сначала представиться.","Кто-нибудь уже бывал здесь раньше?"][Math.floor(Math.random()*4)];else{const options=["Я пока не уверен, кому можно доверять.","Мне кажется, мы слишком быстро делаем выводы.","Я бы хотел услышать объяснение от "+(target?.name||"остальных")+".","Давайте обсудим события этой ночи.","Я пока пытаюсь понять, кто как себя ведёт."];line=options[Math.floor(Math.random()*options.length)];}log(p.name,line);});
 if(me().alive){const box=document.createElement("div");box.className="game-field";const label=document.createElement("label");label.textContent="Ваша реплика";const row=document.createElement("div");row.className="game-chat";const input=document.createElement("input");input.className="game-chat-input";input.maxLength=180;input.placeholder="Напишите, что думаете о происходящем…";const send=document.createElement("button");send.className="game-secondary";send.textContent="Сказать";send.onclick=()=>{if(input.value.trim()){log(me().name,input.value.trim(),"user");input.value="";}};row.append(input,send);box.append(label,row);$("#actionArea").append(box);const voteLabel=document.createElement("p");voteLabel.className="game-hint";voteLabel.textContent=first?"Знакомство: сегодня голосования нет.":"За кого вы голосуете? Можно воздержаться.";$("#actionArea").append(voteLabel);if(first)actionButton("Перейти к первой ночи",night);else{$("#actionArea").append(cards(alive().filter(p=>!p.isUser)));actionButton("Воздержаться",()=>{chosen=null;vote(true);});actionButton("Подтвердить голос",()=>vote(false));}}else{log("Особняк","Вы выбыли и наблюдаете за оставшимися гостями.","system");actionButton("Продолжить наблюдение",()=>vote(true));}}
 function vote(abstain=false){if(me().alive&&!abstain&&chosen===null){log("Особняк","Сначала выберите игрока или воздержитесь от голосования.","system");return;}const voters=alive();for(const p of voters){p.vote=null;}for(const p of voters){if(p.isUser)p.vote=abstain?null:chosen;else if(p.role==="assassin"){const partner=mafia().find(x=>x.id!==p.id);p.vote=partner?.vote??voteTarget(p);}else p.vote=voteTarget(p);}const counts={};voters.forEach(p=>{if(p.vote!==null)counts[p.vote]=(counts[p.vote]||0)+1;});const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);entries.forEach(([id,c])=>{const p=game.players.find(x=>x.id===+id);log("Голоса",p.name+" — "+c,"system");});if(entries.length){const max=entries[0][1],top=entries.filter(x=>x[1]===max);if(top.length===1){const out=game.players.find(p=>p.id===+top[0][0]);out.alive=false;log("Особняк",out.name+" покидает игру. Его роль: "+role(out).name+".","system");if(out.role==="crazy"){game.crazyWon=true;finish("crazy");return;}if(out.role==="butterfly"&&game.protected!==null&&game.protectedBy===out.id){const linked=game.players.find(p=>p.id===game.protected);if(linked?.alive){linked.alive=false;log("Особняк",linked.name+" тоже погибает: Бабочка, защищавшая его, выбыла.","system");}game.protected=null;game.protectedBy=null;}}else log("Особняк","Голоса разделились. Сегодня никто не покидает игру.","system");}else log("Особняк","Все воздержались. Никто не покидает игру.","system");const result=checkEnd();if(result){finish(result);return;}actionButton("Наступает ночь",night);}
 function night(){chosen=null;game.phase="night";show("playScreen");phase("Ночь "+game.round,"Особняк погружается во тьму. У каждого своя роль и свой выбор.","Ночь "+game.round);const player=me(),action=role(player).night;if(!player.alive||!action){const note=document.createElement("div");note.className="dream-note";const caption=document.createElement("small");caption.textContent="Записка на подушке";const dream=document.createElement("p");if(player.alive){const available=dreamCatalog.filter(x=>!roomCollection.some(y=>y.id===x.id));pendingDreamReward=available.length?available[Math.floor(Math.random()*available.length)]:null;dream.textContent=pendingDreamReward?pendingDreamReward.dream:"Вам приснился знакомый уголок особняка. В комнате всё осталось по-прежнему.";}else{pendingDreamReward=null;dream.textContent="Вы наблюдаете за действиями оставшихся гостей.";}note.append(caption,dream);$("#actionArea").append(note);actionButton("Дождаться рассвета",resolveNight);return;}const prompts={kill:"Выберите цель для ночного нападения:",heal:"Кого вы хотите вылечить? Можно выбрать себя.",guard:"Кого вы хотите защитить этой ночью?",inspect:"Кого вы хотите проверить?",steal:"У кого вы хотите забрать роль? Карточка Вора перейдёт к выбранному игроку.",block:"Кого запереть в комнате на эту ночь? Его собственная способность не сработает, но действия против него останутся возможны."};const targets=alive().filter(p=>p.id!==player.id||action==="heal");const prompt=document.createElement("p");prompt.className="game-muted";prompt.textContent=prompts[action];$("#actionArea").append(prompt,cards(targets));actionButton("Подтвердить действие",resolveNight);}
 function resolveNight(){const player=me(),myAction=player.alive?role(player).night:null;if(player.alive&&myAction&&chosen===null){log("Особняк","Сначала выберите цель.","system");return;}let killTargets=[],healed=null,guarded=null,inspected=null,stolen=null;
 const npcs=alive().filter(p=>!p.isUser);const npcActionSnapshot=npcs.map(p=>({id:p.id,action:role(p).night,role:p.role}));const randomTarget=(list,exclude=[])=>{const opts=list.filter(p=>!exclude.includes(p.id));return opts[Math.floor(Math.random()*opts.length)]||null;};const hostBlockPlans=[];if(player.alive&&myAction==="block")hostBlockPlans.push({actorId:player.id,targetId:chosen});for(const actor of npcActionSnapshot){if(actor.action==="block"){const target=randomTarget(alive().filter(p=>p.id!==actor.id));if(target)hostBlockPlans.push({actorId:actor.id,targetId:target.id});}}const proposedBlocked=new Set(hostBlockPlans.map(x=>x.targetId));const activeHostBlocks=hostBlockPlans.filter(x=>!proposedBlocked.has(x.actorId));const blockedIds=new Set(activeHostBlocks.map(x=>x.targetId));activeHostBlocks.forEach(x=>{const actor=game.players.find(p=>p.id===x.actorId),target=game.players.find(p=>p.id===x.targetId);if(actor&&target)log("Хозяин замка",actor.name+" запирает "+target.name+" в комнате. Его ночное действие будет отменено, но он остаётся уязвим для других действий.","system");});
 const mafiaTarget=()=>{if(myAction==="kill"&&player.role==="assassin")return game.players.find(p=>p.id===chosen);return randomTarget(alive().filter(p=>p.role!=="assassin"&&!p.isUser));};
 if(player.alive&&myAction!=="block"&&!blockedIds.has(player.id)&&myAction==="kill"){if(player.role==="assassin")killTargets.push(game.players.find(p=>p.id===chosen));else killTargets.push(game.players.find(p=>p.id===chosen));}
 if(player.alive&&!blockedIds.has(player.id)&&myAction==="heal")healed=game.players.find(p=>p.id===chosen);
 if(player.alive&&!blockedIds.has(player.id)&&myAction==="guard"){guarded=game.players.find(p=>p.id===chosen);game.protectedBy=player.id;}
 if(player.alive&&!blockedIds.has(player.id)&&myAction==="inspect")inspected=game.players.find(p=>p.id===chosen);
 if(player.alive&&!blockedIds.has(player.id)&&myAction==="steal")stolen=game.players.find(p=>p.id===chosen);
 const nightActors=npcActionSnapshot;const npcMafia=nightActors.find(x=>x.role==="assassin");if(npcMafia&&!blockedIds.has(npcMafia.id)&&player.role!=="assassin"){const target=randomTarget(alive().filter(x=>x.role!=="assassin"&&x.id!==npcMafia.id));if(target)killTargets.push(target);}for(const actor of nightActors){const p=game.players.find(x=>x.id===actor.id);if(!p?.alive||blockedIds.has(actor.id)||actor.role==="assassin"||actor.action==="block")continue;const a=actor.action;if(a==="kill"){const target=randomTarget(alive().filter(x=>x.id!==p.id));if(target)killTargets.push(target);}else if(a==="heal"){const target=randomTarget(alive(),[]);if(target)healed=target;}else if(a==="guard"){const target=randomTarget(alive().filter(x=>x.id!==p.id));if(target){guarded=target;game.protectedBy=p.id;}}else if(a==="inspect"){const target=randomTarget(alive().filter(x=>x.id!==p.id));if(target&&isKiller(target)){p.knownKiller=true;p.knownKillerIds.push(target.id);}}else if(a==="steal"){const target=randomTarget(alive().filter(x=>x.id!==p.id));if(target){const old=p.role;p.role=target.role;target.role=old;log("Особняк","Ночью две карточки незаметно поменялись владельцами.","system");}}}
 if(inspected){const bad=isKiller(inspected);if(bad){player.knownKiller=true;player.knownKillerIds.push(inspected.id);}log("Ваше расследование","Проверка: "+inspected.name+" "+(bad?"относится к убийцам.":"не относится к убийцам."),"system");}
 if(stolen){const old=player.role;player.role=stolen.role;stolen.role=old;$("#roleReveal").textContent="После обмена ваша новая роль: "+roleSummary(player.role);log("Особняк","Вы обменялись карточками с "+stolen.name+". Теперь у вас роль «"+role(player).name+"».","system");}
 game.protected=guarded?.id??null;const deaths=[];for(const target of killTargets){if(!target||!target.alive||target.id===healed?.id||target.id===guarded?.id)continue;if(!deaths.some(x=>x.id===target.id))deaths.push(target);}deaths.forEach(p=>{p.alive=false;log("Особняк",p.name+" погиб этой ночью. Его роль: "+role(p).name+".","system");});const fallenButterfly=deaths.find(p=>p.role==="butterfly"&&p.id===game.protectedBy);if(fallenButterfly&&guarded?.alive){guarded.alive=false;log("Особняк",guarded.name+" тоже погиб: его защитница-Бабочка выбыла.","system");game.protected=null;game.protectedBy=null;}
 if(!deaths.length)game.lastNight="Ночь прошла без потерь.";else game.lastNight="Ночью погибли: "+deaths.map(p=>p.name).join(", ")+".";
 if(pendingDreamReward){roomCollection.push(pendingDreamReward);saveRoomCollection();log("Отголоски сновидений","После пробуждения в вашей комнате появилась новая находка: «"+pendingDreamReward.name+"».","system");pendingDreamReward=null;}const result=checkEnd();if(result){finish(result);return;}game.round++;day(false);}
 function finish(winner){const loner=game.players.find(p=>p.role==="loner"&&p.alive);show("endScreen");const titles={town:"Победа обитателей особняка",mafia:"Победа убийц",maniac:"Победа Маньяка",crazy:"Победа Сумасшедшего",loner:"Победа Одиночки",other:"Партия завершена"};$("#endTitle").textContent=titles[winner]||"Партия завершена";$("#endText").textContent=(loner&&winner!=="loner"?"Одиночка тоже получает индивидуальную победу, потому что дожил до конца. ":"")+({town:"Убийцы и Маньяк больше не представляют угрозы особняку.",mafia:"Убийцы взяли верх над обитателями особняка.",maniac:"Маньяк остался последним игроком.",crazy:"Сумасшедшего исключили голосованием.",loner:"Одиночка дожил до завершения партии и победил один.",other:"Наступила одна из особых концовок."}[winner]||"");const wrap=$("#finalRoster");wrap.innerHTML="";game.players.forEach(p=>{const d=document.createElement("div"),s=document.createElement("strong"),m=document.createElement("span");d.className="game-person"+(!p.alive?" dead":"");s.textContent=p.name+(p.isUser?" · вы":"");m.textContent=role(p).name+(p.alive?" · в игре":" · выбыл");d.append(s,m);wrap.append(d);});}
 $("#newGame").onclick=()=>{game=null;show("setupScreen");};$("#showRoles").onclick=()=>{$("#finalRoster").hidden=!$("#finalRoster").hidden;};
 show("menuScreen");
})();