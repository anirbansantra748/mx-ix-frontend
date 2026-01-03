import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Settings, TrendingUp, Server, MapPin, Save, Plus, Trash2, Edit2, LogOut, RotateCcw } from 'lucide-react';

const AdminPage = () => {
  const {
    networkStats,
    globalFabricStats,
    locations,
    updateNetworkStats,
    updateGlobalFabricStats,
    addLocation,
    removeLocation,
    updateLocation,
    resetToDefaults
  } = useAdmin();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mx-ix-admin-auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('network');
  
  // Network Stats Form
  const [netStats, setNetStats] = useState(networkStats);
  
  // Global Fabric Stats Form
  const [fabricStats, setFabricStats] = useState(globalFabricStats);
  
  // Location Form
  const [locationForm, setLocationForm] = useState({
    id: '',
    name: '',
    coordinates: [-74.006, 40.7128] as [number, number],
    code: '',
    region: 'AMERICAS',
    asns: 0,
    sites: 1,
    asnList: [],
    enabledSites: []
  });
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('mx-ix-admin-auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mx-ix-admin-auth');
  };

  const handleSaveNetworkStats = () => {
    updateNetworkStats(netStats);
    alert('Network stats updated successfully!');
  };

  const handleSaveGlobalFabricStats = () => {
    updateGlobalFabricStats(fabricStats);
    alert('Global fabric stats updated successfully!');
  };

  const handleAddLocation = () => {
    if (editingLocationId) {
      updateLocation(editingLocationId, locationForm);
      setEditingLocationId(null);
    } else {
      addLocation(locationForm);
    }
    setLocationForm({
      id: '',
      name: '',
      coordinates: [-74.006, 40.7128],
      code: '',
      region: 'AMERICAS',
      asns: 0,
      sites: 1,
      asnList: [],
      enabledSites: []
    });
    alert(editingLocationId ? 'Location updated!' : 'Location added!');
  };

  const handleEditLocation = (location: typeof locationForm) => {
    setLocationForm(location);
    setEditingLocationId(location.id);
  };

  const handleDeleteLocation = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      removeLocation(id);
    }
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
      setNetStats(networkStats);
      setFabricStats(globalFabricStats);
      alert('All data has been reset to defaults!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-[#F20732]" strokeWidth={2.5} />
            <h1 className="text-3xl font-black tracking-tighter">ADMIN LOGIN</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#F20732] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300"
            >
              Login
            </button>
            
            <p className="text-xs text-gray-500 text-center font-mono">
              Default password: admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white border-b-4 border-[#F20732]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Settings className="w-8 h-8 text-[#F20732]" strokeWidth={2.5} />
              <div>
                <h1 className="text-3xl font-black tracking-tighter">MX-IX ADMIN</h1>
                <p className="text-sm text-gray-400 font-mono">Content Management System</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleResetAll}
                className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-yellow-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
                Reset All
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                <LogOut className="w-4 h-4" strokeWidth={2.5} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'network', label: 'Network Stats', icon: TrendingUp },
              { id: 'fabric', label: 'Global Fabric', icon: Server },
              { id: 'locations', label: 'Locations', icon: MapPin }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#F20732] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" strokeWidth={2.5} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Network Stats Tab */}
        {activeTab === 'network' && (
          <div className="bg-white border-2 border-gray-200 p-8">
            <h2 className="text-2xl font-black tracking-tighter mb-6">Network Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Global Latency (value)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={netStats.globalLatency.value}
                  onChange={(e) => setNetStats({
                    ...netStats,
                    globalLatency: { ...netStats.globalLatency, value: parseFloat(e.target.value) }
                  })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Active Nodes
                </label>
                <input
                  type="number"
                  value={netStats.activeNodes}
                  onChange={(e) => setNetStats({ ...netStats, activeNodes: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Throughput
                </label>
                <input
                  type="number"
                  value={netStats.throughput}
                  onChange={(e) => setNetStats({ ...netStats, throughput: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                />
              </div>
            </div>
            
            <button
              onClick={handleSaveNetworkStats}
              className="flex items-center gap-2 bg-[#F20732] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              <Save className="w-4 h-4" strokeWidth={2.5} />
              Save Network Stats
            </button>
          </div>
        )}

        {/* Global Fabric Stats Tab */}
        {activeTab === 'fabric' && (
          <div className="bg-white border-2 border-gray-200 p-8">
            <h2 className="text-2xl font-black tracking-tighter mb-6">Global Fabric Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Total Capacity
                </label>
                <input
                  type="text"
                  value={fabricStats.totalCapacity}
                  onChange={(e) => setFabricStats({ ...fabricStats, totalCapacity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="e.g., 5.2 Tbps"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Active Routes
                </label>
                <input
                  type="text"
                  value={fabricStats.activeRoutes}
                  onChange={(e) => setFabricStats({ ...fabricStats, activeRoutes: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="e.g., 10,000+"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Avg Latency
                </label>
                <input
                  type="text"
                  value={fabricStats.avgLatency}
                  onChange={(e) => setFabricStats({ ...fabricStats, avgLatency: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="e.g., <5ms"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                  Global Coverage
                </label>
                <input
                  type="text"
                  value={fabricStats.globalCoverage}
                  onChange={(e) => setFabricStats({ ...fabricStats, globalCoverage: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="e.g., 100%"
                />
              </div>
            </div>
            
            <button
              onClick={handleSaveGlobalFabricStats}
              className="flex items-center gap-2 bg-[#F20732] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              <Save className="w-4 h-4" strokeWidth={2.5} />
              Save Fabric Stats
            </button>
          </div>
        )}

        {/* Locations Tab */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            {/* Add/Edit Location Form */}
            <div className="bg-white border-2 border-gray-200 p-8">
              <h2 className="text-2xl font-black tracking-tighter mb-6">
                {editingLocationId ? 'Edit Location' : 'Add New Location'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Location ID *
                  </label>
                  <input
                    type="text"
                    value={locationForm.id}
                    onChange={(e) => setLocationForm({ ...locationForm, id: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                    placeholder="e.g., nyc"
                    disabled={!!editingLocationId}
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    City Name *
                  </label>
                  <input
                    type="text"
                    value={locationForm.name}
                    onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                    placeholder="e.g., New York"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={locationForm.coordinates[0]}
                    onChange={(e) => setLocationForm({ 
                      ...locationForm, 
                      coordinates: [parseFloat(e.target.value), locationForm.coordinates[1]]
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={locationForm.coordinates[1]}
                    onChange={(e) => setLocationForm({ 
                      ...locationForm, 
                      coordinates: [locationForm.coordinates[0], parseFloat(e.target.value)]
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Code
                  </label>
                  <input
                    type="text"
                    value={locationForm.code}
                    onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                    placeholder="e.g., NYC_CORE"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Region
                  </label>
                  <select
                    value={locationForm.region}
                    onChange={(e) => setLocationForm({ ...locationForm, region: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  >
                    <option value="AMERICAS">AMERICAS</option>
                    <option value="EUROPE">EUROPE</option>
                    <option value="ASIA">ASIA</option>
                    <option value="OCEANIA">OCEANIA</option>
                    <option value="AFRICA">AFRICA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Connected ASNs
                  </label>
                  <input
                    type="number"
                    value={locationForm.asns}
                    onChange={(e) => setLocationForm({ ...locationForm, asns: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Sites
                  </label>
                  <input
                    type="number"
                    value={locationForm.sites}
                    onChange={(e) => setLocationForm({ ...locationForm, sites: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black outline-none transition-all duration-300 font-mono text-sm"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleAddLocation}
                  className="flex items-center gap-2 bg-[#F20732] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                >
                  {editingLocationId ? <Save className="w-4 h-4" strokeWidth={2.5} /> : <Plus className="w-4 h-4" strokeWidth={2.5} />}
                  {editingLocationId ? 'Update Location' : 'Add Location'}
                </button>
                
                {editingLocationId && (
                  <button
                    onClick={() => {
                      setEditingLocationId(null);
                      setLocationForm({
                        id: '',
                        name: '',
                        coordinates: [-74.006, 40.7128],
                        code: '',
                        region: 'AMERICAS',
                        asns: 0,
                        sites: 1,
                        asnList: [],
                        enabledSites: []
                      });
                    }}
                    className="bg-gray-200 text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Locations List */}
            <div className="bg-white border-2 border-gray-200 p-8">
              <h2 className="text-2xl font-black tracking-tighter mb-6">All Locations ({locations.length})</h2>
              
              <div className="space-y-4">
                {locations.map(location => (
                  <div key={location.id} className="border-2 border-gray-200 p-6 hover:border-[#F20732] transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black">{location.name}</h3>
                          <span className="bg-[#F20732] text-white px-3 py-1 font-mono text-xs font-bold">
                            {location.region}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 font-mono text-xs">CODE:</span>
                            <p className="font-bold">{location.code}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-mono text-xs">ASNs:</span>
                            <p className="font-bold">{location.asns}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-mono text-xs">SITES:</span>
                            <p className="font-bold">{location.sites}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-mono text-xs">COORDS:</span>
                            <p className="font-mono text-xs">{location.coordinates[0].toFixed(2)}, {location.coordinates[1].toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditLocation(location)}
                          className="p-2 bg-gray-100 hover:bg-[#F20732] hover:text-white transition-all"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => handleDeleteLocation(location.id)}
                          className="p-2 bg-gray-100 hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
