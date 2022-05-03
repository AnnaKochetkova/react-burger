import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';
import { useState, useCallback, ChangeEvent } from 'react';
import { RootState } from '../../services/logic/rootReducer';
import api from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { AUTHORIZATION_ACCOUNT } from '../../services/actions/authorization';

interface StateAccount {
    email: string;
    password: string;
    name: string
}

const ProfileFormPage = () => {

    const user = useSelector((store: RootState) => store.authorization.user);

    const [values, setValues] = useState<StateAccount>({
        email: user?.email ? user.email : '',
        password: '',
        name: user?.name ? user.name : '',
    });
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();

    const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
        setChange(true);
    }, []);

    const cancel = () => {
        setValues(oldValues => {
            return {...oldValues, email: user?.email ? user.email : '', name: user?.name ? user.name : ''}
        })
    }

    const onSave = async () => {
        const result = await api.updateUser(values.email, values.name);
        console.log(result, 'result save');
        dispatch({
            type: AUTHORIZATION_ACCOUNT,
            payload: result.user,
        })
    }

    return (
        <div className={styles.wrapper}>
            <Input type={'text'} placeholder={'Имя'} onChange={onChangeForm} value={values.name} name="name"/>
            <EmailInput size={undefined} onChange={onChangeForm} value={values.email} name={'email'} />
            <PasswordInput onChange={onChangeForm} value={values.password} name={'password'} />
            <div className={styles.wrapperButtons}>
                {
                    change ?
                    (
                        <>
                            <Button onClick={onSave} type="primary" size="medium">
                                Сохранить
                            </Button>
                            <Button onClick={cancel} type="primary" size="medium">
                                Отмена
                            </Button>
                        </> 
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default ProfileFormPage;