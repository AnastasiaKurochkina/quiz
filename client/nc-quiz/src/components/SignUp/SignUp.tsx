import React from "react";
import { useState } from "react";
import User from "../../models/user";
import './SignUp.css';
import { useHttp } from "../../hooks/http-request";
import Button from '@mui/material/Button';
import { TextField, Typography } from "@mui/material";


const SignUp = () => {

   const {loading, request} = useHttp()
   const [form, setForm] = useState < User > ({
      name: '',
      login: '',
      password: '',
      fullname: ''
   })

   const changeHandler = (event: React.ChangeEvent < HTMLInputElement > ) => {
      setForm({...form,
         [event.target.name]: event.target.value
      })
   }
   const registerHandler = async() => {
      try {
         const data = await request('/user/registration', 'POST', {...form})
         console.log(data)
      } catch (e) {}
   }
   
   return (
      <div className="signup">
         <Typography variant="h4">
            Регистрация
         </Typography>
         <form className="signup_form">
            <TextField
               margin="dense"
               label="Name"
               variant="outlined"
               type="text"
               name="name"
               value={form.name}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Login"
               variant="outlined"
               type="login"
               name="login"
               value={form.login}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Password"
               variant="outlined"
               type="password"
               name="password"
               value={form.password}
               onChange={changeHandler} />
            <TextField
               margin="dense"
               label="Full name"
               variant="outlined"
               type="text"
               name="fullname"
               value={form.fullname}
               onChange={changeHandler} />
            <Button
               variant="contained"
               onClick={registerHandler}
               disabled={loading} >
               Sign up
            </Button>
         </form>
      </div>
   )
}
export default SignUp;