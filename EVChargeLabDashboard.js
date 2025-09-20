
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleFees = [
  { month: 'Apr', fees: 220 },
  { month: 'May', fees: 240 },
  { month: 'Jun', fees: 310 },
  { month: 'Jul', fees: 360 },
  { month: 'Aug', fees: 320 },
  { month: 'Sep', fees: 210 },
  { month: 'Oct', fees: 230 },
  { month: 'Nov', fees: 250 },
  { month: 'Dec', fees: 270 },
  { month: 'Jan', fees: 290 },
  { month: 'Feb', fees: 330 },
  { month: 'Mar', fees: 300 }
];

const chargers = [
  { id: 'CH-01', loc: 'Sector 22', status: 'Available', power: '7 kW' },
  { id: 'CH-02', loc: 'MG Road', status: 'Charging', power: '22 kW' },
  { id: 'CH-03', loc: 'Highway 8', status: 'Offline', power: '50 kW' },
  { id: 'CH-04', loc: 'College Lot', status: 'Available', power: '7 kW' }
];

function StatCard({ title, value, hint }) {
  return (
    <div style={{background:'#fff', padding:16, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
      <div style={{color:'#6b7280', fontSize:12}}>{title}</div>
      <div style={{marginTop:8, fontSize:20, fontWeight:600}}>{value}</div>
      <div style={{color:'#9ca3af', fontSize:12, marginTop:6}}>{hint}</div>
    </div>
  );
}

export default function EVChargeLabDashboard() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedCharger, setSelectedCharger] = useState(chargers[0].id);
  const [p2pEnabled, setP2pEnabled] = useState(false);

  return (
    <div style={{fontFamily:'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', background:'#f3f4f6', minHeight:'100vh', padding:24}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <h1 style={{fontSize:22, fontWeight:700}}>EVChargeLab — Smart Charging Dashboard</h1>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <button style={{padding:'8px 12px', background:'#4f46e5', color:'#fff', borderRadius:8}}>Export CSV</button>
            <img src="./charger-sample.png" alt="logo" style={{width:40, height:40, borderRadius:8, border:'1px solid #e5e7eb'}} />
          </div>
        </header>

        <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:20}}>
          <aside style={{background:'#fff', padding:16, borderRadius:12}}>
            <h3 style={{fontWeight:600, marginBottom:8}}>Controller</h3>
            <div style={{marginBottom:12}}>
              <label style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:13}}>AI Smart Scheduling</span>
                <button onClick={() => setAiEnabled(v=>!v)} style={{padding:'6px 10px', borderRadius:999, fontSize:12, background: aiEnabled ? '#dcfce7' : '#f3f4f6'}}>
                  {aiEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </label>
              <p style={{fontSize:12, color:'#6b7280', marginTop:8}}>AI predicts renewable availability and shifts charging to low demand windows.</p>
            </div>

            <div style={{marginBottom:12}}>
              <label style={{fontSize:13, display:'block', marginBottom:6}}>Preferred Schedule</label>
              <div style={{display:'flex', gap:8}}>
                <input type="time" defaultValue="00:00" style={{flex:1, padding:8, borderRadius:6, border:'1px solid #e5e7eb'}} />
                <input type="time" defaultValue="06:00" style={{flex:1, padding:8, borderRadius:6, border:'1px solid #e5e7eb'}} />
              </div>
            </div>

            <div>
              <label style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:13}}>P2P Charger Sharing</span>
                <input type="checkbox" checked={p2pEnabled} onChange={e=>setP2pEnabled(e.target.checked)} />
              </label>
              <p style={{fontSize:12, color:'#6b7280', marginTop:8}}>Enable neighbours to rent your home charger for credits.</p>
            </div>

            <div style={{marginTop:16}}>
              <h4 style={{fontWeight:600}}>Local Targets</h4>
              <ul style={{color:'#374151', fontSize:13, marginTop:8, paddingLeft:18}}>
                <li>Prioritise e‑rickshaw fleet charging</li>
                <li>Low-cost rural pack: 3–7 kW AC chargers</li>
                <li>Renewable-first schedule in solar regions</li>
              </ul>
            </div>
          </aside>

          <main>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginBottom:12}}>
              <StatCard title="Fees collected" value="$246.20" hint="Monthly (Mar)" />
              <StatCard title="Energy used" value="805 kWh" hint="Monthly (Mar)" />
              <StatCard title="Sessions" value="48" hint="Monthly (Mar)" />
            </div>

            <section style={{background:'#fff', padding:16, borderRadius:12, marginBottom:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <h3 style={{fontWeight:600}}>Revenue & Usage</h3>
                <div style={{fontSize:13, color:'#6b7280'}}>Apr 2021 - Mar 2022</div>
              </div>
              <div style={{width:'100%', height:260}}>
                <ResponsiveContainer>
                  <BarChart data={sampleFees}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="fees" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, marginBottom:12}}>
              <section style={{background:'#fff', padding:16, borderRadius:12}}>
                <h3 style={{fontWeight:600, marginBottom:8}}>Charger Fleet</h3>
                <table style={{width:'100%', fontSize:13, borderCollapse:'collapse'}}>
                  <thead style={{color:'#9ca3af', textAlign:'left'}}>
                    <tr><th style={{padding:'8px 0'}}>Charger</th><th>Location</th><th>Status</th><th>Power</th><th></th></tr>
                  </thead>
                  <tbody>
                    {chargers.map(c=>(
                      <tr key={c.id} style={{borderTop:'1px solid #eef2f7'}}>
                        <td style={{padding:'8px 0'}}>{c.id}</td>
                        <td>{c.loc}</td>
                        <td><span style={{padding:'6px 8px', borderRadius:999, fontSize:12, background: c.status==='Available' ? '#ecfccb' : c.status==='Charging' ? '#fff7ed' : '#fee2e2'}}>{c.status}</span></td>
                        <td>{c.power}</td>
                        <td style={{textAlign:'right'}}><button onClick={()=>alert('Manage '+c.id)} style={{color:'#4f46e5', border:'none', background:'transparent'}}>Manage</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <aside style={{background:'#fff', padding:16, borderRadius:12}}>
                <h3 style={{fontWeight:600}}>Selected Charger</h3>
                <div style={{fontSize:13, color:'#374151', marginTop:6}}>{selectedCharger}</div>
                <div style={{marginTop:12}}>
                  <button style={{padding:'8px 10px', marginRight:8, borderRadius:8}}>Reserve</button>
                  <button style={{padding:'8px 10px', background:'#4f46e5', color:'#fff', borderRadius:8}}>Start</button>
                </div>

                <div style={{marginTop:12}}>
                  <h4 style={{fontWeight:600}}>Pricing</h4>
                  <div style={{fontSize:13, color:'#374151', marginTop:6}}>Base: ₹6 / kWh</div>
                  <div style={{fontSize:12, color:'#6b7280', marginTop:6}}>Incentives: Off-peak discount 30%</div>
                </div>
              </aside>
            </div>

            <section style={{background:'#fff', padding:16, borderRadius:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                <h3 style={{fontWeight:600}}>Grid-aware Simulation</h3>
                <div style={{fontSize:12, color:'#9ca3af'}}>Simulate impact of bulk charging</div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div>
                  <label style={{fontSize:13, color:'#374151'}}>Concurrent EVs</label>
                  <input type="range" min="0" max="5000000" defaultValue={100000} style={{width:'100%', marginTop:8}} />
                  <p style={{fontSize:12, color:'#6b7280', marginTop:8}}>Drag to estimate how many vehicles charge together and its stress on the distribution node.</p>
                </div>
                <div>
                  <label style={{fontSize:13, color:'#374151'}}>Estimated Peak Load</label>
                  <div style={{fontSize:24, fontWeight:700, marginTop:8}}>+72 MW</div>
                  <div style={{fontSize:12, color:'#9ca3af', marginTop:6}}>Compared to baseline evening peak for this feeder.</div>
                </div>
              </div>
            </section>

            <section style={{background:'#fff', padding:16, borderRadius:12, marginTop:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                <h3 style={{fontWeight:600}}>Maps & Local Network</h3>
                <div style={{fontSize:12, color:'#9ca3af'}}>View charger availability & solar potential</div>
              </div>
              <div style={{height:200, borderRadius:8, background:'linear-gradient(180deg,#f8fafc,#ffffff)', display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af'}}>Map placeholder — integrate Leaflet/Mapbox for production</div>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <div style={{padding:10, background:'#f8fafc', borderRadius:8}}>Solar window: 10:30 - 15:30</div>
                <div style={{padding:10, background:'#f8fafc', borderRadius:8}}>Local transformer load: 68%</div>
                <div style={{padding:10, background:'#f8fafc', borderRadius:8}}>Recommended dispatch: stagger chargers</div>
              </div>
            </section>

          </main>
        </div>

        <footer style={{textAlign:'center', marginTop:20, color:'#9ca3af'}}>Designed for SIH — tweak the AI model, P2P rules, and pricing to adapt to your use-case.</footer>
      </div>
    </div>
  )
}
