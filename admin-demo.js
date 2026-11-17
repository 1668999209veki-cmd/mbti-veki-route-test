window.includeChannelVisit = function(record) {
  const host = String(record.referrerHost || "").toLowerCase().replace(/\.$/, "");
  const local = host === "localhost" || host.endsWith(".localhost") || /^127(?:\.\d{1,3}){3}$/.test(host) || host === "[::1]" || host === "::1";
  return !record.owner && !local;
};
window.analyticsSourceLabel=function(r){
 const known={wechat:'微信',channels:'视频号',xiaohongshu:'小红书',douyin:'抖音'};
 if(known[r.source]){const entries={private_chat:'好友私聊',moments:'朋友圈',group_01:'运营群 01'};if(r.source==='wechat')return '微信 · '+(entries[r.entry]||('入口 '+r.entry))+'（标记）';return known[r.source]+' · '+r.entry+'（标记）';}
 if(r.referrerHost==='mbti-veki.netlify.app')return '本站跳转';
 if(r.environment==='wechat')return '微信内打开 · 渠道未知';
 if(!r.environment||r.environment==='unknown')return '早期未采集';
 if(r.environment==='browser'&&!r.referrerHost)return '普通浏览器 · 无来源';
 if(r.referrerHost)return '外部来源 · '+r.referrerHost;
 return '其他环境 · 渠道未知';
};
// Fictional data only. Never uploaded or used as a fallback for failed requests.
window.makeAnalyticsDemo=function(date){
 const channels=[['wechat','private_chat'],['wechat','moments'],['wechat','group_01'],['xiaohongshu','note_01'],['douyin','video_01'],['channels','video_02'],['unknown','direct']];
 const nicknames=['小满','阿栗','','可乐','小舟','','一颗橙子','木木'];
 return Array.from({length:48},(_,i)=>{const c=channels[i%channels.length],playing=i%4!==0,seconds=playing?80+(i*47)%700:0;return {device:i%5===0?'desktop':i%11===0?'tablet':'mobile',visitor:'demo'+String(i%36).padStart(4,'0'),session:'demo-session-'+i,source:c[0],entry:c[1],nickname:nicknames[i%8],environment:c[0]==='wechat'||c[0]==='channels'?'wechat':'browser',referrerHost:'',firstSeen:date+'T'+String(8+Math.floor(i/4)).padStart(2,'0')+':05:00+08:00',received:new Date(Date.parse(date+'T'+String(8+Math.floor(i/4)).padStart(2,'0')+':05:00+08:00')+(seconds+30+(i*13)%90)*1000).toISOString(),pageSeconds:seconds+30+(i*13)%90,activeSeconds:seconds+(playing?20:0),seconds,pageClicks:playing?35+i*4:2,clicks:playing?30+i*4:0,starts:playing?1+i%4:0,wins:playing?i%3:0,owner:i%36<2};});
};
window.renderAnalyticsOverview=function(records){
 const root=document.getElementById('summary');root.replaceChildren();const sum=k=>records.reduce((n,r)=>n+(r[k]||0),0);const users=new Set(records.map(r=>r.visitor)).size;const players=new Set(records.filter(r=>r.starts>0).map(r=>r.visitor)).size;
 const tracked=records.filter(r=>r.pageSeconds!=null);const average=tracked.length?Math.round(tracked.reduce((n,r)=>n+r.pageSeconds,0)/tracked.length):null;
 const cards=[['匿名浏览器',String(users),'按浏览器编号去重，不等于真实人数'],['实际开玩浏览器',String(players),'至少开始过一个连连看关卡'],['每次平均停留',average===null?'—':Math.floor(average/60)+'分'+average%60+'秒','仅基于已采集停留时间的访问'],['页面触按',records.some(r=>r.pageClicks!=null)?sum('pageClicks').toLocaleString():'—','包含游戏页上的触按，非有效操作数']];
 for(const [label,value,note] of cards){const card=document.createElement('div');card.className='metric';for(const [className,text] of [['metric-label',label],['metric-value',value],['metric-note',note]]){const e=document.createElement('div');e.className=className;e.textContent=text;card.append(e);}root.append(card);}
 const channelRecords=records.filter(window.includeChannelVisit);const chart=document.getElementById('channel-chart');chart.replaceChildren();const labels=[...new Set(channelRecords.map(window.analyticsSourceLabel))];for(const source of labels){const count=channelRecords.filter(r=>window.analyticsSourceLabel(r)===source).length;const row=document.createElement('div');row.className='bar-row';const label=document.createElement('span');label.textContent=source;const track=document.createElement('div');track.className='bar-track';const fill=document.createElement('div');fill.className='bar-fill';fill.style.width=(channelRecords.length?count/channelRecords.length*100:0)+'%';track.append(fill);const value=document.createElement('b');value.textContent=count+' 次';row.append(label,track,value);chart.append(row);}
 const endlessPlayers=new Set(records.filter(r=>r.events?.endless_start>0||r.events?.endless_after_complete>0||r.events?.endless_returning_complete>0).map(r=>r.visitor).filter(Boolean));
 const unlockedPlayers=new Set([...endlessPlayers,...records.filter(r=>r.events?.endless_unlocked>0).map(r=>r.visitor).filter(Boolean)]);
 const funnel=document.getElementById('funnel');funnel.replaceChildren();for(const [label,value] of [['打开页面',records.length+' 次访问'],['发生开局',records.filter(r=>r.starts>0).length+' 次访问'],['至少赢一关',records.filter(r=>r.wins>0).length+' 次访问'],['关卡总计',sum('starts')+' 开局 / '+sum('wins')+' 胜局'],...([['campaign_complete','首次完成全部关卡'],['poster_success','海报生成成功'],['ai_request','发起 AI 请求']].map(([k,label])=>[label,records.some(r=>r.schema===2)?records.filter(r=>r.schema===2&&r.events[k]>0).length+' 次访问':'未采集'])),['无尽模式已解锁人数',unlockedPlayers.size+' 人'],['无尽模式进入人数',endlessPlayers.size+' 人'],['解锁玩家进入率',unlockedPlayers.size?(endlessPlayers.size/unlockedPlayers.size*100).toFixed(1)+'%':'—'],['AI 生成成功次数（浏览器确认）',records.some(r=>r.schema===2)?records.reduce((n,r)=>n+(r.events?.ai_success||0),0)+' 次':'未采集']]){const row=document.createElement('div');row.className='funnel-row';const l=document.createElement('span');l.textContent=label;const v=document.createElement('strong');v.textContent=value;row.append(l,v);funnel.append(row);}
};

