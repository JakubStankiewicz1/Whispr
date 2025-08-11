import React from 'react';
import './analytics.css';
import { FiArrowLeft, FiTrendingUp, FiUsers, FiMessageCircle, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="analytics">
      <div className="analyticsContainer">
        {/* Header */}
        <div className="analyticsHeader">
          <button className="analyticsBackButton" onClick={handleGoBack}>
            <FiArrowLeft className="analyticsBackIcon" />
          </button>
          <h1 className="analyticsTitle">Analytics Dashboard</h1>
          <div className="analyticsHeaderActions">
            <span className="analyticsUpdateTime">Last updated: just now</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="analyticsContent">
          {/* Stats Grid */}
          <div className="analyticsStatsGrid">
            <div className="analyticsStatCard">
              <div className="analyticsStatHeader">
                <div className="analyticsStatIcon analyticsStatIcon--messages">
                  <FiMessageCircle />
                </div>
                <span className="analyticsStatLabel">Total Messages</span>
              </div>
              <div className="analyticsStatValue">1,247</div>
              <div className="analyticsStatChange analyticsStatChange--positive">
                <FiTrendingUp className="analyticsStatChangeIcon" />
                <span>+12.5% from last week</span>
              </div>
            </div>

            <div className="analyticsStatCard">
              <div className="analyticsStatHeader">
                <div className="analyticsStatIcon analyticsStatIcon--users">
                  <FiUsers />
                </div>
                <span className="analyticsStatLabel">Active Conversations</span>
              </div>
              <div className="analyticsStatValue">23</div>
              <div className="analyticsStatChange analyticsStatChange--positive">
                <FiTrendingUp className="analyticsStatChangeIcon" />
                <span>+3 new this week</span>
              </div>
            </div>

            <div className="analyticsStatCard">
              <div className="analyticsStatHeader">
                <div className="analyticsStatIcon analyticsStatIcon--time">
                  <FiClock />
                </div>
                <span className="analyticsStatLabel">Avg Response Time</span>
              </div>
              <div className="analyticsStatValue">2.3s</div>
              <div className="analyticsStatChange analyticsStatChange--negative">
                <span>-0.5s faster than last week</span>
              </div>
            </div>

            <div className="analyticsStatCard">
              <div className="analyticsStatHeader">
                <div className="analyticsStatIcon analyticsStatIcon--engagement">
                  <FiTrendingUp />
                </div>
                <span className="analyticsStatLabel">Engagement Rate</span>
              </div>
              <div className="analyticsStatValue">87.2%</div>
              <div className="analyticsStatChange analyticsStatChange--positive">
                <FiTrendingUp className="analyticsStatChangeIcon" />
                <span>+5.2% improvement</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="analyticsChartsGrid">
            {/* Message Activity Chart */}
            <div className="analyticsChartCard">
              <div className="analyticsChartHeader">
                <h3>Message Activity</h3>
                <select className="analyticsChartFilter">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="analyticsChart">
                <div className="analyticsChartBars">
                  {[65, 85, 45, 92, 78, 56, 89, 94, 67, 83, 91, 76, 88, 72].map((height, idx) => (
                    <div 
                      key={idx} 
                      className="analyticsChartBar" 
                      style={{ height: `${height}%` }}
                      data-value={Math.floor(height * 2.5)}
                    />
                  ))}
                </div>
                <div className="analyticsChartLabels">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <span key={idx} className="analyticsChartLabel">{day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform Usage */}
            <div className="analyticsChartCard">
              <div className="analyticsChartHeader">
                <h3>Platform Usage</h3>
              </div>
              <div className="analyticsPlatformList">
                {[
                  { name: 'WhatsApp', usage: 45, color: '#25D366' },
                  { name: 'Messenger', usage: 32, color: '#0084FF' },
                  { name: 'Telegram', usage: 18, color: '#0088CC' },
                  { name: 'Discord', usage: 15, color: '#5865F2' },
                  { name: 'Instagram', usage: 12, color: '#E4405F' },
                  { name: 'Signal', usage: 8, color: '#3A76F0' }
                ].map((platform, idx) => (
                  <div key={idx} className="analyticsPlatformItem">
                    <div className="analyticsPlatformInfo">
                      <div 
                        className="analyticsPlatformColor" 
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="analyticsPlatformName">{platform.name}</span>
                    </div>
                    <div className="analyticsPlatformUsage">
                      <div 
                        className="analyticsPlatformBar" 
                        style={{ 
                          width: `${platform.usage}%`,
                          backgroundColor: platform.color 
                        }}
                      />
                      <span className="analyticsPlatformPercent">{platform.usage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Trends */}
            <div className="analyticsChartCard analyticsChartCard--full">
              <div className="analyticsChartHeader">
                <h3>Response Time Trends</h3>
                <div className="analyticsChartLegend">
                  <div className="analyticsChartLegendItem">
                    <div className="analyticsChartLegendColor" style={{ backgroundColor: '#0084FF' }} />
                    <span>Your Response Time</span>
                  </div>
                  <div className="analyticsChartLegendItem">
                    <div className="analyticsChartLegendColor" style={{ backgroundColor: '#10B981' }} />
                    <span>Others Response Time</span>
                  </div>
                </div>
              </div>
              <div className="analyticsLineChart">
                <svg className="analyticsLineChartSvg" viewBox="0 0 600 200">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="60" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Your response time line */}
                  <polyline
                    fill="none"
                    stroke="#0084FF"
                    strokeWidth="3"
                    points="50,150 110,120 170,140 230,100 290,110 350,90 410,95 470,85 530,80"
                  />
                  
                  {/* Others response time line */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    points="50,170 110,160 170,155 230,145 290,150 350,140 410,135 470,130 530,125"
                  />
                  
                  {/* Data points */}
                  {[
                    [50, 150], [110, 120], [170, 140], [230, 100], [290, 110], 
                    [350, 90], [410, 95], [470, 85], [530, 80]
                  ].map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="4" fill="#0084FF" />
                  ))}
                  
                  {[
                    [50, 170], [110, 160], [170, 155], [230, 145], [290, 150], 
                    [350, 140], [410, 135], [470, 130], [530, 125]
                  ].map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="4" fill="#10B981" />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="analyticsInsights">
            <h3>Insights & Recommendations</h3>
            <div className="analyticsInsightsList">
              <div className="analyticsInsight">
                <div className="analyticsInsightIcon">💡</div>
                <div className="analyticsInsightContent">
                  <h4>Peak Activity Hours</h4>
                  <p>Your most active messaging time is between 2-4 PM. Consider scheduling important conversations during this window.</p>
                </div>
              </div>
              
              <div className="analyticsInsight">
                <div className="analyticsInsightIcon">📈</div>
                <div className="analyticsInsightContent">
                  <h4>Response Rate Improvement</h4>
                  <p>Your response rate has improved by 15% this week. Keep up the consistent communication!</p>
                </div>
              </div>
              
              <div className="analyticsInsight">
                <div className="analyticsInsightIcon">🎯</div>
                <div className="analyticsInsightContent">
                  <h4>Platform Optimization</h4>
                  <p>WhatsApp shows the highest engagement rate at 89%. Consider focusing more conversations there.</p>
                </div>
              </div>
              
              <div className="analyticsInsight">
                <div className="analyticsInsightIcon">⚡</div>
                <div className="analyticsInsightContent">
                  <h4>Quick Response Achievement</h4>
                  <p>You're responding 35% faster than the average user. This leads to better conversation flow!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
