/* Local preference quiz; results remain separate from campaign answers. */
(function(){
'use strict';
const key='llk_personality_result_v1',seen='llk_personality_intro_v1';
const personalityStorage={
 getItem:k=>previewProgress?.freshPersonality?(previewProgress[k]??null):localStorage.getItem(k),
 setItem:(k,v)=>{if(previewProgress?.freshPersonality)previewProgress[k]=String(v);else localStorage.setItem(k,v);},
 removeItem:k=>{if(previewProgress?.freshPersonality)delete previewProgress[k];else localStorage.removeItem(k);}
};
const pairs=['EI','SN','TF','JP'];
const questions=[['参加聚会之后，你通常更想？','继续与朋友聊天','独处一会儿'],['遇到新想法，你更习惯？','先说出来一起讨论','先自己想清楚'],['学习新东西时，你更想先看？','具体例子和步骤','原理和整体思路'],['听一个故事，你更关注？','实际发生的细节','背后的可能与联系'],['做决定时，你更看重？','一致的逻辑与原则','相关人的感受与价值'],['朋友遇到难题，你倾向先？','分析问题找办法','理解感受给支持'],['出门旅行，你更喜欢？','提前安排好行程','随心探索'],['处理日常任务，你更自然地？','按计划逐项完成','灵活调整节奏']];
let saved = null;
function readResult(includeExample = true) {
  try {
    const result = JSON.parse(personalityStorage.getItem(key));
    if (result && /^[IE][NS][TF][JP]$/.test(result.type)) return result;
  } catch {}
  return includeExample ? previewProgress?.demoPersonality || null : null;
}
saved = readResult();
let answers=[],position=0,letters=[],ties=[];
const draftKey = 'llk_personality_draft_v1';
function readDraft() {
  try {
    const draft = JSON.parse(personalityStorage.getItem(draftKey));
    if (!draft || !Number.isInteger(draft.position) || draft.position < 0 || draft.position > 8) return null;
    if (!Array.isArray(draft.answers) || draft.answers.length < draft.position || draft.answers.length > 8 ||
        !draft.answers.every(answer => answer === -1 || answer === 1)) return null;
    if (draft.position === 8 && (!Array.isArray(draft.letters) || draft.letters.length !== 4 ||
        !draft.letters.every((letter,i) => pairs[i].split('').includes(letter)) ||
        !Array.isArray(draft.ties) || !draft.ties.length ||
        !draft.ties.every(i => Number.isInteger(i) && i >= 0 && i < 4))) return null;
    return draft;
  } catch { return null; }
}
function saveDraft() {
  personalityStorage.setItem(draftKey, JSON.stringify({position, answers, letters, ties}));
  personalityStorage.setItem(seen, '1');
}
function resumeDraft() {
  const draft = readDraft();
  if (!draft) return false;
  ({position, answers, letters, ties} = draft);
  if (position === questions.length) confirmTie();
  else question();
  return true;
}
const dialog=document.createElement('dialog');dialog.id='personality-dialog';document.body.append(dialog);
const entry=document.createElement('button');entry.id='personality-entry';entry.type='button';
function label(){entry.classList.toggle('personality-untested',!saved);entry.innerHTML=(saved?portrait(MBTI_TO_CHAR[saved.type])+'<span class="discovery-copy"><small>我的测试结果</small><strong>'+saved.type+'</strong><small>查看结果 · 重新测试</small></span>':'<span class="discovery-icon" aria-hidden="true"><svg viewBox="0 0 64 72" aria-hidden="true"><path fill="#458d80" d="M10 14 45 10 54 17v47l-37 2-7-6Z"/><path fill="#aad7c7" d="m15 12 35 3v45l-35 2Z"/><path fill="#f2fbf5" d="m19 18 26 2v35l-26 2Z"/><rect x="23" y="10" width="18" height="10" rx="4" fill="#75b7a4"/><path d="m23 29 3 3 5-6m-8 17 3 3 5-6" fill="none" stroke="#458d80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 30h6M35 43h6" stroke="#aad7c7" stroke-width="3" stroke-linecap="round"/><path fill="#dcb858" d="m43 55 12-27 5 3-12 27-6 4Z"/><path fill="#fff0bf" d="m55 28 3-6 5 3-3 6Z"/><path fill="#458d80" d="m43 55-1 7 6-4Z"/></svg></span><span class="discovery-copy"><small>发现你的性格偏好</small><strong>MBTI测试</strong><small>8 道小题 · 约 1 分钟</small></span>')+'<span class="discovery-arrow" aria-hidden="true">→</span>';entry.setAttribute('aria-label',saved?'查看我的人格测试结果 '+saved.type:'认识自己，开始8道人格小测');}
function syncEntryActions(){const row=document.getElementById('cover-test-actions');if(!row)return;row.replaceChildren();if(saved){[['查看结果',result],['重新测试',retest]].forEach(([title,action])=>{const b=document.createElement('button');b.type='button';b.textContent=title;b.onclick=action;row.append(b);});}else{const b=document.createElement('button');b.type='button';b.textContent=readDraft()?'继续测试':'开始测试';b.onclick=()=>entry.click();row.append(b);}}
function refreshEntry() {
  saved = readResult();
  label();
  syncEntryActions();
  const draft = readDraft();
  if (draft) {
    const progress = draft.position === 8 ? '继续确认偏好' : '继续第 ' + (draft.position + 1) + ' / 8 题';
    entry.querySelector('.discovery-copy small:last-child').textContent = progress;
    entry.setAttribute('aria-label', progress);
  }
}
refreshEntry();
window.addEventListener('campaign-home', refreshEntry);
window.addEventListener('pageshow', refreshEntry);
window.addEventListener('storage', event => {
  if (event.key === key || event.key === draftKey || event.key === null) refreshEntry();
});
const discovery=document.createElement('div');discovery.className='personality-discovery';document.getElementById('cover-shortcuts').append(discovery);discovery.append(entry);
const atlasButton=document.createElement('button');atlasButton.id='personality-atlas';atlasButton.type='button';atlasButton.innerHTML='<span class="atlas-symbol discovery-icon" aria-hidden="true">✦</span><span class="discovery-copy"><small>认识每一位伙伴</small><strong>16 人格图鉴</strong><small>四色角色 · 查看全部</small></span><span class="discovery-arrow" aria-hidden="true">→</span>';discovery.append(atlasButton);
const testCard=document.createElement('div');testCard.className='cover-entry-card';entry.before(testCard);testCard.append(entry);const testActions=document.createElement('div');testActions.id='cover-test-actions';testActions.className='cover-entry-actions';testCard.append(testActions);syncEntryActions();
const atlasCard=document.createElement('div');atlasCard.className='cover-entry-card';atlasButton.before(atlasCard);atlasCard.append(atlasButton);const atlasActions=document.createElement('div');atlasActions.className='cover-entry-actions';const atlasOpen=document.createElement('button');atlasOpen.type='button';atlasOpen.id='cover-atlas-open';atlasOpen.textContent='查看图鉴';atlasOpen.onclick=()=>atlasButton.click();atlasActions.append(atlasOpen);atlasCard.append(atlasActions);
atlasButton.querySelector('.discovery-icon').innerHTML='<svg viewBox="0 0 64 72" aria-hidden="true"><path fill="#e9dff5" d="M5 16Q17 9 31 16Q46 9 59 16V59Q45 54 32 62Q18 54 5 59Z"/><path fill="#8060ac" d="M4 20Q18 14 31 21V63Q17 56 4 61Z"/><path fill="#a58ac6" d="M33 21Q46 14 60 20V61Q47 56 33 63Z"/><path fill="#f7f1ff" d="M9 15Q20 12 29 18V53Q18 48 9 52ZM35 18Q46 12 55 15V52Q44 48 35 53Z"/><path fill="#c5acdf" d="m13 24 12 3v4l-12-3Zm0 10 12 3v3l-12-3Zm26-9 12-3v4l-12 3Zm0 10 12-3v3l-12 3Z"/><path fill="#8462b4" d="M29 18h6v45h-6Z"/><path fill="#dcb858" d="m43 42 4-1v16l-2-2-2 3Z"/></svg>' ;
const atlas=document.createElement('dialog');atlas.id='personality-atlas-dialog';atlas.innerHTML='<header><div class="atlas-title"><h2 class="atlas-book-title"><span class="atlas-title-number">16</span><span>人格图鉴</span></h2><div class="atlas-progress" role="progressbar" aria-label="已认识的人格" aria-valuemin="0" aria-valuemax="16"><i class="atlas-ring" aria-hidden="true"></i><span>已认识<b></b></span></div></div><button type="button" aria-label="关闭图鉴"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><p>从形象认识名字，发现不同的性格偏好。</p><div class="atlas-groups"></div>';document.body.append(atlas);atlas.querySelector('header button').onclick=()=>atlas.close();atlasButton.onclick=()=>atlas.showModal();
// Crop the transparent margins so every visible portrait starts at the text inset.
const atlasViewBoxes = ["77 32 370 447", "122 32 196 430", "129 31 239 453", "118 34 271 451", "156 35 193 425", "118 39 243 419", "99 32 304 449", "104 31 296 446", "126 24 240 460", "45 46 421 425", "114 44 284 428", "101 28 253 455", "129 31 213 450", "145 19 163 462", "111 36 295 442", "101 27 301 457"];
function atlasPortrait(id) {
  return '<svg class="atlas-portrait" aria-hidden="true" viewBox="' + atlasViewBoxes[id] + '" preserveAspectRatio="xMinYMid meet"><image href="character-hd/' + id + '.webp" width="512" height="512"/></svg>';
}
function atlasDescription(type) {
  const phrases = MBTI_INFO[type].desc.replace(/。$/, '').match(/[^，]+，?/g) || [];
  return phrases.map(phrase => '<span class="atlas-phrase">'+phrase+'</span>').join('');
}
[['紫人 · NT','#bd9aef',['INTJ','INTP','ENTJ','ENTP']],['绿人 · NF','#83cda6',['INFJ','INFP','ENFJ','ENFP']],['蓝人 · SJ','#86b8ef',['ISTJ','ISFJ','ESTJ','ESFJ']],['黄人 · SP','#ebce78',['ISTP','ISFP','ESTP','ESFP']]].forEach(([name,color,types])=>{const section=document.createElement('section');section.style.setProperty('--atlas-color',color);section.innerHTML='<h3>'+name+'</h3><div class="atlas-grid">'+types.map(type=>'<article data-character="'+MBTI_TO_CHAR[type]+ '">'+atlasPortrait(MBTI_TO_CHAR[type])+'<strong>'+PERSONALITY_NAMES[type]+'</strong><span>'+type+'</span><p>'+atlasDescription(type)+'</p></article>').join('')+'</div>';atlas.querySelector('.atlas-groups').append(section);});
const atlasProgress = atlas.querySelector('.atlas-progress');
atlas.querySelector(':scope > p').after(atlasProgress);
function refreshAtlas() {
  const known = window.getKnownPersonalityIds();
  const progress = '已认识 ' + known.size + ' / 16';
  atlasButton.querySelector('.discovery-copy small:last-child').hidden = true;
  atlasOpen.innerHTML = '<span>查看图鉴</span><small>' + known.size + ' / 16</small>';
  atlasOpen.setAttribute('aria-label','查看图鉴，'+progress);
  atlas.querySelector('.atlas-progress b').innerHTML = '<em class="atlas-known-count">' + known.size + '</em><em class="atlas-count-total"> / 16</em>';
  atlasProgress.setAttribute('aria-valuenow', known.size);
  atlas.querySelector('.atlas-ring').innerHTML=Array.from(atlas.querySelectorAll('.atlas-grid article')).map(card=>'<i class="atlas-progress-cell '+(known.has(Number(card.dataset.character))?'is-known':'')+'" style="--cell-color:'+card.closest('section').style.getPropertyValue('--atlas-color')+'"></i>').join('');
  atlasProgress.style.setProperty('--atlas-complete', (known.size / 16 * 100) + '%');
  atlas.querySelector(':scope > p').textContent = '闯关答对人格题，即可点亮对应角色';
  for (const card of atlas.querySelectorAll('[data-character]')) {
    const unlocked = known.has(Number(card.dataset.character));
    card.classList.toggle('atlas-locked', !unlocked);
    card.setAttribute('aria-label', card.querySelector('strong').textContent + (unlocked ? '，已认识' : '，未解锁'));
  }
}
refreshAtlas();
window.addEventListener('campaign-home', refreshAtlas);
atlasButton.onclick = () => { refreshAtlas(); atlas.showModal(); };
entry.onclick = () => { if (!resumeDraft()) saved ? result() : intro(); };
function view(title,body,actions){dialog.classList.remove('personality-intro');dialog.dataset.page='';dialog.innerHTML='<button class="personality-close" aria-label="关闭弹窗">×</button><h2>'+title+'</h2>'+body+'<div class="personality-actions"></div><small>趣味偏好小测 · 非正式 MBTI 测评</small>';dialog.querySelector('.personality-close').onclick=close;for(const [text,fn] of actions){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=fn;dialog.querySelector('.personality-actions').append(b);}if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
function close(){personalityStorage.setItem(seen,'1');dialog.close();}
function intro(){view('开局之前，先认识一下你？','<p>8 道小题，约 1 分钟。选择第一直觉的想法，没有标准答案。</p><div class="personality-ensemble" role="img" aria-label="四种颜色的人格伙伴，代表多样偏好"><img alt="" src="character-hd/0.webp"><img alt="" src="character-hd/6.webp"><img alt="" src="character-hd/8.webp"><img alt="" src="character-hd/14.webp"></div>',[['认识自己 · 开始小测',explain],['先不做，直接开始游戏',()=>{close();startLevel(0);}]]);dialog.classList.add('personality-intro');}
function explain(){view('四个字母，<br>多一个认识自己的角度','<div class="pq-info"><div class="pq-mbti-mark" role="img" aria-label="四组偏好，组合成多样人格"><span>E I</span><span>S N</span><span>T F</span><span>J P</span></div><div><h3>MBTI 从哪里来？</h3><p>布里格斯和迈尔斯母女基于荣格的心理类型理论开发了 MBTI，用四组偏好描述 16 种人格类型。</p></div></div><dl class="pq-card pq-axes"><div class="pq-axis"><dt>充电方式</dt><dd><span><b>E</b>与人互动</span><span class="pq-axis-or" aria-hidden="true">↔</span><span>独处休息<b>I</b></span></dd></div><div class="pq-axis"><dt>关注信息</dt><dd><span><b>S</b>具体事实</span><span class="pq-axis-or" aria-hidden="true">↔</span><span>可能与联系<b>N</b></span></dd></div><div class="pq-axis"><dt>做决定</dt><dd><span><b>T</b>逻辑与原则</span><span class="pq-axis-or" aria-hidden="true">↔</span><span>价值与感受<b>F</b></span></dd></div><div class="pq-axis"><dt>安排生活</dt><dd><span><b>J</b>提前计划</span><span class="pq-axis-or" aria-hidden="true">↔</span><span>灵活调整<b>P</b></span></dd></div></dl><div class="pq-info"><div class="pq-mini">💬</div><div><h3>一种社交符号</h3><p>用四个字母聊聊彼此的习惯，初次见面也容易打开话题。</p></div></div><div class="pq-info"><div class="pq-mini">🧭</div><div><h3>用来理解，不用来定性</h3><p>偏好不分好坏，换个情境，你也可能有不同的选择。</p></div></div>',[['明白了，开始测试',()=>{answers=[];position=0;letters=[];ties=[];question();}]]);dialog.dataset.page='explain';const infos=dialog.querySelectorAll('.pq-info');const columns=document.createElement('div');columns.className='pq-info-columns';infos[1].before(columns);columns.append(infos[1],infos[2]);}
function portrait(id){return '<img alt="人格伙伴插画" src="character-hd/'+id+'.webp">';}
// Each question has a distinct pair; all 16 types appear once, ordered by its dimension.
const questionPortraits=[['ENFP','INFJ'],['ESTP','ISTJ'],['ISFJ','ENTP'],['ESFP','INTJ'],['ENTJ','INFP'],['INTP','ESFJ'],['ENFJ','ISTP'],['ESTJ','ISFP']];
function question(){saveDraft();const q=questions[position],d=Math.floor(position/2),types=questionPortraits[position],art=[MBTI_TO_CHAR[types[0]],MBTI_TO_CHAR[types[1]],['💬 ↔ ☕','📋 ↔ 💡','⚖️ ↔ 💚','🗓️ ↔ ✨'][d]];
view(q[0],'<div class="pq-kicker">你的日常，就是线索</div><progress max="8" value="'+position+'"></progress><p class="pq-count">第 '+(position+1)+' / 8 题</p><div class="pq-art">'+portrait(art[0])+'<span>'+art[2]+'</span>'+portrait(art[1])+'</div><div class="pq-options" role="group" aria-label="选择偏好"></div>',position ? [['上一题', () => { position--; question(); }]] : []);
dialog.dataset.page = 'question';
const heading = dialog.querySelector('h2');
dialog.querySelector('.pq-count').after(heading);
if (!position) dialog.querySelector('.personality-actions').remove();
[-1, 1].forEach((value, index) => {
  const option = document.createElement('button');
  option.type = 'button';
  option.textContent = q[index + 1];
  option.setAttribute('aria-pressed', String(answers[position] === value));
  option.onclick = () => choose(value);
  dialog.querySelector('.pq-options').append(option);
});
}
function choose(value){answers[position]=value;if(++position<8)return question();letters=[];ties=[];pairs.forEach((pair,i)=>{const score=answers[i*2]+answers[i*2+1];letters[i]=score<0?pair[0]:pair[1];if(score===0)ties.push(i);});confirmTie();}
function confirmTie(){if(!ties.length)return finish();saveDraft();const i=ties.shift();view('这项偏好比较接近','<p>请选择平时更自然的一边，不随机决定你的结果。</p>',[[pairs[i][0]+' · '+questions[i*2][1],()=>{letters[i]=pairs[i][0];confirmTie();}],[pairs[i][1]+' · '+questions[i*2][2],()=>{letters[i]=pairs[i][1];confirmTie();}]]);dialog.dataset.page='tie';}
function finish(){saved={type:letters.join(''),answers:answers.slice()};personalityStorage.setItem(key,JSON.stringify(saved));personalityStorage.removeItem(draftKey);personalityStorage.setItem(seen,'1');window.dispatchEvent(new CustomEvent('personality-result',{detail:saved.type}));label();
result();}
// Published percentages, Table 3 (global comparison sample), MBTI Global Manual 2018.
const globalTypePercent = {
  ISTJ:15.9, ISFJ:8.4, INFJ:2.3, INTJ:2.6,
  ISTP:9.8, ISFP:6.6, INFP:6.3, INTP:4.8,
  ESTP:6.1, ESFP:6.0, ENFP:8.2, ENTP:4.3,
  ESTJ:9.0, ESFJ:5.7, ENFJ:2.2, ENTJ:1.8
};
function frequencyNote(type) {
  const percent=globalTypePercent[type];
  return `<details class="pq-frequency"><summary>稀有度参考 · 全球样本占比 <strong>${percent.toFixed(1)}%</strong></summary><p>在 16,773 名受测者中，平均每 1,000 人约有 ${Math.round(percent*10)} 人的结果为 ${type}。占比会随抽样地区和人群而变化。</p><a href="assets/reference/mbti-table-page6.png" target="_blank" rel="noopener noreferrer">查看占比原表（原文第 6 页）</a></details>`;
}
function result(){const id=MBTI_TO_CHAR[saved.type],labels=[['E 与人互动充电','独处充电 I'],['S 具体信息','可能与联系 N'],['T 逻辑原则','价值与感受 F'],['J 提前安排','保留弹性 P']];view('我的人格','<div class="pq-result"><span class="pq-tag">本次更偏向</span><div class="pq-art">'+portrait(id)+'</div><div class="pq-type">'+saved.type+'</div><h3>'+MBTI_INFO[saved.type].title+'</h3><p>'+MBTI_INFO[saved.type].desc+'</p>'+frequencyNote(saved.type)+'</div><div class="pq-card">'+pairs.map((pair,i)=>'<div class="pq-scale">'+labels[i].map((text,j)=>'<span class="'+(saved.type[i]===pair[j]?'active':'')+'">'+text+'</span>').join('')+'</div>').join('')+'</div><div class="pq-note">这是这次回答呈现的偏好，不是能力评分。<br>倾向接近时，会先请你确认，不随机定性。</div>',[['带着好奇心，开始闯关 →', () => { close(); startLevel(0); }],['重新测试',retest]]);dialog.dataset.page='result';}
function retest(){view('想重新测一次？','<span class="pq-tag">换个时刻，再认识自己</span><div class="pq-art">'+portrait(MBTI_TO_CHAR[saved.type])+'</div><div class="retest-guidance"><p>测完更新人格结果，中途退出保留原结果。</p><p>关卡进度、星星和成绩都会保留。</p></div>',[['开始重新测试',explain],['保留结果，先不测',close]]);dialog.dataset.page='retest';}
window.posterTestResult = () => readResult(false)?.type || '';
dialog.addEventListener('close', refreshEntry);
window.previewUntestedHome=()=>{previewProgress={freshPersonality:true};document.querySelectorAll('dialog[open]').forEach(d=>d.close());showLS();document.getElementById('hhome').classList.add('show-cover');refreshEntry();refreshAtlas();window.scrollTo(0,0);};
window.previewPersonalityIntro=()=>{previewProgress={};showLS();intro();};
window.addEventListener('DOMContentLoaded',()=>{if(!personalityStorage.getItem(seen)&&!saved&&!document.getElementById('ps').classList.contains('show'))intro();});
})();

