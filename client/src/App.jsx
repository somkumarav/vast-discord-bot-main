import { useEffect, useState } from 'react';
import './sass/app.scss';

const App = () => {
  const [values, setValues] = useState({
    discordId: 'mandatharam onnum kanikaruthe',
    admissionNumber: '',
    email: '',
    name: '',
    department: '',
    phoneNumber: '',
  });
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastmessage, setToastMessage] = useState('unsuccessful');

  useEffect(() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const discordId = url.searchParams.get('discordid');
    console.log(url.searchParams.get('discordid'));
    setValues({ ...values, discordId });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email.includes('vidyaacademy.ac.in')) {
      setToastMessage('Successful');
      setToast(true);
      console.log('successful');
      setTimeout(() => {
        setToast(true);
        setToastMessage('');
      }, 3000);
    } else {
      setToastMessage("Sike it's the wrong email");
      setToast(true);
      setTimeout(() => {
        setToast(false);
        setToastMessage('');
      }, 3000);
      console.log('wrong email');
    }
  };

  const togleActive = (e) => {
    e.preventDefault();
    setActive((prev) => !prev);
  };

  return (
    <div className="app">
      <div className={`container ${active ? 'right-panel-active' : ''}`}>
        <div className="form-container first-section">
          <form action="#">
            <h1>Register</h1>
            <span>use your official email for registration</span>
            <input
              type="text"
              placeholder="discord-id"
              className="app-form-input discord-id"
              value={values.discordId}
              readOnly
            />
            <input
              type="text"
              placeholder="admission-number"
              className="app-form-input admission-number"
              value={values.admissionNumber}
              onChange={(e) => {
                setValues({ ...values, admissionNumber: e.target.value });
              }}
            />
            <input
              type="email"
              placeholder="email"
              className="app-form-input email"
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
            <button onClick={togleActive}>next</button>
          </form>
        </div>
        <div className="form-container second-section">
          <form action="#">
            <h1>Sign in</h1>
            <span>welcome to vast discord bot</span>
            <input
              type="text"
              placeholder="name"
              className="app-form-input name"
              value={values.name}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="department"
              className="app-form-input department"
              value={values.department}
              onChange={(e) => {
                setValues({ ...values, department: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="phone-number"
              className="app-form-input phone-number"
              value={values.phoneNumber}
              onChange={(e) => {
                setValues({ ...values, phoneNumber: e.target.value });
              }}
            />
            <button onClick={togleActive}>Previous</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Thanks for Registering</h1>
              <p>
                To keep connected with us please complete registration with your
                personal info
              </p>
              <button className="ghost signUp" onClick={handleSubmit}>
                Register
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome to VAST Discord</h1>
              <p>Enter your personal details and start journey with us</p>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="toast">
          <h4>{toastmessage}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
