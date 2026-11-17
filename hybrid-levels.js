(function(root){
  'use strict';
  const themes={
    green:{name:'绿人单元',subtitle:'NF · 理想与共鸣',icon:'🌿',color:'#83cda6',pool:[2,3,6,7]},
    blue:{name:'蓝人单元',subtitle:'SJ · 秩序与守护',icon:'💧',color:'#86b8ef',pool:[8,9,12,13]},
    yellow:{name:'黄人单元',subtitle:'SP · 自由与行动',icon:'🌟',color:'#ebce78',pool:[10,11,14,15]},
    purple:{name:'紫人单元',subtitle:'NT · 理性与探索',icon:'🔮',color:'#bd9aef',pool:[0,1,4,5]},
    all:{name:'综合单元',subtitle:'16 种人格 · 全员登场',icon:'🌈',color:'#45b7b0',pool:Array.from({length:16},(_,i)=>i)}
  };
  function validOrder(order){return Array.isArray(order)&&order.length===4&&new Set(order).size===4&&order.every(k=>['green','blue','yellow','purple'].includes(k));}
  function randomOrder(random=Math.random){const a=['green','blue','yellow','purple'];for(let i=3;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function build(order){
    if(!validOrder(order))throw new Error('Invalid theme order');
    return order.concat('all').flatMap((key,unit)=>Array.from({length:4},(_,step)=>{
      const t=themes[key],i=unit*4+step,all=key==='all';
      const shapeName='满铺棋盘',shapeIcon=t.icon,mask=Array.from({length:8},()=>Array(6).fill(1));
      const moveBudgets=[[18,22,20,10],[18,22,22,11],[18,22,24,12],[18,22,26,13],[38,36,40,40]];
      const starLimits=[[[5,10],[7,13],[5,11],[3,7]],[[6,11],[8,14],[6,12],[4,8]],[[7,12],[9,15],[8,15],[4,9]],[[8,13],[10,16],[10,18],[4,10]],[[10,20],[8,18],[12,25],[12,26]]];
      const locks=step===2?Array.from({length:all?8:6+unit},(_,j)=>({r:2+Math.floor(j/4)*2,c:1+j%4,layers:j<(all?2:Math.max(0,unit-1)*2)?2:1})):[];
      const available=mask.flatMap((row,r)=>row.flatMap((v,c)=>v?[{r,c}]:[]));
      locks.forEach((lock,j)=>{if(!mask[lock.r][lock.c])Object.assign(lock,available.filter(p=>!locks.some(x=>x.r===p.r&&x.c===p.c))[j]);});
      const kind=step===3?'delivery':step===2?'locks':step===1?'collect':'score';
      return {name:all?['全员集结','寻觅知音','人格共鸣','十六人格之约'][step]:['初次相遇','寻找同伴','解救伙伴','默契挑战'][step],
        icon:shapeIcon,shapeName,mask,theme:key,unit,unitName:t.name,unitSubtitle:t.subtitle,color:t.color,step,
        rows:8,cols:6,pool:t.pool.slice(),ensureAllTypes:all,moves:moveBudgets[unit][step],starMoves:{three:starLimits[unit][step][0],two:starLimits[unit][step][1]},objectiveAssist:all&&step!==3,deliveryOpeningAssist:all&&step===3,refillAssist:all?(step===3?.7:.4):0,collectWeight:all&&step===1?4:0,locks,
        goal:kind==='delivery'?{kind,target:1,startRow:0,routeLocks:[[{r:3,layers:2},{r:5,layers:2}],[{r:2,layers:2},{r:4,layers:2},{r:6,layers:1}],[{r:2,layers:2},{r:4,layers:2},{r:6,layers:2}],[{r:2,layers:3},{r:4,layers:2},{r:6,layers:2}],[{r:3,layers:2},{r:5,layers:1}]][unit]}:kind==='score'?{kind,target:all?3000:2400+unit*800}:kind==='collect'?{kind,type:t.pool[unit%t.pool.length],target:all?6:16+unit*2}:{kind,target:locks.length}};
    }));
  }
  function starsFor(level,remaining){const used=level.moves-remaining;return used<=level.starMoves.three?3:used<=level.starMoves.two?2:1;}
  root.HybridCampaign={themes,validOrder,randomOrder,build,starsFor};
  root.HYBRID_LEVELS=build(['green','blue','yellow','purple']);
})(typeof window!=='undefined'?window:globalThis);
