import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const forgotPassword = async () => {
        const result = await api.forgotPassword(email);
        if(result.success){
            console.log(result.success, 'success')
            history.push(`/reset-password`);
        } 
        else{
            return (
                <p>Что-то пошло не так...</p>
            )
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={styles.container}>
            <form className={styles.inputContainer} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <EmailInput size={undefined} onChange={onChangeEmail} value={email} name={'email'} />
                <Button onClick={forgotPassword} type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={`mt-20 ${styles.login}`}>
                <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль?</p>
                <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;