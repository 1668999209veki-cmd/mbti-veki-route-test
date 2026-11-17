var selectedAvatarArchive=null,posterArchiveRecord=null,shareArchiveRecord=null;
function recordAvatarSave(event,id){id=id||shareArchiveRecord;if(!id)return;fetch('https://mbti-veki-route-test.pages.dev/api/avatar-records',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id,event:event}),keepalive:true}).catch(function(){});}
function trackGameEvent(name){if(window.gameAnalytics)window.gameAnalytics(name);}
var shareQrImage=new Image();shareQrImage.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEgCAYAAAAUg66AAAAAAklEQVR4AewaftIAAAdYSURBVO3BUQ7jWJIEQY+E7n/l2Pof8AEtLjupajdL/0CSFgyStGSQpCWDJC0ZJGnJIElLBklaMkjSkkGSlgyStGSQpCWDJC0ZJGnJIElLBklaMkjSkkGSlgyStGSQpCWDJC0ZJGnJIElLBklaMkjSkkGSlgyStGSQpCWDJC0ZJGnJIElLBklaMkjSkg/LkvA3astTknBHW06S8JS2nCRhS1tOkvA3asuWQZKWDJK0ZJCkJYMkLRkkackgSUs+vFhb3ioJ+ueScNKWkySctGVLW94qCW80SNKSQZKWDJK0ZJCkJYMkLRkkackgSUs+/LAkPKktT0nCt9qyqS1XknDSljva8q0knLTlKUl4Ult+0SBJSwZJWjJI0pJBkpYMkrRkkKQlgyQt+aD/nCSctOUkCU9JwklbTpJwpS16l0GSlgyStGSQpCWDJC0ZJGnJIElLBkla8kH/OW25oy1XknCShJO2nCThW0k4aYv+XYMkLRkkackgSUsGSVoySNKSQZKWDJK05MMPa8t/URKe1JZvteWOJJy05Re1Rf9rkKQlgyQtGSRpySBJSwZJWjJI0pIPL5aE/6q2XEnCSVtOknBHEq605SQJJ205ScJJW64k4aQtdyRB/8wgSUsGSVoySNKSQZKWDJK0ZJCkJYMkLfmwrC36d7VF/1xb9P9rkKQlgyQtGSRpySBJSwZJWjJI0pJBkpZ8WJaEK205ScJbteWkLd9qy0kS7mjLSVuekoSTtmxJwlu15RcNkrRkkKQlgyQtGSRpySBJSwZJWjJI0pIPL5aEO9ryVkk4actT2nKShKe05SQJdyThW0m4oy1XknDSlicl4UpbtgyStGSQpCWDJC0ZJGnJIElLBkla8kGXkvCUtpwk4VtteasknLTlJAknbbmShJO2nCThJAlv1ZY3GiRpySBJSwZJWjJI0pJBkpYMkrRkkKQlH5a15UoSTtpyRxJO2vKtJGxJwpPaciUJJ225oy1b2vKUJJy05SQJJ215o0GSlgyStGSQpCWDJC0ZJGnJIElLBkla8uEvloSTtnwrCXck4VttOUnCHW05ScJTknBHW6605Vcl4aQtv2iQpCWDJC0ZJGnJIElLBklaMkjSkkGSlnz4i7XlKW15UhLeqi1XknCShCcl4VttOUnCU9rypCRcacuWQZKWDJK0ZJCkJYMkLRkkackgSUsGSVqS/sGPSsJJW06ScNKWK0m4oy0nSbjSlpMknLTlrZJw0pZflIQnteUXDZK0ZJCkJYMkLRkkackgSUsGSVryYVkSrrTlrdpyRxJO2vKttpwk4aQtJ0m40paTJJy05SQJf6O23JGEk7a80SBJSwZJWjJI0pJBkpYMkrRkkKQlgyQt+fBiSXirJNzRlpMkvFVbnpKEk7acJOFKW56UhCttOUnCHW35RYMkLRkkackgSUsGSVoySNKSQZKWDJK0JP2DRUn4RW05ScJT2nKShLdqyx1J+Bu15SQJJ205ScKVtmwZJGnJIElLBklaMkjSkkGSlgyStGSQpCUfXqwtT0rCSVuuJOFJbbmShJO2nCRhSxJO2nJHW/S/2vJGgyQtGSRpySBJSwZJWjJI0pJBkpYMkrQk/YNFSbjSlpMknLTlVyXhKW05ScJJW64k4aQtT0rCt9rylCSctOWOJJy05Y0GSVoySNKSQZKWDJK0ZJCkJYMkLfnww9pyRxJO2nIlCSdtOUnCt9pyRxJO2nKShKck4aQtT0nCWyXhjiRcacuWQZKWDJK0ZJCkJYMkLRkkackgSUsGSVqS/oH+dUk4acuVJNzRlqck4Y62PCUJJ215ShLeqi1bBklaMkjSkkGSlgyStGSQpCWDJC0ZJGnJh2VJ+Bu15aQtJ0n4VltOknDSlm+15UlJ2JKEk7ZsacsvGiRpySBJSwZJWjJI0pJBkpYMkrRkkKQlH16sLW+VhDuScNKWK0k4ScKTknClLSdJOGnLHW25koQ72vKUttyRhG+1ZcsgSUsGSVoySNKSQZKWDJK0ZJCkJR9+WBKe1JZf1JYnteVbbTlJwklbnpKEt0rCSVtOkvBGgyQtGSRpySBJSwZJWjJI0pJBkpYMkrTkg35OW56UhKe05aQtdyThSlveKglPassbDZK0ZJCkJYMkLRkkackgSUsGSVoySNKSD/rPScJJW06S8K0knLTlJAknbbmShL9VEk7a8kaDJC0ZJGnJIElLBklaMkjSkkGSlgyStOTDD2vLr2rLSRKutOUkCU9qy7eSoH+uLSdJ+EWDJC0ZJGnJIElLBklaMkjSkkGSlgyStOTDiyXhb5WEp7TljiSctOVbbTlJwh1JuNKWO5LwrbbckYSTtvyiQZKWDJK0ZJCkJYMkLRkkackgSUvSP5CkBYMkLRkkackgSUsGSVoySNKSQZKWDJK0ZJCkJYMkLRkkackgSUsGSVoySNKSQZKWDJK0ZJCkJYMkLRkkackgSUsGSVoySNKSQZKWDJK0ZJCkJYMkLRkkackgSUsGSVoySNKSQZKW/B+JZCdSg3nVewAAAABJRU5ErkJggg==";
// Preview progress stays in memory; normal play uses the existing browser save.
var previewProgress=null;
var gameStorage={
  getItem:function(key){return previewProgress!==null?(previewProgress[key]??null):localStorage.getItem(key);},
  setItem:function(key,value){if(previewProgress!==null)previewProgress[key]=String(value);else localStorage.setItem(key,value);}
};
// Canvas & assets
var cvs,ctx,charImgs={},charBounds={},charTileImages={},imagesReady=false;
var COLS=8,ROWS=6,CELL=70,PAD=4;
var W=COLS*CELL+(COLS+1)*PAD,H=ROWS*CELL+(ROWS+1)*PAD;

// Poster bg - preload once

// Ignore the light image padding when fitting characters inside tiles.
function getCharacterBounds(im){
  var c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;
  var x=c.getContext('2d');x.drawImage(im,0,0);
  var pixels=x.getImageData(0,0,c.width,c.height).data;
  var mask=new Uint8Array(c.width*c.height),seen=new Uint8Array(mask.length),groups=[];
  for(var n=0;n<mask.length;n++){var i=n*4,r=pixels[i],g=pixels[i+1],b=pixels[i+2];mask[n]=pixels[i+3]>32&&(Math.min(r,g,b)<180||Math.max(r,g,b)-Math.min(r,g,b)>30)?1:0;}
  for(var n=0;n<mask.length;n++)if(mask[n]&&!seen[n]){
    var q=[n],group={count:0,x:c.width,y:c.height,right:0,bottom:0};seen[n]=1;
    for(var j=0;j<q.length;j++){var v=q[j],x=v%c.width,y=Math.floor(v/c.width);group.count++;group.x=Math.min(group.x,x);group.y=Math.min(group.y,y);group.right=Math.max(group.right,x);group.bottom=Math.max(group.bottom,y);
      for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var xx=x+dx,yy=y+dy,k=yy*c.width+xx;if(xx>=0&&yy>=0&&xx<c.width&&yy<c.height&&mask[k]&&!seen[k]){seen[k]=1;q.push(k);}}
    }groups.push(group);
  }
  groups.sort(function(a,b){return b.count-a.count;});
  if(!groups.length)return{x:0,y:0,w:c.width,h:c.height,area:c.width*c.height};
  var main=groups[0],left=main.x,top=main.y,right=main.right,bottom=main.bottom,area=0;
  groups.forEach(function(g){if(g.count>=main.count*0.025){left=Math.min(left,g.x);top=Math.min(top,g.y);right=Math.max(right,g.right);bottom=Math.max(bottom,g.bottom);area+=g.count;}});
  return{x:left,y:top,w:right-left+1,h:bottom-top+1,area:area};
}
// Normalize only border-connected light padding; preserve internal character details.
function prepareTileImage(im,transparent){
  var canvas=document.createElement('canvas');canvas.width=im.naturalWidth;canvas.height=im.naturalHeight;
  var context=canvas.getContext('2d');context.drawImage(im,0,0);
  var data=context.getImageData(0,0,canvas.width,canvas.height),p=data.data;
  var seen=new Uint8Array(canvas.width*canvas.height),queue=[];
  function add(x,y){
    if(x<0||y<0||x>=canvas.width||y>=canvas.height)return;
    var n=y*canvas.width+x;if(seen[n])return;seen[n]=1;
    var i=n*4,lo=Math.min(p[i],p[i+1],p[i+2]),hi=Math.max(p[i],p[i+1],p[i+2]);
    if(p[i+3]<32||(lo>=180&&hi-lo<=30))queue.push(n);
  }
  for(var x=0;x<canvas.width;x++){add(x,0);add(x,canvas.height-1);}
  for(var y=0;y<canvas.height;y++){add(0,y);add(canvas.width-1,y);}
  for(var j=0;j<queue.length;j++){
    var n=queue[j],x=n%canvas.width,y=Math.floor(n/canvas.width),i=n*4;
    p[i]=237;p[i+1]=241;p[i+2]=248;p[i+3]=transparent?0:255;
    add(x-1,y);add(x+1,y);add(x,y-1);add(x,y+1);
  }
  context.putImageData(data,0,0);return canvas;
}
function preload(cb){
  var n=0;
  CHARS.forEach(function(ch){
    var im=new Image();
    im.onload=im.onerror=function(){charImgs[ch.id]=im;if(im.naturalWidth>0){charBounds[ch.id]=getCharacterBounds(im);charTileImages[ch.id]=prepareTileImage(im);}n++;if(n===CHARS.length){imagesReady=true;cb();}};
    im.src=ch.img;
  });
}

// Save/load
function getSave(){
  try{
    var current=gameStorage.getItem('llk4_normal_v3');var raw=JSON.parse(current||gameStorage.getItem('llk4_normal_v2')||gameStorage.getItem('llk4')||'{}'),clean={};
    if(!raw||typeof raw!=='object')return clean;
    Object.keys(raw).forEach(function(key){if(/^c\d+$/.test(key)&&Number(key.slice(1))<LEVELS.length&&Number.isInteger(raw[key])&&raw[key]>=1&&raw[key]<=3)clean[current?key:'c'+CAMPAIGN_OLD_TO_NEW[Number(key.slice(1))]]=raw[key];});
    if(!current&&Object.keys(clean).length)gameStorage.setItem('llk4_normal_v3',JSON.stringify(clean));
    return clean;
  }catch(e){return{};}
}
function getLevelScores(){
  try{var raw=JSON.parse(gameStorage.getItem('llk_level_scores_v1')||'{}'),out={};
    Object.keys(raw).forEach(function(k){if(/^c\d+$/.test(k)&&Number(k.slice(1))<LEVELS.length&&Number.isFinite(raw[k])&&raw[k]>=0)out[k]=raw[k];});return out;
  }catch(e){return {};}
}
function getCampaignScoreSummary(){
 var scores=getLevelScores(),save=getSave(),total=0,maximum=0,missing=0;
 LEVELS.forEach(function(lv,i){maximum+=getScoreCeiling(lv.grid.flat().filter(Boolean).length,lv.time);var own=scores['c'+i];if(own!==undefined)total+=own;else if(save['c'+i])missing++;});
 return {total:total,maximum:maximum,missing:missing};
}
function saveLevelScore(index,value){var scores=getLevelScores(),key='c'+index;scores[key]=Math.max(scores[key]||0,value);try{gameStorage.setItem('llk_level_scores_v1',JSON.stringify(scores));}catch(e){}}
function setSave(s){try{gameStorage.setItem('llk4_normal_v3',JSON.stringify(s));}catch(e){}}
function getBest(){try{return Math.max(0,Number(gameStorage.getItem('llk4_best'))||0);}catch(e){return 0;}}
function setBest(v){try{gameStorage.setItem('llk4_best',String(v));}catch(e){}}

// Float text
function floatTxt(txt,color,x,y){
  var el=document.createElement('div');el.className='ftx';
  el.textContent=txt;el.style.color=color||'#f1c40f';
  el.style.left=(x||window.innerWidth/2-30)+'px';
  el.style.top=(y||200)+'px';
  document.getElementById('ft').appendChild(el);
  setTimeout(function(){el.remove();},1200);
}

// ═══ GAME STATE ═══
var matchEffects=[];
var gameState="idle",gameEpoch=0,clockLast=0,clockCarry=0;
var board=[],selected=null,score=0,timeLeft=60,timer=null,locked=false,hintCells=[],linePath=null;
var curLevel=0,totalCells=0,clearedCells=0;
var combo=0,comboTimer=null,lastMatchTime=0,wrongStreak=0,perfectGame=true,hintCount=0,MAX_HINTS=3;
var comboTimeGranted=0,roundTimeLimit=60;
function comboTimeReward(n,endless){return n<3?0:Math.min(endless?2:3,Math.floor((n-3)/(endless?2:1))+1);}
function resetComboChain(){combo=0;lastMatchTime=0;clearTimeout(comboTimer);document.getElementById('combo-disp').textContent='';}
function awardComboTime(){
 var cap=infModeActive?10:20,nominal=comboTimeReward(combo,infModeActive);
 var actual=Math.max(0,Math.min(nominal,cap-comboTimeGranted,roundTimeLimit-timeLeft));
 timeLeft+=actual;comboTimeGranted+=actual;document.getElementById('tm').textContent=timeLeft;
 if(timeLeft>10)document.getElementById('tm').classList.remove('danger');
 return actual;
}

var hintPenaltyTotal=0;
var hintLinePath=null,hintBlinkTimer=null,hintBlinkOn=false;

// ═══ LEVEL SELECT ═══
function showLS(){trackGameEvent('home');
  document.body.classList.remove("game-scroll-locked");
  gameState="idle";gameEpoch++;clearHintBlink();
  clearInterval(timer);
  // 每次进主页都重新读取解锁状态
  try{if(gameStorage.getItem('llk4_inf')==='1')infUnlocked=true;}catch(e){}
  document.getElementById('ls').style.display='block';
  document.getElementById('gs').style.display='none';
  var dock=document.getElementById('endless-dock');
  if(dock){dock.hidden=!infUnlocked;document.getElementById('ls').classList.toggle('endless-ready',infUnlocked);document.getElementById('endless-dock-round').textContent='已解锁至第 '+getEndlessRound()+' 轮';document.getElementById('endless-dock-play').textContent=getEndlessRound()>1||getInfBest()>0?'继续挑战 →':'开始挑战 →';}
  var summary=getCampaignScoreSummary();
  var progress=getSave(),totalStars=0,completedLevels=0;
  LEVELS.forEach(function(_,i){var n=progress['c'+i]||0;totalStars+=n;if(n)completedLevels++;});
  document.getElementById('best-disp').innerHTML='<div class="home-score"><span>十关总成绩</span><strong>'+summary.total+'<small> / '+summary.maximum+' 分</small></strong><progress aria-label="十关总成绩进度" value="'+summary.total+'" max="'+summary.maximum+'"></progress><p>'+(summary.missing?'已记录成绩 · '+summary.missing+' 关待补录':'各关最高分之和 · '+(summary.total>=summary.maximum?'已达满分':'还差 '+(summary.maximum-summary.total)+' 分'))+'</p></div><div class="home-score"><span>闯关星级</span><strong>'+totalStars+'<small> / '+LEVELS.length*3+' 星</small></strong><progress aria-label="闯关星级进度" value="'+totalStars+'" max="'+LEVELS.length*3+'"></progress><p>已通关 '+completedLevels+' / '+LEVELS.length+' 关 · '+(totalStars===LEVELS.length*3?'已达成全满星':'距满星还差 '+(LEVELS.length*3-totalStars)+' 星')+'</p></div>';
  updateAchievementActions();
  var save=getSave(),levelScores=getLevelScores(),lg=document.getElementById('lg');lg.innerHTML='';
  // 检查无尽模式是否已解锁，显示入口
  var infEntryEl=document.getElementById('inf-entry');
  if(infEntryEl){
    var allCleared=LEVELS.every(function(_,i){return save['c'+i]>0;});
    infEntryEl.style.display='block';
    var entryButton=document.getElementById('inf-entry-btn');
    entryButton.disabled=!infUnlocked&&!allCleared;
    document.getElementById('inf-entry-best').textContent=infUnlocked?('最高纪录 '+getInfBest()+' 分 · 挑战至第 '+getEndlessRound()+' 轮'):(allCleared?'十关已通关 · 生成海报后解锁':'完成10关并生成海报后解锁');
    entryButton.lastElementChild.textContent=infUnlocked?'随机关卡 · 挑战极限':(allCleared?'🎨 点击生成通关海报':'🔒 尚未解锁');
  }
  LEVELS.forEach(function(lv,i){
    var btn=document.createElement('button');
    var frontier=Math.max(-1,...Object.keys(save).map(function(k){return Number(k.slice(1));}));
    var unlocked=i<=frontier+1;
    var stars=save['c'+i]||0;
    btn.disabled=!unlocked;
    btn.className='lb'+(unlocked?'':' lk')+(stars>0?' lc':'');
    btn.innerHTML='<span class="li">'+lv.icon+'</span><span class="ln">'+lv.name+'</span>'
      +'<span class="lnum">第'+(i+1)+'关</span>'
      +'<span class="lstar">'+(stars>0?'★'.repeat(stars)+'☆'.repeat(3-stars):'☆☆☆')+'</span>';
    var own=levelScores['c'+i],limit=getScoreCeiling(lv.grid.flat().filter(Boolean).length,lv.time);
    btn.innerHTML+='<span class="level-score">'+(own===undefined?(stars?'成绩待补录':'尚未通关'):'最高分 '+own+' / '+limit)+'</span>'
      +'<span class="level-score-gap">'+(own===undefined?(stars?'重玩本关记录分数':'满分 '+limit+' 分'):own>=limit?'已达满分':'还差 '+(limit-own)+' 分')+'</span>';
    if(unlocked)(function(idx){btn.addEventListener('click',function(){infModeActive=false;startLevel(idx);});})(i);
    lg.appendChild(btn);
  });
}

