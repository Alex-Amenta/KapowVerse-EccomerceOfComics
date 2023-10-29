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
  const [mostSoldComicsData, setMostSoldComicsData] = useState(null);

  useEffect(() => {
    // Realiza una petición para obtener datos de compras de cómics desde la API
    axios
      .get(`${back_url}/purchase/comic`)
      .then((response) => {
        const comicsWithSales = response.data;

        // Ordena los cómics por la cantidad vendida de mayor a menor
        comicsWithSales.sort(
          (a, b) => b.totalComicPurchased - a.totalComicPurchased
        );

        // Toma solo los 5 cómics más vendidos
        const top5Comics = comicsWithSales.slice(0, 5);

        const labels = top5Comics.map((comic) => comic.title);
        const data = top5Comics.map((comic) => comic.totalComicPurchased);

        const chartDataComics = {
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

        setMostSoldComicsData(chartDataComics);
      })
      .catch((error) => {
        console.error("Error al obtener datos de compras de cómics:", error);
      });
  }, []);

  // Define las opciones del gráfico
  const chartOptionsComics = {
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
          text: "Comic Titles",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
    },
  };

  return (
    <div style={{ width: "502px", height: "16rem" }}>
      {mostSoldComicsData && (
        <Bar data={mostSoldComicsData} options={chartOptionsComics} />
      )}
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
