import React, { useCallback } from "react";
import { useState } from "react";
import User from "../../models/user";
import { useHttp } from "../../hooks/http-request";
import Button from '@mui/material/Button';
import { TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import jwt from 'jwt-decode';
import { Link } from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch()
    const {loading,request} = useHttp()
    const [form, setForm] = useState < User > ({
        login: '',
        password: '',
    })
    const changeHandler = (event: React.ChangeEvent < HTMLInputElement > ) => {
        setForm({...form,
            [event.target.name]: event.target.value
        })
    }
    const authHandler = async() => {
        try {
            const data = await request('/user/authorization', 'POST', {...form})
            const token = data.token;
            localStorage.setItem('userId', data.userId);
            const user: User = jwt(token);
            localStorage.name = user.name;
            localStorage.fullname = user.fullname;
            dispatch(login({
                login: user.login,
                userId: user.userId,
                name: user.name,
                fullname: user.fullname
            }))
        } catch (e) {}
    }
   
    return (
        <div className="signup">
            <Typography variant="h4">
                Авторизация
            </Typography>
            <form className="signup_form">
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
                <Button
                    variant="contained"
                    onClick={authHandler}
                    disabled={loading} >
                    Log in
                </Button>
                <Typography>
                    Not a member? 
                    <Button variant="text">
                        <Link className='signup-form__link' to="/user/registration">SIGN UP</Link>
                    </Button>
                </Typography>
            </form>
        </div>
        )
}
export default Auth;


