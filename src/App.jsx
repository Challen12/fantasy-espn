import React, { useState, useMemo, createContext, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import data from './data/fantasy_history.json';
import './index.css';

const participants = Object.values(data.participants).sort((a, b) => a.globalRank - b.globalRank);
const seasons = Object.values(data.seasons).sort((a, b) => b.year - a.year);


const getAvatarUrl = (name) => {
  if (!name) return '';
  if (name.toUpperCase() === 'CHALLEN') return `${import.meta.env.BASE_URL}avatars/challen.png`;
  return `${import.meta.env.BASE_URL}avatars/${name}.svg`;
};

const HoverContext = createContext();

const PlayerTrigger = ({ playerName, children, className = "" }) => {
  const setHoverInfo = useContext(HoverContext);
  
  const handleInteract = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverInfo({ 
      player: playerName, 
      x: rect.left + rect.width / 2, 
      y: rect.top 
    });
  };

  const handleLeave = () => {
    setHoverInfo({ player: null, x: 0, y: 0 });
  };

  return (
    <span 
      className={`inline-flex items-center gap-2 cursor-pointer group ${className}`}
      onMouseEnter={handleInteract}
      onMouseLeave={handleLeave}
      onClick={handleInteract}
    >
      {children}
    </span>
  );
};

const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const setHoverInfo = useContext(HoverContext);
  
  const handleInteract = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverInfo({ 
      player: payload.value, 
      x: rect.right, 
      y: rect.top 
    });
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={4} 
        textAnchor="end" 
        fill="#c4c9ac" 
        fontSize={12}
        className="cursor-pointer hover:fill-[#ccff00] transition-colors"
        onMouseEnter={handleInteract}
        onMouseLeave={() => setHoverInfo({ player: null, x: 0, y: 0 })}
        onClick={handleInteract}
      >
        {payload.value}
      </text>
    </g>
  );
};

// Helpers to get top lists for the global dashboard
const championsCount = [...participants].sort((a, b) => b.championships.length - a.championships.length).filter(p => p.championships.length > 0);
const confChampionsCount = [...participants].sort((a, b) => b.conferenceChampionships.length - a.conferenceChampionships.length).filter(p => p.conferenceChampionships.length > 0);

