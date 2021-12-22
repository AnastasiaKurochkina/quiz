import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';

import './HeaderMenu.css';
import { Link, useLocation } from 'react-router-dom';

export default function HeaderUserMenu() {
    const PATHNAME = {
        auth: '/user/authorization',
        reg: '/user/registration'
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const location = useLocation();
    return (
        <div className='header-menu'>
            <div className='header-menu__btn-avatar'>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    NC FS Quiz
                </Typography>
                {(location.pathname !== PATHNAME.auth) && (location.pathname !== PATHNAME.reg) ? (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                                    <Avatar sx={{ width: 40, height: 40 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    minWidth: 200,
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 19,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                UserFullName
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Link className='header-menu__link' to="/quiz/create">
                                    Создать опрос
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className='header-menu__link' to="/myquiz">
                                    Мои опросы
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Link className='header-menu__link' to="/user/authorization">
                                    Выйти
                                </Link>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                ): null}
            </div>
            <Divider />
        </div>
    );
}