window.renderJourney=function(records){
 const newer=records.filter(r=>r.schema===2),sum=k=>newer.reduce((n,r)=>n+(r.events[k]||0),0);
 function table(id,headers,rows){const root=document.getElementById(id);root.replaceChildren();const t=document.createElement('table');const head=document.createElement('thead');const hr=document.createElement('tr');headers.forEach(v=>{const c=document.createElement('th');c.textContent=v;hr.append(c);});head.append(hr);t.append(head);const body=document.createElement('tbody');rows.forEach(values=>{const tr=document.createElement('tr');values.forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});body.append(tr);});t.append(body);root.append(t);}
 const metrics=[['campaign_complete','首次达成十关（当前浏览器存档）'],['quiz_open','进入答题'],['quiz_correct','答题正确'],['quiz_wrong','答题错误'],['penalty_start','进入惩罚'],['penalty_round','惩罚开局（含重试）'],['penalty_retry','惩罚重试点击'],['penalty_win','惩罚成功'],['penalty_fail','惩罚失败'],['penalty_return_quiz','从惩罚返回答题'],['penalty_page_leave','惩罚页离开通知（含刷新）'],['poster_open','打开海报页'],['poster_attempt','有效海报生成尝试'],['poster_success','海报绘制成功'],['poster_failure','海报生成失败'],['poster_share_click','海报分享点击'],['poster_save_click','保存／分享按钮点击（不代表保存成功）'],['ai_request','浏览器发起 AI 请求'],['ai_success','AI 结果在浏览器加载成功'],['ai_failure','浏览器 AI 流程失败'],['hint_click','提示点击'],['shuffle_click','洗牌点击'],['replay_click','重玩点击']];
 table('journey-metrics',['环节','触发次数','发生过的访问数'],metrics.map(([k,label])=>[label,newer.length?sum(k):'未采集',newer.length?newer.filter(r=>r.events[k]>0).length:'未采集']));
 const stages={home:'首页',match:'连连看进行中',result:'关卡结算',quiz:'答题',penalty:'惩罚进行中',penalty_result:'惩罚结算',poster:'海报编辑',ai_wait:'AI 等待',endless:'无尽模式'};
 document.getElementById('dropoff-metrics').replaceChildren();
 table('level-metrics',['关卡','开局','获胜','失败'],Array.from({length:10},(_,i)=>[i+1,...['start','win','level_fail'].map(k=>newer.length?(sum('level_'+(i+1)+'_'+k)||(records.length>newer.length?'未记录到（历史不完整）':0)):'未采集')]));
 const coverage=document.createElement('p');coverage.className='caption';coverage.textContent='逐关采集覆盖：当前 '+records.length+' 次访问中，'+newer.length+' 次支持逐关事件，'+(records.length-newer.length)+' 次旧版访问没有关卡明细。表中为已记录的事件总次数，不是完整历史通关路径；未记录到不代表从未玩过。继续旧存档或重玩已解锁关卡，可能只记录到后续关卡。';document.getElementById('level-metrics').prepend(coverage);
 const note=document.createElement('p');note.className='caption';note.textContent='本次筛选 '+records.length+' 次访问，其中 '+newer.length+' 次支持新版事件；其余 '+(records.length-newer.length)+' 次未采集。';document.getElementById('journey-metrics').prepend(note);
};

