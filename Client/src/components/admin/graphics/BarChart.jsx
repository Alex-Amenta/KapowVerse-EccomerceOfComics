import { useDispatch, useSelector } from "react-redux";
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
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../redux/features/userSlice";
import axios from "axios";
import back_url from "../../../utils/development";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MostSoldComicsBarChart() {
  const [mostSoldComicsData, setMostSoldComicsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Sold",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`${back_url}/purchase/comics`)
      .then((response) => {
        const comicsWithSales = response.data;

        // Agrupa cómics por categoría y calcula la cantidad total vendida en cada categoría
        const categorySales = comicsWithSales.reduce((sales, comic) => {
          const category = comic.category;

          if (!sales[category]) {
            sales[category] = 0;
          }

          sales[category] += comic.totalComicPurchased;

          return sales;
        }, {});

        // Ordena las categorías por la cantidad total vendida de mayor a menor
        const sortedCategories = Object.keys(categorySales).sort(
          (a, b) => categorySales[b] - categorySales[a]
        );

        // Toma las 5 categorías más vendidas
        const top5Categories = sortedCategories.slice(0, 5);

        const labels = top5Categories;
        const data = top5Categories.map((category) => categorySales[category]);

        const chartDataCategories = {
          labels,
          datasets: [
            {
              label: "Total Sold",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setMostSoldComicsData(chartDataCategories);
      })
      .catch((error) => {
        console.error("Error al obtener datos de compras de cómics:", error);
        // Puedes manejar el error aquí si es necesario
      });
  }, []);

  const chartOptionsCategories = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sold",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Comic Categories",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "502px", height: "16rem" }}>
      <Bar data={mostSoldComicsData} options={chartOptionsCategories} />
    </div>
  );
}

export function UserRegistrationBarChart() {
  const dispatch = useDispatch();
  const userRegistrations = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Función para agrupar y sumar registros por mes
  const groupAndSumByMonth = (data) => {
    const monthlyData = {};

    data.forEach((user) => {
      const registrationDate = new Date(user.registrationDate);
      const year = registrationDate.getFullYear();
      const month = registrationDate.getMonth();
      const key = `${year}-${month}`;

      if (monthlyData[key]) {
        monthlyData[key] += 1; // Suma uno por cada registro
      } else {
        monthlyData[key] = 1;
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
