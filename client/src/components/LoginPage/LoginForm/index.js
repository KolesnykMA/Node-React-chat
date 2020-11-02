import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import validator from 'validator';
import { Form, Button, Segment } from 'semantic-ui-react';

const LoginForm = ({ login: loginUser }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [isEmailValid, setIsEmailValid] = useState(true);
    // const [isPasswordValid, setIsPasswordValid] = useState(true);

    const emailChanged = data => {
        setLogin(data);
        // setIsEmailValid(true);
    };

    const passwordChanged = data => {
        setPassword(data);
        // setIsPasswordValid(true);
    };

    const handleLoginClick = async () => {
        // const isValid = isEmailValid && isPasswordValid;
        // if (!isValid || isLoading) {
        //     return;
        // }
        setIsLoading(true);
        try {
            await loginUser({ login, password });
        } catch {
            // TODO: show error
            setIsLoading(false);
        }
    };

    return (
        <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
            <Segment>
                <Form.Input
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="login"
                    // error={!isEmailValid}
                    onChange={ev => emailChanged(ev.target.value)}
                    // onBlur={() => setIsEmailValid(email)}
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    // error={!isPasswordValid}
                    onChange={ev => passwordChanged(ev.target.value)}
                    // onBlur={() => setIsPasswordValid(Boolean(password))}
                />
                <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
                    Login
                </Button>
            </Segment>
        </Form>
    );
};

// LoginForm.propTypes = {
//     login: PropTypes.func.isRequired
// };

export default LoginForm;