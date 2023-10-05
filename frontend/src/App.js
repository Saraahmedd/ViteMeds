import './assets/App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
// import LandingPage from './screens/LandingPage';
import axios from 'axios'

axios.defaults.withCredentials = true;// to send cookies

function App() {
  return (
    <>

      <Router>
        <div className='App'>
          <Header />
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}

          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
