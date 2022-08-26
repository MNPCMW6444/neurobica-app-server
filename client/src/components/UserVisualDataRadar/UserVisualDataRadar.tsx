import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

let data = [
  {
    subject: 'Attention',
    A: 50,
    B: 65,
    fullMark: 100,
  },
  {
    subject: 'Menory',
    A: 60,
    B: 75,
    fullMark: 100,
  },
  {
    subject: 'Response Time',
    A: 70,
    B: 85,
    fullMark: 100,
  },
  {
    subject: 'Flexability',
    A: 80,
    B: 90,
    fullMark: 100,
  },
  {
    subject: 'Creativity',
    A: 85,
    B: 93,
    fullMark: 100,
  },

];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/radar-chart-specified-domain-mfl04';

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={2} height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis fontSize={10} angle={90} domain={[0, 100]} />
          <Radar name="Test1" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
          <Radar name="Test2" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
