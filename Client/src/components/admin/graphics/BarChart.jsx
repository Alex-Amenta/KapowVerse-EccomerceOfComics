import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function CategoryBarChart() {
  const allComics = useSelector((state) => state.comic.comicsCopy);

  // Función para contar los cómics por categoría
  const countComicsByCategory = () => {
    const categoryCounts = {};

    allComics.forEach((comic) => {
      const category = comic.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    return categoryCounts;
  };

  const categoryCounts = countComicsByCategory();

  // Ordenar categorías por la cantidad de cómics de menor a mayor
  const sortedCategories = Object.keys(categoryCounts).sort(
    (a, b) => categoryCounts[a] - categoryCounts[b]
  );

  // Obtener las cantidades correspondientes a las categorías ordenadas
  const counts = sortedCategories.map((category) => categoryCounts[category]);

  // Datos para el gráfico
  const chartDataComics = {
    labels: sortedCategories,
    datasets: [
      {
        label: "Comic numbers",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define las opciones del gráfico
  const chartOptionsComics = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Comic numbers",
        },
      },
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
    },
  };

  return (
    <div style={{ width: "502px", height: "16rem" }}>
      <Bar data={chartDataComics} options={chartOptionsComics} />
    </div>
  );
}

export function UserRegistrationBarChart() {
  // Supongamos que tienes datos de registro de usuarios en un formato similar a este ejemplo.
  const userRegistrations = [
    { date: "2023-01-01", count: 10 },
    { date: "2023-01-02", count: 15 },
    { date: "2023-02-05", count: 8 },
    { date: "2023-02-15", count: 12 },
    // Agrega más datos de registro aquí
  ];

  // Función para agrupar y sumar registros por mes
  const groupAndSumByMonth = (data) => {
    const monthlyData = {};
    data.forEach((record) => {
      const date = new Date(record.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      if (monthlyData[key]) {
        monthlyData[key] += record.count;
      } else {
        monthlyData[key] = record.count;
      }
    });

    return monthlyData;
  };

  const monthlyData = groupAndSumByMonth(userRegistrations);

  // Nombres de los meses
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

  const labels = Object.keys(monthlyData).map((key) => {
    const [year, month] = key.split("-").map(Number);
    return `${monthNames[month]} ${year}`;
  });

  const counts = Object.values(monthlyData);

  // Datos para el gráfico
  const chartDataUsers = {
    labels,
    datasets: [
      {
        label: "Registered users",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define las opciones del gráfico
  const chartOptionsUsers = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Registered users",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
          fontWeight: "bold",
        },
      },
    },
  };

  return (
    <div style={{ width: "502px", height: "16rem" }}>
      <Bar data={chartDataUsers} options={chartOptionsUsers} />
    </div>
  );
}