// ═══ START LEVEL ═══
function getInfBest(){try{return Math.max(0,Number(gameStorage.getItem('llk4_inf_best'))||0);}catch(e){return 0;}}
function setInfBest(v){try{gameStorage.setItem('llk4_inf_best',String(v));}catch(e){}}

var infRound=1,infRoundWon=false;
function getEndlessRound(){try{var n=Number(gameStorage.getItem('llk_endless_round_v1'));return Number.isSafeInteger(n)&&n>=1&&n<1000000?n:1;}catch(e){return 1;}}
function saveEndlessRound(n){if(!Number.isSafeInteger(n)||n<1||n>=1000000)return;try{gameStorage.setItem('llk_endless_round_v1',String(Math.max(getEndlessRound(),n)));}catch(e){}}

function buildEndlessLevel(base,round){
  var stage=Math.min(4,Math.floor((Math.max(1,round)-1)/2));
  var counts=[40,44,46,48,48],times=[65,65,60,55,50];
  var grid=base.grid.map(function(row){return row.slice();}),filled=[],empty=[];
  for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++)(grid[r][c]?filled:empty).push([r,c]);
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}}
  shuffle(empty);shuffle(filled);
  while(filled.length<counts[stage]){var cell=empty.pop();grid[cell[0]][cell[1]]=1;filled.push(cell);}
  while(filled.length>counts[stage]){var cell=filled.pop();grid[cell[0]][cell[1]]=0;}
  return {grid:grid,time:times[stage],count:counts[stage]};
}
function startInfLevel(idx){
  document.body.classList.add("game-scroll-locked");window.scrollTo(0,0);
  saveEndlessRound(infRound);
  // 用无尽关卡数据临时替换 curLevel 数据
  var lv=INF_LEVELS[idx];
  curLevel=-1; // 标记为无尽模式
  infCurLevelIdx=idx;
  document.getElementById('ls').style.display='none';
  document.getElementById('gs').style.display='block';
  document.getElementById('lt').textContent='♾ 无尽 · 第'+infRound+'轮';
  if(imagesReady)doStartInf(lv);
  else{setMsg('加载中...');var wt=setInterval(function(){if(imagesReady){clearInterval(wt);doStartInf(lv);}},100);}
}

function doStartInf(lv){
  document.body.classList.add("game-scroll-locked");
  window.endlessMatchFeedback?.start();
  lv=buildEndlessLevel(lv,infRound);infRoundWon=false;
  clearInterval(timer);
  document.getElementById('ov').classList.remove('show');
  resetComboChain();comboTimeGranted=0;roundTimeLimit=lv.time;score=0;hintPenaltyTotal=0;matchEffects=[];timeLeft=lv.time;document.getElementById('tm').textContent=timeLeft;selected=null;locked=false;hintCells=[];linePath=null;
  hintLinePath=null;clearHintBlink();
  clearedCells=0;combo=0;lastMatchTime=0;wrongStreak=0;perfectGame=true;hintCount=0;updateHintBtn();
  document.getElementById('tm').classList.remove('danger');
  document.getElementById('combo-disp').textContent='';
  document.getElementById('b-lvls').style.display='none';
  document.getElementById('ph').style.display='none';
  updScore();genBoard(lv.grid);render();
  gameState="playing";gameEpoch++;clockCarry=0;clockLast=performance.now();
  if(window.gameAnalytics)window.gameAnalytics("start");
  document.getElementById("pause").textContent="⏸ 暂停";
  timer=setInterval(tick,100);
  setMsg('第'+infRound+'轮 · '+lv.count+'张 / '+lv.time+'秒 · 每两轮升级，最低50秒');updProg();
}

var infCurLevelIdx=0;

var journeySeen=false;
function startLevel(idx){
  document.body.classList.add("game-scroll-locked");window.scrollTo(0,0);
  if(idx===0&&!journeySeen){
    try{journeySeen=gameStorage.getItem('llk_journey_v1')==='1';}catch(e){}
    if(!journeySeen){
      var intro=document.getElementById('journey-intro');
      intro.showModal();
      document.getElementById('journey-start').onclick=function(){
        journeySeen=true;try{gameStorage.setItem('llk_journey_v1','1');}catch(e){}
        intro.close();startLevel(0);
      };
      return;
    }
  }
  curLevel=idx;
  document.getElementById('ls').style.display='none';
  document.getElementById('gs').style.display='block';
  document.getElementById('lt').textContent=infModeActive?('♾ 无尽模式 · '+LEVELS[idx].icon+' '+LEVELS[idx].name):(LEVELS[idx].icon+' '+LEVELS[idx].name+' (第'+(idx+1)+'关)');
  if(imagesReady)doStart();
  else{setMsg('加载中...');var wt=setInterval(function(){if(imagesReady){clearInterval(wt);doStart();}},100);}
}

function doStart(){
  document.body.classList.add("game-scroll-locked");
  if(curLevel===-1){doStartInf(INF_LEVELS[infCurLevelIdx]);return;}
  var lv=LEVELS[curLevel];clearInterval(timer);
  document.getElementById('ov').classList.remove('show');
  resetComboChain();comboTimeGranted=0;roundTimeLimit=lv.time;score=0;hintPenaltyTotal=0;matchEffects=[];timeLeft=lv.time;document.getElementById('tm').textContent=timeLeft;selected=null;locked=false;hintCells=[];linePath=null;
  hintLinePath=null;clearHintBlink();
  clearedCells=0;combo=0;lastMatchTime=0;wrongStreak=0;perfectGame=true;
  document.getElementById('tm').classList.remove('danger');
  document.getElementById('combo-disp').textContent='';
  hintCount=0;updateHintBtn();
  document.getElementById('b-lvls').style.display='inline-block';
  document.getElementById('ph').style.display='none';
  updScore();genBoard(lv.grid);render();
  gameState="playing";gameEpoch++;clockCarry=0;clockLast=performance.now();
  if(window.gameAnalytics)window.gameAnalytics("start");
  document.getElementById("pause").textContent="⏸ 暂停";
  timer=setInterval(tick,100);
  setMsg('配对相同人物，清空棋盘通关');updProg();
}

function genBoard(grid){
  var cells=[];
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(grid[r]&&grid[r][c])cells.push({r:r,c:c});
  totalCells=cells.length;
  var half=Math.floor(totalCells/2),ids=[];
  for(var i=0;i<half;i++)ids.push(i%CHARS.length);
  ids=ids.concat(ids);
  for(var i=ids.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=ids[i];ids[i]=ids[j];ids[j]=t;}
  board=[];
  for(var r=0;r<ROWS;r++){board.push([]);for(var c=0;c<COLS;c++)board[r].push(null);}
  cells.forEach(function(cell,i){board[cell.r][cell.c]=ids[i];});
}

// ═══ RENDER ═══
var portraitBoard=false;
function cRect(r,c){return{x:PAD+(portraitBoard?r:c)*(CELL+PAD),y:PAD+(portraitBoard?c:r)*(CELL+PAD),w:CELL,h:CELL};}
function cCenter(r,c){
  var col=portraitBoard?r:c,row=portraitBoard?c:r,cols=portraitBoard?ROWS:COLS,rows=portraitBoard?COLS:ROWS;
  return{x:col<0?PAD/2:col>=cols?W-PAD/2:PAD+col*(CELL+PAD)+CELL/2,
         y:row<0?PAD/2:row>=rows?H-PAD/2:PAD+row*(CELL+PAD)+CELL/2};}


function render(){
  ctx.clearRect(0,0,W,H);
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
    var fading=matchEffects.find(function(e){return(e.a.r===r&&e.a.c===c)||(e.b.r===r&&e.b.c===c);});
    var val=board[r][c];if(val===null&&fading)val=fading.id;if(val===null)continue;
    var cr=cRect(r,c);
    var isSel=!!fading||(selected&&selected.r===r&&selected.c===c);
    if(linePath&&linePath.length){
      var first=linePath[0],last=linePath[linePath.length-1];
      isSel=isSel||(first.r===r&&first.c===c)||(last.r===r&&last.c===c);
    }
    var isHint=hintCells.some(function(h){return h.r===r&&h.c===c;});
    ctx.beginPath();ctx.roundRect(cr.x,cr.y,cr.w,cr.h,8);
    ctx.fillStyle=isSel?'#c8e4ff':'#edf1f8';ctx.fill();
    ctx.strokeStyle=isSel?'#2789ff':isHint?'#e5ab00':'#a8b8ce';ctx.lineWidth=isSel||isHint?3:0.5;ctx.stroke();
    var im=charImgs[val];
    if(im&&im.complete&&im.naturalWidth>0){
      ctx.save();
      ctx.beginPath();ctx.roundRect(cr.x+1,cr.y+1,cr.w-2,cr.h-2,7);ctx.clip();
      // Fit the visible character, preserving proportions and equal tile padding.
      var bounds=charBounds[val]||{x:0,y:0,w:im.naturalWidth,h:im.naturalHeight};
      var scale=Math.min(cr.w*0.74/bounds.w,cr.h*0.74/bounds.h,Math.sqrt(cr.w*cr.h*0.23/(bounds.area||bounds.w*bounds.h)));
      var dw=bounds.w*scale,dh=bounds.h*scale;
      ctx.drawImage(charTileImages[val]||im,bounds.x,bounds.y,bounds.w,bounds.h,cr.x+(cr.w-dw)/2,cr.y+(cr.h-dh)/2,dw,dh);
      ctx.restore();
    }
    // Draw selection after the character so the indicator stays clearly visible.
    if(isSel||isHint){
      ctx.save();
      ctx.strokeStyle=isSel?'#087cff':'#d79700';ctx.lineWidth=4;
      ctx.beginPath();ctx.roundRect(cr.x+2,cr.y+2,cr.w-4,cr.h-4,7);ctx.stroke();
      ctx.strokeStyle=isSel?'#a6dcff':'#ffe69c';ctx.lineWidth=2;
      ctx.beginPath();ctx.roundRect(cr.x+5,cr.y+5,cr.w-10,cr.h-10,5);ctx.stroke();
      ctx.restore();
    }
  }
  matchEffects.forEach(function(effect){
    const trace=effect.combo>=2 && comboTrace(effect.path.map(p=>cCenter(p.r,p.c)),effect.combo);
    if(!trace){drawPathOnCtx(effect.path,'#ff826b',3,[7,4]);return;}
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor=trace.color;ctx.shadowBlur=6;
    drawPathOnCtx(effect.path,trace.color,trace.width);
    ctx.beginPath();trace.arc.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
    ctx.strokeStyle='#f6ffff';ctx.lineWidth=2;ctx.stroke();ctx.restore();
  });
  // 连线
  drawPathOnCtx(linePath,'#E74C3C',3,[7,4]);
  // 提示连线（闪烁）
  if(hintLinePath&&hintBlinkOn){
    drawPathOnCtx(hintLinePath,'#f1c40f',4,[10,5]);
  }
  updRem();
}

// Both board renderers use the same electric trace in screen coordinates.
function comboTrace(points,count){
  if(count<2||points.length<2)return null;
  const color=count>=10?'#ffbe44':count>=7?'#bb80ff':count>=4?'#41cfff':'#69e7d5';
  const width=count>=7?6:count>=4?5:3;
  const arc=[points[0]];
  for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
    const steps=count>=4?Math.ceil(len/9):1;
    for(let j=1;j<steps;j++){
      const offset=(j%2?1:-1)*width*.65;
      arc.push({x:a.x+dx*j/steps-dy/len*offset,y:a.y+dy*j/steps+dx/len*offset});
    }
    arc.push(b);
  }
  return {color,width,arc};
}
function drawPathOnCtx(path,color,lw,dash){
  if(!path||path.length<2)return;
  ctx.beginPath();ctx.setLineDash(dash||[]);ctx.strokeStyle=color;ctx.lineWidth=lw;
  var p0=cCenter(path[0].r,path[0].c);ctx.moveTo(p0.x,p0.y);
  for(var i=1;i<path.length;i++){var p=cCenter(path[i].r,path[i].c);ctx.lineTo(p.x,p.y);}
  ctx.stroke();ctx.setLineDash([]);
}

function updProg(){
  var pct=totalCells>0?(clearedCells/totalCells*100):0;
  var bar=document.getElementById('pb');bar.style.width=pct+'%';
  bar.style.background=pct<50?'#e74c3c':pct<80?'#f39c12':'#27ae60';
}

// ═══ CLICK ═══
function onCvsClick(e){
  if(locked||gameState!=="playing")return;
  var rect=cvs.getBoundingClientRect();
  var mx=(e.clientX-rect.left)*(W/rect.width),my=(e.clientY-rect.top)*(H/rect.height);
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
    if(board[r][c]===null)continue;
    var cr=cRect(r,c);
    if(mx>=cr.x&&mx<=cr.x+cr.w&&my>=cr.y&&my<=cr.y+cr.h){clickCell(r,c);return;}
  }
}

function clickCell(r,c){
  if(board[r][c]===null)return;
  // 清除提示闪烁
  clearHintBlink();
  hintCells=[];hintLinePath=null;
  linePath=null;
  if(selected&&selected.r===r&&selected.c===c){selected=null;render();return;}
  if(selected){
    var a=selected,b={r:r,c:c};
    if(board[a.r][a.c]===board[b.r][b.c]){
      var path=getPath(a,b);
      if(path){
        wrongStreak=0;
        var now=Date.now(),diff=now-lastMatchTime;
        if(lastMatchTime>0&&diff<=2000)combo++;else combo=1;
        lastMatchTime=now;
        clearTimeout(comboTimer);
        comboTimer=setTimeout(function(){combo=0;document.getElementById('combo-disp').textContent='';},2000);
        var addedTime=awardComboTime();
        var pts=calcPts(board[a.r][a.c]);
        if(combo>1){
          var mn=['','','x1.2','x1.5','x2'];
          document.getElementById('combo-disp').textContent='连击 '+(mn[Math.min(combo,4)]||'x2')+'  '+combo+'连！'+(addedTime?' · ⏱ +'+addedTime+'秒':'');
        } else document.getElementById('combo-disp').textContent='';
        if (infModeActive) window.endlessMatchFeedback?.combo(combo);
        playMatch();
        var effect={path:path,combo:combo,id:board[a.r][a.c],a:a,b:b};matchEffects.push(effect);
        board[a.r][a.c]=null;board[b.r][b.c]=null;
        score+=pts;clearedCells+=2;selected=null;updScore();updProg();render();
        var matchEpoch=gameEpoch;
        setTimeout(function(){
          var i=matchEffects.indexOf(effect);if(i>=0)matchEffects.splice(i,1);
          if(matchEpoch!==gameEpoch)return;render();
          if(gameState==='finishing'&&matchEffects.length===0){playClear();endGame(true);}
        },520);
        if(isCleared()){gameState='finishing';clearInterval(timer);}
        else if(!hasMove()){setMsg('没有可消除的，自动洗牌！');doShuffle();}
        return;
      }
    }
    resetComboChain();
    // 点错
    if(board[a.r][a.c]!==board[b.r][b.c]){
      perfectGame=false;wrongStreak++;
      var pen=Math.min(3*wrongStreak,6);timeLeft=Math.max(1,timeLeft-pen);
      document.getElementById('tm').textContent=timeLeft;
      var te=document.getElementById('tm');te.classList.remove('tfl');void te.offsetWidth;te.classList.add('tfl');playWrongClick();
      var cr3=cvs.getBoundingClientRect();
      floatTxt('-'+pen+'秒','#e74c3c',cr3.left+cr3.width/2,cr3.top+80);
      setMsg('点错了！扣'+pen+'秒'+(wrongStreak>1?'（每次最多扣6秒）':''));
    } else setMsg('路径不通，换方向！');
    selected={r:r,c:c};
  } else {selected={r:r,c:c};setMsg('');}
  render();
}

function calcPts(charId){
  var base=10,mb=CHAR_MBTI[charId]||'',rar=(MBTI_RARITY[mb]||0)*5;
  var mult=combo<=1?1:combo==2?1.2:combo==3?1.5:2;
  return Math.round((base+rar)*mult);
}

