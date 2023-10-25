import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const allComics = useSelector((state) => state.comic.allComics);

  // Función para contar los comics por editor
  const countComicsByEditor = () => {
    const editorCounts = {};

    allComics.forEach((comic) => {
      const publisher = comic.publisher;
      if (editorCounts[publisher]) {
        editorCounts[publisher]++;
      } else {
        editorCounts[publisher] = 1;
      }
    });

    return editorCounts;
  };

  const editorCounts = countComicsByEditor();
  const editorNames = Object.keys(editorCounts);
  const editorComicCounts = Object.values(editorCounts);

  // Datos para el gráfico de pastel
  const chartData = {
    labels: editorNames,
    datasets: [
      {
        data: editorComicCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          // Puedes agregar más colores para otros editores
        ],
      },
    ],
  };

  // Opciones del gráfico de pastel
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "left" },
      title: {
        display: true,
        text: "Ratio of Comics per Publisher",
      },
    },
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}
