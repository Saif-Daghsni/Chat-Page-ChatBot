import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Layout from '../components/layout';
import '../styles/Home.css'
import { CiCircleInfo } from "react-icons/ci";

const Home = () => {
  // Données fixes pour les donut charts (facilement adaptables avec le backend)
  const costData = [
    { name: 'Atelier 1', value: 7650, color: '#3B82F6' },
    { name: 'Atelier 2', value: 5390, color: '#93C5FD' },
    { name: 'Atelier 3', value: 3150, color: '#E5E7EB' }
  ];

  const deliveryData = [
    { name: 'Atelier 1', value: 7650, color: '#10B981' },
    { name: 'Atelier 2', value: 5390, color: '#6EE7B7' },
    { name: 'Atelier 3', value: 3150, color: '#E5E7EB' }
  ];

  const reductionData = [
    { name: 'Atelier 1', value: 7650, color: '#3B82F6' },
    { name: 'Atelier 2', value: 5390, color: '#93C5FD' },
    { name: 'Atelier 3', value: 3150, color: '#E5E7EB' }
  ];

  // Données pour le graphique linéaire
  const lineData = [
    { month: 'Jan', value: 150 },
    { month: 'Fév', value: 120 },
    { month: 'Mar', value: 130 },
    { month: 'Avr', value: 110 },
    { month: 'Mai', value: 100 },
    { month: 'Jui', value: 120 },
    { month: 'Jul', value: 90 },
    { month: 'Aoû', value: 110 },
    { month: 'Sep', value: 80 },
    { month: 'Oct', value: 100 },
    { month: 'Nov', value: 70 },
    { month: 'Déc', value: 90 }
  ];

  const CustomDonutChart = ({ data, centerValue, centerLabel }) => (
    <div className="relative w-32 h-32 mx-auto">
      <PieChart width={128} height={128}>
        <Pie
          data={data}
          cx={64}
          cy={64}
          innerRadius={35}
          outerRadius={55}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-700">{centerValue}</div>
          <div className="text-xs text-gray-500">{centerLabel}</div>
        </div>
      </div>
    </div>
  );

  const Legend = ({ data }) => (
    <div className="mt-4 space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          <div
            className="w-3 h-3 rounded-sm mr-2"
            style={{ backgroundColor: item.color }}
          ></div>
          <span>{item.name}: ${item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="home-container">
        <div className="top-section">
          <h3>Achat</h3>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-content">
            {/* Section Métriques */}
            <div className="metrics-section">
              {/* Carte 1 - Coût moyen */}
              <div className="metric-card">
                <h5>Coût moyen des matières premières</h5>
                <div className="metric-value">$2,420</div>
                <div className="metric-change">2.3%</div>
                <div className="donut-container">
                  <div className="donut-chart cost">

                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color blue"></span>
                      <span>Atelier 1: $7,650</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color light-blue"></span>
                      <span>Atelier 2: $5,390</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color gray"></span>
                      <span>Atelier 3: $3,150</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 2 - Taux de livraisons */}
              <div className="metric-card">
                <h5>Taux de livraisons à temps</h5>
                <div className="metric-value">$6,420</div>
                <div className="metric-change">3.5%</div>
                <div className="donut-container">
                  <div className="donut-chart delivery">

                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color yellow"></span>
                      <span>Atelier 1: $7,650</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color light-yell"></span>
                      <span>Atelier 2: $5,390</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color light-yellow"></span>
                      <span>Atelier 3: $3,150</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte 3 - Taux de réduction */}
              <div className="metric-card">
                <h5>Taux de réduction des coûts d'achat</h5>
                <div className="metric-value">$8,220</div>
                <div className="metric-change">8.4%</div>
                <div className="donut-container">
                  <div className="donut-chart reduction">

                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color blue"></span>
                      <span>Atelier 1: $7,650</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color light-blue"></span>
                      <span>Atelier 2: $5,390</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color gray"></span>
                      <span>Atelier 3: $3,150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Graphique */}
            <div className="chart-section">
              <div className="chart-header">
                <h3>Effectif</h3>
                <div className="chart-controls">
                  <button className="filter-btn">🔽 Filtrer</button>
                </div>
              </div>
              <div className="line-chart">
                <svg width="100%" height="280" viewBox="0 0 800 280">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 200 L 100 170 L 150 180 L 200 160 L 250 150 L 300 170 L 350 140 L 400 160 L 450 130 L 500 150 L 550 120 L 600 140 L 650 110 L 700 130 L 750 100"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M 50 200 L 100 170 L 150 180 L 200 160 L 250 150 L 300 170 L 350 140 L 400 160 L 450 130 L 500 150 L 550 120 L 600 140 L 650 110 L 700 130 L 750 100 L 750 280 L 50 280 Z"
                    fill="url(#gradient)"
                  />
                </svg>
              </div>
            </div>

            {/* Section Recrutement */}
            <div className="recruitment-card">
              <div className="recruitment-left">
                <h3 className="recruitment-title">Besoins en recrutement</h3>

                <div className="form-row">
                  <div className="form-group full">
                    <label>
                      Effectif <span className="info-icon">ⓘ</span>
                    </label>
                    <input type="text" placeholder="Effectif" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Qualification <span className="info-icon">ⓘ</span>
                    </label>
                    <select>
                      <option>Choisir</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Formation <span className="info-icon">ⓘ</span>
                    </label>
                    <select>
                      <option>Choisir</option>
                    </select>
                  </div>
                </div>

                <div className="form-buttons">
                  <button className="btn-outline">Annuler</button>
                  <button className="btn-primary">Confirmer</button>
                </div>
              </div>

              <div className="recruitment-right">
                <img src="/img/image.png" alt="illustration" />
              </div>
            </div>
          </div>


          {/* Sidebar Expert */}
          <div className="expert-sidebar">
            <div className="sidebar-header">
              <h3>Conseils de l'expert</h3>
            </div>

            <div className="expert-tips">
              <div className="tip-card success">
                <div className="tip-icon">✓</div>
                <div className="tip-content">
                  <p>Excellente performance dans la négociation d'achats avec les fournisseurs cette semaine, continuez sur cette lancée!</p>
                </div>
              </div>

              <div className="tip-card success">
                <div className="tip-icon">✓</div>
                <div className="tip-content">
                  <p>Très bonne! L'inventaire dépasse la cible dans la négociation d'achats avec les fournisseurs, continuez sur cette lancée!</p>
                </div>
              </div>





              <div className="tip-card error">
                <div className="tip-icon1"><CiCircleInfo />
                </div>
                <div className="tip-content">
                  <p>Attention: l'efficacité dans la négociation d'achats avec les fournisseurs a connu une baisse sur cette période, il y a lieu de prendre les mesures nécessaires!</p>
                </div>
              </div>
            </div>

            <div className="sidebar-illustration">
              <div className="sidebar-illustration-placeholder">
                <img src="/img/image1.png" alt="equipe" className="equipe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;