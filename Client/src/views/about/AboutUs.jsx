import Navbar from "../../components/navbar/Navbar";
import styles from "./AboutUs.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { useEffect } from "react";

const teamMembers = [
  {
    name: "Alexander Amenta",
    image:
      "https://media.licdn.com/dms/image/D4D03AQHkHZgc-NiEcw/profile-displayphoto-shrink_800_800/0/1699289664237?e=1704931200&v=beta&t=2mzrMjWwGBUKnqyViPWL1V9RsOX1tLW6keCR4RLy4eY",
    description:
      "¡Hola! Soy Alexander Amenta, un Desarrollador Web Full-Stack con una pasión por la innovación digital y la creación de soluciones creativas. Mi experiencia abarca tecnologías como React, Next.js, Node.js, Express, SQL, JavaScript, Python, CSS, Tailwind y más. He trabajado en una variedad de proyectos web, desde aplicaciones interactivas hasta sitios modernos con un diseño funcional y eficiente.",
    linkGithub: "https://github.com/Alex-Amenta",
    linkLinkedin: "https://www.linkedin.com/in/alexander-amenta/",
  },
  {
    name: "Agustin Postai",
    image:
      "https://media.licdn.com/dms/image/D4D03AQFW06Gf8JuRYw/profile-displayphoto-shrink_800_800/0/1699451523650?e=1704931200&v=beta&t=5pX3AD_wubyd8cWkdIwL2ie1nxPoYYRdqvtPx5F9XI8",
    description:
      "Hola Soy Agustin Postai!, un desarrollador web full stack proveniente de Argentina, dedicado a la exploración y al trabajo en equipo para impulsar nuevas tecnologías. Me embarqué en el mundo del desarrollo web por mi fervor tecnológico. Aprender desde cero ha sido un desafío emocionante que me motiva a crear, innovar y contribuir al espacio digital. Busco oportunidades en empresas punteras, con la ambición de desarrollar proyectos únicos y continuar expandiendo mis conocimientos.",
    linkGithub: "https://github.com/AgusPostai",
    linkLinkedin: "https://www.linkedin.com/in/agustin-postai-1b3b76272/",
  },
  {
    name: "Fabrizio Rondinella",
    image:
      "https://media.licdn.com/dms/image/D4D03AQGZP_cWdYYZ-A/profile-displayphoto-shrink_800_800/0/1699646697492?e=1704931200&v=beta&t=5abWJbREmMNYZH5WehqLGVC2CQuVKHjJTQUyeGUPEnM",
    description:
      "Hola soy Fabrizio Rondinella!.Siempre busco la forma de mejorar los procesos y las tareas para hacerlo lo más fácil y eficientes posible. Para esto se necesita comprender las tareas, analizarlas y actuar en consecuencia para mejorar las tareas diarias. Por ejemplo, en mi actual empleo, cree una planilla Spreadsheet compartida con todos mis compañeros, en donde nos organizamos el trabajo excelentemente. La planilla, que usamos todos los días, no solo sirve para estar organizados, si no para saber lo que esta pasando en el día a día cada uno, incluso sin estar en una misma oficina.",
    linkGithub: "https://github.com/JackER4565",
    linkLinkedin: "https://www.linkedin.com/in/fabrizio-rondinella/",
  },
  {
    name: "Fabrizio Galán",
    image:
      "https://media.licdn.com/dms/image/D4E03AQGzSSszpst8OQ/profile-displayphoto-shrink_800_800/0/1699285732563?e=1704931200&v=beta&t=7jYZKziL6wLHXZWx1tbIOE-c3rSKtPpMJfo0_u_mZl8",
    description:
      "Mucho gusto soy Fabrizio Galán, un entusiasta Desarrollador Web Full Stack con una pasión por la tecnología y la innovación, mi enfoque principal es el desarrollo de aplicaciones web utilizando tecnologías modernas como React, Next.js, Node.js, Express, SQL, JavaScript, CSS y más. Me encanta trabajar en proyectos desafiantes que me permitan aprender y mejorar constantemente mis habilidades.",
    linkGithub: "https://github.com/MFabrizioGalan",
    linkLinkedin: "https://www.linkedin.com/in/fabrizio-gal%C3%A1n-8b3429270/",
  },
];

const AboutUs = () => {
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <div className={darkMode ? styles.container : styles.dark}>
        {teamMembers.map((member, index) => (
          <article key={index} className={styles.cardContainer}>
            <div className={styles.imageName}>
              <img src={member.image} alt={member.name} />
              <p>{member.name}</p>
            </div>

            <article className={styles.descriptionContainer}>
              <div>
                <p>{member.description}</p>
              </div>
              <div>
                <button href={member?.linkGithub}>
                  <a
                    href={member.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon />
                  </a>
                </button>
                <button href={member.linkLinkedin}>
                  <a
                    href={member.linkLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </button>
              </div>
            </article>
          </article>
        ))}
      </div>
    </>
  );
};

export default AboutUs;