// ═══ PATH FINDING ═══
function isOuter(r,c){return r===0||r===ROWS-1||c===0||c===COLS-1;}
function isEmpty(r,c){
  if(r<-1||r>ROWS||c<-1||c>COLS)return false;
  if(r<0||r>=ROWS||c<0||c>=COLS)return true;
  return board[r][c]===null;
}
function pClear(r1,c1,r2,c2){
  if(r1===r2){var mn=Math.min(c1,c2),mx=Math.max(c1,c2);for(var c=mn+1;c<mx;c++)if(!isEmpty(r1,c))return false;return true;}
  if(c1===c2){var mn=Math.min(r1,r2),mx=Math.max(r1,r2);for(var r=mn+1;r<mx;r++)if(!isEmpty(r,c1))return false;return true;}
  return false;
}
function getPath(a,b){
  // Boundary pairs also require clear segments; route through the outer gutter.
  if((a.r===b.r||a.c===b.c)&&pClear(a.r,a.c,b.r,b.c))return[a,b];
  var corners=[{r:a.r,c:b.c},{r:b.r,c:a.c}];
  for(var k=0;k<2;k++){var co=corners[k];if(isEmpty(co.r,co.c)&&pClear(a.r,a.c,co.r,co.c)&&pClear(co.r,co.c,b.r,b.c))return[a,co,b];}
  for(var c=-1;c<=COLS;c++){var m1={r:a.r,c:c},m2={r:b.r,c:c};if(isEmpty(m1.r,m1.c)&&isEmpty(m2.r,m2.c)&&pClear(a.r,a.c,m1.r,m1.c)&&pClear(m1.r,m1.c,m2.r,m2.c)&&pClear(m2.r,m2.c,b.r,b.c))return[a,m1,m2,b];}
  for(var r=-1;r<=ROWS;r++){var m1={r:r,c:a.c},m2={r:r,c:b.c};if(isEmpty(m1.r,m1.c)&&isEmpty(m2.r,m2.c)&&pClear(a.r,a.c,m1.r,m1.c)&&pClear(m1.r,m1.c,m2.r,m2.c)&&pClear(m2.r,m2.c,b.r,b.c))return[a,m1,m2,b];}
  var oR=[-1,ROWS],oC=[-1,COLS];
  for(var oi=0;oi<2;oi++) for(var oj=0;oj<2;oj++){
    var or2=oR[oi],oc2=oC[oj];
    var p1={r:a.r,c:oc2},p2={r:or2,c:oc2},p3={r:or2,c:b.c};
    if(isEmpty(p1.r,p1.c)&&isEmpty(p2.r,p2.c)&&isEmpty(p3.r,p3.c)&&pClear(a.r,a.c,p1.r,p1.c)&&pClear(p1.r,p1.c,p2.r,p2.c)&&pClear(p2.r,p2.c,p3.r,p3.c)&&pClear(p3.r,p3.c,b.r,b.c))return[a,p1,p2,p3,b];
    var q1={r:or2,c:a.c},q2={r:or2,c:oc2},q3={r:b.r,c:oc2};
    if(isEmpty(q1.r,q1.c)&&isEmpty(q2.r,q2.c)&&isEmpty(q3.r,q3.c)&&pClear(a.r,a.c,q1.r,q1.c)&&pClear(q1.r,q1.c,q2.r,q2.c)&&pClear(q2.r,q2.c,q3.r,q3.c)&&pClear(q3.r,q3.c,b.r,b.c))return[a,q1,q2,q3,b];
  }
  return null;
}
function hasMove(){
  var cells=[];
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)cells.push({r:r,c:c});
  for(var i=0;i<cells.length;i++) for(var j=i+1;j<cells.length;j++)
    if(board[cells[i].r][cells[i].c]===board[cells[j].r][cells[j].c]&&getPath(cells[i],cells[j]))return true;
  return false;
}
function isCleared(){for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)return false;return true;}

// ═══ HINT - 显示连线闪烁 ═══
function clearHintBlink(){
  if(hintBlinkTimer){clearInterval(hintBlinkTimer);hintBlinkTimer=null;}
  hintBlinkOn=false;hintLinePath=null;hintCells=[];
}
function updateHintBtn(){
  var btn=document.getElementById('bh');
  var left=MAX_HINTS-hintCount;
  btn.textContent=left>0?'💡 提示 · 剩余'+left+'次':'💡 提示已用完';
  var compact=document.getElementById('mobile-hint-cost');if(compact)compact.textContent=left>0?'本次提示扣'+((hintCount+1)*10)+'分':'提示已用完';
  var info=document.getElementById('hint-cost-note');if(info)info.textContent=left>0?'本次提示扣 '+((hintCount+1)*10)+' 分 · 每局依次扣10/20/30分，最低扣至0分':'本局提示次数已用完';
  btn.title='每局三次，依次扣10/20/30分；最低扣至0分，无有效提示不扣分。';
  btn.style.opacity=left<=0?'0.4':'1';
  btn.style.pointerEvents=left<=0?'none':'auto';
}
function doHint(){
  if(locked||gameState!=="playing")return;
  if(hintCount>=MAX_HINTS){setMsg('提示次数已用完（最多'+MAX_HINTS+'次）');return;}
  clearHintBlink();
  var cells=[];
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)cells.push({r:r,c:c});
  for(var i=0;i<cells.length;i++) for(var j=i+1;j<cells.length;j++){
    if(board[cells[i].r][cells[i].c]===board[cells[j].r][cells[j].c]&&getPath(cells[i],cells[j])){
      var deduction=Math.min(score,(hintCount+1)*10);score-=deduction;hintPenaltyTotal+=deduction;updScore();
      resetComboChain();hintCount++;updateHintBtn();setMsg("提示 −"+deduction+"分 · 已标出可配对的人物");
      hintCells=[cells[i],cells[j]];
      hintLinePath=getPath(cells[i],cells[j]);
      hintBlinkOn=true;
      var blinkCount=0;
      hintBlinkTimer=setInterval(function(){
        hintBlinkOn=!hintBlinkOn;render();
        blinkCount++;
        if(blinkCount>10){clearHintBlink();render();}
      },300);
      render();return;
    }
  }
  setMsg('没有提示，试试洗牌！');
}

function doShuffle(){
  if(locked||gameState!=="playing")return;
  resetComboChain();
  clearHintBlink();
  var vals=[];
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)vals.push(board[r][c]);
  for(var i=vals.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=vals[i];vals[i]=vals[j];vals[j]=t;}
  var idx=0;for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)board[r][c]=vals[idx++];
  selected=null;linePath=null;render();setMsg('已洗牌！');
}

function tick(){
  if(gameState!=='playing')return;
  var now=performance.now();clockCarry+=now-clockLast;clockLast=now;
  var seconds=Math.floor(clockCarry/1000);if(seconds<1)return;
  clockCarry-=seconds*1000;timeLeft=Math.max(0,timeLeft-seconds);
  document.getElementById('tm').textContent=timeLeft;
  if(timeLeft<=10){document.getElementById('tm').classList.add('danger');playTimerWarn();}
  if(timeLeft<=0)endGame(false);
}
function pauseGame(){
  if(gameState!=='playing')return;
  tick();if(gameState!=='playing')return;
  if (infModeActive) window.endlessMatchFeedback?.stop();
  resetComboChain();gameState='paused';document.getElementById('pause').textContent='▶ 继续';setMsg('已暂停，点击“继续”恢复游戏。');
}
function togglePause(){
  if(gameState==='paused'){if (infModeActive) startMatchBGM();gameState='playing';clockLast=performance.now();document.getElementById('pause').textContent='⏸ 暂停';setMsg('配对相同人物，清空棋盘通关');}
  else pauseGame();
}
function calcStars(win){if(!win)return 0;var lv=curLevel>=0?LEVELS[curLevel]:null;if(!lv)return 3;var r=timeLeft/lv.time;return r>0.6?3:r>0.25?2:1;}

// Optimistic bound: best pair order, uninterrupted combos, full remaining clock.
function getScoreCeiling(cellCount,seconds){
  var values=[];
  for(var i=0;i<Math.floor(cellCount/2);i++)values.push(10+(MBTI_RARITY[CHAR_MBTI[i%CHARS.length]]||0)*5);
  values.sort(function(a,b){return a-b;});
  return values.reduce(function(sum,value,i){return sum+Math.round(value*([1,1.2,1.5][i]||2));},0)+seconds*2+100;
}
// ═══ END GAME ═══
function endGame(win){
  if(gameState==="ended"||gameState==="idle")return;
  document.body.classList.remove("game-scroll-locked");
  if (infModeActive) window.endlessMatchFeedback?.stop();
  if(!win)trackGameEvent('level_fail');
  var campaignWasComplete=LEVELS.every(function(_,i){return !!getSave()['c'+i];});
  if(win&&window.gameAnalytics)window.gameAnalytics("win");
  gameState="ended";gameEpoch++;document.getElementById("tm").textContent=timeLeft;
  clearInterval(timer);locked=true;
  document.getElementById("quiz-next-note").hidden=!(win&&!infModeActive&&curLevel<LEVELS.length-1);
  document.getElementById("share-level-result").hidden=!win||infModeActive;
  var stars=calcStars(win);
  var baseScore=score,timeBonus=win?timeLeft*2:0,perfectBonus=win&&perfectGame?100:0;
  document.getElementById('score-details').textContent='消除得分（含连击）：'+(baseScore+hintPenaltyTotal)+' 分\n提示扣分：−'+hintPenaltyTotal+' 分\n时间奖励：+'+timeBonus+' 分'+(win?'（'+timeLeft+'秒 × 2）':'（未通关）')+'\n完美奖励：+'+perfectBonus+' 分'+(perfectBonus?'（零点错通关）':'')+'\n连击续时：+'+comboTimeGranted+'秒（已计入剩余时间）'+'\n总分：'+(baseScore+timeBonus+perfectBonus)+' 分';
  var details=document.getElementById('score-details');
  var ceiling=getScoreCeiling(totalCells,roundTimeLimit),finalScore=baseScore+timeBonus+perfectBonus;
  details.innerHTML='<div class="result-total"><span>本局得分</span><strong>'+finalScore+'<small class="score-denominator"> / '+ceiling+'</small></strong></div>'
    +'<div class="score-comparison">'+(finalScore>=ceiling?'🏆 已获满分':'满分 '+ceiling+' · 还差 '+(ceiling-finalScore)+' 分')+'</div>'
    +'<div class="reward-grid"><div class="reward"><span>🧩 消除得分</span><b>'+(baseScore+hintPenaltyTotal)+'</b><small>包含连击加成</small></div>'
    +'<div class="reward reward-time"><span>⏱ 时间奖励</span><b>+'+timeBonus+'</b><small>'+(win?timeLeft+' 秒 × 2':'本局未通关')+'</small></div>'
    +'<div class="reward reward-perfect"><span>✨ 完美奖励</span><b>+'+perfectBonus+'</b><small>'+(perfectBonus?'零点错，漂亮！':'零点错通关可获 +100')+'</small></div></div>'
    +'<div class="result-extras"><div class="result-extra"><span class="extra-label">💡 提示扣分</span><strong>−'+hintPenaltyTotal+'<small> 分</small></strong><span class="extra-note">'+(hintPenaltyTotal?'已从总分扣除':'本局无扣分')+'</span></div>'
    +'<div class="result-extra"><span class="extra-label">⏱ 连击续时</span><strong>+'+comboTimeGranted+'<small> 秒</small></strong><span class="extra-note">已计入剩余时间</span></div></div>';
  document.getElementById('ob').classList.remove('result-enter');
  void document.getElementById('ob').offsetWidth;document.getElementById('ob').classList.add('result-enter');
  if(win){
    var tb=timeLeft*2,pb=perfectGame?100:0;
    score+=tb+pb;updScore();
    if(!infModeActive){
      saveLevelScore(curLevel,score);
      if(score>getBest())setBest(score);
      var sv=getSave();if((sv['c'+curLevel]||0)<stars){sv['c'+curLevel]=stars;setSave(sv);}if(!campaignWasComplete&&LEVELS.every(function(_,i){return !!sv['c'+i];}))trackGameEvent('campaign_complete');
    }
    if(tb>0||pb>0){
      setTimeout(function(){
        var cr=cvs.getBoundingClientRect();
        if(tb>0)floatTxt('+'+tb+' 时间奖励','#4aafff',cr.left+cr.width*0.3,cr.top+120);
        if(pb>0)floatTxt('+100 完美通关','#f1c40f',cr.left+cr.width*0.6,cr.top+150);
      },100);
    }
    // 显示通关弹窗
    if(infModeActive){
      infRoundWon=true;saveEndlessRound(infRound+1);var infBest=getInfBest();if(score>infBest){setInfBest(score);infBest=score;}
      setResultTitle('♾ 无尽通关！');
      document.getElementById('os2').textContent='🏆';
      document.getElementById('os').textContent='无尽最高纪录：'+infBest+' 分';
      document.getElementById('b-quiz').style.display='none';
      document.getElementById('ph').style.display='none';
      document.getElementById('b-lvls').style.display='none';
      document.getElementById('b-again').textContent='♾ 挑战下一轮';
      document.getElementById('ov').classList.add('show');
      return;
    }
    document.getElementById('b-again').textContent='🔄 再来';
    setResultTitle(curLevel===LEVELS.length-1?'全关卡通关！':'通关！');
    document.getElementById('os2').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);
    document.getElementById('os').textContent='剩余时间：'+timeLeft+'秒';
    if(curLevel===LEVELS.length-1){
      // 最后一关：只显示生成海报按钮
      document.getElementById('b-quiz').textContent='🎨 生成通关海报';
      document.getElementById('b-quiz').style.display='inline-block';
      document.getElementById('ph').style.display='block';
      document.getElementById('b-lvls').style.display='none';
    } else {
      // 非最后关：显示答题按钮，隐藏关卡按钮
      document.getElementById('b-quiz').textContent='🧠 答题闯关';
      document.getElementById('b-quiz').style.display='inline-block';
      document.getElementById('ph').style.display='none';
      document.getElementById('b-lvls').style.display='none';
    }
    document.getElementById('ov').classList.add('show');
  } else {
    if(infModeActive){
      var infBest2=getInfBest();if(score>infBest2){setInfBest(score);infBest2=score;}
      setResultTitle('⏰ 时间到！');
      document.getElementById('os2').textContent='';
      document.getElementById('os').textContent='无尽最高纪录：'+infBest2+' 分';
      document.getElementById('b-again').textContent='♾ 再来一次';
    } else {
      if(score>getBest())setBest(score);
      setResultTitle('⏰ 时间到！');
      document.getElementById('os2').textContent='';
      document.getElementById('os').textContent='再试一次，挑战更高分！';
      document.getElementById('b-again').textContent='🔄 再来';
    }
    document.getElementById('b-quiz').style.display='none';
    document.getElementById('ph').style.display='none';
    document.getElementById('b-lvls').style.display='none';
    document.getElementById('ov').classList.add('show');
  }
}

// ═══ QUIZ ═══
function showQuiz(){trackGameEvent('quiz_open');
  gameEpoch++;
  document.getElementById('fs').classList.remove('show');
  document.getElementById('fres').close();document.getElementById('fres').style.display='none';
  var hybridRoot=document.getElementById('hybrid-root');if(hybridRoot)hybridRoot.hidden=true;
  window.scrollTo(0,0);
  document.body.classList.remove("game-scroll-locked");
  document.getElementById('ov').classList.remove('show');
  var q=QUIZ[curLevel];
  var im=charImgs[q.charId];
  var quizImage=document.getElementById('qi');
  quizImage.alt=q.charName;
  quizImage.style.transform='';
  quizImage.onload=function(){
    // Center the visible character bounds, rather than transparent image padding.
    try{var c=document.createElement('canvas');c.width=this.naturalWidth;c.height=this.naturalHeight;var ctx=c.getContext('2d');ctx.drawImage(this,0,0);var pixels=ctx.getImageData(0,0,c.width,c.height).data,left=c.width,right=-1;
      for(var y=0;y<c.height;y++)for(var x=0;x<c.width;x++)if(pixels[(y*c.width+x)*4+3]>32){left=Math.min(left,x);right=Math.max(right,x);}
      if(right>=left){var scale=Math.min(this.clientWidth/c.width,this.clientHeight/c.height);this.style.transform='translateX('+((c.width-1-left-right)/2*scale)+'px)';}
    }catch(e){}
  };

  quizImage.onerror=function(){this.onerror=null;if(im)this.src=prepareTileImage(im,true).toDataURL();};
  quizImage.src='character-hd/'+q.charId+'.webp';
  document.getElementById('qn').textContent=q.charName;
  document.getElementById('qr').textContent='';document.getElementById('qr').className='';
  document.getElementById('qcont').disabled=false;
  document.getElementById('qcont').style.display='none';
  document.getElementById('quiz-home').style.display='';
  document.getElementById('qcont').textContent=curLevel===LEVELS.length-1?'生成通关海报':'继续';
  var activeQuizEpoch=gameEpoch,activeQuizLevel=curLevel;
  var od=document.getElementById('qopts');od.innerHTML='';
  q.options.forEach(function(opt,i){
    var btn=document.createElement('button');btn.className='qo';
    btn.textContent=opt.mbti;
    btn.classList.add('quiz-mbti-only');
    (function(idx){btn.addEventListener('click',function(){
      if(activeQuizEpoch!==gameEpoch||activeQuizLevel!==curLevel||!document.getElementById('qs').classList.contains('show')||btn.classList.contains('qd'))return;
      od.querySelectorAll('.qo').forEach(function(b){b.classList.add('qd');});
      var ok=idx===q.correct;trackGameEvent(ok?'quiz_correct':'quiz_wrong');
      btn.classList.add(ok?'qc':'qw');
      if(!ok)od.querySelectorAll('.qo')[q.correct].classList.add('qc');
      var qr=document.getElementById('qr');
      qr.textContent=ok?('正确！'+q.charName+' 就是 '+q.mbti+'——'+q.desc.replace(/[。．.]+\s*$/u,'')):('答错了！正确答案是 '+q.mbti+'——'+q.desc.replace(/[。．.]+\s*$/u,'')+' · 即将进入惩罚');
      qr.className=ok?'ok':'ng';
      document.getElementById('qcont').style.display=ok?'inline-block':'none';
      document.getElementById('quiz-home').style.display=ok?'':'none';
      if(ok){window.dispatchEvent(new Event('campaign-quiz-correct'));playCorrect();}else{playWrong();var quizEpoch=gameEpoch;setTimeout(function(){if(quizEpoch===gameEpoch&&document.getElementById('qs').classList.contains('show'))startFall(q.charId);},1800);}
    });})(i);
    od.appendChild(btn);
  });
  playQuizReveal();
  document.getElementById('qs').classList.add('show');
}

// ═══ FALL GAME ═══
var fc,fctx,fAnimId,fPlayer,fPlats,fFloor,fScore,fAlive,fBgImg,fWin,fDiff,fQuizMBTI;
var fallBuildingImage=new Image();fallBuildingImage.src='assets/fall-building-design.png';
var fKeys={left:false,right:false,jump:false};
var fCurPlat=null;
var FW=360,FH=560,PH=12,PGAP=90;

