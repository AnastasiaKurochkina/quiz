import './HeaderMenu.css';
import { useAppSelector } from '../../redux/redux-hooks';
import HeaderAuthMenu from './HeaderAuthMenu';
import HeaderUserMenu from './HeaderUserMenu';

function HeaderMenu() {
    const state = useAppSelector(state => state);
    
    if (state.user.user.fullname !== undefined) {
      return <HeaderUserMenu/>;
    }
    return <HeaderAuthMenu/>;
}

export default HeaderMenu;