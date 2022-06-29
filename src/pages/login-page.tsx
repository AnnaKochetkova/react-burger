import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, ChangeEvent, useCallback, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authorization } from '../services/actions/authorization';
import { Redirect } from 'react-router-dom';
import styles from './login-page.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/logic/store';

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

    const account = useSelector(store => store.authorization.user);

    const isCreated = useSelector(store => store.order.isCreated);
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
            //@ts-ignore
            <Redirect to={state?.from || '/'}/> //<Redirect to={{pathname: '/profile'}}/>
        )
    }

    return (
        <div className={styles.container}>
            <form className={styles.inputContainer} onSubmit={onSubmitForm}>
                <p className="text text_type_main-medium">Вход</p>
                <Input size={undefined} onChange={onChangeForm} placeholder={'Email'} value={values.email} name={'email'} data-cy='email'/>
                <PasswordInput onChange={onChangeForm} value={values.password} name={'password'} data-cy='password'/>
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