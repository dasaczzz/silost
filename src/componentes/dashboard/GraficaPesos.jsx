import { useContext, useMemo } from "react";
import { AlmacenActual } from "../../context/AlmacenActual";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define colors for different silos
const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#ca8a04', '#e11d48'];

export const GraficaPesos = () => {
  const { almacenActual } = useContext(AlmacenActual);

  // Process data for the chart
  const chartData = useMemo(() => {
    if (!almacenActual || !almacenActual.silos) return { data: [], silos: [] };

    // Collect all unique timestamps and prepare silo data
    const timestampMap = new Map();
    const siloInfo = [];

    almacenActual.silos.forEach((silo, index) => {
      if (!silo.mediciones || !Array.isArray(silo.mediciones)) return;

      siloInfo.push({
        id: silo.idSilo || `Silo ${index + 1}`,
        color: colors[index % colors.length]
      });

      silo.mediciones.forEach(medicion => {
        const timestamp = medicion.fecha;
        if (!timestamp) return;

        if (!timestampMap.has(timestamp)) {
          timestampMap.set(timestamp, { fecha: timestamp });
        }

        const dataPoint = timestampMap.get(timestamp);
        dataPoint[silo.idSilo || `Silo ${index + 1}`] = medicion.peso;
      });
    });

    // Convert to array and sort by timestamp
    const sortedData = Array.from(timestampMap.values()).sort((a, b) => {
      return new Date(a.fecha) - new Date(b.fecha);
    });

    return { data: sortedData, silos: siloInfo };
  }, [almacenActual]);

  if (!almacenActual || !almacenActual.silos || chartData.data.length === 0) {
    return (
      <div className="bg-primary-gray flex flex-col gap-4 items-center justify-center py-10 px-5 rounded-2xl flex-1">
        <h3 className="text-2xl font-semibold text-primary-black">Gráfica de Pesos en el Tiempo</h3>
        <p className="text-gray-600">No hay datos de mediciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-primary-gray flex flex-col gap-4 py-6 px-5 rounded-2xl flex-1">
      <h3 className="text-2xl font-semibold text-primary-black">Gráfica de Pesos en el Tiempo</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="fecha" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {chartData.silos.map((silo) => (
            <Line
              key={silo.id}
              type="monotone"
              dataKey={silo.id}
              stroke={silo.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