// Tilt is opt-in and only sampled while the falling game is active.
var fallTilt={enabled:false,baseline:null,value:0,last:0,screen:null,request:0,timer:null};
function resetFallTilt(){fallTilt.baseline=null;fallTilt.value=0;fallTilt.last=0;}
function setTiltButtonLabel(text){document.getElementById('tilt-toggle').innerHTML='<span class="tilt-icon" aria-hidden="true">📱</span><span class="tilt-label">'+text+'</span>';}
function setTiltStatus(text){document.getElementById('tilt-status').textContent=text;}
function stopFallTilt(message){
 fallTilt.request++;clearTimeout(fallTilt.timer);fallTilt.enabled=false;resetFallTilt();
 window.removeEventListener('deviceorientation',readFallTilt);
 var b=document.getElementById('tilt-toggle');setTiltButtonLabel('倾斜操控');b.setAttribute('aria-label','开启倾斜操控');b.setAttribute('aria-pressed','false');b.disabled=false;
 setTiltStatus(message||(matchMedia('(pointer:fine)').matches?'按 ← / → 或 A / D 移动，也可长按下方方向键':'点中间开启倾斜操控，左右倾斜手机移动'));
}
function readFallTilt(e){
 if(!fallTilt.enabled||!fAlive||fPaused||document.hidden||!document.getElementById('fs').classList.contains('show'))return;
 if(!Number.isFinite(e.gamma)||!Number.isFinite(e.beta))return;
 var angle=(window.screen.orientation&&window.screen.orientation.angle)||window.orientation||0;
 var rad=angle*Math.PI/180,axis=e.gamma*Math.cos(rad)+e.beta*Math.sin(rad);
 if(fallTilt.screen!==angle){fallTilt.screen=angle;resetFallTilt();}
 if(fallTilt.baseline===null){fallTilt.baseline=axis;setTiltStatus('左倾向左，右倾向右；左右键仍可使用');}
 var delta=axis-fallTilt.baseline;
 var target=Math.sign(delta)*Math.min(1,Math.max(0,Math.abs(delta)-4)/20);
 var now=performance.now(),dt=fallTilt.last?Math.min(100,now-fallTilt.last):16;
 fallTilt.value+=(target-fallTilt.value)*(1-Math.exp(-dt/80));fallTilt.last=now;
}
async function toggleFallTilt(){
 if(fallTilt.enabled){stopFallTilt();return;}
 if(!window.isSecureContext||!window.DeviceOrientationEvent){setTiltStatus('当前环境不支持，请用左右键');return;}
 pauseFall();var token=++fallTilt.request,b=document.getElementById('tilt-toggle');b.disabled=true;setTiltStatus('请授权，保持舒适握姿');
 try{
  if(typeof DeviceOrientationEvent.requestPermission==='function'&&await DeviceOrientationEvent.requestPermission()!=='granted')throw new Error('denied');
  if(token!==fallTilt.request||!fAlive)return;
  fallTilt.enabled=true;resetFallTilt();setTiltButtonLabel('切回按键');b.setAttribute('aria-label','关闭倾斜操控，切回按键');b.setAttribute('aria-pressed','true');
  setTiltStatus('握稳手机，点顶部▶继续，自动确定中心');
  window.addEventListener('deviceorientation',readFallTilt);
 }catch(e){if(token===fallTilt.request)stopFallTilt('未获得权限，请用左右键');}
 finally{b.disabled=false;}
}
function makePlat(x,y,w,type){
  return{x:x,y:y,w:w,h:PH,type:type||'normal',
    vx:type==='move'?(Math.random()<0.5?1:-1)*[0.65,1.1,1.6][fDiff]:0,
    breakTimer:0,broken:false};
}
function fallTargetFloor(){return [20,35,50][fDiff]||20;}
function fDiff2(){var base=[0.05,0.45,0.8][fDiff];return Math.min(base+fScore/fallTargetFloor()*0.2,1);}
var fallPlatformSerial=0,fallSinceAnswer=0;
function fallShieldDuration(){return [3,2.5,2][fDiff]||3;}
function tickFallShield(){if(fPlayer.shield){fPlayer.shieldRemaining=Math.max(0,(fPlayer.shieldRemaining||0)-1/60);if(fPlayer.shieldRemaining<=0)fPlayer.shield=false;}fPlayer.spikeGrace=Math.max(0,(fPlayer.spikeGrace||0)-1/60);}
function genPlat(y){
  var d=fDiff2(),pw=Math.max(50,110-d*50),x=Math.random()*(FW-pw),type='normal',r=Math.random();
  if(r<0.08+d*0.12)type='spike';else if(r<0.18+d*0.15)type='break';else if(r<0.32+d*0.20)type='move';
  fallPlatformSerial++;
  if(fallSinceAnswer>=2&&(Math.random()<.20||fallSinceAnswer>=7)){type="answer";fallSinceAnswer=0;}else fallSinceAnswer++;
  if(type==='move'){pw=Math.round(Math.max(50,Math.min(FW-24,pw*(0.7+Math.random()*0.6))));x=Math.random()*(FW-pw);}
  return makePlat(x,y,pw,type);
}
var fPaused=false,fSprite=null,fSpriteBounds=null;
function pauseFall(){if(!fAlive||fPaused)return;fPaused=true;resetFallTilt();fKeys.left=fKeys.right=false;cancelAnimationFrame(fAnimId);stopFallBGM();updateFallPauseButton(true);}
function resumeFall(){if(!fAlive||!fPaused)return;fPaused=false;resetFallTilt();if(fallTilt.enabled){clearTimeout(fallTilt.timer);fallTilt.timer=setTimeout(function(){if(fallTilt.enabled&&!fPaused&&!fallTilt.last)stopFallTilt("未收到感应数据，请用左右键");},4000);}fLastFrame=null;fAccumulator=0;updateFallPauseButton(false);startFallBGM();fAnimId=requestAnimationFrame(fLoop);}
function leaveFall(){trackGameEvent('penalty_return_quiz');stopFallTilt();fAlive=false;fPaused=false;fKeys.left=fKeys.right=false;cancelAnimationFrame(fAnimId);stopFallBGM();document.getElementById('fs').classList.remove('show');showQuiz();}
function startFall(charId){trackGameEvent('penalty_start');
  stopFallTilt();
  var selection=window.getSelection();if(selection)selection.removeAllRanges();
  document.body.classList.add("game-scroll-locked");
  document.getElementById('qs').classList.remove('show');
  fDiff=Math.floor(Math.random()*3);
  var dn=['简单难度','普通难度','困难难度'];
  document.getElementById('ftl').textContent='跳楼挑战 · '+dn[fDiff]+' · '+fallTargetFloor()+'层';
  fBgImg=charImgs[charId];fSprite=prepareTileImage(fBgImg,true);fSpriteBounds=getCharacterBounds(fBgImg);
  fQuizMBTI=(QUIZ[curLevel]&&QUIZ[curLevel].mbti)||'';
  fWin=false;
  document.getElementById('fs').classList.add('show');
  startFallBGM();
  initFall();
}
function initFall(){trackGameEvent('penalty_round');
  document.getElementById("fs").classList.remove("fall-ended");
  fPaused=false;resetFallTilt();updateFallPauseButton(false);
  fKeys.left=false;fKeys.right=false;fKeys.jump=false;
  fc=document.getElementById('fca');fctx=fc.getContext('2d');
  var fallRenderScale=Math.max(2,Math.min(4,(window.devicePixelRatio||1)*Math.max(1,fc.getBoundingClientRect().width/FW)));
  fc.width=Math.round(FW*fallRenderScale);fc.height=Math.round(FH*fallRenderScale);
  fctx.setTransform(fc.width/FW,0,0,fc.height/FH,0,0);
  fPlayer={x:FW/2-18,y:40,w:36,h:44,vx:0,vy:0,onGround:false,dead:false,bounceCd:0};
  fallLandingChain=0;fallFeedback="";fallFeedbackUntil=0;
  fallColorPhase = 0;
  fallColorStart = fallPhaseColors[0];
  fallPlatformSerial=0;fallSinceAnswer=0;
  fPlats=[];fFloor=0;fScore=0;fAlive=true;fCurPlat=null;
  fPlats.push(makePlat(FW/2-70,140,140,'normal'));
  for(var i=1;i<12;i++)fPlats.push(genPlat(140+i*PGAP));
  document.getElementById('fsc').textContent='第 0 层';
  document.getElementById('fres').close();document.getElementById('fres').style.display='none';
  cancelAnimationFrame(fAnimId);fLastFrame=null;fAccumulator=0;fAnimId=requestAnimationFrame(fLoop);
}
var fLastFrame=null,fAccumulator=0,F_STEP=1000/60;
function fLoop(now){
  if(!fAlive||fPaused)return;
  if(fLastFrame===null)fLastFrame=now;
  // Discard long background gaps instead of fast-forwarding the player.
  var elapsed=Math.max(0,now-fLastFrame);fLastFrame=now;
  fAccumulator+=elapsed>250?0:elapsed;
  while(fAccumulator+0.000001>=F_STEP&&fAlive){
    if(fPlayer){fPlayer.prevX=fPlayer.x;fPlayer.prevY=fPlayer.y;}
    if(fPlats)fPlats.forEach(function(p){p.prevX=p.x;p.prevY=p.y;});
    fUpdate();fAccumulator-=F_STEP;
  }
  var alpha=Math.max(0,Math.min(1,fAccumulator/F_STEP)),restore=[];
  [fPlayer].concat(fPlats||[]).forEach(function(p){if(!p)return;restore.push([p,p.x,p.y]);if(p.prevX!==undefined&&Math.abs(p.x-p.prevX)<FW/2){p.x=p.prevX+(p.x-p.prevX)*alpha;p.y=p.prevY+(p.y-p.prevY)*alpha;}});
  fDraw();restore.forEach(function(v){v[0].x=v[1];v[0].y=v[2];});
  if(fAlive)fAnimId=requestAnimationFrame(fLoop);
}
function wrapFallPlayer(){
  var edge=FW-fPlayer.w;
  if(fPlayer.x<0||fPlayer.x>edge){fPlayer.x=fPlayer.x<0?edge:0;fPlayer.vx=0;fPlayer.wrapGrace=18;fPlayer.prevX=fPlayer.x;}
}
function fallPace(){var t=Math.max(0,Math.min(1,fScore/fallTargetFloor()));return .85+.45*t;}
var fallLandingChain=0,fallFeedback='',fallFeedbackUntil=0;
function fallGravity(){return ([0.55,0.75,1.0][fDiff]||0.55)*fallPace();}
function fallLanding(p){if(p.visited)return;p.visited=true;fallLandingChain++;var overlap=Math.min(fPlayer.x+fPlayer.w,p.x+p.w)-Math.max(fPlayer.x,p.x);fallFeedback=overlap<14?'好险！':fallLandingChain>=3?'稳稳落地 ×'+fallLandingChain:'安全落地';fallFeedbackUntil=performance.now()+1000;}

function platformBounce(platform){
  var gap=PGAP;
  fPlats.forEach(function(p){var d=Math.abs(p.y-platform.y);if(p!==platform&&d>1)gap=Math.min(gap,d);});
  var ratio={normal:.28,break:.18,move:.40}[platform.type]||.28;
  return Math.sqrt(2*fallGravity()*gap*ratio);
}
function fUpdate(){
  tickFallShield();
  var grace=(fPlayer.wrapGrace||0)>0;if(grace)fPlayer.wrapGrace--;
  var maxSpeed=grace?2:4.5,accel=grace?.18:.65;
  if(fKeys.left)fPlayer.vx=Math.max(fPlayer.vx-accel,-maxSpeed);
  else if(fKeys.right)fPlayer.vx=Math.min(fPlayer.vx+accel,maxSpeed);
  else if(fallTilt.enabled&&fallTilt.last&&performance.now()-fallTilt.last<350){
    var targetSpeed=fallTilt.value*maxSpeed;fPlayer.vx+=Math.max(-accel,Math.min(accel,targetSpeed-fPlayer.vx));
  }else fPlayer.vx*=0.80;
  fKeys.jump=false;
  if(fPlayer.bounceCd>0)fPlayer.bounceCd--;
  var riding=fCurPlat&&fCurPlat.type==='move'&&!fCurPlat.broken&&fPlayer.onGround;
  if(riding){fPlayer.vy=0;fPlayer.y=fCurPlat.y-fPlayer.h;}
  else fPlayer.vy=Math.min(fPlayer.vy+fallGravity(),[8,10,12][fDiff]*fallPace());
  fPlayer.x+=fPlayer.vx;fPlayer.y+=fPlayer.vy;
  wrapFallPlayer();
  if(fPlayer.y<-fPlayer.h-20){fAlive=false;fPlayer.dead=true;sfxFall();showFallRes(false,'飞出屏幕了！');return;}
  // 更新平台
  for(var i=0;i<fPlats.length;i++){
    var p=fPlats[i];
    if(p.type==='move'){var oldX=p.x;p.x=Math.max(0,Math.min(FW-p.w,p.x+p.vx*(riding&&fCurPlat===p?2.5:1)));p.deltaX=p.x-oldX;if(p.x<=0||p.x+p.w>=FW)p.vx=-p.vx;}
    if(p.type==='break'&&p.broken){p.breakTimer--;if(p.breakTimer<=0)fPlats.splice(i--,1);}
  }
  // 跟随移动平台
  fPlayer.onGround=false;
  if(riding){
    fPlayer.x+=fCurPlat.deltaX||0;
    wrapFallPlayer();
    if(fPlayer.x+fPlayer.w>fCurPlat.x+4&&fPlayer.x<fCurPlat.x+fCurPlat.w-4){fPlayer.y=fCurPlat.y-fPlayer.h;fPlayer.vy=0;fPlayer.onGround=true;}
    else {fCurPlat=null;fPlayer.vy=fallGravity();}
  } else fCurPlat=null;
  // 碰撞
  if(!fPlayer.onGround&&fPlayer.vy>=0){
    for(var i=0;i<fPlats.length;i++){
      var p=fPlats[i];if(p.broken)continue;
      var py=fPlayer.y-fPlayer.vy;
      if(fPlayer.x+fPlayer.w>p.x+4&&fPlayer.x<p.x+p.w-4&&py+fPlayer.h<=p.y+4&&fPlayer.y+fPlayer.h>=p.y){
        var previousPlatform=fCurPlat;fCurPlat=null;
        if(p.type==='spike'){
          if(fPlayer.shield||fPlayer.spikeGrace>0){if(fPlayer.shield){fPlayer.shield=false;fPlayer.shieldRemaining=0;fPlayer.spikeGrace=.8;}fPlayer.shieldFlash=performance.now()+600;p.broken=true;p.breakTimer=1;fPlayer.y=p.y-fPlayer.h;fPlayer.vy=-platformBounce(p);fallFeedback='保护生效！挡住一次尖刺';fallFeedbackUntil=performance.now()+1600;sfxBounce();break;}
          fAlive=false;fPlayer.dead=true;sfxSpike();showFallRes(false,'踩到尖刺了！');return;
        }
        if(p.type==='answer'&&!p.visited&&!fPlayer.shield){fPlayer.shield=true;fPlayer.shieldRemaining=fallShieldDuration();fPlayer.shieldFlash=performance.now()+600;}

        fallLanding(p);
        if(p.type==='answer'){fallFeedback=fQuizMBTI+' · 保护剩余 '+Math.ceil(fPlayer.shieldRemaining||0)+' 秒';fallFeedbackUntil=performance.now()+1800;fPlayer.y=p.y-fPlayer.h;fPlayer.vy=-platformBounce(p);sfxBounce();}
        else if(p.type==='normal'){fPlayer.y=p.y-fPlayer.h;fPlayer.vy=-platformBounce(p);fPlayer.onGround=false;sfxBounce();}
        else if(p.type==='break'){fPlayer.y=p.y-fPlayer.h;fPlayer.vy=-platformBounce(p);fPlayer.onGround=false;p.broken=true;p.breakTimer=30;sfxBreak();}
        else if(p.type==='move'){fPlayer.y=p.y-fPlayer.h;fPlayer.vy=0;fPlayer.onGround=true;fCurPlat=p;sfxBounce();}
        break;
      }
    }
  }
  // 相机
  var thr=FH*0.52;
  if(fPlayer.y>thr){
    var sh=fPlayer.y-thr;fPlayer.y=thr;
    for(var i=0;i<fPlats.length;i++)fPlats[i].y-=sh;
    fFloor+=sh;fScore=Math.floor(fFloor/PGAP);
    document.getElementById('fsc').textContent='第 '+fScore+' 层';
    if(fScore>=fallTargetFloor()){fAlive=false;fWin=true;sfxVictory();showFallRes(true,'');return;}
  }
  // 生成
  var lastY=0;for(var i=0;i<fPlats.length;i++)if(fPlats[i].y>lastY)lastY=fPlats[i].y;
  var gap=PGAP+fDiff2()*18;
  while(lastY<FH+gap){lastY+=gap;fPlats.push(genPlat(lastY));}
  fPlats=fPlats.filter(function(p){return p.y>-100;});
  if(fPlayer.y>FH+80){fAlive=false;fPlayer.dead=true;sfxFall();showFallRes(false,'坠入深渊了！');}
}
var fallPhaseColors = [[45, 68, 115], [49, 85, 128], [44, 64, 110]];
var fallColorPhase = 0;
var fallColorStart = fallPhaseColors[0];
var fallColorChangedAt = 0;

function fallBackgroundColor(progress, now) {
  var phase = progress >= .75 ? 2 : progress >= .5 ? 1 : 0;
  var t = Math.min(1, Math.max(0, (now - fallColorChangedAt) / 1800));
  var blend = t * t * (3 - 2 * t);
  var color = fallColorStart.map(function(channel, index) {
    return channel + (fallPhaseColors[fallColorPhase][index] - channel) * blend;
  });
  if (phase !== fallColorPhase) {
    fallColorStart = color;
    fallColorPhase = phase;
    fallColorChangedAt = now;
  }
  return 'rgb(' + color.map(Math.round).join(',') + ')';
}

