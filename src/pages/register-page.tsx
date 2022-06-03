import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../services/logic/rootReducer';
import { Redirect } from 'react-router-dom';
import { registrationAccount } from '../services/actions/registration';
import { useDispatch, useSelector } from '../services/logic/store';

interface StateForm {
    email: string;
    password: string;
    name: string
}

const RegisterPage = () => {
    const [values, setValues] = useState<StateForm>({
        email: '',
        password: '',
        name: '',
    })

    const registrError = useSelector(store => store.registration.accountError);
    const registrUser = useSelector(store => store.registration.user);

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
        dispatch(registrationAccount(values.email, values.password, values.name));
    }, [values]);

    if(registrUser){
        return (
            <Redirect to={{pathname: '/'}}/>
        )
    }

    return (
        <div className={styles.container}>
            <form className={styles.inputContainer} onSubmit={onSubmitForm}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input type={'text'} placeholder={'Имя'} onChange={onChangeForm} value={values.name} name="name"/>
                <EmailInput size={undefined} onChange={onChangeForm} value={values.email} name={'email'} />
                <PasswordInput onChange={onChangeForm} value={values.password} name={'password'} />
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>

                {
                    registrError ? <div>Что-то пошло не так</div> : null
                }
            </form>
            <div className={`${styles.login} mt-20`}>
                <p className={`text text_type_main-default ${styles.text}`}>Уже зарегистрированы?</p>
                <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    )
}

export default RegisterPage;