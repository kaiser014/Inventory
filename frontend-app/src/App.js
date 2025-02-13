import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/styles.css";
import "./assets/css/style.scss";
import PublicRoutes from "./routes/PublicRoutes";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";

  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  return (
    <div>
      <PublicRoutes />
    </div>
  );
}

export default App;
