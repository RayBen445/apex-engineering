import React, { useState, useEffect } from 'react';
import {
  Compass,
  Building2,
  Cpu,
  Wind,
  Anchor,
  Activity,
  Calculator,
  ShieldCheck,
  Globe2,
  ChevronRight,
  ExternalLink,
  Award,
  Zap,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Send,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'civil' | 'energy' | 'robotics' | 'marine';
  location: string;
  budget: string;
  timeline: string;
  status: 'Operational' | 'Active Construction' | 'Commissioning';
  completion: number;
  highlight: string;
  description: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'prj-1',
    title: 'Nordic Deepwater Offshore Wind Cluster',
    category: 'energy',
    location: 'North Sea, Norway',
    budget: '$3.4 Billion',
    timeline: '2023 - 2026',
    status: 'Active Construction',
    completion: 78,
    highlight: '1.2 GW capacity with tension-leg floating tether systems.',
    description: 'Autonomous floating turbine arrays with automated robotic dynamic ballast control and subsea HVDC transmission.'
  },
  {
    id: 'prj-2',
    title: 'Trans-Oceanic Seismic Suspension Bridge',
    category: 'civil',
    location: 'Yokohama Bay, Japan',
    budget: '$1.8 Billion',
    timeline: '2021 - 2025',
    status: 'Commissioning',
    completion: 96,
    highlight: 'Grade 9.0 earthquake tuned-mass damper system.',
    description: 'Continuous dual-deck composite roadway with active hydraulic counterweight dampers and laser deflection monitoring.'
  },
  {
    id: 'prj-3',
    title: 'Autonomous Port Logistics Terminal & AGV Hub',
    category: 'robotics',
    location: 'Rotterdam, Netherlands',
    budget: '$850 Million',
    timeline: '2022 - 2024',
    status: 'Operational',
    completion: 100,
    highlight: '320 Autonomous Guided Vehicles with 5G sub-millimeter positioning.',
    description: 'Fully automated zero-emission container yard utilizing digital twin scheduling and automated robotic ship-to-shore cranes.'
  },
  {
    id: 'prj-4',
    title: 'Hyper-Scale High-Altitude Solar & Storage Array',
    category: 'energy',
    location: 'Atacama Desert, Chile',
    budget: '$2.1 Billion',
    timeline: '2024 - 2027',
    status: 'Active Construction',
    completion: 42,
    highlight: '6 GWh solid-state battery energy storage farm.',
    description: 'Bifacial solar tracking with robotic dry-cleaning crawler drones and dual-axis solar positioning.'
  },
  {
    id: 'prj-5',
    title: 'Ultra-Deepwater Subsea Dry Dock Facility',
    category: 'marine',
    location: 'Busan Harbor, South Korea',
    budget: '$1.2 Billion',
    timeline: '2022 - 2025',
    status: 'Active Construction',
    completion: 85,
    highlight: '120m submersible pneumatic caisson locks.',
    description: 'Submerged drydock servicing next-generation autonomous hydrogen container ships and offshore energy tenders.'
  },
  {
    id: 'prj-6',
    title: 'Smart Mega-Foundry Robotic Casting Foundry',
    category: 'robotics',
    location: 'Stuttgart, Germany',
    budget: '$920 Million',
    timeline: '2023 - 2025',
    status: 'Commissioning',
    completion: 91,
    highlight: 'Precision 8-axis robotic gantry casting cells.',
    description: 'Real-time thermal AI telemetry, automated X-ray metallurgical defect analysis, and closed-loop robotic pouring.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'services' | 'telemetry' | 'estimator' | 'about' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Telemetry real-time simulator state
  const [telemetry, setTelemetry] = useState({
    strainRatio: 42.4,
    seismicAccel: 0.018,
    windShear: 34.2,
    dampingLoad: 68.9,
    activeNodes: 1420,
    status: 'Nominal',
  });

  // RFP Estimator state
  const [estimatorDiscipline, setEstimatorDiscipline] = useState<'civil' | 'energy' | 'robotics' | 'marine'>('civil');
  const [estimatorScale, setEstimatorScale] = useState<number>(50);
  const [estimatorSeismic, setEstimatorSeismic] = useState<'standard' | 'high' | 'critical'>('high');
  const [estimatorDuration, setEstimatorDuration] = useState<number>(24);
  const [rfpSubmitted, setRfpSubmitted] = useState(false);

  // Simulate live sensor updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => ({
        strainRatio: +(40 + Math.random() * 8).toFixed(1),
        seismicAccel: +(0.015 + Math.random() * 0.008).toFixed(3),
        windShear: +(30 + Math.random() * 12).toFixed(1),
        dampingLoad: +(65 + Math.random() * 10).toFixed(1),
        activeNodes: 1420 + Math.floor(Math.random() * 5),
        status: 'Nominal',
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Filter projects
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate estimated budget
  const calculateEstimatedCost = () => {
    let baseRate = 1.2; // in Millions
    if (estimatorDiscipline === 'energy') baseRate = 1.6;
    if (estimatorDiscipline === 'robotics') baseRate = 1.4;
    if (estimatorDiscipline === 'marine') baseRate = 2.0;

    let multiplier = 1.0;
    if (estimatorSeismic === 'high') multiplier = 1.35;
    if (estimatorSeismic === 'critical') multiplier = 1.8;

    const total = baseRate * estimatorScale * multiplier;
    return total.toFixed(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              ▲
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>APEX</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono tracking-widest">Global</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold block -mt-0.5">Heavy Engineering</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 text-xs font-semibold">
            {[
              { id: 'home', label: 'Overview', icon: Compass },
              { id: 'projects', label: 'Megastructures', icon: Building2 },
              { id: 'services', label: 'Disciplines', icon: Layers },
              { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
              { id: 'estimator', label: 'RFP Estimator', icon: Calculator },
              { id: 'about', label: 'ISO & Board', icon: ShieldCheck },
              { id: 'contact', label: 'Contact', icon: Globe2 },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('estimator')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/25 flex items-center gap-1.5"
            >
              <span>Instant RFP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="lg:hidden flex overflow-x-auto custom-scrollbar px-4 py-2 gap-2 border-t border-white/5 bg-[#0a0c12]">
          {[
            { id: 'home', label: 'Home' },
            { id: 'projects', label: 'Projects' },
            { id: 'services', label: 'Services' },
            { id: 'telemetry', label: 'Telemetry' },
            { id: 'estimator', label: 'Estimator' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
                activeTab === t.id ? 'bg-blue-600 text-white font-bold' : 'bg-white/5 text-slate-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB 1: OVERVIEW / HOME */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative pt-20 pb-24 px-6 bg-grid-pattern bg-radial-glow overflow-hidden">
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  ISO 9001 / 14001 / 45001 Certified Heavy Engineering
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
                  Architecting Civil Megastructures & <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Robotic Foundries</span>
                </h1>

                <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Apex Global Engineering delivers turnkey deepwater offshore wind clusters, seismic-rated suspension megastructures, and autonomous port logistics across 34 nations.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 transition"
                  >
                    <span>Explore Megastructure Portfolio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-sm flex items-center gap-2 transition"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>View Live Structural Telemetry</span>
                  </button>
                </div>

                {/* Key Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto text-left">
                  {[
                    { label: 'Capital Deployed', val: '$14.2 Billion', desc: 'Turnkey projects completed' },
                    { label: 'Seismic Resilience', val: 'Grade 9.0+', desc: 'Active damper telemetry' },
                    { label: 'Clean Energy EPC', val: '8.4 Gigawatts', desc: 'Installed grid capacity' },
                    { label: 'Safety Metric', val: '0.00 LTI', desc: '14.8M hours incident-free' },
                  ].map((m, i) => (
                    <div key={i} className="glass-card p-5 rounded-2xl">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{m.label}</span>
                      <div className="text-2xl font-black text-white mt-1">{m.val}</div>
                      <span className="text-xs text-blue-400/80 mt-1 block font-medium">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Megastructures Carousel/Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Portfolio</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Active Landmark Engineering Projects</h2>
                </div>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View All 6 Mega Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROJECTS_DATA.slice(0, 3).map((p) => (
                  <div key={p.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono uppercase font-bold">
                          {p.category}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {p.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug">{p.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Capital:</span>
                        <span className="font-semibold text-slate-200">{p.budget}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Progress:</span>
                        <span className="font-mono text-blue-400 font-bold">{p.completion}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${p.completion}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: MEGASTRUCTURES (PROJECTS) */}
        {activeTab === 'projects' && (
          <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Commissioning</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Megastructure Portfolio</h1>
              <p className="text-sm text-slate-400 mt-2">
                Heavy civil, offshore maritime, high-voltage renewable energy, and robotics foundry infrastructure.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {['all', 'civil', 'energy', 'robotics', 'marine'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search by project or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
              />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p) => (
                <div key={p.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase font-bold">
                        {p.category}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">{p.location}</p>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-slate-300 mb-4">
                      <span className="text-blue-400 font-bold block mb-1">Specification:</span>
                      {p.highlight}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Budget:</span>
                      <span className="font-semibold text-white">{p.budget}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Timeline:</span>
                      <span className="text-slate-400 font-mono">{p.timeline}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${p.completion}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: SERVICES & DISCIPLINES */}
        {activeTab === 'services' && (
          <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Engineering Divisions</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Multi-Disciplinary EPC Capabilities</h1>
              <p className="text-sm text-slate-400 mt-2">
                End-to-end feasibility, structural FEA simulation, automated robotics, and sovereign infrastructure delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Building2,
                  title: 'Civil & Heavy Structural Engineering',
                  desc: 'Long-span cable-stayed suspension crossings, tuned-mass vibration absorbers, deep-caisson soil foundation stabilization, and Grade 9.0 earthquake resistance.',
                  tags: ['Finite Element Analysis (FEA)', 'Pre-Stressed Post-Tensioned Concrete', 'Seismic Damper Telemetry']
                },
                {
                  icon: Wind,
                  title: 'Clean Energy & Grid EPC',
                  desc: 'Tethered floating offshore wind turbine foundations, gigawatt-scale high-voltage direct current (HVDC) converter substations, and solid-state utility BESS.',
                  tags: ['HVDC Subsea Cables', 'Floating Turbines (TLP)', 'Thermal Salt Energy Storage']
                },
                {
                  icon: Cpu,
                  title: 'Robotics & Industrial Automation',
                  desc: 'Closed-loop PLC manufacturing automation, autonomous guided vehicle (AGV) freight logistics, digital twin SCADA telemetry, and automated drone inspections.',
                  tags: ['Multi-Axis Industrial Arms', '5G Real-time AGV Networks', 'Computer Vision Defect QA']
                },
                {
                  icon: Anchor,
                  title: 'Marine & Harbor Engineering',
                  desc: 'Automated deepwater container terminal berths, coastal breakwater surge defenses, submerged drydock infrastructure, and zero-emission shore power grids.',
                  tags: ['Pneumatic Caisson Locks', 'Tidal Surge Attenuation', 'Marine Cathodic Protection']
                }
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {s.tags.map((t, j) => (
                        <span key={j} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 4: LIVE STRUCTURAL TELEMETRY */}
        {activeTab === 'telemetry' && (
          <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Live SCADA Feed Active
                </span>
                <h1 className="text-3xl font-extrabold text-white mt-1">Yokohama Bay Bridge Structural Telemetry</h1>
                <p className="text-xs text-slate-400 mt-1">Active sensor telemetry synchronized via DevOS Global Edge.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300">
                  Node Heartbeat: <strong className="text-emerald-400">99.98%</strong>
                </span>
              </div>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-blue-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cable Strain Ratio</span>
                <div className="text-3xl font-black text-white mt-1">{telemetry.strainRatio} <span className="text-xs text-slate-400 font-normal">MPa</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(telemetry.strainRatio / 60) * 100}%` }}></div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-cyan-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Seismic Acceleration</span>
                <div className="text-3xl font-black text-white mt-1">{telemetry.seismicAccel} <span className="text-xs text-slate-400 font-normal">g</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(telemetry.seismicAccel / 0.05) * 100}%` }}></div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Wind Shear Velocity</span>
                <div className="text-3xl font-black text-white mt-1">{telemetry.windShear} <span className="text-xs text-slate-400 font-normal">km/h</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(telemetry.windShear / 80) * 100}%` }}></div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active IoT Nodes</span>
                <div className="text-3xl font-black text-white mt-1">{telemetry.activeNodes} <span className="text-xs text-slate-400 font-normal">Online</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-emerald-400" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>

            {/* Telemetry Visual Simulator */}
            <div className="glass-panel p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  Real-time Tuned-Mass Damper Dynamic Load Curve
                </span>
                <span className="text-xs font-mono text-slate-400">Sampling: 100 Hz</span>
              </div>

              {/* Dynamic waveform visualization */}
              <div className="h-44 bg-black/60 rounded-2xl border border-white/5 flex items-end justify-between px-4 py-3 gap-1 overflow-hidden">
                {Array.from({ length: 48 }).map((_, idx) => {
                  const heightVal = Math.sin((idx + telemetry.strainRatio) * 0.4) * 35 + 50;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all duration-300"
                      style={{ height: `${heightVal}%` }}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Timestamp: {new Date().toLocaleTimeString()}</span>
                <span className="text-emerald-400 font-semibold">Tuned Damper Status: Active (0.24Hz Counter-oscillation)</span>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: RFP FEASIBILITY ESTIMATOR */}
        {activeTab === 'estimator' && (
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Algorithmic Cost Modeler</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Instant RFP Feasibility Estimator</h1>
              <p className="text-sm text-slate-400 mt-2">
                Configure engineering parameters to generate a preliminary capital expenditure model and delivery timeline.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <div className="space-y-6">
                {/* Discipline Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Core Engineering Discipline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'civil', label: 'Civil & Bridge', icon: Building2 },
                      { id: 'energy', label: 'Offshore Energy', icon: Wind },
                      { id: 'robotics', label: 'Robotic Foundry', icon: Cpu },
                      { id: 'marine', label: 'Deepwater Port', icon: Anchor },
                    ].map((d) => {
                      const Icon = d.icon;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setEstimatorDiscipline(d.id as any)}
                          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                            estimatorDiscipline === d.id
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-blue-400" />
                          <span className="text-xs font-bold">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scale Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Scale Index
                    </label>
                    <span className="font-mono text-sm text-blue-400 font-bold">{estimatorScale} Units</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={estimatorScale}
                    onChange={(e) => setEstimatorScale(+e.target.value)}
                    className="w-full accent-blue-600 bg-white/10 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                {/* Seismic Class */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Environmental / Seismic Specification
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'standard', label: 'Standard Zone (Grade 6)' },
                      { id: 'high', label: 'Active Seismic (Grade 8)' },
                      { id: 'critical', label: 'Extreme Offshore (Grade 9+)' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setEstimatorSeismic(s.id as any)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition ${
                          estimatorSeismic === s.id
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-black/30 border-white/5 text-slate-400'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Quote Output Box */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 to-black border border-blue-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">Estimated Capital Bracket</span>
                      <div className="text-4xl font-black text-white mt-1">
                        ${calculateEstimatedCost()} <span className="text-lg font-normal text-slate-400">Million USD</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1 block">Includes civil feasibility, FEA simulation, and full turnkey commissioning.</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRfpSubmitted(true)}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 whitespace-nowrap self-start sm:self-auto"
                    >
                      {rfpSubmitted ? '✓ RFP Transmitted' : 'Submit for Technical Review'}
                    </button>
                  </div>

                  {rfpSubmitted && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Parametric model registered. Our Senior Managing Partner will transmit the feasibility deck within 24 hours.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: ABOUT / ISO */}
        {activeTab === 'about' && (
          <section className="py-12 px-6 max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Governance</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Executive Leadership & Accreditations</h1>
              <p className="text-sm text-slate-400 mt-2">
                Delivering uncompromising precision, zero lost-time incidents, and multi-national engineering certifications.
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'ISO 9001:2015', tag: 'Quality Management', desc: 'Full lifecycle structural design and QA verification across all 34 operating regions.' },
                { title: 'ISO 14001:2015', tag: 'Environmental Management', desc: 'Decarbonized low-clinker green concrete standards and marine ecological protection.' },
                { title: 'ISO 45001:2018', tag: 'Occupational Health & Safety', desc: '0.00 Lost Time Injury rate over 14.8 million continuous megaproject hours.' },
              ].map((c, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{c.title}</h3>
                  <span className="text-[11px] text-blue-400 font-semibold block mb-2">{c.tag}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Executive Board */}
            <h2 className="text-xl font-bold text-white mb-6">Executive Engineering Committee</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: 'Dr. Arthur Sterling, Ph.D.', role: 'Chief Executive Officer', field: 'Ex-Bechtel, Deepwater Structures' },
                { name: 'Elena Rostova, M.Eng.', role: 'Head of Robotics & Telemetry', field: 'Ex-KUKA, SCADA Industrial Automation' },
                { name: 'Hiroshi Tanaka, P.E.', role: 'VP of Civil Engineering', field: 'Ex-Taisei, Seismic Suspension Systems' },
              ].map((b, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-white font-bold text-base mb-4">
                    {b.name[3]}
                  </div>
                  <h4 className="font-bold text-white text-sm">{b.name}</h4>
                  <span className="text-xs text-blue-400 block">{b.role}</span>
                  <p className="text-[11px] text-slate-500 mt-2">{b.field}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 7: CONTACT / GLOBAL HUBS */}
        {activeTab === 'contact' && (
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Inquiries</span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Connect with Regional Engineering Command</h1>
              <p className="text-sm text-slate-400 mt-2">Direct lines to our principal partners in Europe, Asia-Pacific, and the Americas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { city: 'London (Headquarters)', addr: 'One Tower Bridge, Level 24, London SE1 2UP', phone: '+44 (0) 20 7946 0991' },
                { city: 'Tokyo (APAC Hub)', addr: 'Roppongi Hills Mori Tower 38F, Minato City', phone: '+81 3 5555 0142' },
                { city: 'Houston (Americas Hub)', addr: '1000 Louisiana St, Suite 4800, Houston TX', phone: '+1 (713) 555-0198' },
              ].map((h, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl">
                  <Globe2 className="w-5 h-5 text-blue-400 mb-2" />
                  <h4 className="font-bold text-white text-sm">{h.city}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{h.addr}</p>
                  <span className="text-xs font-mono text-blue-400 block mt-2">{h.phone}</span>
                </div>
              ))}
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-white mb-4">Transmit Official Engineering RFP</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('RFP Inquiry Dispatched.'); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Principal Officer Name"
                    className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Institutional Email"
                    className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline project location, anticipated megastructure scope, and timeline..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Official RFP</span>
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07080b] py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="text-blue-500">▲</span> APEX GLOBAL ENGINEERING
          </div>
          <div>© 2026 Apex Global Engineering Inc. Real-time Cloud Platform.</div>
          <div className="text-slate-400 font-mono text-[11px]">Powered by DevOS Cloud Engine</div>
        </div>
      </footer>
    </div>
  );
}