function fDraw(){
  fctx.clearRect(0,0,FW,FH);
  var progress=fScore/fallTargetFloor();
  fctx.fillStyle='#fff5df';fctx.fillRect(0,0,FW,FH);
  // Only the text-free lower section of approved concept B; no baked-in answer.
  if(fallBuildingImage.complete&&fallBuildingImage.naturalWidth){
    var tileHeight=FH,offset=(fFloor*.3)%tileHeight;
    fctx.save();fctx.globalAlpha=.26;
    for(var y=-offset;y<FH;y+=tileHeight)fctx.drawImage(fallBuildingImage,296,730,294,1040,0,y,FW,tileHeight);
    fctx.restore();
  }
  fctx.save();fctx.textAlign='center';fctx.font='bold 16px system-ui';fctx.fillStyle='#294777';fctx.fillText(progress>=.75?'冲刺阶段':progress>=.5?'渐入佳境':'轻松起步',FW/2,26);if(performance.now()<fallFeedbackUntil)fctx.fillText(fallFeedback,FW/2,52);fctx.restore();
  fctx.font='bold 80px system-ui';fctx.fillStyle='rgba(41,75,164,.06)';fctx.textAlign='center';fctx.fillText(fScore,FW/2,FH/2+30);
  // 平台
  for(var i=0;i<fPlats.length;i++){
    var p=fPlats[i];if(p.broken&&p.type==='spike')continue;if(p.y<-30||p.y>FH+30)continue;
    fctx.save();
    var colors={normal:['#65c783','#299354'],move:['#68b5ef','#2779bd'],break:['#ffc26b','#d38932'],answer:['#b99aed','#7958b8'],spike:['#ef8176','#b84745']},palette=colors[p.type]||colors.normal;
    if(p.broken)fctx.globalAlpha=Math.max(0,p.breakTimer/30);
    var g=fctx.createLinearGradient(0,p.y,0,p.y+PH+5);g.addColorStop(0,palette[0]);g.addColorStop(1,palette[1]);
    fctx.fillStyle=g;prr(fctx,p.x,p.y,p.w,PH+5,4);fctx.fill();
    fctx.strokeStyle=palette[1];fctx.lineWidth=1;fctx.stroke();
    fctx.strokeStyle='rgba(255,255,255,.55)';fctx.beginPath();fctx.moveTo(p.x+5,p.y+3);fctx.lineTo(p.x+p.w-5,p.y+3);fctx.stroke();
    fctx.fillStyle='#fff';fctx.font='700 11px system-ui';fctx.textAlign='center';
    if(p.type==='spike'){
      var toothCount=Math.max(1,Math.round(p.w/10)),toothWidth=p.w/toothCount;
      fctx.fillStyle='#e34f43';fctx.strokeStyle='#c44339';
      for(var z=0;z<toothCount;z++){var x=p.x+z*toothWidth;fctx.beginPath();fctx.moveTo(x,p.y);fctx.lineTo(x+toothWidth/2,p.y-10);fctx.lineTo(x+toothWidth,p.y);fctx.closePath();fctx.fill();fctx.stroke();}
    }else if(p.type==='answer')fctx.fillText(fQuizMBTI,p.x+p.w/2,p.y+13);
    else if(p.type==='move'){
      fctx.fillStyle='#eff8ff';fctx.font='800 12px system-ui';
      fctx.shadowBlur=0;fctx.textBaseline='middle';
      fctx.fillText(p.vx>0?'>>':'<<',p.x+p.w/2,p.y+(PH+5)/2+1);
      fctx.shadowBlur=0;
    }
    else if(p.type==='break'){fctx.beginPath();fctx.moveTo(p.x+p.w*.5,p.y+2);fctx.lineTo(p.x+p.w*.44,p.y+7);fctx.lineTo(p.x+p.w*.55,p.y+10);fctx.lineTo(p.x+p.w*.48,p.y+15);fctx.strokeStyle='#fff5df';fctx.stroke();}
    fctx.restore();
  }
  if(!fPlayer.dead&&(fPlayer.shield||performance.now()<fPlayer.shieldFlash)){
    fctx.save();var flashing=performance.now()<fPlayer.shieldFlash;
    var bubbleX=fPlayer.x+fPlayer.w/2,bubbleY=fPlayer.y+fPlayer.h/2,bubbleRX=fPlayer.w/2+9,bubbleRY=fPlayer.h/2+7;
    var shieldGlow=fctx.createRadialGradient(bubbleX,bubbleY,0,bubbleX,bubbleY,bubbleRY);
    shieldGlow.addColorStop(0,'rgba(255,255,255,0)');shieldGlow.addColorStop(.72,'rgba(255,255,255,0)');shieldGlow.addColorStop(.9,'rgba(220,247,255,.12)');shieldGlow.addColorStop(1,'rgba(155,224,255,.26)');
    fctx.fillStyle=shieldGlow;fctx.strokeStyle='rgba(135,216,250,.88)';fctx.lineWidth=1.6;
    fctx.shadowColor='#c9f2ff';fctx.shadowBlur=flashing?10:3;
    fctx.beginPath();fctx.ellipse(bubbleX,bubbleY,bubbleRX,bubbleRY,0,0,Math.PI*2);fctx.fill();fctx.stroke();
    fctx.shadowBlur=0;fctx.strokeStyle='rgba(255,255,255,.95)';fctx.lineWidth=2.5;fctx.lineCap='round';
    fctx.beginPath();fctx.ellipse(bubbleX,bubbleY,bubbleRX-3,bubbleRY-3,0,Math.PI*1.12,Math.PI*1.52);fctx.stroke();
    fctx.strokeStyle='rgba(255,255,255,.62)';fctx.lineWidth=1.3;
    fctx.beginPath();fctx.ellipse(bubbleX,bubbleY,bubbleRX-2,bubbleRY-2,0,.12,.65);fctx.stroke();
    if(fPlayer.shield){var tx=Math.max(36,Math.min(FW-36,fPlayer.x+18));fctx.shadowBlur=0;fctx.fillStyle='#175579';fctx.font='700 11px system-ui';fctx.textAlign='center';fctx.fillText('保护 '+fPlayer.shieldRemaining.toFixed(1)+'s',tx,Math.max(65,fPlayer.y-12));}fctx.restore();
  }
  // 玩家
  if(!fPlayer.dead){
    if(fSprite&&fSpriteBounds){var b=fSpriteBounds,scale=Math.min(fPlayer.w/b.w,fPlayer.h/b.h),dw=b.w*scale,dh=b.h*scale;fctx.drawImage(fSprite,b.x,b.y,b.w,b.h,fPlayer.x+(fPlayer.w-dw)/2,fPlayer.y+fPlayer.h-dh,dw,dh);}
    else{fctx.fillStyle='#4a90e2';fctx.fillRect(fPlayer.x,fPlayer.y,fPlayer.w,fPlayer.h);}
  }
  // HUD
  var dn2=['简单','普通','困难'],dc=['#245c42','#795115','#883f3b'],db=['#e0efdf','#f5e8c8','#f5ded8'];
  fctx.fillStyle='#e3eaf6';prr(fctx,6,6,87,24,7);fctx.fill();
  fctx.strokeStyle='#9eafc9';fctx.lineWidth=1;fctx.stroke();
  fctx.font='600 12px "Microsoft YaHei",system-ui';fctx.textAlign='center';fctx.textBaseline='alphabetic';
  function centeredHudText(value,x,y){var m=fctx.measureText(value);fctx.fillText(value,x,y+(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2);}
  fctx.fillStyle='#29466f';centeredHudText('目标 '+fallTargetFloor()+' 层',49.5,18);
  fctx.fillStyle=db[fDiff];prr(fctx,FW-54,6,48,24,7);fctx.fill();fctx.strokeStyle=dc[fDiff];fctx.stroke();
  fctx.fillStyle=dc[fDiff];centeredHudText(dn2[fDiff],FW-30,18);

}
function showFallRes(win,reason){trackGameEvent(win?'penalty_win':'penalty_fail');
  stopFallTilt();
  fAlive=false;fPaused=false;fKeys.left=fKeys.right=false;
  document.getElementById("fs").classList.add("fall-ended");
  cancelAnimationFrame(fAnimId);
  stopFallBGM();fWin=win;
  var el=document.getElementById('fres');el.style.display='block';el.oncancel=function(e){e.preventDefault();};
  if(win){
    el.innerHTML='<div style="color:#f1c40f;font-size:18px;font-weight:500;margin-bottom:10px">惩罚完成！</div>'
      +'<div style="color:#aaa;font-size:12px;margin-bottom:14px">成功下了 '+fallTargetFloor()+' 层！回去重新答题吧</div>'
      +'<button id="fb-back" style="padding:9px 20px;border-radius:8px;border:0.5px solid #555;background:transparent;color:#eee;cursor:pointer;">重新答题</button>';
    document.getElementById('fb-back').addEventListener('click',function(){
      el.close();el.style.display='none';cancelAnimationFrame(fAnimId);document.getElementById('fs').classList.remove('show');showQuiz();
    });
  } else {
    el.innerHTML='<div class="fall-result-title" style="color:#e74c3c;font-size:18px;font-weight:500;margin-bottom:6px">'+reason+'</div>'
      +'<div style="color:#aaa;font-size:12px;margin-bottom:14px">下到第 '+fScore+' 层</div>'
      +'<button id="fb-retry" style="padding:9px 18px;border-radius:8px;border:0.5px solid #555;background:transparent;color:#eee;cursor:pointer;margin-right:8px;">重新挑战</button>'
      +'<button id="fb-quiz" style="padding:9px 18px;border-radius:8px;border:0.5px solid #555;background:transparent;color:#eee;cursor:pointer;">重新答题</button>';
    document.getElementById('fb-retry').addEventListener('click',function(){
      el.close();el.style.display='none';fDiff=Math.floor(Math.random()*3);
      var dn3=['简单难度','普通难度','困难难度'];
      startFallBGM();
      document.getElementById('ftl').textContent='下楼挑战 · '+dn3[fDiff]+' · '+fallTargetFloor()+'层';initFall();
    });
    document.getElementById('fb-quiz').addEventListener('click',function(){
      el.close();el.style.display='none';cancelAnimationFrame(fAnimId);document.getElementById('fs').classList.remove('show');showQuiz();
    });
  }
  if(!el.open)el.showModal();
}

// ═══ POSTER ═══
var posterAvatarImage=null;
var pAvatarUrl=null,infUnlocked=false,infModeActive=false,infCurLevelIdx=0;

function closePosterScreen(){
  posterRenderVersion++;
  document.getElementById('ps').classList.remove('show');
  document.getElementById('ov').classList.remove('show');
  showLS();
  window.scrollTo(0,0);
}
function showPosterScreen(){trackGameEvent('poster_open');
  document.getElementById("gs").style.display="none";
  document.getElementById("ps").scrollTop=0;
  document.body.classList.remove("game-scroll-locked");
  document.getElementById('ov').classList.remove('show');
  document.getElementById('qs').classList.remove('show');
  var inp=document.getElementById('pmi');
  inp.value='';inp.className='';
  document.getElementById('pvh').textContent='';document.getElementById('pvh').className='';
  document.getElementById('pcw').style.display='none';
  document.getElementById('pgb').classList.add('off');
  document.getElementById('pgb').style.display='block';
  document.getElementById('poster-form').style.display='';
  document.getElementById('pshare').style.display='inline-block';

  // 重置AI生成状态
  aiGenerated=false;

  setupMbtiPicker();
  // chips
  var chips=document.getElementById('pchips');chips.innerHTML='';var mobileSelect=document.getElementById('mbti-mobile');mobileSelect.innerHTML='<option value="">请选择 MBTI 类型</option>';
  mobileSelect.onchange=function(){inp.value=this.value;validateMB(this.value);};
  VALID_MB.forEach(function(m){
    var option=document.createElement('option');option.value=m;option.textContent=m+' · '+MBTI_INFO[m].title;mobileSelect.appendChild(option);
    var ch=document.createElement('button');ch.type='button';ch.className='pch';var chipLabel=document.createElement('span');chipLabel.textContent=m;ch.appendChild(chipLabel);
    ch.addEventListener('click',function(){inp.value=m;validateMB(m);});
    chips.appendChild(ch);
  });
  document.getElementById('av-clear').click();
  inp.value = window.posterTestResult?.() || '';
  validateMB(inp.value);
  document.getElementById('ps').classList.add('show');
}

var avatarPosterBlocked=function(){return false;};
function syncPosterButton(){
  var button=document.getElementById('pgb');
  var blocked=avatarPosterBlocked();
  button.disabled=blocked||!VALID_MB.includes(document.getElementById('pmi').value.trim().toUpperCase());
  button.classList.toggle('off',button.disabled);
  button.textContent=blocked?'⏳ 请先完成头像生成':'✨ 生成纪念海报';
}
// Align visible character bounds instead of differently padded source canvases.
function alignStylePreview(thumb){
 if(!thumb.naturalWidth)return;
 const probe=document.createElement('canvas');probe.width=probe.height=160;
 const ctx=probe.getContext('2d',{willReadFrequently:true});ctx.drawImage(thumb,0,0,160,160);
 const data=ctx.getImageData(0,0,160,160).data,bg=[data[0],data[1],data[2]];
 let left=160,top=160,right=0,bottom=0;
 for(let y=3;y<157;y++)for(let x=3;x<157;x++){const i=(y*160+x)*4;if(Math.hypot(data[i]-bg[0],data[i+1]-bg[1],data[i+2]-bg[2])>65){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}}
 if(right<=left||bottom<=top)return;
 let frame=thumb.parentElement;
 if(!frame.classList.contains('style-preview-frame')){frame=document.createElement('span');frame.className='style-preview-frame';thumb.before(frame);frame.append(thumb);}
 const scale=.76*160/Math.max(right-left+1,bottom-top+1);
 frame.style.backgroundColor='rgb('+bg.join(',')+')';
 thumb.style.width=(scale*100)+'%';thumb.style.height=(scale*100)+'%';
 thumb.style.left=(50-(left+right+1)/320*scale*100)+'%';thumb.style.top=(50-(top+bottom+1)/320*scale*100)+'%';
}
function validateMB(val){
  var v=(val||'').toUpperCase().trim();
  document.querySelectorAll('.px-style').forEach(function(button){
    const thumb = button.querySelector('img');
    thumb.onload=()=>alignStylePreview(thumb);
    thumb.hidden = !VALID_MB.includes(v);
    thumb.style.display = thumb.hidden ? 'none' : '';
    if(thumb.parentElement.classList.contains('style-preview-frame'))thumb.parentElement.hidden=thumb.hidden;
    if (!thumb.hidden) thumb.src = '/mbti-veki-route-test/previews/personality/' + MBTI_TO_CHAR[v] + '-' + button.dataset.style + '.webp';
  });
  const effect = document.getElementById('px-canvas');
  effect.style.backgroundImage = 'none';
  effect.style.backgroundSize = 'cover';
  if (document.getElementById('av-canvas').style.display === 'none') effect.getContext('2d').clearRect(0,0,effect.width,effect.height);
  document.getElementById('mbti-mobile').value=VALID_MB.includes(v)?v:'';
  document.getElementById('mbti-choice').textContent=VALID_MB.includes(v)?v+' · '+MBTI_INFO[v].title:'请选择 MBTI 类型';
  var inp=document.getElementById('pmi'),hint=document.getElementById('pvh');
  var btn=document.getElementById('pgb');
  syncPosterButton();
  document.querySelectorAll('.pch').forEach(function(c){c.className='pch'+(c.textContent===v?' on':'');});
  if(v.length===0){inp.className='';hint.textContent='';hint.className='';btn.classList.add('off');return;}
  if(VALID_MB.indexOf(v)>=0){
    var inf2=MBTI_INFO[v]||{};
    inp.className='pok';
    hint.textContent=(inf2.desc||'').replace(/。/g,'');
    hint.className='ok';
    syncPosterButton();
  } else {
    inp.className='png2';
    hint.textContent=v.length<4?'继续输入...':('「'+v+'」不在16种MBTI之内，请重新选择');
    hint.className=v.length<4?'':'ng';
    btn.classList.add('off');
  }
}

function getPosterTheme(completed,stars,threeStars){
  if(completed<LEVELS.length)return window.hasEarnedCampaignPoster?.()?{id:'garden',title:'经典十六关 · 通关纪念'}:null;
  if(stars>=LEVELS.length*2.7)return {id:'celebration',title:stars===LEVELS.length*3?'璀璨满星 · 传奇通关':'星耀王者 · 高星通关'};
  if(threeStars>=Math.ceil(LEVELS.length/2))return {id:'camp',title:'三星收藏家 · 摘星之旅'};
  return {id:'garden',title:'人格探索者 · 冒险达成'};
}
var posterSceneCache={};
function loadPosterScene(theme,mbti){
  var key=theme+'-'+mbti;
  if(!posterSceneCache[key])posterSceneCache[key]=new Promise(function(resolve,reject){
    var image=new Image();image.onload=function(){resolve(image);};image.onerror=function(){delete posterSceneCache[key];reject(new Error('海报底图加载失败，请重试'));};image.src='/mbti-veki-route-test/poster-scenes/'+key+'.webp';
  });
  return posterSceneCache[key];
}
var posterRenderVersion=0;
function getHonorTitles(completed,stars,threeStars,infiniteBest){
  if(completed<LEVELS.length)return{top:'尚未取得通关认证',bottom:'完成全部关卡后领取荣誉'};
  var top=stars>=LEVELS.length*3?'璀璨满星 · 传奇通关':stars>=LEVELS.length*2.7?'星耀王者 · 卓越通关':stars>=LEVELS.length*2.4?'黄金冒险家 · 高光通关':stars>=LEVELS.length*2?'白银挑战者 · 实力通关':stars>=LEVELS.length*1.5?'青铜勇士 · 坚定通关':'全关征服者 · 坚持到底';
  var bottom=infiniteBest>=2000?'无尽领航者':infiniteBest>=1000?'无尽追光者':threeStars>=LEVELS.length?'满星收藏家':threeStars>=Math.ceil(LEVELS.length*.8)?'摘星大师':threeStars>=Math.ceil(LEVELS.length*.5)?'三星收藏家':threeStars>=Math.ceil(LEVELS.length*.3)?'追星达人':threeStars>=1?'首星纪念章':'百折不挠';
  return{top:top,bottom:bottom};
}

function generatePoster(){var generationArchive=selectedAvatarArchive;
  if(avatarPosterBlocked())return;
  var mbti=document.getElementById('pmi').value.trim().toUpperCase();
  if(VALID_MB.indexOf(mbti)<0){alert('请先选择你的MBTI类型！');return;}
  var info=MBTI_INFO[mbti],canvas=document.getElementById('pc2'),PW=480,PH=1250;
  canvas.width=PW*3;canvas.height=PH*3;canvas.style.width='100%';
  var pc=canvas.getContext('2d');pc.setTransform(3,0,0,3,0,0);
  var save=getSave(),completed=0,stars=0,threeStars=0;
  LEVELS.forEach(function(_,i){var n=save['c'+i]||0;if(n){completed++;stars+=n;if(n===3)threeStars++;}});
  var honors=getHonorTitles(completed,stars,threeStars,getInfBest());
  var theme=getPosterTheme(completed,stars,threeStars);
  if(!theme){alert('完成全部关卡后即可生成通关海报');return;}
  trackGameEvent('poster_attempt');honors.top=theme.title;
  var sceneImage=null,defaultPortrait=null,renderVersion=++posterRenderVersion;
  var palette={garden:{ink:'#246851',light:'#e6f2e5',paper:'#fffaf0'},camp:{ink:'#385b93',light:'#e5edfa',paper:'#fff9eb'},celebration:{ink:'#815c13',light:'#fff0bf',paper:'#fffbef'}}[theme.id];
  function text(value,x,y,size,color,weight){pc.fillStyle=color;pc.font=(weight||'normal')+' '+size+'px system-ui';pc.textAlign='center';pc.fillText(value,x,y);}
  function panel(x,y,w,h,color){pc.fillStyle=color;prr(pc,x,y,w,h,16);pc.fill();}
  function draw(){
    pc.fillStyle='#091831';pc.fillRect(0,0,PW,PH);
    if(sceneImage){
      pc.drawImage(sceneImage,0,0,PW,1120);
      // Continue the scene's lower edge beneath the single invitation card.
      pc.drawImage(sceneImage,0,sceneImage.naturalHeight-2,sceneImage.naturalWidth,2,0,1120,PW,PH-1120);
    }
    // Keep the scene and its illustration visible; shade only the text area.
    var shade=pc.createLinearGradient(0,0,0,740);shade.addColorStop(0,'rgba(15,29,53,.32)');shade.addColorStop(.8,'rgba(15,29,53,.18)');shade.addColorStop(1,'rgba(15,29,53,0)');pc.fillStyle=shade;pc.fillRect(0,0,PW,740);
    text('我的人格冒险纪念卡',PW/2,65,24,'#fffaf0','700');
    pc.save();pc.beginPath();pc.arc(PW/2,156,52,0,Math.PI*2);pc.clip();pc.fillStyle='#edf1f8';pc.fillRect(PW/2-52,104,104,104);
    var avatar=posterAvatarImage||(pAvatarUrl?document.getElementById('px-canvas'):null);
    if(avatar){
      pc.drawImage(avatar,PW/2-52,104,104,104);
    }else{
      var defaultChar=defaultPortrait||charImgs[MBTI_TO_CHAR[mbti]];
      if(defaultChar&&defaultChar.naturalWidth){
        var cutout=defaultChar,bounds=getCharacterBounds(defaultChar);
        pc.imageSmoothingEnabled=true;pc.imageSmoothingQuality='high';
        var avatarScale=Math.min(80/bounds.w,88/bounds.h),aw=bounds.w*avatarScale,ah=bounds.h*avatarScale;
        pc.drawImage(cutout,bounds.x,bounds.y,bounds.w,bounds.h,PW/2-aw/2,156-ah/2,aw,ah);
      }
    }
    pc.restore();
    pc.strokeStyle='#e9cb85';pc.lineWidth=3;pc.beginPath();pc.arc(PW/2,156,56,0,Math.PI*2);pc.stroke();
    text(mbti,PW/2,260,38,'#ffe2a0','800');
    text(info.title,PW/2,292,22,'#fffaf0','750');
    pc.font='14px system-ui';pc.fillStyle='#e4eaf2';pc.textAlign='center';pwrap(pc,info.desc,PW/2,328,382,22);
    // Keep both earned titles together, above the supporting statistics.
    pc.save();
    pc.shadowColor='rgba(12,25,72,.28)';pc.shadowBlur=14;pc.shadowOffsetY=4;
    var honorFill=pc.createLinearGradient(36,380,444,488);
    honorFill.addColorStop(0,'#355ab4');honorFill.addColorStop(1,'#233a80');
    panel(36,380,408,108,honorFill);
    pc.shadowBlur=0;pc.shadowOffsetY=0;
    pc.strokeStyle='#ebd38f';pc.lineWidth=1.5;prr(pc,36,380,408,108,16);pc.stroke();
    text(honors.top,PW/2,416,22,'#fff3c8','800');
    var badgeWidth=Math.max(168,pc.measureText(honors.bottom).width+64);
    panel((PW-badgeWidth)/2,434,badgeWidth,36,'#edf2ff');
    text('★  '+honors.bottom+'  ★',PW/2,458,16,'#34509a','750');
    pc.restore();
    var rating=stars>=LEVELS.length*3?'S':stars>=LEVELS.length*2.4?'A':stars>=LEVELS.length*2?'B':stars>=LEVELS.length*1.5?'C':'D';
    panel(36,506,408,200,'#fffaf0');
    // Illustrated rank emblem, centered independently of the statistics.
    var rankColors={S:['#2756a1','#f3c354'],A:['#3c70aa','#eac774'],B:['#348a7b','#b9ddd0'],C:['#7893b2','#d0ddeb'],D:['#9c8ab1','#ded4eb']}[rating];
    var cx=PW/2,cy=560,r=46;
    pc.save();pc.beginPath();pc.moveTo(cx,cy-r);pc.lineTo(cx+43,cy-25);pc.lineTo(cx+35,cy+25);pc.lineTo(cx,cy+44);pc.lineTo(cx-35,cy+25);pc.lineTo(cx-43,cy-25);pc.closePath();
    pc.fillStyle=rankColors[0];pc.strokeStyle=rankColors[1];pc.lineWidth=5;pc.fill();pc.stroke();
    text(rating,cx,cy+17,48,'#fff3ca','850');
    if(rating==='S'||rating==='A'){
      for(var side of [-1,1])for(var leaf=0;leaf<(rating==='S'?5:3);leaf++){
        pc.save();pc.translate(cx+side*(52+Math.sin(leaf*.55)*9),cy+28-leaf*12);pc.rotate(side*(.6+leaf*.13));pc.beginPath();pc.ellipse(0,0,4,9,0,0,Math.PI*2);pc.fillStyle=rankColors[1];pc.fill();pc.restore();
      }
      text('★',cx,cy-25,14,'#ffe296','700');
    }
    pc.restore();
    var summary=[['完成关卡',completed+' / '+LEVELS.length,'#246851'],['收集星星',stars+' / '+LEVELS.length*3,'#96601c'],['三星关卡',threeStars+' 关','#75519a']];
    summary.forEach(function(item,i){var x=104+i*136;text(item[0],x,638,13,'#344966','650');text(item[1],x,678,26,item[2],'800');if(i<2){pc.beginPath();pc.strokeStyle='#cbd7d7';pc.lineWidth=1;pc.moveTo(x+68,622);pc.lineTo(x+68,686);pc.stroke();}});
    // Credits sit on the bottom of the scene, outside the invitation card.
    pc.save();pc.shadowColor="rgba(0,0,0,.75)";pc.shadowBlur=5;
    text('由Veki独立开发 · 微信 Veki1213',PW/2,1084,11,'#fffaf0');
    pc.restore();
    panel(18,1114,444,118,'#fffaf0');
    if(shareQrImage.complete)pc.drawImage(shareQrImage,38,1133,80,80);
    pc.beginPath();pc.strokeStyle='#344d82';pc.lineWidth=1.5;pc.moveTo(142,1132);pc.lineTo(142,1214);pc.stroke();
    text('欢迎来试玩！',298,1150,20,'#39475b','700');
    text('长按识别二维码，开启人格冒险',298,1178,12,'#243753');
    text('mbti-veki.netlify.app',298,1203,13,'#484848');
    document.getElementById('pcw').style.display='block';document.getElementById('poster-form').style.display='none';document.getElementById('pgb').style.display='none';
    document.getElementById('psave').textContent='🖼️ 分享海报';
    if(window.hasCompletedCampaign ? window.hasCompletedCampaign() : completed===LEVELS.length){infUnlocked=true;gameStorage.setItem('llk4_inf','1');}
  }
  var posterButton=document.getElementById('pgb');posterButton.disabled=true;posterButton.textContent='正在打开纪念海报…';
  Promise.all([loadPosterScene(theme.id,mbti),shareQrImage.decode(),(async function(){var im=new Image();im.src='character-hd/'+MBTI_TO_CHAR[mbti]+'.webp';await im.decode();return im;})()]).then(function(results){
    var image=results[0];
    if(renderVersion!==posterRenderVersion)return;
    sceneImage=image;defaultPortrait=results[2];draw();posterArchiveRecord=generationArchive;trackGameEvent('poster_success');
  }).catch(function(){if(renderVersion===posterRenderVersion){trackGameEvent('poster_failure');alert('海报底图加载失败，请重试');}})
  .finally(function(){if(renderVersion===posterRenderVersion)syncPosterButton();});
}

function pwrap(ctx2,text,x,y,maxW,lh){
  var chars=text.split(''),line='',lines=[];
  chars.forEach(function(c){var t=line+c;if(ctx2.measureText(t).width>maxW&&line){lines.push(line);line=c;}else line=t;});
  if(line)lines.push(line);lines.forEach(function(l,i){ctx2.fillText(l,x,y+i*lh);});
}
function prr(ctx2,x,y,w,h,r){
  ctx2.beginPath();ctx2.moveTo(x+r,y);ctx2.lineTo(x+w-r,y);ctx2.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx2.lineTo(x+w,y+h-r);ctx2.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx2.lineTo(x+r,y+h);ctx2.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx2.lineTo(x,y+r);ctx2.quadraticCurveTo(x,y,x+r,y);ctx2.closePath();
}

// ═══ INFINITE MODE ═══
function showInf(curScore){
  document.getElementById('inf-play').textContent=(getEndlessRound()>1?'继续第 '+getEndlessRound()+' 轮':'开始第 1 轮');
  var infBest=Math.max(getInfBest(),curScore||0);
  setInfBest(infBest);
  document.getElementById('inf-cur').textContent=(curScore||0)+'分';
  document.getElementById('inf-best').textContent=infBest+'分';
  document.getElementById('inf').classList.add('show');
}

// ═══ INIT ═══
function updScore(){document.getElementById('sc').textContent=score;}
function updRem(){var n=0;for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++) if(board[r][c]!==null)n++;document.getElementById('rm').textContent=n;}
function setMsg(m){document.getElementById('msg').textContent=m||'';}



