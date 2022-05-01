import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
  const [name, setName] = useState('');


  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Form Validation Code Below
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
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
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          verifyEmail();

          updateProfile(auth.currentUser, { displayName: name })
            .then(() => {
              console.log('Name Updated')
            })
            .then(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error.message);
        })

    }
  }
  const handleName = (e) => {
    setName(e.target.value);
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
      .catch(error => {
        console.log(error)
      })

  }
  const handlePasswordReset = () => {
    !email || sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset email sent");
      })
      .catch(error => {
        setError(error)
      })
  }

  return (
    <div className="App">
      <div className='w-50 mx-auto mt-5'>
        <h3 className='text-primary'>Please {registerd ? 'Login' : 'Register'}</h3>
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          {!registerd ? <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your Name" required />
          </Form.Group> : ''}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <p className='text-danger'>{error}</p>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
            <Form.Check onChange={handleCheckbox} type="checkbox" label="Already Registerd?" />
            <Button onClick={handlePasswordReset} variant="link" className='text-danger'>Forgot Password?</Button>
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
