import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header style={{ backgroundColor: '#1C1C21' }} className="p-4">
            <div className={styles.container}>
                <div className={styles.linksContainer}>
                    <a className={`p-4 ${styles.headerConstructor}`}>
                        <BurgerIcon type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Конструктор</span>
                    </a>
                    <a className={`p-4 ml-2 ${styles.headerConstructor}`} style={{opacity: '50%'}}>
                        <ListIcon type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Лента заказов</span>
                    </a>
                </div>
                <Logo/>
                <div className={styles.linkContainer}>
                    <a className={`p-4 ml-2 ${styles.headerConstructor} ${styles.opacity}`}>
                        <ProfileIcon  type="primary" />
                        <span className={`ml-2 ${styles.text}`}>Личный кабинет</span>
                    </a>
                </div>
                
            </div>
        </header>
    )
}

export default AppHeader;