window.addEventListener('DOMContentLoaded',function(){
  updateSoundButton();document.getElementById('sound-toggle').addEventListener('click',toggleSound);
  cvs=document.getElementById('cv');ctx=cvs.getContext('2d');
  cvs.width=W;cvs.height=H;
  function resizeBoard(){
    var available=document.getElementById('gc').clientWidth;
    if(!available)return;
    portraitBoard=window.innerWidth<=600&&window.innerHeight>window.innerWidth;
    var cols=portraitBoard?ROWS:COLS,rows=portraitBoard?COLS:ROWS;
    if(portraitBoard){
      var top=document.getElementById('gc').getBoundingClientRect().top;
      var usable=Math.max(320,window.innerHeight-top-24);
      CELL=Math.max(36,Math.min(70,Math.floor((available-(cols+1)*PAD)/cols),Math.floor((usable-(rows+1)*PAD)/rows)));
    }else CELL=70;
    W=cols*CELL+(cols+1)*PAD;H=rows*CELL+(rows+1)*PAD;
    var width=Math.min(W,available);
    var dpr=window.devicePixelRatio||1;
    cvs.width=Math.round(W*dpr);cvs.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    if(board.length)render();
    cvs.style.width=width+'px';cvs.style.height=(H*width/W)+'px';
  }
  new ResizeObserver(resizeBoard).observe(document.getElementById('gc'));
  window.addEventListener('resize',resizeBoard);resizeBoard();

  document.getElementById('pause').addEventListener('click',togglePause);
  document.addEventListener('visibilitychange',function(){if(document.hidden)pauseGame();});
  var focusCell={r:0,c:0};cvs.tabIndex=0;cvs.setAttribute('role','grid');
  cvs.setAttribute('aria-label','连连看棋盘：方向键移动，回车或空格选择人物');
  cvs.addEventListener('keydown',function(e){
    if(gameState!=='playing'||locked)return;
    var delta={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]}[e.key];
    if(delta&&portraitBoard)delta=[delta[1],delta[0]];
    if(delta){e.preventDefault();focusCell.r=(focusCell.r+delta[0]+ROWS)%ROWS;focusCell.c=(focusCell.c+delta[1]+COLS)%COLS;render();var box=cRect(focusCell.r,focusCell.c);ctx.strokeStyle='#ffdf55';ctx.lineWidth=3;ctx.strokeRect(box.x+2,box.y+2,box.w-4,box.h-4);}
    else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(board[focusCell.r][focusCell.c]!==null)clickCell(focusCell.r,focusCell.c);}
  });
  cvs.addEventListener('click',onCvsClick);
  document.getElementById('bk').addEventListener('click',showLS);
  document.getElementById('bh').addEventListener('click',function(){playHint();doHint();});
  document.getElementById('bsf').addEventListener('click',function(){playShuffle();doShuffle();});
  document.getElementById('br').addEventListener('click',doStart);
  document.getElementById('b-again').addEventListener('click',function(){
    document.getElementById('ov').classList.remove('show');
    if(infModeActive){
      if(infRoundWon)infRound++;
      var next=Math.floor(Math.random()*INF_LEVELS.length);
      startInfLevel(next);
    } else {
      doStart();
    }
  });
  document.getElementById('b-quiz').addEventListener('click',function(){
    document.getElementById('ov').classList.remove('show');
    if(curLevel===LEVELS.length-1)showPosterScreen();else showQuiz();
  });
  document.getElementById('b-lvls').addEventListener('click',function(){document.getElementById('ov').classList.remove('show');showLS();});
  // 答题
  document.getElementById('qcont').addEventListener('click',function(){
    document.getElementById('qs').classList.remove('show');
    if(curLevel===LEVELS.length-1)showPosterScreen();else{startLevel(curLevel+1);trackGameEvent('quiz_advance');}
  });
  // 海报
  document.getElementById('pcls').addEventListener('click',closePosterScreen);
  document.getElementById('pmi').addEventListener('input',function(){validateMB(this.value);});
  document.getElementById('pgb').addEventListener('click',generatePoster);
  document.getElementById('psave').addEventListener('click',function(){openGameShare(true);});
  document.getElementById('invite-game').addEventListener('click',function(){openGameShare(false);});
  document.getElementById('share-close').onclick=function(){document.getElementById('share-dialog').close();};
  document.getElementById('copy-invite').onclick=async function(){
    var field=document.getElementById('invite-copy');
    try{await navigator.clipboard.writeText(field.value);document.getElementById('share-feedback').textContent='邀请文案已复制，可以粘贴给朋友或朋友圈。';}
    catch(e){field.focus();field.select();document.getElementById('share-feedback').textContent='请长按上方文案，选择复制。';}
  };
  document.getElementById('download-poster').onclick=saveShareImage;
  document.getElementById('pregen').addEventListener('click',function(){
    document.getElementById('pcw').style.display='none';
    document.getElementById('poster-form').style.display='';
    document.getElementById('pgb').style.display='block';
    var inp=document.getElementById('pmi');validateMB(inp.value);
    inp.focus();inp.scrollIntoView({behavior:'smooth',block:'center'});
  });
  document.getElementById('pshare').addEventListener('click',closePosterScreen);
  // ── 像素头像系统 ──
  var avImg=null,avX=0,avY=0,avScale=1,avDragging=false,avDragStartX=0,avDragStartY=0,avDragImgX=0,avDragImgY=0;
  var avCanvas=document.getElementById('av-canvas');
  var avCtx=avCanvas.getContext('2d');
  var pxCanvas=document.getElementById('px-canvas');
  var pxCtx=pxCanvas.getContext('2d');
  var AV_SIZE=80,curPxStyle='stardew';
  pAvatarUrl=null;

  // ── 三种头像风格（纯本地实现，无需API） ──
  var STYLE_CONFIG = {
    stardew: { name:'星露谷像素风', pixelSize:20 },
    chibi:   { name:'Q版卡通',      pixelSize:0  },
    flat:    { name:'扁平插画',     pixelSize:0  },
  };

  // 星露谷暖色调色板（24色）
  var STARDEW_PAL=[
    [34,24,18],[72,44,28],[120,76,44],[168,112,64],[212,160,100],[240,200,148],[252,228,192],
    [64,96,60],[88,140,68],[128,188,88],[176,216,128],[220,240,180],
    [48,72,128],[80,120,176],[120,168,212],[168,212,244],
    [160,72,56],[208,112,88],[240,164,120],[252,204,164],
    [80,44,80],[128,68,128],[176,108,176],[220,160,216]
  ];

  function nearestPalColor(r,g,b,pal){
    var best=0,bestD=1e9;
    for(var i=0;i<pal.length;i++){
      var p=pal[i],d=(r-p[0])*(r-p[0])+(g-p[1])*(g-p[1])+(b-p[2])*(b-p[2]);
      if(d<bestD){bestD=d;best=i;}
    }
    return pal[best];
  }

  function applyPixelStyle(){
    posterAvatarImage=null;pxCtx.clearRect(0,0,80,80);
    pxCanvas.style.backgroundImage='none';
    if(!avImg){pAvatarUrl=null;return;}

    pAvatarUrl=null;
  }

  applyPixelStyle();
  var aiGenerated = false,avatarRequest=0,avatarController=null;
  var JIMENG_SERVER = ''; // 后端地址

  var avatarLoadingTimer=null,avatarJobs={},avatarSource=null,avatarCropDirty=true,confirmedAvatar=null;
  var avatarGenerationStarted=false;
  avatarPosterBlocked=function(){
    if(!avImg||!avatarGenerationStarted)return false;
    var job=avatarJobs[curPxStyle];
    return avatarCropDirty||!job||job.state!=='done';
  };
  function syncAvatarEntry(){
    var job=avatarCropDirty?null:avatarJobs[curPxStyle];
    var pending=job&&job.state==='pending',done=job&&job.state==='done';
    document.getElementById('avatar-start').hidden=!avImg||pending||done;
    var startLabel=job&&job.state==='error'?'重试生成专属头像':'开始生成专属头像';
    document.getElementById('avatar-start').setAttribute('aria-label',startLabel);
    document.getElementById('avatar-start').title=startLabel;
    document.getElementById('avatar-retry').hidden=!avImg||!done;
  }
  function displayAvatarJob(){
    if(!document.getElementById('avatar-retain-images')){var consent=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.id='avatar-retain-images';consent.style.cssText='display:block;font-size:12px;margin:8px 0';consent.append(check,document.createTextNode('同意将提交图片和生成结果保存30天，供运营者查看并改进体验'));document.getElementById('avatar-generate').after(consent);}

    syncAvatarEntry();
    syncPosterButton();
    if(avatarCropDirty)return;
    var job=avatarJobs[curPxStyle],hint=document.getElementById('ai-gen-hint'),label=document.getElementById('avatar-preview-label');
    document.getElementById('avatar-effect-loading').hidden=!job||job.state!=='pending';
    document.getElementById('avatar-generate').hidden=true;
    if(!job){document.getElementById('avatar-generate').disabled=false;document.getElementById('avatar-preview-label').textContent='生成效果';hint.classList.remove('avatar-loading');hint.textContent='';syncAvatarEntry();return;}
    var pending=job.state==='pending';var generateButton=document.getElementById('avatar-generate');generateButton.disabled=pending;generateButton.textContent=pending?'生成中…':'↻ 重新生成';hint.classList.remove('avatar-loading');hint.setAttribute('aria-busy',String(pending));
    syncAvatarEntry();
    document.querySelectorAll('.px-style').forEach(function(b){var j=avatarJobs[b.dataset.style];b.dataset.generation=j?j.state:'';});
    if(pending){
      var seconds=Math.floor((Date.now()-job.started)/1000);
      label.textContent='生成效果';hint.textContent='';
      pxCtx.clearRect(0,0,80,80);
      document.querySelector('#avatar-effect-loading > span:last-child').textContent=seconds<60?'预计需要几十秒':'仍在生成，请稍候';
    }else if(job.state==='done'){
      selectedAvatarArchive=job.archived?job.archiveId:null;pxCtx.clearRect(0,0,80,80);pxCtx.drawImage(job.image,0,0,80,80);pAvatarUrl=pxCanvas.toDataURL('image/png');posterAvatarImage=job.image;aiGenerated=true;
      label.textContent='生成效果';hint.textContent='✨ 新头像准备好了！用时 '+job.elapsed+' 秒，可以生成纪念海报啦。';
    }else{pxCtx.clearRect(0,0,80,80);pAvatarUrl=null;posterAvatarImage=null;aiGenerated=false;label.textContent='生成效果';var blocked=['IMAGE_REVIEW_BLOCKED','OUTPUT_REVIEW_BLOCKED'].includes(job.errorCode);hint.textContent=blocked?(job.errorCode==='IMAGE_REVIEW_BLOCKED'?'图片未通过审核，无法用于生成。\n请更换一张图片，再点击确认生成。':'本次生成结果未通过审核。\n请更换图片后重试。'):'这次变身没成功，点“重新生成”再试一次。';if(blocked){generateButton.textContent='更换图片';applyPixelStyle();}}
  }
  function callJiMengStyle(force){
    if(!avImg)return;
    if(avatarCropDirty||!confirmedAvatar){document.getElementById('ai-gen-hint').textContent='';return;}
    if(avatarSource!==avImg){avatarJobs={};avatarSource=avImg;}
    var style=curPxStyle;
    if(force===true)delete avatarJobs[style];
    if(!avatarJobs[style]){
      avatarGenerationStarted=true;
      var job={state:'pending',started:Date.now()};avatarJobs[style]=job;
      var jobs=avatarJobs;
      trackGameEvent('ai_request');
      fetch('https://mbti-veki-route-test.pages.dev/avatar-style',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({imageBase64:confirmedAvatar,style:style,retainImages:document.getElementById('avatar-retain-images')?.checked===true,visitor:(function(){try{return localStorage.getItem('analytics-visitor')||'';}catch{return '';}})()}),signal:AbortSignal.timeout(125000)})
      .then(function(r){return r.json();})
      .then(async function(data){
        if(data.job)job.archiveId=data.job;if(!data.pending)return data;
        var deadline=Date.now()+240000;
        while(Date.now()<deadline){
          await new Promise(function(resolve){setTimeout(resolve,2000);});
          try{var response=await fetch('https://mbti-veki-route-test.pages.dev/avatar-style?job='+encodeURIComponent(data.job),{signal:AbortSignal.timeout(15000)});var result=await response.json();if(!response.ok&&response.status>=500)throw new Error('任务查询暂时失败');if(!result.pending)return result;}catch(error){if(Date.now()>=deadline)throw error;}
        }
        throw new Error('生成超时，请重试');
      })
      .then(function(data){
        job.archived=data.archived===true;if(job.archived){try{var ids=JSON.parse(localStorage.getItem('avatar-archive-ids')||'[]');ids.push(job.archiveId);localStorage.setItem('avatar-archive-ids',JSON.stringify(ids.slice(-100)));}catch{}}if(!data.success||!data.imageUrl){var error=new Error('generation');error.code=data.code;throw error;}
        return new Promise(function(resolve,reject){var im=new Image();im.onload=function(){resolve(im);};im.onerror=reject;im.src=data.imageUrl;});
      }).then(function(im){trackGameEvent('ai_success');job.state='done';job.image=im;job.elapsed=Math.round((Date.now()-job.started)/1000);if(jobs===avatarJobs)displayAvatarJob();})
      .catch(function(error){if(job.image){job.state='done';if(jobs===avatarJobs)displayAvatarJob();return;}trackGameEvent('ai_failure');job.state='error';job.errorCode=error.code;if(jobs===avatarJobs)displayAvatarJob();});
    }
    clearInterval(avatarLoadingTimer);displayAvatarJob();
    avatarLoadingTimer=setInterval(function(){displayAvatarJob();if(!Object.values(avatarJobs).some(function(j){return j.state==='pending';}))clearInterval(avatarLoadingTimer);},1000);
  }
  function generateConfirmedAvatar(){
    var currentJob=avatarJobs[curPxStyle];if(!avatarCropDirty&&currentJob&&['IMAGE_REVIEW_BLOCKED','OUTPUT_REVIEW_BLOCKED'].includes(currentJob.errorCode)){document.getElementById('pavf').click();return;}
    if(!avImg)return;
    if(avatarCropDirty||!confirmedAvatar){
      var sourceCanvas=document.createElement('canvas');sourceCanvas.width=sourceCanvas.height=1024;var sourceCtx=sourceCanvas.getContext('2d');sourceCtx.fillStyle='#ffffff';sourceCtx.fillRect(0,0,1024,1024);sourceCtx.drawImage(avImg,avX/AV_SIZE*1024,avY/AV_SIZE*1024,avImg.naturalWidth*avScale/AV_SIZE*1024,avImg.naturalHeight*avScale/AV_SIZE*1024);confirmedAvatar=sourceCanvas.toDataURL('image/jpeg',0.9);avatarJobs={};avatarSource=avImg;avatarCropDirty=false;
      document.querySelectorAll('.px-style').forEach(function(b){b.dataset.generation='';});
    }
    document.getElementById('avatar-generate').textContent='↻ 重新生成';
    callJiMengStyle(true);
  }
  document.getElementById('avatar-generate').addEventListener('click',generateConfirmedAvatar);
  function confirmAvatarGeneration(){
    if(!avImg)return;
    var dialog=document.createElement('dialog');dialog.className='avatar-confirm-dialog';
    dialog.innerHTML='<h3>生成专属头像？</h3><p>将按当前选区和所选风格生成，预计需要几十秒</p><div><button type="button" data-cancel>先调整图片</button><button type="button" data-confirm>开始生成</button></div>';
    document.body.appendChild(dialog);
    dialog.addEventListener('close',function(){dialog.remove();});
    dialog.querySelector('[data-cancel]').onclick=function(){dialog.close();syncAvatarEntry();};
    dialog.querySelector('[data-confirm]').onclick=function(){dialog.close();generateConfirmedAvatar();};
    dialog.showModal();
    var area=document.querySelector('.avatar-workbench').getBoundingClientRect();
    var top=Math.max(16,Math.min(window.innerHeight-dialog.offsetHeight-16,Math.max(window.innerHeight*.5,area.top+area.height*.5)-dialog.offsetHeight*.5));
    dialog.style.top=top+'px';
  }
  document.getElementById('avatar-retry').addEventListener('click',confirmAvatarGeneration);
  document.getElementById('avatar-start').addEventListener('click',generateConfirmedAvatar);

  function drawAvatar(){
    if(!avImg)return;
    avatarCropDirty=true;clearInterval(avatarLoadingTimer);syncPosterButton();
    document.getElementById('avatar-effect-loading').hidden=true;
    document.getElementById('avatar-generate').hidden=true;
    var generate=document.getElementById('avatar-generate');generate.disabled=false;generate.textContent='✨ 确认生成';
    var hint=document.getElementById('ai-gen-hint');hint.classList.remove('avatar-loading');hint.setAttribute('aria-busy','false');
    hint.textContent='';
    document.getElementById('avatar-preview-label').textContent='生成效果';
    syncAvatarEntry();
    avCtx.clearRect(0,0,AV_SIZE,AV_SIZE);
    var iw=avImg.naturalWidth*avScale,ih=avImg.naturalHeight*avScale;
    // Keep the crop covered; exact-fit axes cannot move.
    avX=Math.max(AV_SIZE-iw,Math.min(0,avX));
    avY=Math.max(AV_SIZE-ih,Math.min(0,avY));
    avCtx.drawImage(avImg,avX,avY,iw,ih);
    applyPixelStyle();
  }

  function initAvatarDrag(){
    var wrap=document.getElementById('av-wrap');
    wrap.addEventListener('mousedown',function(e){
      if(!avImg||Math.abs(avImg.naturalWidth-avImg.naturalHeight)<1)return;
      avDragging=true;avDragStartX=e.clientX;avDragStartY=e.clientY;
      avDragImgX=avX;avDragImgY=avY;wrap.style.cursor='grabbing';e.preventDefault();
    });
    document.addEventListener('mousemove',function(e){
      if(!avDragging)return;
      avX=avDragImgX+(e.clientX-avDragStartX)*AV_SIZE/wrap.getBoundingClientRect().width;avY=avDragImgY+(e.clientY-avDragStartY)*AV_SIZE/wrap.getBoundingClientRect().height;drawAvatar();
    });
    document.addEventListener('mouseup',function(){avDragging=false;document.getElementById('av-wrap').style.cursor='grab';});
    wrap.addEventListener('touchstart',function(e){
      if(!avImg||Math.abs(avImg.naturalWidth-avImg.naturalHeight)<1)return;
      var t=e.touches[0];avDragging=true;avDragStartX=t.clientX;avDragStartY=t.clientY;
      avDragImgX=avX;avDragImgY=avY;e.preventDefault();
    },{passive:false});
    document.addEventListener('touchmove',function(e){
      if(!avDragging)return;
      var t=e.touches[0];avX=avDragImgX+(t.clientX-avDragStartX)*AV_SIZE/wrap.getBoundingClientRect().width;avY=avDragImgY+(t.clientY-avDragStartY)*AV_SIZE/wrap.getBoundingClientRect().height;
      drawAvatar();e.preventDefault();
    },{passive:false});
    document.addEventListener('touchend',function(){avDragging=false;});
    wrap.addEventListener('click',function(){if(!avImg)document.getElementById('pavf').click();});
  }
  initAvatarDrag();

  // 风格切换
  document.querySelectorAll('.px-style').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.px-style').forEach(function(b){
        b.classList.remove('on');b.style.borderColor='#444';b.style.color='#aaa';b.style.background='#0f2040';
      });
      btn.classList.add('on');btn.style.borderColor='#4a90e2';btn.style.color='#eee';btn.style.background='#1a3a6a';
      curPxStyle=btn.getAttribute('data-style');
      applyPixelStyle(); // 清除旧风格画面
      if(!avImg) validateMB(document.getElementById('pmi').value);
      if(avImg){displayAvatarJob();document.getElementById('avatar-generate').textContent=avatarCropDirty||!avatarJobs[curPxStyle]?'✨ 确认生成':avatarJobs[curPxStyle].state==='pending'?'生成中…':'↻ 重新生成';if(!avatarCropDirty&&avatarJobs[curPxStyle]&&['IMAGE_REVIEW_BLOCKED','OUTPUT_REVIEW_BLOCKED'].includes(avatarJobs[curPxStyle].errorCode))document.getElementById('avatar-generate').textContent='更换图片';} // 切换只显示已有任务，不提交请求
    });
  });


  document.getElementById('av-wrap').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('pavf').click();}});
  document.getElementById('av-clear').addEventListener('click',function(){
    document.getElementById('avatar-effect-loading').hidden=true;
    document.getElementById('avatar-generate').hidden=true;
    document.getElementById('avatar-start').hidden=true;avatarJobs={};avatarSource=null;confirmedAvatar=null;avatarCropDirty=true;document.getElementById("avatar-generate").disabled=true;avatarRequest++;clearInterval(avatarLoadingTimer);
    document.getElementById("ai-gen-hint").classList.remove("avatar-loading");document.getElementById("ai-gen-hint").textContent="";document.getElementById("avatar-retry").hidden=true;
    selectedAvatarArchive=null;avImg=null;avatarGenerationStarted=false;syncPosterButton();avX=0;avY=0;avScale=1;pAvatarUrl=null;posterAvatarImage=null;document.getElementById('avatar-preview-label').textContent='生成效果';document.getElementById('avatar-generate').textContent='✨ 确认生成';document.querySelectorAll('.px-style').forEach(function(b){b.dataset.generation='';});
    avCtx.clearRect(0,0,AV_SIZE,AV_SIZE);
    applyPixelStyle();
    document.getElementById('av-canvas').style.display='none';
    document.getElementById('av-placeholder').style.display='flex';
    document.getElementById('av-clear').style.display='none';
    document.getElementById('avatar-upload').hidden=false;
    document.querySelector('.avatar-source-label').hidden=false;
    document.getElementById('av-hint').style.display='none';
    
    document.getElementById('pavf').value='';
    validateMB(document.getElementById('pmi').value);
  });
  document.getElementById('avatar-upload').onclick = () => document.getElementById('pavf').click();
  document.getElementById('pavf').addEventListener('change',function(e){
    var f=e.target.files[0];if(!f)return;
    var rd=new FileReader();rd.onload=function(ev){
      var im=new Image();im.onload=function(){
        avImg=im;
        var sc=Math.max(AV_SIZE/im.naturalWidth,AV_SIZE/im.naturalHeight);
        avScale=sc;
        avX=(AV_SIZE-im.naturalWidth*sc)/2;
        avY=(AV_SIZE-im.naturalHeight*sc)/2;
        document.getElementById('av-canvas').style.display='block';
        document.getElementById('av-placeholder').style.display='none';
        document.getElementById('av-clear').style.display='block';
    document.getElementById('avatar-upload').hidden=true;
    document.querySelector('.avatar-source-label').hidden=false;
        document.getElementById('av-hint').style.display='block';
        drawAvatar();
        syncAvatarEntry();

      };im.src=ev.target.result;
    };rd.readAsDataURL(f);
  });
  // 无限模式
  document.getElementById('inf-play').addEventListener('click',function(){
    document.getElementById('inf').classList.remove('show');
    infModeActive=true;infRound=getEndlessRound();
    var infIdx=Math.floor(Math.random()*INF_LEVELS.length);
    startInfLevel(infIdx);
  });
  document.getElementById('inf-back').addEventListener('click',function(){
    document.getElementById('inf').classList.remove('show');showLS();
  });
  if('IntersectionObserver' in window){
    var endlessEntryObserver=new IntersectionObserver(function(entries){
      document.getElementById('endless-dock').classList.toggle('entry-visible',entries[0].isIntersecting);
    },{threshold:0});
    endlessEntryObserver.observe(document.getElementById('hh-endless-shortcut') || document.getElementById('inf-entry'));
  }
  document.getElementById('endless-dock-play').addEventListener('click',function(){
    if(!infUnlocked)return;
    infModeActive=true;infRound=getEndlessRound();startInfLevel(Math.floor(Math.random()*INF_LEVELS.length));
  });
  // 主页无尽模式入口按钮
  var infEntryBtn=document.getElementById('inf-entry-btn');
  if(infEntryBtn){
    infEntryBtn.addEventListener('click',function(){
      if(infUnlocked){showInf(0);return;}
      var save=getSave();
      if(LEVELS.every(function(_,i){return save['c'+i]>0;})){curLevel=LEVELS.length-1;infModeActive=false;showPosterScreen();}
    });
  }
  // 惩罚游戏键盘
  document.addEventListener('keydown',function(e){
    if(!fAlive||!document.getElementById('fs').classList.contains('show'))return;
    if(['ArrowLeft','ArrowRight','ArrowUp',' '].includes(e.key))e.preventDefault();
    if(e.key==='ArrowLeft'||e.key==='a')fKeys.left=true;
    if(e.key==='ArrowRight'||e.key==='d')fKeys.right=true;
    if(e.key==='ArrowUp'||e.key==='w'||e.key===' ')fKeys.jump=true;
  });
  document.addEventListener('keyup',function(e){
    if(e.key==='ArrowLeft'||e.key==='a')fKeys.left=false;
    if(e.key==='ArrowRight'||e.key==='d')fKeys.right=false;
    if(e.key==='ArrowUp'||e.key==='w'||e.key===' ')fKeys.jump=false;
  });
  document.getElementById('tilt-toggle').onclick=toggleFallTilt;
  var fallSurface=document.getElementById('fs');
  ['contextmenu','selectstart','dragstart'].forEach(function(type){
    fallSurface.addEventListener(type,function(e){e.preventDefault();});
  });
  function resetFallKeys(){fKeys.left=false;fKeys.right=false;fKeys.jump=false;}
  ['fl','fr'].forEach(function(id){
    var button=document.getElementById(id),key=id==='fl'?'left':'right';
    var activePointer=null;
    ['contextmenu','selectstart','dragstart'].forEach(function(event){button.addEventListener(event,function(e){e.preventDefault();});});
    button.addEventListener('touchstart',function(e){e.preventDefault();},{passive:false});
    button.addEventListener('pointerdown',function(e){
      e.preventDefault();activePointer=e.pointerId;fKeys[key]=true;button.setPointerCapture(e.pointerId);
    });
    function release(e){if(activePointer===e.pointerId){fKeys[key]=false;activePointer=null;}}
    ['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(function(event){button.addEventListener(event,release);});
    button.addEventListener('pointermove',function(e){
      var r=button.getBoundingClientRect();
      if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)release(e);
    });
  });
  window.addEventListener('blur',function(){resetFallKeys();pauseFall();});
  document.addEventListener('visibilitychange',function(){if(document.hidden)resetFallKeys();});



  try{if(gameStorage.getItem('llk4_inf')==='1')infUnlocked=true;}catch(e){}
  preload(function(){var home=document.getElementById('hhome'),keepCover=home&&home.classList.contains('show-cover');showLS();if(keepCover)home.classList.add('show-cover');initPrototypePanel();});
});



