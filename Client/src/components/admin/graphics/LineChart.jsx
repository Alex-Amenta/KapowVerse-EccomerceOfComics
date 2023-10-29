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
  const purchaseData = [
    { date: "2023-01-15", quantity: 10 },
    { date: "2023-02-20", quantity: 15 },
    { date: "2023-03-10", quantity: 8 },
    // Agrega más datos de compra aquí
  ];

  const monthlyData = purchaseData.reduce((data, purchase) => {
    const purchaseDate = new Date(purchase.date);
    const month = purchaseDate.toLocaleString("default", { month: "long" }); // Obtiene el nombre del mes

    if (!data[month]) {
      data[month] = 0;
    }

    data[month] += purchase.quantity;

    return data;
  }, {});

  const months = Object.keys(monthlyData);
  const quantities = Object.values(monthlyData);

  const chartData = {
    labels: months, // Usar los nombres de los meses como etiquetas
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
