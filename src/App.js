import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerd, setRegisterd] = useState(false);
  // For Form Validation
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');


  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Form Validation Code Below
    const form = e.currentTarget;
    if (form.checkValidity() === false && !/(?=.* [!@#$%^&*])/.test(password)) {
      e.preventDefault();
      e.stopPropagation();
      setError('Please include atleast one special charecter');
      return;
    }


    setValidated(true);
    setError('');

    if (registerd) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.log(error.message);
        })
    }
  }

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }
  const handleCheckbox = e => {
    setRegisterd(e.target.checked);
  }
  // Email Verification
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Verification mail sent');
      })

  }
  return (
    <div className="App">
      <div className='w-50 mx-auto mt-5'>
        <h3 className='text-primary'>Please {registerd ? 'Login' : 'Register'}</h3>
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <p className='text-danger'>{error}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleCheckbox} type="checkbox" label="Already Registerd?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registerd ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
