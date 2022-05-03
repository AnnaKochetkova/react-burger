import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, ChangeEvent, useCallback, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authorization } from '../../services/actions/authorization';
import { RootState } from '../../services/logic/rootReducer';
import { Redirect } from 'react-router-dom';
import styles from './login-page.module.css';
import { useHistory } from 'react-router-dom';

interface StateForm {
    email: string;
    password: string;
    name: string
}

const LoginPage = () => {
    const [values, setValues] = useState<StateForm>({
        email: '',
        password: '',
        name: '',
    });

    const account = useSelector((store: RootState) => store.authorization.user);

    const isCreated = useSelector((store: RootState) => store.order.isCreated);
    const history = useHistory();

    const dispatch = useDispatch();

    const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
    }, []);

    const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authorization(values.email, values.password));
        if(isCreated){
            history.push("/");
        }
    }, [values]);

    if(account){
        return (
            <Redirect to={{pathname: '/profile'}}/>
        )
    }

    return (
        <div className={styles.container}>
            <form className={styles.inputContainer} onSubmit={onSubmitForm}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput size={undefined} onChange={onChangeForm} value={values.email} name={'email'} />
                <PasswordInput onChange={onChangeForm} value={values.password} name={'password'} />
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={`${styles.register} mt-20 mb-4`}>
                <p className={`text text_type_main-default ${styles.text}`}>Вы — новый пользователь?</p>
                <Link className={`text text_type_main-default ${styles.link}`} to='/register'>Зарегистрироваться</Link>
            </div>
            <div className={styles.password}>
                <p className={`text text_type_main-default ${styles.text}`}>Забыли пароль?</p>
                <Link className={`text text_type_main-default ${styles.link}`} to='/forgot-password'>Восстановить пароль</Link>
            </div>
        </div>
    )
}

export default LoginPage;