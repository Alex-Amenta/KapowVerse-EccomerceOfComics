// import { useParams } from "react-router-dom";
// import axios from "axios";
// import base_url from "../../utils/development";
// import { toast } from "react-hot-toast";
// import styles from "./Reset.module.css";
// import { useState, useEffect } from "react";
// import Navbar from "../../components/navbar/Navbar";

// function Reset() {
//   const { token } = useParams();

//   const [emailInput, setEmailInput] = useState("");
//   const [resetTokenInput, setResetTokenInput] = useState(token || "");
//   const [countdown, setCountdown] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (countdown > 0) {
//       interval = setInterval(() => {
//         setCountdown((prevCountdown) => prevCountdown - 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [countdown]);

//   const send = async () => {
//     try {
//       const email = emailInput;

//       if (!email) {
//         toast.error("Please enter an email address.", {
//           duration: 4000,
//           position: "top-center",
//           id: "error",
//         });
//         return;
//       }

//       await axios
//         .post(`${base_url}/user/reset-password`, { email })
//         .then((res) => {
//           toast.success("Email has been sent to your email successfully", {
//             duration: 4000,
//             position: "top-center",
//             id: "confirm",
//           });
//           setCountdown(300); 
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error(err.response ? err.response.data.message : err.message, {
//             duration: 4000,
//             position: "top-center",
//             id: "error",
//           });
//         });
//     } catch (err) {
//       console.log("catch", err);
//       toast.error(err.response ? err.response.data.message : err.message, {
//         duration: 4000,
//         position: "top-center",
//         id: "error",
//       });
//     }
//   };

//   const reset = async () => {
//     try {
//       await axios
//         .post(`${base_url}/user/reset-password/${resetTokenInput}`)
//         .then((res) => {
//           toast.success(res.data.message + " Redirecting...", {
//             duration: 2000,
//             position: "top-center",
//             id: "confirm",
//           });

//           setTimeout(() => {
//             window.location = "/home";
//           }, 2000);
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error(err.response ? err.response.data.message : err.message, {
//             duration: 4000,
//             position: "top-center",
//             id: "error",
//           });
//         });
//     } catch (err) {
//       console.log("catch", err);
//       toast.error(err.response ? err.response.data.message : err.message, {
//         duration: 4000,
//         position: "top-center",
//         id: "error",
//       });
//     }
//   };

//   if (token) reset();

//   const handleEmailInputChange = (e) => {
//     setEmailInput(e.target.value);
//   };

//   const handleResetTokenInputChange = (e) => {
//     setResetTokenInput(e.target.value);
//   };

//   const formattedTime = `${Math.floor(countdown / 60)}:${(countdown % 60)
//     .toString()
//     .padStart(2, "0")}`;

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         <div className={styles.text}>
//           Enter your email to send you your verification code:{" "}
//         </div>
//         <input
//           className={styles.input}
//           value={emailInput}
//           onChange={handleEmailInputChange}
//           type="text"
//         />
//         <button onClick={send} disabled={countdown > 0}>
//           Send
//         </button>
//         {countdown > 0 && (
//           <div className={styles.text}>Resend in {formattedTime}</div>
//         )}
//         <div className={styles.text}>
//           Paste the code sent to your email here and press the button to Reset your password:{" "}
//         </div>
//         <input
//           className={styles.input}
//           value={resetTokenInput}
//           onChange={handleResetTokenInputChange}
//           type="text"
//         />
//         <button onClick={reset}>Reset</button>
//       </div>
//     </>
//   );
// }

// export default Reset;


import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../../utils/development";
import { toast } from "react-hot-toast";
import styles from "./Reset.module.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

function Reset() {
  const { token } = useParams();

  const [emailInput, setEmailInput] = useState("");
  const [resetTokenInput, setResetTokenInput] = useState(token || "");
  const [newPasswordInput, setNewPasswordInput] = useState(""); // Nuevo estado para la nueva contraseña
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  const send = async () => {
    try {
      const email = emailInput;

      if (!email) {
        toast.error("Please enter an email address.", {
          duration: 4000,
          position: "top-center",
          id: "error",
        });
        return;
      }

      await axios
        .post(`${base_url}/user/reset-password`, { email })
        .then((res) => {
          toast.success("Email has been sent to your email successfully", {
            duration: 4000,
            position: "top-center",
            id: "confirm",
          });
          setCountdown(300);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response ? err.response.data.message : err.message, {
            duration: 4000,
            position: "top-center",
            id: "error",
          });
        });
    } catch (err) {
      console.log("catch", err);
      toast.error(err.response ? err.response.data.message : err.message, {
        duration: 4000,
        position: "top-center",
        id: "error",
      });
    }
  };

  const reset = async () => {
    try {
      const token = resetTokenInput;
      const newPassword = newPasswordInput; 

      await axios
        .post(`${base_url}/user/reset-password/${token}`, { newPassword }) 
        .then((res) => {
          toast.success(res.data.message + " Redirecting...", {
            duration: 2000,
            position: "top-center",
            id: "confirm",
          });

          setTimeout(() => {
            window.location = "/home";
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response ? err.response.data.message : err.message, {
            duration: 4000,
            position: "top-center",
            id: "error",
          });
        });
    } catch (err) {
      console.log("catch", err);
      toast.error(err.response ? err.response.data.message : err.message, {
        duration: 4000,
        position: "top-center",
        id: "error",
      });
    }
  };

  if (token) reset();

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleResetTokenInputChange = (e) => {
    setResetTokenInput(e.target.value);
  };

  const handleNewPasswordInputChange = (e) => {
    setNewPasswordInput(e.target.value);
  };

  const formattedTime = `${Math.floor(countdown / 60)}:${(countdown % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.text}>
          Enter your email to send you your verification code:{" "}
        </div>
        <input
          className={styles.input}
          value={emailInput}
          onChange={handleEmailInputChange}
          type="text"
        />
        <button className={styles.res_button} onClick={send} disabled={countdown > 0}>
          Send
        </button>
        {countdown > 0 && (
          <div className={styles.text}>Resend in {formattedTime}</div>
        )}
        <div className={styles.text}>
          Paste the code sent to your email here and press the button to Reset your password:{" "}
        </div>
        <input
          className={styles.input}
          value={resetTokenInput}
          onChange={handleResetTokenInputChange}
          type="text"
        />
        <div className={styles.text}>
          Enter your new password:{" "}
        </div>
        <input
          className={styles.input}
          value={newPasswordInput}
          onChange={handleNewPasswordInputChange}
          type="password" 
        />
        <button className={styles.res_button} onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default Reset;
