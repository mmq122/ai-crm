import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import AgentMonitor from './pages/AgentMonitor'
import Reports from './pages/Reports'
import Users from './pages/Users'
import SystemTests from './pages/SystemTests-Admin'
import SystemMaturity from './pages/SystemMaturity'
import Layout from './components/Layout'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tickets" element={<Layout><Tickets /></Layout>} />
        <Route path="/agent-monitor" element={<Layout><AgentMonitor /></Layout>} />
        <Route path="/maturity" element={<Layout><SystemMaturity /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/system-tests" element={<Layout><SystemTests /></Layout>} />
        <Route path="/agent" element={<Layout><AgentMonitor /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