function switchPrototypeState(state){
  if(state==='welcome'){window.previewPersonalityIntro();return;}
  clearInterval(timer);clearTimeout(comboTimer);clearHintBlink();gameEpoch++;gameState='idle';
  fAlive=false;cancelAnimationFrame(fAnimId);stopFallBGM();fKeys.left=fKeys.right=fKeys.jump=false;
  ['ov','qs','fs','ps','inf'].forEach(function(id){document.getElementById(id).classList.remove('show');});
  var intro=document.getElementById('journey-intro');if(intro.open)intro.close();
  previewProgress=state==='real'?null:{};journeySeen=false;infUnlocked=false;infModeActive=false;curLevel=0;
  var status=document.getElementById('prototype-status');
  status.textContent=state==='real'?'真实进度（已退出预览）':'预览中 · 不保存到真实进度';
  if(state==='real'){showLS();return;}
  if(state==='fresh-home'){window.previewUntestedHome();return;}
  if(state==='first'){showLS();startLevel(0);return;}
  journeySeen=true;gameStorage.setItem('llk_journey_v1','1');
  if(['complete','unlocked','endless','poster'].includes(state)){
    var save={};LEVELS.forEach(function(_,i){save['c'+i]=3;});setSave(save);
    window.hybridPreview?.seedCompletedPreview();
  }
  if(['unlocked','endless'].includes(state)){infUnlocked=true;gameStorage.setItem('llk4_inf','1');}
  showLS();
  if(state==='endless'){infModeActive=true;infRound=1;startInfLevel(Math.floor(Math.random()*INF_LEVELS.length));}
  else if(state==='endless-win'&&window.hybridPreview){hybridPreview.previewEndlessWin();}
  else if(state==='normal-win'&&window.hybridPreview){hybridPreview.previewWin();}
  else if(state==='complete'&&window.hybridPreview){hybridPreview.previewWin(true);}
  else if(state==='normal-win'){startLevel(0);score=320;timeLeft=22;endGame(true);}
  else if(state==='complete'){startLevel(LEVELS.length-1);score=1000;endGame(true);}
  else if(state==='poster'){curLevel=LEVELS.length-1;score=1000;showPosterScreen();}
  else if(state==='quiz'){hybridPreview.previewQuiz();}
  else if(state==='fall'){curLevel=0;startFall(QUIZ[0].charId);}
  else if(state==='timeout'){startLevel(0);timeLeft=0;endGame(false);}
}
function initPrototypePanel(){
  if(!['127.0.0.1','localhost','::1','[::1]','192.168.1.6'].includes(location.hostname))return;
  var panel=document.createElement('details');panel.id='prototype-panel';
  panel.innerHTML='<summary>🛠 原型预览 · 切换状态</summary><p id="prototype-status">真实进度</p><div class="prototype-actions"></div>';
  var actions=[['fresh-home','首次进入首页 · 未做测试'],['welcome','首次进入 · 人格小测邀请'],['first','首次进入第一关'],['normal-win','普通关卡通关'],['complete','全部通关结算'],['unlocked','已解锁无尽 · 首页'],['endless','直接玩无尽模式'],['endless-win','无尽模式 · 通关结算'],['quiz','MBTI答题'],['fall','下楼挑战'],['poster','通关海报'],['timeout','时间到结算'],['real','退出预览 · 真实进度']];
  actions.forEach(function(item){var b=document.createElement('button');b.type='button';b.textContent=item[1];b.addEventListener('click',function(){switchPrototypeState(item[0]);panel.open=false;});panel.querySelector('.prototype-actions').appendChild(b);});
  document.body.appendChild(panel);
}