window.renderDevices=function(records){
 const root=document.getElementById('device-metrics');root.replaceChildren();
 const known={mobile:'手机',desktop:'电脑',tablet:'平板',unknown:'未知设备'},groups=new Map(Object.values(known).map(label=>[label,[]]));
 for(const r of records){const label=known[r.device]||known.unknown;groups.get(label).push(r);}
 const table=document.createElement('table'),head=document.createElement('thead'),hr=document.createElement('tr');['设备类型','访问次数','去重浏览器数','有开局的访问','占全部访问比例'].forEach(label=>{const th=document.createElement('th');th.textContent=label;hr.append(th);});head.append(hr);table.append(head);const body=document.createElement('tbody');
 for(const [label,subset] of groups){const tr=document.createElement('tr');[label,subset.length,new Set(subset.map(r=>r.visitor)).size,subset.filter(r=>r.starts>0).length,records.length?(subset.length/records.length*100).toFixed(1)+'%':'—'].forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});body.append(tr);}table.append(body);root.append(table);
 const details=document.createElement('dialog'),summary=document.createElement('h3');details.className='device-details-dialog';summary.id='device-detail-title';summary.textContent='未知设备的已有线索';details.setAttribute('aria-labelledby',summary.id);const close=document.createElement('button');close.type='button';close.className='secondary';close.textContent='关闭';close.onclick=()=>details.close();const header=document.createElement('div');header.className='device-detail-header';header.append(summary,close);details.append(header);
 const unknown=groups.get('未知设备'),environments={wechat:'微信内打开',douyin:'抖音内打开',browser:'普通浏览器',unknown:'打开环境未采集'};for(const [key,label] of Object.entries(environments)){const count=unknown.filter(r=>(environments[r.environment]?r.environment:'unknown')===key).length;if(count){const p=document.createElement('p');p.textContent=label+'：'+count+' 次访问';details.append(p);}}
 const note=document.createElement('p');note.className='caption';note.textContent='以下仅是未知设备访问的打开环境，不是推广渠道，也不能据此推断手机或电脑。历史记录没有保存原始设备识别信息，无法准确补回。';details.insertBefore(note,header.nextSibling);const trigger=document.createElement('button');trigger.type='button';trigger.className='secondary device-details-trigger';trigger.textContent='查看未知设备线索 →';trigger.setAttribute('aria-haspopup','dialog');trigger.onclick=()=>details.showModal();details.addEventListener('click',event=>{if(event.target===details){const box=details.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)details.close();}});details.addEventListener('close',()=>trigger.focus());root.append(trigger,details);
};
