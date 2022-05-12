import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password-page.module.css';
import api from '../utils/api';
import { useHistory } from 'react-router-dom';

const ResetPasswordPage = () => {

    const [password, setPassword] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const history = useHistory();

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const resetPassword = async() => {
        const result = await api.resetPassword(password, value);
        if(result.success){
            console.log(result.success, 'result.success')
            history.push(`/login`);
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

    return (
        <div className={styles.container}>
            <form className={styles.inputContainer} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <PasswordInput onChange={onChangePassword} value={password} name={'password'}/>
                <Input type={'text'} placeholder={'Введите код из письма'} onChange={e => setValue(e.target.value)} value={value} />
                <Button onClick={resetPassword} type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={`mt-20 ${styles.login}`}>
                <p className={`text text_type_main-default ${styles.text}`}>Вспомнили пароль?</p>
                <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    )
}

export default ResetPasswordPage;