import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSignIn, noErrorUser, verifyEmail } from '../../redux/store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Api } from '../../utils/Api';

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, loginSuccess, error, errorMsg, userDetails } = user;
  const [needCode, setNeedCode] = useState(false);
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading2, setLoading] = useState(false);

  const _handleSubmit = async () => {
    // callback
    if (email.length > 2 && password.length > 2) {
      dispatch(fetchSignIn({ email, password }));
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      if (userDetails.emailVerified) {
        navigate('/tienda')
      } else {
        setNeedCode(true) //Que se abra
      }
    }
  }, [loginSuccess, navigate])

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      dispatch(noErrorUser())

    }
  }, [error, errorMsg])

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

useEffect(() => {
    if (error) {
  alert(code)

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
                navigate('/tienda');
            })
    }
}, [success, navigate]);

  return (
    <div className="login-form">
      {!needCode && (<>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={_handleSubmit} >Iniciar Sesión</button>
      </>
)}




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
