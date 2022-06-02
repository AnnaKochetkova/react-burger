import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/logic/rootReducer';

const AppHeader = () => {
    const user = useSelector((store: RootState) => store.authorization.user);
    return (
        <header className={`p-4 ${styles.header}`}>
            <div className={styles.container}>
                <div className={styles.linksContainer}>
                    <NavLink exact to="/" className={`p-4 ${styles.headerConstructor}`} activeClassName={styles.active}>
                        <BurgerIcon type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Конструктор</span>
                    </NavLink>
                    <NavLink exact to="/feed" className={`p-4 ml-2 ${styles.headerConstructor}`} activeClassName={styles.active}>
                        <ListIcon type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Лента заказов</span>
                    </NavLink>
                </div>
                <Link to='/'>
                    <Logo/>
                </Link>
                <div className={styles.linkContainer}>
                    <NavLink exact to={user ? "/profile" : "/login"} className={`p-4 ml-2 ${styles.headerConstructor}`} activeClassName={styles.active}>
                        <ProfileIcon  type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Личный кабинет</span>
                    </NavLink>
                </div>
                
            </div>
        </header>
    )
}

export default AppHeader;