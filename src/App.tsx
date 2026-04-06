import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Trash2, 
  Cpu, 
  TrendingUp, 
  Globe, 
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: '00:00', load: 4000, impact: 2400 },
  { name: '04:00', load: 3000, impact: 1398 },
  { name: '08:00', load: 2000, impact: 9800 },
  { name: '12:00', load: 2780, impact: 3908 },
  { name: '16:00', load: 1890, impact: 4800 },
  { name: '20:00', load: 2390, impact: 3800 },
];

export default function App() {
  const [agents, setAgents] = useState([]);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('/api/agents').then(res => res.json()).then(setAgents);
    fetch('/api/city-metrics').then(res => res.json()).then(setMetrics);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-950/80 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-eco-500 rounded-lg flex items-center justify-center">
            <Cpu className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">ECO<span className="text-eco-500">AGENT</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-full border border-solana-purple text-solana-purple font-medium hover:bg-solana-purple/10 transition-colors">
            Connect Wallet
          </button>
          <button className="px-4 py-2 rounded-full bg-eco-600 text-white font-medium hover:bg-eco-500">
            Launch Impact Pool
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6">
        
        {/* Stats Summary */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Carbon Offset" value={metrics?.carbonOffset + " tons"} icon={<Globe className="text-blue-400" />} />
          <StatCard title="Energy Efficiency" value={metrics?.energySaved} icon={<Zap className="text-yellow-400" />} />
          <StatCard title="Active Impact Bonds" value={metrics?.activeBonds} icon={<ShieldCheck className="text-eco-500" />} />
          <StatCard title="Creator Yield" value={metrics?.creatorYield} icon={<TrendingUp className="text-solana-green" />} />
        </div>

        {/* AI Agent Monitor */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="text-eco-500" /> Active Multi-Agent System (MAS)
            </h2>
            <span className="text-xs text-slate-400">LIVE PREDICTION ENGINE</span>
          </div>
          <div className="space-y-4">
            {agents.map((agent: any) => (
              <div key={agent.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-eco-100">{agent.name} <span className="text-xs font-normal text-slate-500">[{agent.task}]</span></span>
                  <span className="text-xs bg-eco-500/20 text-eco-400 px-2 py-1 rounded">{agent.status}</span>
                </div>
                <p className="text-sm text-slate-300 italic">"{agent.prediction}"</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-solana-green">Action: {agent.action}</span>
                  <span className="text-slate-500">Confidence: {(agent.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="text-solana-purple" /> Real-time Impact Yield
          </h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b'}} />
                <Area type="monotone" dataKey="impact" stroke="#22c55e" fillOpacity={1} fill="url(#colorImpact)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Creator Pools */}
        <div className="col-span-12 glass-panel p-6">
          <h2 className="text-xl font-semibold mb-6">Creator-Led Impact Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PoolCard 
              creator="@EcoInfluencer" 
              title="Berlin Drainage Revitalization" 
              target="500 SOL" 
              progress={75} 
            />
            <PoolCard 
              creator="@UrbanTech" 
              title="Solar-Powered Transit Hubs" 
              target="1200 SOL" 
              progress={40} 
            />
            <PoolCard 
              creator="@GreenDevs" 
              title="Autonomous Waste Sorting AI" 
              target="800 SOL" 
              progress={92} 
            />
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-slate-500 border-t border-slate-800">
        <p>© 2024 EcoAgent - Decentralized Urban Intelligence for Solana Sustainability</p>
      </footer>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="glass-panel p-4 flex items-center gap-4">
      <div className="p-3 bg-slate-800 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{title}</p>
        <p className="text-xl font-bold">{value || '---'}</p>
      </div>
    </div>
  );
}

function PoolCard({ creator, title, target, progress }: any) {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-eco-500/50 transition-colors cursor-pointer">
      <div className="text-xs text-eco-500 font-mono mb-1">{creator}</div>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <div className="flex justify-between text-xs mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-slate-800 h-2 rounded-full mb-4">
        <div 
          className="bg-eco-500 h-full rounded-full transition-all duration-1000" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Target: {target}</span>
        <button className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold uppercase">
          Back Project
        </button>
      </div>
    </div>
  );
}