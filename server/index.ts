import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mock Multi-Agent System (MAS) Logic
const getAgentInsights = () => {
  return [
    {
      id: 'agent-alpha-1',
      name: 'GridOptimizer',
      task: 'Electricity Efficiency',
      status: 'Analyzing Load',
      prediction: 'Projected 15% surge in District 4 grid stress over next 4 hours.',
      action: 'Rebalancing Impact Pool liquidity to backup storage providers.',
      confidence: 0.94
    },
    {
      id: 'agent-beta-2',
      name: 'FlowMaster',
      task: 'Urban Traffic',
      status: 'Active Monitoring',
      prediction: 'Congestion spike detected near Main St. due to sensor ID #402.',
      action: 'Triggering dynamic carbon credit rewards for public transit users.',
      confidence: 0.88
    }
  ];
};

app.get('/api/agents', (req, res) => {
  res.json(getAgentInsights());
});

app.get('/api/city-metrics', (req, res) => {
  res.json({
    carbonOffset: 1240.5,
    energySaved: '45.2 MWh',
    activeBonds: 12,
    creatorYield: '6.4% APY'
  });
});

app.listen(PORT, () => {
  console.log(`EcoAgent Server running on port ${PORT}`);
});