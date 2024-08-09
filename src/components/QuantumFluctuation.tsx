import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './QuantumFluctuation.css';

// Definição da interface para os dados da flutuação quântica
interface FluctuationData {
  particles: number;
  energy: number;
  timeFluctuations: {
    time: number;
    energy: number;
    particles: number;
  }[];
  detailedParticles: {
    type: string;
    count: number;
    energy: number;
  }[];
}

const QuantumFluctuation: React.FC = () => {
  // Estado para armazenar os dados da flutuação quântica
  const [data, setData] = useState<FluctuationData | null>(null);

  // Hook useEffect para buscar dados do backend quando o componente é montado
  useEffect(() => {
    axios.get('http://localhost:3001/quantum-fluctuation')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="quantum-fluctuation-container">
      {data ? (
        <div>
          <h2>Fluctuation Data</h2>
          <p>Particles: {data.particles}</p>
          <p>Energy: {data.energy} keV</p>
          
          <h3>Time Fluctuations</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.timeFluctuations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="energy" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="particles" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          <h3>Detailed Particles</h3>
          <ul>
            {data.detailedParticles.map((particle, index) => (
              <li key={index}>
                <strong>Type:</strong> {particle.type} <br />
                <strong>Count:</strong> {particle.count} <br />
                <strong>Energy:</strong> {particle.energy} keV
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QuantumFluctuation;
