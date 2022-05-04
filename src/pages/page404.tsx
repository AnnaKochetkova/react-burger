import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import error from '../images/404error.png';
import styles from './page404.module.css';
import { useHistory } from 'react-router-dom';

const Page404 = () => {

    const history = useHistory();

    const onClick = () => {
        history.push(`/`);
    }
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">Упссс...Страница не найдена</p>
            <img className={styles.image} src={error}></img>
            <Button type="primary" size="medium" onClick={onClick}>
                Пойдем на главную
            </Button>
            <p className="text text_type_main-small">* Может вы не будете писать непонятные пути?</p>
        </div>
    )
}

export default Page404;