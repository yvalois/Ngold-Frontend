import React, { useState, useEffect } from 'react';
import { changePassword, requestChangePassword } from '../../redux/store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailSended, setEmailSended] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const [ready, setReady] = useState(false)
  const { loading, userDetails, loginSuccess, passChanged, error } = user

  const _handleSubmit2 = () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password not match',
      })
    } else {
      try {
        dispatch(changePassword(code, password, email));
        setReady(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const resendCode = () => {
    dispatch(requestChangePassword(email))
  }
  const _handleSubmit = () => {
    dispatch(requestChangePassword(email));
    setTimeout(() => {
      setEmailSended(true);
    }, 1000);

  }

  useEffect(() => {
    if (passChanged && ready) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password changed',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            preConfirm : () => {
              navigate('tienda')
            }
        })
    }
} , [passChanged, navigate,ready])

useEffect(() => {
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid code',
        })
    }
} , [error])

  return (
    <div className="login-form">

      {!emailSended && (<>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
        <button type="submit" onClick={_handleSubmit}>Confirmar</button>
      </>)}

      {emailSended && (<>
        <p>{email}</p>
        <input
          type="text"
          placeholder="Codigo"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={_handleSubmit2}>Confirmar</button>
        <button type="submit" onClick={resendCode}>Nuevo codigo</button>

      </>)}

    </div>
  );
}

export default LoginForm;
