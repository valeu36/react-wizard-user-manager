import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
