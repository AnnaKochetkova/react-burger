import styles from './profile-page.module.css';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { setToken } from '../../utils/utils';
import ProfileFormPage from './profile-form-page';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AUTHORIZATION_ACCOUNT } from '../../services/actions/authorization';

const ProfilePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const logout = async () => {
        const result = api.logout();
        if((await result).success){
            setToken(undefined);
            
            dispatch({
                type: AUTHORIZATION_ACCOUNT,
                payload: undefined,
            })
            history.push(`/`);
            console.log(result, 'все ок')
        }
        else console.log(result, 'все не ок')
    }

    

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.buttons}>
                    <Link to="/" className={`text text_type_main-medium text_color_inactive ${styles.link} ${styles.active}`}>Профиль</Link>
                    <Link to="/" className={`text text_type_main-medium text_color_inactive ${styles.link}`}>История заказов</Link>
                    <button onClick={logout} className={`text text_type_main-medium text_color_inactive ${styles.button}`}>Выход</button>
                </div>
                <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <ProfileFormPage/>
        </div>
    )
}

export default ProfilePage;