import React, { useCallback, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUp, noErrorUser, verifyEmail } from '../../redux/store/actions/userAction';
import Swal from 'sweetalert2';
import { Api } from '../../utils/Api';


function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [needCode, setNeedCode] = useState(false)
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const user = useSelector(state => state.user);
  const { userDetails, loginSuccess,error,  errorMsg } = user;
  const [loading2, setLoading] = useState(false);

  useEffect(() => {
    setFullName(name + ' ' + surname);
  }, [name, surname])


  const _handleSubmit = () => {
    if (fullName.length > 2 && email.length > 2 && password.length > 2 && confirmPassword.length > 2) {
      if (password === confirmPassword) {
        dispatch(fetchSignUp(fullName, email.toLowerCase(), password));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      })
    }

  }

  useEffect(() => {
    if (loginSuccess) {
      Swal.fire({
        title: 'success !',
        text: 'You have successfully signed up',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => { setNeedCode(true) })
    }
  }, [loginSuccess, navigate])

  useEffect(() => {
    if (errorMsg === "User already exist") {
      Swal.fire({
        icon: 'Error',
        title: 'Oops...',
        text: errorMsg,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
      dispatch(noErrorUser())
    }
  }, [errorMsg])





  const handleSubmit = () => {
      if (code.length > 0) {
          try {
              setLoading(true);

              setSuccess(false);
              dispatch(verifyEmail(code.toString()));
              setSuccess(false);

          } catch (error) {

              setLoading(false);
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.message,
              })
          }
      } else {

          setLoading(false);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please enter code',
          })
      }
  }

  const handleNewCode = async () => {
      try {
          setLoading(true);

          const data = await Api.newCode();
          setLoading(false);
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'New code has been sent to your email',
          })
      } catch (error) {

          setLoading(false);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
          })
      }
  }

  useEffect(() => {
      if (error) {
          console.log(errorMsg);
          setLoading(false);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Invalid code",
          })
      }
  }, [error, errorMsg])


  useEffect(() => {
      if (loginSuccess) {
          if (userDetails.emailVerified) {
              setSuccess(true);
              setLoading(false);
          }
      }
  }, [loginSuccess, userDetails]);

  useEffect(() => {
      if (success) {
          Swal.fire({
              title: 'success !',
              text: 'You have successfully confirmed your email',
              icon: 'success',
              confirmButtonText: 'OK'
          }).
              then(() => {
                  navigate('tienda');
              })
      }
  }, [success, navigate]);

  return (
    <div className="login-form">

      {!needCode && ( 
        <>
        <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="surname"
        value={surname}
        onChange={e => setSurname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="********"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="********"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" onClick={ _handleSubmit}>Registrar</button>
      </>)
       }


       {needCode && (<>
      <input
          type="email"
          placeholder="Codigo de verificacion"

          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        <button type="submit" onClick={handleSubmit}>Confirmar</button>
        <button type="submit" onClick={handleNewCode}>Enviar nuevo codigo</button>

        </>)
}
    </div>
  );
}

export default LoginForm;
