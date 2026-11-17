/* Pure rules shared by the browser and Node tests. No DOM or timers. */
(function(root){
  'use strict';
  const key=p=>p.r+','+p.c;
  const unique=ps=>Array.from(new Map(ps.map(p=>[key(p),p])).values());
  const clone=b=>b.map(row=>row.map(t=>t?{...t}:null));
  function path(board,a,b){
    if(!a||!b)return null;
    const rows=board.length,cols=board[0].length;
    const tile=p=>board[p.r]?.[p.c];
    if(key(a)===key(b)||!tile(a)||!tile(b)||tile(a).cargo||tile(b).cargo||tile(a).lock||tile(b).lock||tile(a).type!==tile(b).type)return null;
    const dirs=[[0,1],[1,0],[0,-1],[-1,0]],queue=[{...a,d:-1,turns:0,points:[a]}],seen=new Map();
    for(let i=0;i<queue.length;i++){
      const s=queue[i];
      for(let d=0;d<4;d++){
        const r=s.r+dirs[d][0],c=s.c+dirs[d][1],turns=s.turns+(s.d!==-1&&s.d!==d?1:0);
        if(turns>2||r< -1||c< -1||r>rows||c>cols)continue;
        const p={r,c},end=r===b.r&&c===b.c;
        if(!end&&board[r]?.[c])continue;
        const id=r+','+c+','+d;if((seen.get(id)??3)<=turns)continue;
        const points=s.points.concat(p);if(end)return points;
        seen.set(id,turns);queue.push({r,c,d,turns,points});
      }
    }
    return null;
  }
  function runs(board){
    const out=[],rows=board.length,cols=board[0].length;
    for(const [dr,dc] of [[0,1],[1,0]])for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const t=board[r][c];if(!t||t.lock||t.cargo)continue;
      const prev=board[r-dr]?.[c-dc];if(prev&&!prev.lock&&prev.type===t.type)continue;
      const group=[];let y=r,x=c;
      while(board[y]?.[x]&&!board[y][x].lock&&board[y][x].type===t.type){group.push({r:y,c:x});y+=dr;x+=dc;}
      if(group.length>=3)out.push(group);
    }
    return out;
  }
  function expandCascade(board, seeds){
    const cells=unique(seeds),seen=new Set(cells.map(key));
    for(let i=0;i<cells.length;i++){
      const {r,c}=cells[i],type=board[r][c].type;
      for(const [dr,dc] of [[0,1],[0,-1],[1,0],[-1,0]]){
        const next={r:r+dr,c:c+dc},tile=board[next.r]?.[next.c];
        if(!tile||tile.lock||tile.type!==type||seen.has(key(next)))continue;
        seen.add(key(next));cells.push(next);
      }
    }
    return cells;
  }
  function connectedMatches(board){
    const seen=new Set(),groups=[];
    board.forEach((row,r)=>row.forEach((tile,c)=>{
      if(!tile||tile.lock||tile.cargo||seen.has(key({r,c})))return;
      const group=expandCascade(board,[{r,c}]);
      group.forEach(p=>seen.add(key(p)));
      if(group.length>=3)groups.push(group);
    }));
    return groups;
  }
  function findPair(board,goal){
    const cells=[];board.forEach((row,r)=>row.forEach((t,c)=>{if(t&&!t.lock)cells.push({r,c});}));
    if(goal){
      const priority=p=>{const t=board[p.r][p.c];if(goal.kind==='collect')return t.type===goal.type?100:0;if(goal.kind==='locks')return [[0,1],[1,0],[-1,0],[0,-1]].filter(([dr,dc])=>board[p.r+dr]?.[p.c+dc]?.lock).length*10;if(goal.kind==='delivery'){
        const cargoRow=board.findIndex(row=>row.some(t=>t?.cargo));
        if(cargoRow<0)return 0;
        const col=board[cargoRow].findIndex(t=>t?.cargo);
        const barrier=board.findIndex((row,r)=>r>cargoRow&&row[col]?.lock);
        if(barrier>=0&&Math.abs(p.r-barrier)+Math.abs(p.c-col)===1)return 30;
        return p.c===col&&p.r>cargoRow?10:0;
      }return 0;};
      const ordered=cells.map(p=>({p,n:priority(p)})).sort((a,b)=>b.n-a.n);
      for(const {p:a,n} of ordered){if(!n)break;for(const b of cells)if(path(board,a,b))return[a,b];}
    }
    // Adjacent pairs first: quick on dense refill boards.
    for(const a of cells)for(const [dr,dc] of [[0,1],[1,0]]){const b={r:a.r+dr,c:a.c+dc};if(board[b.r]?.[b.c]&&path(board,a,b))return[a,b];}
    for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++)if(path(board,cells[i],cells[j]))return[cells[i],cells[j]];
    return null;
  }
  function createBoard(rows,cols,pool,random=Math.random){
    const board=Array.from({length:rows},()=>Array(cols).fill(null));let uid=1;
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const choices=pool.filter(t=>!(c>=2&&board[r][c-1].type===t&&board[r][c-2].type===t)&&!(r>=2&&board[r-1][c].type===t&&board[r-2][c].type===t));
      board[r][c]={type:choices[Math.floor(random()*choices.length)],uid:uid++,lock:0};
    }
    if(!findPair(board))board[0][1].type=board[0][0].type;
    return board;
  }
  function collapse(board,pool,random,nextId,mask,assist=0){
    const changed=[],motion=[];
    // Locked cells split a column into independent falling/refill segments.
    for(let c=0;c<board[0].length;c++){
      let start=0;
      for(let end=0;end<=board.length;end++)if(end===board.length||(mask&&!mask[end][c])||board[end][c]?.lock){
        const live=[];for(let r=start;r<end;r++)if(board[r][c])live.push({tile:board[r][c],from:r});
        const missing=end-start-live.length;
        for(let r=end-1;r>=start;r--){
          const index=r-start-missing,old=live[index];
          let type;if(!old){const neighbors=[board[r+1]?.[c],board[r]?.[c-1],board[r]?.[c+1]].filter(t=>t&&!t.lock&&!t.cargo&&pool.includes(t.type));type=assist>0&&neighbors.length&&random()<assist?neighbors[Math.floor(random()*neighbors.length)].type:pool[Math.floor(random()*pool.length)];}
          board[r][c]=old?old.tile:{type,lock:0,uid:nextId()};
          const from=old?old.from:start-1-(missing-1-(r-start));
          if(!old||from!==r){changed.push({r,c});motion.push({uid:board[r][c].uid,r,c,from});}
        }
        start=end+1;
      }
    }
    return{changed,motion};
  }
  const cascadeRates=[1,1.2,1.4,1.6];
  const piecePoints=100, explosionRate=1.5;
  function chainBonus(count){return Math.min(100,Math.max(0,count-1)*20);}
  // Upper bound: one connected opening group, then at most a full board per cascade.
  function scoreUpperBound(level){
    const cells=level.mask.flat().filter(Boolean).length;
    const opening=cells*piecePoints*explosionRate;
    const waveTotal=cascadeRates.slice(1).reduce((sum,rate)=>sum+Math.round(cells*piecePoints*rate),opening);
    let limit=0;
    for(let move=1;move<=level.moves;move++)limit+=waveTotal+cascadeRates.reduce((sum,_,i)=>sum+chainBonus((move-1)*cascadeRates.length+i+1),0);
    if(level.goal.kind==='score'){
      // Before the winning move the score is below target; all awards are multiples of ten.
      const beforeWin=Math.floor((level.goal.target-1)/10)*10;
      limit=Math.min(limit,beforeWin+waveTotal+cascadeRates.length*chainBonus(level.moves*cascadeRates.length));
    }
    return limit;
  }
  function resolve(state,a,b,{bomb=false,now=Date.now(),random=Math.random}={}){
    if(!(state.status==='playing'||bomb&&state.status==='stuck')||state.moves<=0)return null;
    const t=state.board[a.r]?.[a.c];if(!t||t.cargo||t.lock||bomb&&state.bombs<=0)return null;
    const link=bomb?null:path(state.board,a,b);if(!bomb&&!link)return null;
    const group=bomb?[]:expandCascade(state.board,[a]);
    let cells=bomb?[a]:group.some(p=>key(p)===key(b))?group:[a,b];
    const explosion=!bomb&&cells.length>=3;
    const combo=bomb?0:(state.lastManual!==null&&now-state.lastManual<=3000?state.combo+1:1);
    state.combo=combo;state.lastManual=bomb?null:now;
    state.moves--;if(bomb)state.bombs--;
    let comboBonus=0;
    const waves=[];let depth=0;
    while(cells.length){
      const signature=(g,board)=>g.map(p=>board[p.r][p.c].uid).sort((a,b)=>a-b).join(',');
      const previousRuns=new Set(connectedMatches(state.board).map(g=>signature(g,state.board)));
      const before=clone(state.board),removed=cells.map(p=>({...p,tile:{...state.board[p.r][p.c]}}));
      const unlocked=[];
      for(let r=0;r<state.board.length;r++)for(let c=0;c<state.board[0].length;c++){
        const tile=state.board[r][c];
        if(tile?.lock&&cells.some(p=>Math.abs(p.r-r)+Math.abs(p.c-c)===1)){
          tile.lock--;if(!tile.lock)state.unlocked++;unlocked.push({r,c});
        }
      }
      removed.forEach(p=>{state.collected[p.tile.type]=(state.collected[p.tile.type]||0)+1;state.board[p.r][p.c]=null;});
      const base=bomb&&depth===0?0:depth===0&&!explosion?piecePoints:removed.length*piecePoints;
      const multiplier=depth===0&&explosion?explosionRate:cascadeRates[depth];
      if(depth>0){state.combo++;state.lastManual=now;}
      state.maxCombo=Math.max(state.maxCombo,state.combo);
      const bonus=chainBonus(state.combo),clearPoints=Math.round(base*multiplier);
      comboBonus+=bonus;state.comboPoints+=bonus;
      const points=clearPoints+bonus;
      state.score+=points;
      if(depth>0)state.cascadePoints+=clearPoints;
      const afterClear=clone(state.board);
      const drop=collapse(state.board,state.refillPool||state.pool,random,()=>++state.uid,state.mask,state.refillAssist||0);
      waves.push({combo:state.combo,bonus,before,afterClear,after:clone(state.board),removed,unlocked,motion:drop.motion,points,depth,explosion:depth===0&&explosion,path:depth===0?link:null});
      if(depth===cascadeRates.length-1)break;
      const changed=new Set(drop.changed.concat(unlocked).map(key));
      cells=connectedMatches(state.board).filter(g=>g.some(p=>changed.has(key(p)))&&!previousRuns.has(signature(g,state.board))).flat();depth++;
    }
    state.lastWaves=waves.length;state.cascadeMax=Math.max(state.cascadeMax,waves.length-1);
    state.status=status(state);return{waves,combo:state.combo,comboBonus};
  }
  function progress(state){if(state.goal.kind==='delivery')return Number(state.board[state.board.length-1].some(tile=>tile?.cargo));return state.goal.kind==='score'?state.score:state.goal.kind==='collect'?(state.collected[state.goal.type]||0):state.unlocked;}
  function status(state){
    if(progress(state)>=state.goal.target)return'won';
    if(state.moves<=0)return'lost';
    if(!findPair(state.board))return state.shuffles>0||state.bombs>0?'stuck':'lost';
    return'playing';
  }
  function shuffle(state,random=Math.random){
    if(!['playing','stuck'].includes(state.status)||state.shuffles<=0)return false;
    const free=[];state.board.forEach((row,r)=>row.forEach((t,c)=>{if(t&&!t.cargo&&!t.lock)free.push({r,c});}));
    if(free.length<2)return false;
    state.shuffles--;state.combo=0;state.lastManual=null;
    // Regenerate unlocked symbols; locks stay anchored. Never award automatic matches.
    for(let tries=0;tries<100;tries++){
      free.forEach(p=>{state.board[p.r][p.c].type=state.pool[Math.floor(random()*state.pool.length)];});
      if(findPair(state.board))break;
    }
    state.status=status(state);return true;
  }
  function create(config,random=Math.random){
    const board=createBoard(config.rows,config.cols,config.pool,random);
    const mask=config.mask?config.mask.map(row=>row.slice()):board.map(row=>row.map(()=>1));
    board.forEach((row,r)=>row.forEach((_,c)=>{if(!mask[r][c])board[r][c]=null;}));
    (config.locks||[]).forEach(p=>{board[p.r][p.c].lock=p.layers||1;});
    // An opening burst teaches the rule; existing triples never clear by themselves.
    const row=board.find(row=>row.slice(0,3).every(t=>t&&!t.lock));
    if(row)row[1].type=row[2].type=row[0].type;
    if(config.ensureAllTypes){
      // Keep the opening burst; replace duplicates only so all 16 portraits appear.
      const counts=new Map();board.flat().filter(Boolean).forEach(t=>counts.set(t.type,(counts.get(t.type)||0)+1));
      const protectedRow=board.indexOf(row);
      for(const type of config.pool){if(counts.has(type))continue;
        let cell;for(let r=0;r<board.length&&!cell;r++)for(let c=0;c<board[r].length;c++){
          if(r===protectedRow&&c<3)continue;
          if(board[r][c]&&counts.get(board[r][c].type)>1){cell=board[r][c];break;}
        }
        if(cell){counts.set(cell.type,counts.get(cell.type)-1);cell.type=type;counts.set(type,1);}
      }
    }
    if(config.goal.kind==='delivery'){
      const row=board[config.goal.startRow];
      const candidates=row.filter(tile=>!config.ensureAllTypes||board.flat().some(other=>other!==tile&&other?.type===tile.type));
      const cargo=candidates[Math.floor(random()*candidates.length)]||row[0];
      if(!candidates.length){
        const other=board.flat().find(t=>t!==cargo&&board.flat().some(v=>v!==t&&v?.type===t.type));
        other.type=cargo.type;
      }
      cargo.type=-1;cargo.cargo=true;
      const cargoColumn=row.indexOf(cargo);
      for(const barrier of config.goal.routeLocks||[]){
        const tile=board[barrier.r]?.[cargoColumn];
        if(tile&&barrier.r>config.goal.startRow)tile.lock=barrier.layers||1;
      }
    }
    // Give strategic objectives reachable adjacent pairs without removing a personality.
    if((config.objectiveAssist||config.deliveryOpeningAssist)&&(config.goal.kind==='delivery'||config.goal.kind==='locks')){
      const counts=new Map();board.flat().filter(t=>t&&!t.cargo).forEach(t=>counts.set(t.type,(counts.get(t.type)||0)+1));
      const relevant=(r,c)=>config.goal.kind==='delivery'?board.some((row,y)=>y<r&&row[c]?.cargo):[[0,1],[1,0],[-1,0],[0,-1]].some(([dr,dc])=>board[r+dr]?.[c+dc]?.lock);
      let assisted=false;
      for(let r=0;r<board.length;r++)for(let c=0;c<board[0].length;c++){
        const t=board[r][c];if(!t||t.lock||t.cargo||!relevant(r,c)||(config.deliveryOpeningAssist&&assisted))continue;
        const peer=[board[r][c-1],board[r][c+1]].find(v=>v&&!v.lock&&!v.cargo&&counts.get(v.type)>1);
        if(peer&&peer.type!==t.type){counts.set(peer.type,counts.get(peer.type)-1);peer.type=t.type;counts.set(t.type,counts.get(t.type)+1);assisted=true;}
      }
    }
    return{board,mask,pool:config.pool.slice(),refillPool:config.goal.kind==='collect'&&config.collectWeight?config.pool.concat(Array(config.collectWeight).fill(config.goal.type)):null,refillAssist:config.refillAssist||0,uid:config.rows*config.cols,moves:config.moves,initialMoves:config.moves,goal:{...config.goal},score:0,maxCombo:0,comboPoints:0,cascadePoints:0,collected:{},unlocked:0,bombs:2,shuffles:2,combo:0,lastManual:null,cascadeMax:0,status:'playing'};
  }
  const api={scoreUpperBound,path,runs,findPair,createBoard,collapse,resolve,progress,status,shuffle,create,clone};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.HybridEngine=api;
})(typeof window!=='undefined'?window:globalThis);