const HoverCard = ({ info }) => {
  if (!info.player) return null;
  const player = data.participants[info.player];
  if (!player) return null;

  // En dispositivos móviles (o si está muy al borde), limitamos la tarjeta para que no se salga de la pantalla.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const safeX = typeof window !== 'undefined' ? Math.max(140, Math.min(window.innerWidth - 140, info.x)) : info.x;

  return (
    <div 
      className={`fixed z-[100] pointer-events-none transition-opacity duration-200 ${isMobile ? '' : 'transform -translate-x-1/2 -translate-y-full pb-4'}`}
      style={isMobile ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' } : { left: safeX, top: info.y }}
    >
      <div className="glass-card bg-[#1c1b1b]/95 border-outline-variant rounded-xl p-4 shadow-2xl w-64 neon-glow">
        <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
           <img src={getAvatarUrl(player.name)} className="w-10 h-10 rounded-full" alt="" />
           <div>
             <h4 className="font-bold text-on-surface text-lg leading-tight">{player.name}</h4>
             <p className="text-xs text-on-surface-variant uppercase font-label-caps">{player.globalPoints} pts • Rank #{player.globalRank}</p>
           </div>
        </div>
        <div className="space-y-2 text-sm font-['Inter']">
           <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
             <span className="text-secondary flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">emoji_events</span> Camp:</span>
             <span className="font-bold text-on-surface">{player.championships.length}</span>
           </div>
           <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
             <span className="text-on-surface flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">military_tech</span> Conf:</span>
             <span className="font-bold text-on-surface">{player.conferenceChampionships.length}</span>
           </div>
           <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
             <span className="text-primary-fixed-dim flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">star</span> MVP:</span>
             <span className="font-bold text-on-surface">{player.mvps.length}</span>
           </div>
           <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
             <span className="text-orange-400 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">local_fire_department</span> Playoff:</span>
             <span className="font-bold text-on-surface">{player.mvpPlayoffs.length}</span>
           </div>
           <div className="flex justify-between items-center bg-white/5 px-2 py-1.5 rounded">
             <span className="text-blue-400 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">diamond</span> Jokic:</span>
             <span className="font-bold text-on-surface">{player.jokicLeague.length}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const GlobalDashboard = () => {
  const [showAllPoints, setShowAllPoints] = useState(false);

  const chartData = useMemo(() => {
    const limit = showAllPoints ? participants.length : 10;
    return participants.slice(0, limit).map(p => ({
      name: p.name,
      points: p.globalPoints
    }));
  }, [showAllPoints]);

  return (
    <div className="space-y-stack-lg">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="glass-card neon-glow rounded-xl p-6 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Total Temporadas</p>
            <p className="font-display-lg text-display-lg text-primary-fixed-dim">{seasons.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-primary-fixed-dim opacity-10 absolute -right-2 -bottom-2">calendar_today</span>
        </div>
        <div className="glass-card neon-glow rounded-xl p-6 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Participantes</p>
            <p className="font-display-lg text-display-lg text-primary-fixed-dim">{participants.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-primary-fixed-dim opacity-10 absolute -right-2 -bottom-2">groups</span>
        </div>
      </section>

      <section className="space-y-stack-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-secondary-fixed flex items-center gap-2">
            <span className="material-symbols-outlined">military_tech</span>
            Salón de la Fama
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {participants.slice(0, 3).map((p, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            
            let cardClass = "glass-card rounded-xl p-6 relative group overflow-hidden ";
            let numberColor = "";
            let ringColor = "";
            let percentageBg = "";
            let percentageFill = "";
            
            if (isFirst) {
              cardClass += "gold-glow";
              numberColor = "text-secondary";
              ringColor = "border-secondary";
              percentageBg = "bg-white/5";
              percentageFill = "bg-secondary";
            } else if (isSecond) {
              cardClass += "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]";
              numberColor = "text-on-surface-variant";
              ringColor = "border-outline-variant";
              percentageBg = "bg-white/5";
              percentageFill = "bg-white/40";
            } else {
              cardClass += "border-orange-500/30 shadow-[0_0_15px_rgba(194,65,12,0.1)]";
              numberColor = "text-orange-900";
              ringColor = "border-orange-900/50";
              percentageBg = "bg-white/5";
              percentageFill = "bg-orange-800";
            }

            const mockWinPercentage = (p.globalPoints / participants[0].globalPoints * 100).toFixed(1);

            return (
              <div key={p.name} className={cardClass}>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className={`font-display-lg text-display-lg ${numberColor}`}>0{idx + 1}</span>
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <PlayerTrigger playerName={p.name} className="hover:text-primary-fixed-dim transition-colors text-left">
                    <div className={`w-16 h-16 rounded-full border-2 p-1 ${ringColor} shrink-0`}>
                      <img src={getAvatarUrl(p.name)} alt={p.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-xl text-inherit">{p.name}</h3>
                      <p className={`font-label-caps text-xs uppercase ${isFirst ? 'text-secondary' : isSecond ? 'text-on-surface-variant' : 'text-orange-600'}`}>
                        {p.championships.length}X Campeón
                      </p>
                    </div>
                  </PlayerTrigger>
                </div>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Puntuación Global</span>
                    <span className={`font-bold ${isFirst ? 'text-secondary' : isSecond ? 'text-on-surface' : 'text-orange-600'}`}>{p.globalPoints}</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${percentageBg}`}>
                    <div className={`h-full ${percentageFill}`} style={{ width: `${mockWinPercentage}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-stack-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-[#ccff00] flex items-center gap-2">
            <span className="material-symbols-outlined">bar_chart</span>
            {showAllPoints ? 'Puntuación Global (Todos)' : 'Top 10 Puntuación Global'}
          </h2>
          <button 
            onClick={() => setShowAllPoints(!showAllPoints)}
            className="text-sm font-label-caps uppercase bg-[#ccff00]/10 text-[#ccff00] px-4 py-2 rounded-full hover:bg-[#ccff00]/20 transition-colors border border-[#ccff00]/30"
          >
            {showAllPoints ? 'Ver Top 10' : 'Ver Todos'}
          </button>
        </div>
        <div className="glass-card rounded-xl p-6 transition-all duration-500 ease-in-out" style={{ height: showAllPoints ? '650px' : '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={90} axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                contentStyle={{ backgroundColor: '#1c1b1b', borderColor: '#444933', color: '#e5e2e1' }} 
                itemStyle={{ color: '#ccff00', fontWeight: 'bold' }}
              />
              <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#e9c349' : '#abd600'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <section className="space-y-stack-md">
          <h2 className="font-headline-md text-headline-md text-secondary flex items-center gap-2">
            <span className="material-symbols-outlined">emoji_events</span>
            Títulos de Campeón
          </h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Participante</th>
                  <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs text-right">Títulos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {championsCount.map((p, idx) => (
                  <tr key={`champ-${p.name}`} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className="text-on-surface-variant w-4">{idx + 1}.</span>
                        <PlayerTrigger playerName={p.name} className="hover:text-primary-fixed-dim transition-colors">
                          <img src={getAvatarUrl(p.name)} className="w-6 h-6 rounded-full" alt="" />
                          <span className="font-bold text-inherit">{p.name}</span>
                        </PlayerTrigger>
                      </div>
                    </td>
                    <td className="p-4 text-secondary font-bold text-right">{p.championships.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="space-y-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined">military_tech</span>
            Títulos de Conferencia
          </h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Participante</th>
                  <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs text-right">Títulos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {confChampionsCount.map((p, idx) => (
                  <tr key={`conf-${p.name}`} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-on-surface">
                      <div className="flex items-center gap-3">
                        <span className="text-on-surface-variant w-4">{idx + 1}.</span>
                        <PlayerTrigger playerName={p.name} className="hover:text-primary-fixed-dim transition-colors">
                          <img src={getAvatarUrl(p.name)} className="w-6 h-6 rounded-full" alt="" />
                          <span className="font-bold text-inherit">{p.name}</span>
                        </PlayerTrigger>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface font-bold text-right">{p.conferenceChampionships.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

    </div>
  );
};

const PlayerProfile = ({ playerName, onPlayerSelect }) => {
  if (!playerName) {
    const sortedPlayers = [...participants].sort((a, b) => b.globalPoints - a.globalPoints);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {sortedPlayers.map(p => (
           <div 
             key={p.name} 
             onClick={() => onPlayerSelect && onPlayerSelect(p.name)}
             className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:border-primary-fixed-dim/50 transition-colors"
           >
             <div className="flex items-center gap-4 relative z-10 mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-primary-fixed-dim p-1 shrink-0">
                  <img src={getAvatarUrl(p.name)} alt={p.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary-fixed-dim transition-colors">{p.name}</h3>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase">{p.globalPoints} pts • Rank #{p.globalRank}</p>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-2 text-sm relative z-10">
                <div className="bg-white/5 p-2 rounded text-center">
                  <span className="block text-secondary font-bold">{p.championships.length}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase">Camp</span>
                </div>
                <div className="bg-white/5 p-2 rounded text-center">
                  <span className="block text-primary-fixed-dim font-bold">{p.mvps.length}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase">MVP</span>
                </div>
                <div className="bg-white/5 p-2 rounded text-center">
                  <span className="block text-blue-400 font-bold">{p.jokicLeague.length}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase">Jokic</span>
                </div>
             </div>
           </div>
        ))}
      </div>
    );
  }

  const player = data.participants[playerName];

  return (
    <div className="space-y-stack-lg">
      <button 
        onClick={() => onPlayerSelect && onPlayerSelect(null)}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors text-sm font-label-caps uppercase w-fit"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Ver todos los jugadores
      </button>
      <div className="glass-card rounded-xl p-8 relative overflow-hidden border-t-4 border-t-primary-fixed-dim">
        <div className="relative z-10">
          <div className="text-left flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-primary-fixed-dim p-1 bg-surface-container-highest flex items-center justify-center text-3xl font-display-lg shadow-[0_0_15px_rgba(171,214,0,0.3)] shrink-0">
              <img src={getAvatarUrl(player.name)} alt={player.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h2 className="font-display-lg text-4xl text-on-surface mb-1">{player.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="bg-primary-fixed-dim/20 text-primary-fixed-dim px-3 py-1 rounded-full font-label-caps text-xs uppercase border border-primary-fixed-dim/30">
                  Ranking #{player.globalRank}
                </span>
                <span className="text-on-surface-variant font-label-caps uppercase">{player.globalPoints} pts</span>
              </div>
            </div>
          </div>
        </div>
        <span className="material-symbols-outlined text-9xl text-primary-fixed-dim opacity-5 absolute -right-4 top-0">person</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="glass-card neon-glow rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Campeonatos</p>
            <p className="font-display-lg text-display-lg text-secondary">{player.championships.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-secondary opacity-10 absolute -right-2 -bottom-2">emoji_events</span>
        </div>
        <div className="glass-card neon-glow rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">MVPs</p>
            <p className="font-display-lg text-display-lg text-primary-fixed-dim">{player.mvps.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-primary-fixed-dim opacity-10 absolute -right-2 -bottom-2">star</span>
        </div>
        <div className="glass-card neon-glow rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Títulos Conf.</p>
            <p className="font-display-lg text-display-lg text-on-surface">{player.conferenceChampionships.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-on-surface opacity-10 absolute -right-2 -bottom-2">military_tech</span>
        </div>
        <div className="glass-card neon-glow rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Jokic League</p>
            <p className="font-display-lg text-display-lg text-blue-400">{player.jokicLeague.length}</p>
          </div>
          <span className="material-symbols-outlined text-6xl text-blue-400 opacity-10 absolute -right-2 -bottom-2">diamond</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase border-b border-white/5 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm">emoji_events</span>
            Años de Campeonato
          </h3>
          <div className="space-y-2">
            {player.championships.length > 0 ? (
              player.championships.map(y => (
                <div key={y} className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-white/5">
                  <span className="text-on-surface font-bold">{y}</span>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs uppercase font-bold border border-secondary/30">Campeón</span>
                </div>
              ))
            ) : (
              <div className="text-on-surface-variant p-3">Sin campeonatos aún.</div>
            )}
          </div>
        </div>
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase border-b border-white/5 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed-dim text-sm">star</span>
            Años MVP
          </h3>
          <div className="space-y-2">
            {player.mvps.length > 0 ? (
              player.mvps.map(y => (
                <div key={y} className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-white/5">
                  <span className="text-on-surface font-bold">{y}</span>
                  <span className="bg-primary-fixed-dim/20 text-primary-fixed-dim px-2 py-1 rounded text-xs uppercase font-bold border border-primary-fixed-dim/30">MVP</span>
                </div>
              ))
            ) : (
              <div className="text-on-surface-variant p-3">Sin MVPs aún.</div>
            )}
          </div>
        </div>
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase border-b border-white/5 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400 text-sm">diamond</span>
            Años Jokic League
          </h3>
          <div className="space-y-2">
            {player.jokicLeague.length > 0 ? (
              player.jokicLeague.map(y => (
                <div key={y} className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-white/5">
                  <span className="text-on-surface font-bold">{y}</span>
                  <span className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs uppercase font-bold border border-blue-400/30">Jokic League</span>
                </div>
              ))
            ) : (
              <div className="text-on-surface-variant p-3">Sin Jokic League aún.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AwardsView = () => {
  return (
    <div className="grid grid-cols-1 gap-gutter">
      
      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-secondary flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined">emoji_events</span>
          Campeones
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Temporada</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Ganador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {seasons.filter(s => s.champion).map(s => (
                <tr key={`champ-${s.year}`} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-bold">{s.year}</td>
                  <td className="p-4 text-secondary font-bold">
                    <PlayerTrigger playerName={s.champion} className="hover:text-[#ccff00] transition-colors">
                      <img src={getAvatarUrl(s.champion)} className="w-6 h-6 rounded-full" alt="" />
                      {s.champion}
                    </PlayerTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined">military_tech</span>
          Campeones de Conferencia
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Temporada</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Conferencia A</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Conferencia B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {seasons.filter(s => s.conferenceA || s.conferenceB).map(s => (
                <tr key={`conf-${s.year}`} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-bold">{s.year}</td>
                  <td className="p-4 text-on-surface">
                    {s.conferenceA ? (
                      <PlayerTrigger playerName={s.conferenceA} className="hover:text-primary-fixed-dim transition-colors">
                        <img src={getAvatarUrl(s.conferenceA)} className="w-6 h-6 rounded-full" alt="" /> {s.conferenceA}
                      </PlayerTrigger>
                    ) : '-'}
                  </td>
                  <td className="p-4 text-on-surface">
                    {s.conferenceB ? (
                      <PlayerTrigger playerName={s.conferenceB} className="hover:text-primary-fixed-dim transition-colors">
                        <img src={getAvatarUrl(s.conferenceB)} className="w-6 h-6 rounded-full" alt="" /> {s.conferenceB}
                      </PlayerTrigger>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-primary-fixed-dim flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined">star</span>
          MVP
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Temporada</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Ganador MVP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {seasons.filter(s => s.mvp).map(s => (
                <tr key={`mvp-${s.year}`} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-bold">{s.year}</td>
                  <td className="p-4 text-primary-fixed-dim font-bold">
                    <PlayerTrigger playerName={s.mvp} className="hover:text-[#ccff00] transition-colors">
                      <img src={getAvatarUrl(s.mvp)} className="w-6 h-6 rounded-full" alt="" />
                      {s.mvp}
                    </PlayerTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-orange-400 flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined">local_fire_department</span>
          MVP Playoff
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Temporada</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Ganador MVP Playoff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {seasons.filter(s => s.mvpPlayoff).map(s => (
                <tr key={`mvp-playoff-${s.year}`} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-bold">{s.year}</td>
                  <td className="p-4 text-orange-400 font-bold">
                    <PlayerTrigger playerName={s.mvpPlayoff} className="hover:text-[#ccff00] transition-colors">
                      <img src={getAvatarUrl(s.mvpPlayoff)} className="w-6 h-6 rounded-full" alt="" />
                      {s.mvpPlayoff}
                    </PlayerTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-blue-400 flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined">diamond</span>
          Jokic League
        </h2>
        <div className="w-full overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Temporada</th>
                <th className="p-4 text-on-surface-variant font-label-caps uppercase text-xs">Ganador Jokic League</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {seasons.filter(s => s.jokicLeague).map(s => (
                <tr key={`jokic-${s.year}`} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-bold">{s.year}</td>
                  <td className="p-4 text-blue-400 font-bold">
                    <PlayerTrigger playerName={s.jokicLeague} className="hover:text-[#ccff00] transition-colors">
                      <img src={getAvatarUrl(s.jokicLeague)} className="w-6 h-6 rounded-full" alt="" />
                      {s.jokicLeague}
                    </PlayerTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const SeasonView = ({ year, onSeasonSelect }) => {
  if (!year) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {seasons.map(s => (
          <div 
            key={s.year} 
            onClick={() => onSeasonSelect && onSeasonSelect(s.year)}
            className="glass-card rounded-xl p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:border-primary-fixed-dim/50 transition-colors"
          >
            <h3 className="font-display-lg text-3xl text-primary-fixed-dim mb-4 relative z-10 group-hover:scale-105 transition-transform origin-left">{s.year}</h3>
            <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">Campeón</span>
                   <span className="font-bold text-secondary truncate flex items-center gap-1">{s.champion && <img src={getAvatarUrl(s.champion)} className="w-3 h-3 rounded-full" alt=""/>}{s.champion || '-'}</span>
                 </div>
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">MVP</span>
                   <span className="font-bold text-primary-fixed-dim truncate flex items-center gap-1">{s.mvp && <img src={getAvatarUrl(s.mvp)} className="w-3 h-3 rounded-full" alt=""/>}{s.mvp || '-'}</span>
                 </div>
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">MVP PO</span>
                   <span className="font-bold text-blue-400 truncate flex items-center gap-1">{s.mvpPlayoff && <img src={getAvatarUrl(s.mvpPlayoff)} className="w-3 h-3 rounded-full" alt=""/>}{s.mvpPlayoff || '-'}</span>
                 </div>
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">Jokic L.</span>
                   <span className="font-bold text-blue-400 truncate flex items-center gap-1">{s.jokicLeague && <img src={getAvatarUrl(s.jokicLeague)} className="w-3 h-3 rounded-full" alt=""/>}{s.jokicLeague || '-'}</span>
                 </div>
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">Conf. A</span>
                   <span className="font-bold text-on-surface truncate flex items-center gap-1">{s.conferenceA && <img src={getAvatarUrl(s.conferenceA)} className="w-3 h-3 rounded-full" alt=""/>}{s.conferenceA || '-'}</span>
                 </div>
                 <div className="bg-white/5 p-2 rounded flex flex-col justify-between">
                   <span className="text-on-surface-variant mb-1 uppercase font-label-caps text-[10px]">Conf. B</span>
                   <span className="font-bold text-on-surface truncate flex items-center gap-1">{s.conferenceB && <img src={getAvatarUrl(s.conferenceB)} className="w-3 h-3 rounded-full" alt=""/>}{s.conferenceB || '-'}</span>
                 </div>
            </div>
            <span className="material-symbols-outlined text-8xl text-primary-fixed-dim opacity-5 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">calendar_month</span>
          </div>
        ))}
      </div>
    );
  }

  const season = data.seasons[year];

  return (
    <div className="space-y-stack-lg">
      <button 
        onClick={() => onSeasonSelect && onSeasonSelect(null)}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary-fixed-dim transition-colors text-sm font-label-caps uppercase w-fit"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Ver todas las temporadas
      </button>
      <div className="glass-card rounded-xl p-8 space-y-8">
        <div className="border-b border-white/10 pb-4">
        <h2 className="font-display-lg text-4xl text-on-surface">Resumen Temporada {year}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-xl flex items-center justify-between">
          <div>
            <div className="font-label-caps text-on-surface-variant uppercase mb-1">Campeón</div>
            <div className="font-headline-md text-2xl text-secondary">
               {season.champion ? 
                 <PlayerTrigger playerName={season.champion} className="hover:text-primary-fixed-dim transition-colors">
                   <img src={getAvatarUrl(season.champion)} className="w-8 h-8 rounded-full" alt="" /> {season.champion}
                 </PlayerTrigger>
               : '-'}
            </div>
          </div>
          <span className="material-symbols-outlined text-4xl text-secondary opacity-50">emoji_events</span>
        </div>
        
        <div className="bg-primary-fixed-dim/10 border border-primary-fixed-dim/20 p-6 rounded-xl flex items-center justify-between">
          <div>
            <div className="font-label-caps text-on-surface-variant uppercase mb-1">MVP</div>
            <div className="font-headline-md text-2xl text-primary-fixed-dim">
              {season.mvp ? 
                <PlayerTrigger playerName={season.mvp} className="hover:text-[#ccff00] transition-colors">
                  <img src={getAvatarUrl(season.mvp)} className="w-8 h-8 rounded-full" alt="" /> {season.mvp}
                </PlayerTrigger>
              : '-'}
            </div>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary-fixed-dim opacity-50">star</span>
        </div>

        <div className="bg-surface-container-low border border-white/5 p-6 rounded-xl">
          <div className="font-label-caps text-on-surface-variant uppercase mb-1">MVP Playoff</div>
          <div className="font-headline-md text-xl text-on-surface">
             {season.mvpPlayoff ? 
               <PlayerTrigger playerName={season.mvpPlayoff} className="hover:text-primary-fixed-dim transition-colors">
                 <img src={getAvatarUrl(season.mvpPlayoff)} className="w-6 h-6 rounded-full" alt="" /> {season.mvpPlayoff}
               </PlayerTrigger>
             : '-'}
          </div>
        </div>

        <div className="bg-surface-container-low border border-white/5 p-6 rounded-xl">
          <div className="font-label-caps text-on-surface-variant uppercase mb-1">Jokic League</div>
          <div className="font-headline-md text-xl text-on-surface">
             {season.jokicLeague ? 
               <PlayerTrigger playerName={season.jokicLeague} className="hover:text-primary-fixed-dim transition-colors">
                 <img src={getAvatarUrl(season.jokicLeague)} className="w-6 h-6 rounded-full" alt="" /> {season.jokicLeague}
               </PlayerTrigger>
             : '-'}
          </div>
        </div>

        <div className="bg-surface-container-low border border-white/5 p-6 rounded-xl">
          <div className="font-label-caps text-on-surface-variant uppercase mb-1">Campeón Conf. A</div>
          <div className="font-headline-md text-xl text-on-surface">
             {season.conferenceA ? 
               <PlayerTrigger playerName={season.conferenceA} className="hover:text-primary-fixed-dim transition-colors">
                 <img src={getAvatarUrl(season.conferenceA)} className="w-6 h-6 rounded-full" alt="" /> {season.conferenceA}
               </PlayerTrigger>
             : '-'}
          </div>
        </div>

        <div className="bg-surface-container-low border border-white/5 p-6 rounded-xl">
          <div className="font-label-caps text-on-surface-variant uppercase mb-1">Campeón Conf. B</div>
          <div className="font-headline-md text-xl text-on-surface">
             {season.conferenceB ? 
               <PlayerTrigger playerName={season.conferenceB} className="hover:text-primary-fixed-dim transition-colors">
                 <img src={getAvatarUrl(season.conferenceB)} className="w-6 h-6 rounded-full" alt="" /> {season.conferenceB}
               </PlayerTrigger>
             : '-'}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [hoverInfo, setHoverInfo] = useState({ player: null, x: 0, y: 0 });

  return (
    <HoverContext.Provider value={setHoverInfo}>
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col md:flex-row">
      <HoverCard info={hoverInfo} />
      {/* Sidebar for Desktop */}
      <aside className="hidden xl:flex fixed left-0 top-0 h-full w-80 bg-[#0a0a0a] border-r border-white/10 flex-col py-8 px-4 z-[60] shadow-2xl shadow-black divide-y divide-white/5">
        <div className="pb-6 px-4 pt-10">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('global')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-['Inter'] text-sm font-semibold ${activeTab === 'global' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined">dashboard</span>
              Panel Global
            </button>
            <button 
              onClick={() => setActiveTab('player')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-['Inter'] text-sm font-semibold ${activeTab === 'player' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined">person</span>
              Perfil de Jugador
            </button>
            <button 
              onClick={() => setActiveTab('season')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-['Inter'] text-sm font-semibold ${activeTab === 'season' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined">inventory_2</span>
              Archivo de Temporada
            </button>
            <button 
              onClick={() => setActiveTab('awards')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-['Inter'] text-sm font-semibold ${activeTab === 'awards' ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-4 border-[#ccff00]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className="material-symbols-outlined">emoji_events</span>
              Premios e Historia
            </button>
          </nav>
        </div>
      </aside>

      <div className="flex-1 xl:ml-80">
        <header className="fixed top-0 xl:w-[calc(100%-20rem)] w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo-hd.png`} alt="Fantasy ESPN History" className="h-8 md:h-10 w-auto" />
          </div>
        </header>

        <main className="pt-24 pb-32 px-4 md:px-margin-page max-w-7xl mx-auto space-y-stack-lg">
          {/* Filter Bar (Conditional) */}
          {(activeTab === 'player' || activeTab === 'season') && (
            <section className="glass-card rounded-lg p-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">filter_list</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Filtro:</span>
              </div>
              
              {activeTab === 'player' && (
                <div className="relative group">
                  <select 
                    className="bg-surface-container-lowest border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-2 appearance-none pr-10 focus:ring-1 focus:ring-primary-fixed-dim outline-none cursor-pointer"
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                  >
                    <option value="" disabled>Selecciona un Jugador...</option>
                    {participants.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-xs pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              )}

              {activeTab === 'season' && (
                <div className="relative group">
                  <select 
                    className="bg-surface-container-lowest border border-outline-variant text-on-surface text-sm rounded-lg px-4 py-2 appearance-none pr-10 focus:ring-1 focus:ring-primary-fixed-dim outline-none cursor-pointer"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                  >
                    <option value="" disabled>Selecciona una Temporada...</option>
                    {seasons.map(s => <option key={s.year} value={s.year}>{s.year}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-xs pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              )}
            </section>
          )}

          {/* Tab Content */}
          {activeTab === 'global' && <GlobalDashboard />}
          {activeTab === 'player' && <PlayerProfile playerName={selectedPlayer} onPlayerSelect={setSelectedPlayer} />}
          {activeTab === 'season' && <SeasonView year={selectedSeason} onSeasonSelect={setSelectedSeason} />}
          {activeTab === 'awards' && <AwardsView />}
        </main>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 pb-4 px-2 xl:hidden">
        <button 
          onClick={() => setActiveTab('global')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'global' ? 'text-[#ccff00] bg-[#ccff00]/10 rounded-xl px-3 py-1 ring-1 ring-[#ccff00]/30' : 'text-gray-500 opacity-60 hover:text-[#ccff00] hover:opacity-100 px-3 py-1'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Panel</span>
        </button>
        <button 
          onClick={() => setActiveTab('player')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'player' ? 'text-[#ccff00] bg-[#ccff00]/10 rounded-xl px-3 py-1 ring-1 ring-[#ccff00]/30' : 'text-gray-500 opacity-60 hover:text-[#ccff00] hover:opacity-100 px-3 py-1'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Perfil</span>
        </button>
        <button 
          onClick={() => setActiveTab('season')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'season' ? 'text-[#ccff00] bg-[#ccff00]/10 rounded-xl px-3 py-1 ring-1 ring-[#ccff00]/30' : 'text-gray-500 opacity-60 hover:text-[#ccff00] hover:opacity-100 px-3 py-1'}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Archivo</span>
        </button>
        <button 
          onClick={() => setActiveTab('awards')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'awards' ? 'text-[#ccff00] bg-[#ccff00]/10 rounded-xl px-3 py-1 ring-1 ring-[#ccff00]/30' : 'text-gray-500 opacity-60 hover:text-[#ccff00] hover:opacity-100 px-3 py-1'}`}>
          <span className="material-symbols-outlined">emoji_events</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Premios</span>
        </button>
      </nav>
    </div>
    </HoverContext.Provider>
  );
}