// Keep compact mobile toolbar labels synchronized with live control states.
window.addEventListener('DOMContentLoaded',function(){
  var toolbar=document.getElementById('ctrl');
  function syncToolbar(){
    ['sound-toggle','bh','pause','bsf','br'].forEach(function(id){
      var button=document.getElementById(id),label=button.textContent;
      button.setAttribute('aria-label',label);
      var icon=id==='sound-toggle'?(label.includes('关')?'🔇':'🔊'):id==='bh'?'💡':id==='pause'?(label.includes('继续')?'▶️':'⏸️'):id==='bsf'?'🔀':'🔄';
      button.dataset.icon=icon;
      button.dataset.caption=id==='sound-toggle'?(label.includes('关')?'声音关':'声音开'):id==='bh'?'提示':id==='pause'?(label.includes('继续')?'继续':'暂停'):id==='bsf'?'洗牌':'重开';
      if(id==='bh'){var count=label.match(/剩余(\d+)/);button.dataset.count=count?count[1]:'0';}
    });
  }
  syncToolbar();new MutationObserver(syncToolbar).observe(toolbar,{subtree:true,childList:true,characterData:true});
});

window.addEventListener('DOMContentLoaded',function(){
 document.getElementById('fall-pause').onclick=function(){if(fPaused)resumeFall();else pauseFall();};
 document.getElementById('fall-back').onclick=leaveFall;
 document.addEventListener('visibilitychange',function(){if(document.hidden)pauseFall();});
 window.addEventListener('blur',pauseFall);
});

window.addEventListener('DOMContentLoaded',function(){
  var dialog=document.getElementById('rules-dialog'),resumeAfterRules=false;
  document.getElementById('rules-open').addEventListener('click',function(){
    resumeAfterRules=gameState==='playing';if(resumeAfterRules)pauseGame();dialog.showModal();
  });
  document.getElementById('rules-close').addEventListener('click',function(){dialog.close();});
  dialog.addEventListener('click',function(e){if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',function(){if(resumeAfterRules&&gameState==='paused'&&!document.hidden)togglePause();resumeAfterRules=false;});
});

function setResultTitle(value){
  document.getElementById('ot').textContent=value.replace(/[！!。]+$/,'');
}

function openGameShare(withPoster,levelData){shareArchiveRecord=withPoster&&!levelData?posterArchiveRecord:null;trackGameEvent(withPoster?'poster_share_click':'share_click');
  var dialog=document.getElementById('share-dialog');
  var mbti=document.getElementById('pmi').value.trim().toUpperCase();
  document.getElementById('share-heading').textContent=withPoster?'分享我的通关海报':'邀请朋友来试玩';
  var image=document.getElementById('share-poster-image');
  image.hidden=!withPoster;
  if(withPoster)image.src=levelData?levelData.image:document.getElementById('pc2').toDataURL('image/png');
  document.getElementById('download-poster').hidden=!withPoster;
  document.getElementById('invite-copy').value='我是'+mbti+'，我的人格冒险通关啦！🎉\n欢迎来试玩：https://mbti-veki.netlify.app/';
  document.getElementById('share-help').textContent=withPoster?'长按海报保存到相册，再发给朋友或朋友圈。朋友可以长按识别海报二维码进入游戏。':'复制下面的文案发给朋友；在微信中也可点击右上角“…”分享游戏链接。';
  document.getElementById('share-feedback').textContent='';
  if(levelData){document.getElementById('share-heading').textContent='分享单关成绩';document.getElementById('invite-copy').value=levelData.invite;}
  dialog.showModal();dialog.scrollTop=0;
}

var mbtiPickerGroup='I';
function closeMbtiPicker(){document.getElementById('mbti-menu').hidden=true;document.getElementById('mbti-trigger').setAttribute('aria-expanded','false');}
function renderMbtiOptions(group){
 mbtiPickerGroup=group;
 var groups={I:['INTJ','INTP','INFJ','INFP','ISTJ','ISTP','ISFJ','ISFP'],E:['ENTJ','ENTP','ENFJ','ENFP','ESTJ','ESTP','ESFJ','ESFP']};
 document.querySelectorAll('.mbti-tabs button').forEach(function(b){b.classList.toggle('active',b.dataset.group===group);b.setAttribute('aria-pressed',String(b.dataset.group===group));});
 var grid=document.getElementById('mbti-options');grid.replaceChildren();
 groups[group].forEach(function(code){var b=document.createElement('button');b.type='button';var strong=document.createElement('strong');strong.textContent=code;var name=document.createElement('span');name.textContent=MBTI_INFO[code].title;b.append(strong,name);b.classList.toggle('selected',document.getElementById('pmi').value===code);b.onclick=function(){document.getElementById('pmi').value=code;validateMB(code);closeMbtiPicker();document.getElementById('mbti-trigger').focus();};grid.append(b);});
}
function setupMbtiPicker(){
 closeMbtiPicker();document.getElementById('mbti-choice').textContent='请选择 MBTI 类型';
 document.getElementById('mbti-trigger').onclick=function(){var menu=document.getElementById('mbti-menu');if(!menu.hidden){closeMbtiPicker();return;}var current=document.getElementById('pmi').value;renderMbtiOptions(current?current[0]:mbtiPickerGroup);menu.hidden=false;this.setAttribute('aria-expanded','true');};
 document.querySelectorAll('.mbti-tabs button').forEach(function(b){b.onclick=function(){renderMbtiOptions(b.dataset.group);};});
}
document.addEventListener('click',function(e){if(!e.target.closest('#mbti-picker'))closeMbtiPicker();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!document.getElementById('mbti-menu').hidden){closeMbtiPicker();document.getElementById('mbti-trigger').focus();}});

function updateFallPauseButton(paused){
 var button=document.getElementById('fall-pause');
 button.setAttribute('aria-label',paused?'继续挑战':'暂停挑战');button.title=paused?'继续挑战':'暂停挑战';
 button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#62a7ff"/>'+(paused?'<path d="M9 6.5 17 12 9 17.5Z" fill="white"/>':'<path d="M8 7h3v10H8zm5 0h3v10h-3z" fill="white"/>')+'</svg>';
}

function updateAchievementActions(){
 var progress=getSave(),choice=document.getElementById('share-level-choice'),cleared=LEVELS.map(function(_,i){return i;}).filter(function(i){return progress['c'+i]>0;});
 choice.replaceChildren();cleared.forEach(function(i){var o=document.createElement('option');o.value=i;o.textContent='第'+(i+1)+'关 · '+LEVELS[i].name;choice.append(o);});
 document.getElementById('reopen-poster').hidden=cleared.length!==LEVELS.length;
 choice.hidden=!cleared.length;document.getElementById('share-level-home').hidden=!cleared.length;
 document.getElementById('achievement-actions').hidden=!cleared.length;
 document.getElementById('reopen-poster').onclick=showPosterScreen;
 document.getElementById('share-level-home').onclick=function(){shareSingleLevel(Number(choice.value),false);};
 document.getElementById('share-level-result').onclick=function(){shareSingleLevel(curLevel,true);};
}
async function shareSingleLevel(index,current,round){
 var progress=getSave();if(!progress['c'+index])return;
 await shareQrImage.decode();
 var lv=LEVELS[index],best=getLevelScores()['c'+index],value=round?round.score:current?score:best,stars=round?round.stars:current?calcStars(true):progress['c'+index],maximum=getScoreCeiling(lv.grid.flat().filter(Boolean).length,lv.time);

 var c=document.createElement('canvas');c.width=1440;c.height=1920;var x=c.getContext('2d');x.scale(3,3);
 const paper='#fffaf0',blue='#294ba4',ink='#233453',gold='#ffcf51';
 x.fillStyle='#e9e1cd';x.fillRect(0,0,480,640);
 function box(a,b,w,h,color,r=12){x.fillStyle=color;prr(x,a,b,w,h,r);x.fill();}
 function text(t,a,b,size,color=ink,weight=600){x.fillStyle=color;x.font=weight+' '+size+'px system-ui';x.textAlign='left';x.fillText(t,a,b);}
 box(12,12,456,616,paper,14);
 x.fillStyle='#e9e1cd';for(let i=28;i<460;i+=24){for(const y of [12,628]){x.beginPath();x.arc(i,y,5,0,Math.PI*2);x.fill();}}
 function centered(t,cx,cy,size,color=ink,weight=600){x.save();x.fillStyle=color;x.font=weight+' '+size+'px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(t,cx,cy);x.restore();}
 centered('MBTI 连连消',240,48,27,blue,800);
 centered('第 '+(index+1)+' 关 · '+lv.name,240,80,16,ink,650);
 const record=window.getCampaignShareRecord?.(index);
 const known=window.getKnownPersonalityIds?.()||new Set();
 const pool=lv.pool||[0,1,2,3];
 const candidate=record?.quiz??QUIZ[index]?.charId;
 const featured=pool.includes(candidate)?candidate:pool[(lv.step||0)%pool.length];
 const companions=pool.filter(id=>id!==featured).sort((a,b)=>Number(known.has(a))-Number(known.has(b)));
 const ids=[featured,...companions].slice(0,4);
 const portraits=await Promise.all(ids.map(async id=>{try{const im=new Image();im.src='character-hd/'+id+'.webp';await im.decode();return im;}catch{return charImgs[id];}}));
 box(28,103,424,204,'#e8eef8',16);
 const companionHeight=Math.min(90,...portraits.slice(1).filter(im=>im?.naturalWidth).map(im=>{const b=getCharacterBounds(im);return 60*b.h/b.w;}));
 ids.forEach((id,i)=>{const img=portraits[i],cx=i===0?102:219+(i-1)*92,w=i===0?122:72,h=i===0?174:companionHeight+44,top=i===0?117:291-(companionHeight+44);
   box(cx-w/2,top,w,h,i===0?'#d5e3fa':paper,10);
   if(img?.naturalWidth){const bounds=getCharacterBounds(img),scale=i===0?Math.min((w-16)/bounds.w,(h-48)/bounds.h):companionHeight/bounds.h;x.save();if(i>0&&!known.has(id)){x.filter='grayscale(1)';x.globalAlpha=.65;}x.drawImage(img,bounds.x,bounds.y,bounds.w,bounds.h,cx-bounds.w*scale/2,top+8,bounds.w*scale,bounds.h*scale);x.restore();}
   centered(CHAR_MBTI[id]||'',cx,top+h-26,i===0?17:12,blue,750);
   centered(i===0?'本关伙伴':known.has(id)?'已认识':'待解锁',cx,top+h-10,10,'#52647f',600);
 });
 box(28,319,424,76,'#edf2fb',12);
 text('图鉴已解锁',44,343,13,'#52647f');text(known.size+' / 16',143,345,20,blue,800);
 const mb=CHAR_MBTI[featured]||'';
 const status=record?.answered?'本关已认识 '+mb:'本关待认识 '+mb;
 x.save();x.textAlign='right';x.fillStyle=blue;x.font='600 13px system-ui';x.fillText(status,436,344);x.restore();
 box(44,362,392,12,'#d5dfed',6);if(known.size)box(44,362,392*Math.min(known.size,16)/16,12,'#587ebc',6);
 centered(current||round?'本次得分':'本关最高分',240,421,14,'#52647f');
 centered(value===undefined?'待补录':Number(value).toLocaleString(),240,461,48,blue,850);
 for(let i=0;i<3;i++){const cx=210+i*30,cy=504;x.beginPath();for(let j=0;j<10;j++){const angle=-Math.PI/2+j*Math.PI/5,r=j%2?5.5:12;const px=cx+Math.cos(angle)*r,py=cy+Math.sin(angle)*r;if(j===0)x.moveTo(px,py);else x.lineTo(px,py);}x.closePath();x.lineJoin='round';x.lineWidth=2;x.strokeStyle=i<stars?'#c89527':'#bdc7d6';x.fillStyle=i<stars?'#f5d67c':'#dbe2ec';x.stroke();x.fill();}
 box(28,532,424,80,'#eef2f8',12);
 centered('扫码挑战这一关',190,555,21,blue,750);
 centered('连起伙伴，一起摘星',190,578,14,'#526075');
 centered('mbti-veki.netlify.app',190,598,11,'#58616e',500);
 x.strokeStyle='#ccd6e4';x.lineWidth=1;x.beginPath();x.moveTo(350,544);x.lineTo(350,600);x.stroke();
 x.drawImage(shareQrImage,366,540,64,64);

 openGameShare(true,{image:c.toDataURL('image/png'),invite:'我通关了第'+(index+1)+'关「'+lv.name+'」'+(value===undefined?'！':'，获得'+value+'分！')+'🎉\n欢迎来试玩：https://mbti-veki.netlify.app/'});
}

async function saveShareImage(){trackGameEvent('poster_save_action');var savingRecord=shareArchiveRecord;function reportSave(event){if(savingRecord)recordAvatarSave(event,savingRecord);}reportSave('save_click');
 var image=document.getElementById('share-poster-image'),feedback=document.getElementById('share-feedback');
 var mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 function longPressSave(){reportSave('longpress_help');
  document.getElementById('share-help').textContent='长按下方图片，选择“保存图片”或“存储图像”，即可保存到手机相册。';
  feedback.textContent='请长按海报图片保存到相册。';
  image.scrollIntoView({behavior:'smooth',block:'start'});
 }
 if(/MicroMessenger/i.test(navigator.userAgent)){longPressSave();return;}
 if(mobile){
  try{
   var raw=atob(image.src.split(',')[1]),bytes=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
   var file=new File([bytes],'MBTI-poster.png',{type:'image/png'});
   if(navigator.canShare&&navigator.canShare({files:[file]})){
    reportSave('share_open');await navigator.share({files:[file]});reportSave('share_returned');
    feedback.textContent='如需保存到相册，请在系统面板中选择“存储图像”或相册选项。';return;
   }
  }catch(e){recordAvatarSave(e.name==='AbortError'?'share_cancel':'share_failed');if(e.name==='AbortError')return;}
  longPressSave();return;
 }
 var a=document.createElement('a');a.download='MBTI-poster.png';a.href=image.src;a.click();reportSave('download_started');feedback.textContent='图片已交给浏览器下载。';
}


// Prevent native selection only on play surfaces, never on poster/save dialogs.
['contextmenu','selectstart','dragstart','copy','cut','paste'].forEach(function(type){
 document.addEventListener(type,function(e){if(e.target.closest&&e.target.closest('#cv, #hg-board, #fs')&&!e.target.closest('input,textarea'))e.preventDefault();});
});

/* Pause safely while reading the fall challenge rules or scrolling away. */
window.addEventListener('DOMContentLoaded',function(){
 var screen=document.getElementById('fs'),rules=document.getElementById('fall-rules');
 function readingRules(){if(screen.classList.contains('show'))pauseFall();}
 rules.addEventListener('toggle',function(){if(rules.open)readingRules();});
 screen.addEventListener('scroll',function(){if(screen.scrollTop>8)readingRules();},{passive:true});
 document.getElementById('fall-pause').onclick=function(){
  if(!fAlive)return;
  if(fPaused){rules.open=false;screen.scrollTop=0;resumeFall();}else pauseFall();
 };
});
