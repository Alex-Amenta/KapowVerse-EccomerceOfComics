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
import back_url from "../../../utils/development";
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

export function PurchasesLineChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener los datos de compras mensuales desde el backend
    axios
      .get(`${back_url}/purchase/monthly`)
      .then((response) => {
        const monthlyData = response.data;

        // Procesa los datos para el gráfico
        const months = monthlyData.map((item) => {
          // Convierte la fecha en un objeto Date para extraer el mes
          const purchaseDate = new Date(item.purchaseDate);
          const month = purchaseDate.toLocaleString("default", {
            month: "long",
          });
          return month;
        });

        const quantities = monthlyData.map((item) => item.total);

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
        console.error(
          "Error al obtener los datos de compras mensuales:",
          error
        );
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
