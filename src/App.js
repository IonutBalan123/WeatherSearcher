

import styles from "./App.module.css";
import Navbar from "./components/navbar/navbar";
import MainPage from "./components/containers/mainPage/MainPage";

function App() {
 

  return (
    <div className={styles.App}>
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
