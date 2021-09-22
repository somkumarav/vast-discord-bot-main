import { useState } from 'react';
import './App.scss';

const App = () => {
  const [values, setValues] = useState({ email: '', rollNumber: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email.includes('vidyaacademy.ac.in')) {
      console.log('successful');
    } else {
      console.log('unsuccessful');
    }
  };

  return (
    <div className="app">
      <form className="app-form" onSubmit={handleSubmit}>
        <input
          className="app-form-input"
          autoFocus
          type="email"
          placeholder="email"
          value={values.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <input
          className="app-form-input"
          type="text"
          placeholder="Rollnumber"
          value={values.rollNumber}
          onChange={(e) => {
            setValues({ ...values, rollNumber: e.target.value });
          }}
        />

        <button className="app-form-button" type="submit">
          Submit
        </button>
      </form>

      <div className="app-showcase">
        {/* <video src="./assets/doge-video.mp4" muted loop autoPlay></video> */}
        <img src="./assets/doge-pic.jpg" alt="" />
      </div>
    </div>
  );
};

export default App;
