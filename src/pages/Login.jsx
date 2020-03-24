import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../contexts/auth';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const context = useContext(AuthContext)
    const classes = useStyles();
    const [values, setValues] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const onChange = (e) => {
        // React is recycling the event. The async call to setState wont know the value of event.target.name since the event is already gone. We need to make a copy of the value.
        const event = { ...e }
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }))
        setErrors({
            ...errors,
            [event.target.name]: undefined
        })
    }
    const [addUser, { loading }] = useMutation(LOGIN_MUTATION, {
        update(proxy, result) {
            console.log('result: ', result.data.login)
            // localStorage.setItem('jwtToken', result.data.login.token)
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            ...values
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        addUser()
    }
    return (
        <Container component="main" maxWidth="xs" style={{height: '100vh'}}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="usernameOrEmail"
                                variant="outlined"
                                required
                                fullWidth
                                id="usernameOrEmail"
                                label="Username or Email"
                                value={values.usernameOrEmail}
                                onChange={onChange}
                                error={errors && errors.usernameOrEmail}
                                helperText={errors && errors.usernameOrEmail ? errors.usernameOrEmail : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={onChange}
                                error={errors && errors.password}
                                helperText={errors && errors.password ? errors.password : ''}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const LOGIN_MUTATION = gql`
mutation RegisterNewUser(
    $usernameOrEmail: String!
    $password: String!
) {
    login(
        data: {
        usernameOrEmail: $usernameOrEmail
        password: $password
        }
    ) {
        token
        user {
            firstName
            lastName
            id
            email
            username
            birthDate
            createdAt
    }
    }
}
`