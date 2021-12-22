import Divider from '@mui/material/Divider';
import { Button, Typography } from '@mui/material';

import './HeaderMenu.css';
import { Link, useLocation } from 'react-router-dom';

export default function HeaderAuthMenu() {
    const PATHNAME = {
        auth: '/user/authorization',
        reg: '/user/registration'
    };

    const location = useLocation();

    return (
        <div className='header-menu'>
            <div className='header-menu__btn'>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    NC FS Quiz
                </Typography>
                {(location.pathname !== PATHNAME.auth) && (location.pathname !== PATHNAME.reg) ? (
                    <Button variant="outlined" size="medium">
                        <Link className='header-menu__link' to="/user/authorization">Войти / Регистрация</Link>
                    </Button>
                ): null}
            </div>
            <Divider />
        </div>
    )
}