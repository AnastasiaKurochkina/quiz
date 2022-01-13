import React, { useEffect } from "react";
import { useState } from "react";
import User from "../../models/user";
import './SignUp.css';
import { useHttp } from "../../hooks/http-request";
import Button from '@mui/material/Button';
import { Alert, Snackbar, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {

   const { loading, request, error } = useHttp()
   const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
   const [form, setForm] = useState<User>({
      name: '',
      login: '',
      password: '',
      fullname: ''
   })


   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
         ...form,
         [event.target.name]: event.target.value
      })
   }
   const handleCloseSnackBar = () => {
      setOpenSnackBar(false);
   }

   const registerHandler = async () => {
      try {
         const data = await request('/user/registration', 'POST', { ...form })
         console.log(data)
      } catch (e) {
         setOpenSnackBar(true)
      }
   }

   return (
      <div className="signup">
         <Typography variant="h4">
            Регистрация
         </Typography>
         <form className="signup_form">
            <TextField
               margin="dense"
               label="Имя"
               variant="outlined"
               type="text"
               name="name"
               value={form.name}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Логин"
               variant="outlined"
               type="login"
               name="login"
               value={form.login}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Пароль"
               variant="outlined"
               type="password"
               name="password"
               value={form.password}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Полное имя"
               variant="outlined"
               type="text"
               name="fullname"
               value={form.fullname}
               onChange={changeHandler} />
            <Button
               variant="contained"
               onClick={registerHandler}
               disabled={loading} >
               ЗАРЕГИСТРИРОВАТЬСЯ
            </Button>
            <Typography>
               Уже есть аккаунт?
               <Button variant="text">
                  <Link className='signup-form__link' to="/user/authorization">ВОЙТИ В ПРОФИЛЬ</Link>
               </Button>
               <Snackbar
                  open={openSnackBar}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackBar}
               >
                  <Alert
                     onClose={handleCloseSnackBar}
                     severity="error"
                  >
                     {error}
                  </Alert>
               </Snackbar>
            </Typography>

         </form>
      </div>
   )
}
export default SignUp;