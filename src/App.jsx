import React, { useState, useMemo } from 'react';
import { Trophy, Star, Medal, User, Calendar, BarChart2, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import data from './data/fantasy_history.json';
import './index.css';

const participants = Object.values(data.participants).sort((a, b) => a.globalRank - b.globalRank);
const seasons = Object.values(data.seasons).sort((a, b) => b.year - a.year);

const GlobalDashboard = () => {
  // Prepare chart data for Global Points
  const chartData = useMemo(() => {
    return participants.slice(0, 10).map(p => ({
      name: p.name,
      points: p.globalPoints
    }));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="card">
          <div className="stat-label flex items-center gap-2"><Calendar size={16}/> Total Seasons</div>
          <div className="stat-value">{seasons.length}</div>
        </div>
        <div className="card">
          <div className="stat-label flex items-center gap-2"><User size={16}/> Participants</div>
          <div className="stat-value">{participants.length}</div>
        </div>
        <div className="card">
          <div className="stat-label flex items-center gap-2"><Trophy size={16}/> Total Champions</div>
          <div className="stat-value">{participants.filter(p => p.championships.length > 0).length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy color="var(--accent-gold)" /> Hall of Fame (Top 5)
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Points</th>
                  <th>Rings</th>
                </tr>
              </thead>
              <tbody>
                {participants.slice(0, 5).map((p, idx) => (
                  <tr key={p.name}>
                    <td>#{p.globalRank}</td>
                    <td style={{ fontWeight: 'bold', color: idx === 0 ? 'var(--accent-gold)' : 'inherit' }}>{p.name}</td>
                    <td>{p.globalPoints}</td>
                    <td>{p.championships.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 color="var(--accent-blue)" /> Top 10 Global Points
          </h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip cursor={{fill: 'var(--surface-hover)'}} contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--accent-gold)' : 'var(--accent-blue)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerProfile = ({ playerName }) => {
  if (!playerName) return null;
  const player = data.participants[playerName];

  return (
    <div className="card">
      <div className="player-header">
        <div className="avatar">{player.name.substring(0, 2)}</div>
        <div>
          <h2>{player.name}</h2>
          <div className="stat-label" style={{ marginTop: '0.25rem' }}>Global Rank: #{player.globalRank} • {player.globalPoints} pts</div>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="stat-label">Championships</div>
          <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>{player.championships.length}</div>
        </div>
        <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="stat-label">MVPs</div>
          <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{player.mvps.length}</div>
        </div>
        <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="stat-label">Conf. Titles</div>
          <div className="stat-value">{player.conferenceChampionships.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} color="var(--accent-gold)" /> Championship Years
          </h3>
          {player.championships.length > 0 ? (
            player.championships.map(y => <div key={y} className="list-item">{y} <span className="badge badge-gold">Champion</span></div>)
          ) : (
            <div className="text-secondary">No championships yet.</div>
          )}
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={18} color="var(--accent-blue)" /> MVP Years
          </h3>
          {player.mvps.length > 0 ? (
            player.mvps.map(y => <div key={y} className="list-item">{y} <span className="badge badge-blue">MVP</span></div>)
          ) : (
            <div className="text-secondary">No MVPs yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const AwardsView = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="card">
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award color="var(--accent-gold)" /> Jokic League History
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {seasons.filter(s => s.jokicLeague).map(s => (
                <tr key={`jokic-${s.year}`}>
                  <td>{s.year}</td>
                  <td style={{ fontWeight: 'bold' }}>{s.jokicLeague}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star color="var(--accent-blue)" /> MVP History
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Regular MVP</th>
                <th>Playoff MVP</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map(s => (
                <tr key={`mvp-${s.year}`}>
                  <td>{s.year}</td>
                  <td style={{ fontWeight: s.mvp ? 'bold' : 'normal' }}>{s.mvp || '-'}</td>
                  <td>{s.mvpPlayoff || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SeasonView = ({ year }) => {
  if (!year) return null;
  const season = data.seasons[year];

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Season {year} Summary</h2>
      
      <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(251, 191, 36, 0.05)', borderRadius: '8px' }}>
          <div className="stat-label">Champion</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{season.champion || '-'}</div>
        </div>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '8px' }}>
          <div className="stat-label">MVP</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{season.mvp || '-'}</div>
        </div>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div className="stat-label">Playoff MVP</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{season.mvpPlayoff || '-'}</div>
        </div>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div className="stat-label">Jokic League</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{season.jokicLeague || '-'}</div>
        </div>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div className="stat-label">Conf. A Champ</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{season.conferenceA || '-'}</div>
        </div>
        <div className="list-item" style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div className="stat-label">Conf. B Champ</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{season.conferenceB || '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('global');
  const [selectedPlayer, setSelectedPlayer] = useState(participants[0].name);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0].year.toString());

  return (
    <div className="app-container">
      <header>
        <h1>Fantasy ESPN History</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="select-input"
            value={selectedPlayer}
            onChange={(e) => {
              setSelectedPlayer(e.target.value);
              if(activeTab !== 'player') setActiveTab('player');
            }}
          >
            <option value="" disabled>Select Player...</option>
            {participants.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
          <select 
            className="select-input"
            value={selectedSeason}
            onChange={(e) => {
              setSelectedSeason(e.target.value);
              if(activeTab !== 'season') setActiveTab('season');
            }}
          >
            <option value="" disabled>Select Season...</option>
            {seasons.map(s => <option key={s.year} value={s.year}>{s.year}</option>)}
          </select>
        </div>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === 'global' ? 'active' : ''}`} onClick={() => setActiveTab('global')}>
          Global Dashboard
        </button>
        <button className={`tab ${activeTab === 'player' ? 'active' : ''}`} onClick={() => setActiveTab('player')}>
          Player Profile
        </button>
        <button className={`tab ${activeTab === 'season' ? 'active' : ''}`} onClick={() => setActiveTab('season')}>
          Season Summary
        </button>
        <button className={`tab ${activeTab === 'awards' ? 'active' : ''}`} onClick={() => setActiveTab('awards')}>
          Awards & Jokic League
        </button>
      </div>

      <main>
        {activeTab === 'global' && <GlobalDashboard />}
        {activeTab === 'player' && <PlayerProfile playerName={selectedPlayer} />}
        {activeTab === 'season' && <SeasonView year={selectedSeason} />}
        {activeTab === 'awards' && <AwardsView />}
      </main>
    </div>
  );
}
