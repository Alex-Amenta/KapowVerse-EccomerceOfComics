import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import base_url from "../../../utils/development";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function PurchasesLineChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios
      .get(`${base_url}/purchase/monthly`)
      .then((response) => {
        const monthlyData = response.data;

        // Crear un objeto para almacenar los totales de compras por mes
        const monthlyTotals = {};

        // Inicializar el objeto con ceros para cada mes
        for (const month of monthNames) {
          monthlyTotals[month] = 0;
        }

        // Agregar los totales de compras al objeto
        for (const item of monthlyData) {
          const purchaseDate = new Date(item.purchaseDate);
          const month = purchaseDate.getMonth(); // Obtener el número de mes (0-11)
          const monthName = monthNames[month];
          monthlyTotals[monthName] += item.total;
        }

        // Obtener las etiquetas y cantidades
        const months = monthNames;
        const quantities = months.map((month) => monthlyTotals[month]);

        const chartData = {
          labels: months,
          datasets: [
            {
              label: "Total Purchases per Month",
              data: quantities,
              fill: true,
              borderColor: "rgba(238, 130, 238)",
              backgroundColor: "rgba(238, 130, 238, 0.2)",
            },
          ],
        };

        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de compras mensuales:", error);
      });
  }, []);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Purchase Quantity",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <div style={{ width: "502px", height: "16rem" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
