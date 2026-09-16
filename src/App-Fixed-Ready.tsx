import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import AIDemo from './pages/AIDemo'
import Agent from './pages/Agent'
import AgentMonitor from './pages/AgentMonitor'
import Reports from './pages/Reports'
import Users from './pages/Users'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/ai-demo" element={<AIDemo />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/agent-monitor" element={<AgentMonitor />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chat" element={<Dashboard />} />
        <Route path="/telegram" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
