
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import AgentMonitor from './pages/AgentMonitor'
import Reports from './pages/Reports'
import Users from './pages/Users'
import SystemTests from './pages/SystemTests-Admin'
import SystemMaturity from './pages/SystemMaturity'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/agent-monitor" element={<AgentMonitor />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/system-tests" element={<SystemTests />} />
        <Route path="/maturity" element={<SystemMaturity />} />
        <Route path="/agent" element={<AgentMonitor />} />
        <Route path="/ai-demo" element={<Dashboard />} />
        <Route path="*" element={<div style={{ padding: '40px', textAlign: 'center' }}><h2>الصفحة غير موجودة</h2><a href="/dashboard">العودة للرئيسية</a></div>} />
      </Routes>
    </BrowserRouter>
  )
}
