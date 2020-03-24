import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'

import DatePicker from '../components/DatePicker'

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

export default function SignUp(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        birthDate: '651006714000',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
    const [addUser, {loading}] = useMutation(REGISTER_MUTATION, {
        update(proxy, result) {
            props.history.push('/')
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            ...values,
            confirmPassword: undefined
        }
    })
    console.log({ values })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('values; ', values)
        if (values.password !== values.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords mismatch'
            }))
        } else {
            addUser()
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={values.firstName}
                                onChange={onChange}
                                error={errors && errors.firstName}
                                helperText={errors && errors.firstName ? errors.firstName : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={values.lastName}
                                onChange={onChange}
                                error={errors && errors.lastName}
                                helperText={errors && errors.lastName ? errors.lastName : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker returnSelectedDate={(date) => setValues(values => ({ ...values, birthDate: date.valueOf().toString() }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                value={values.username}
                                onChange={onChange}
                                error={errors && errors.username}
                                helperText={errors && errors.username ? errors.username : ''}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={onChange}
                                error={errors && errors.email}
                                helperText={errors && errors.email ? errors.email : ''}
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={onChange}
                                error={errors && errors.confirmPassword}
                                helperText={errors && errors.confirmPassword ? errors.confirmPassword : ''}
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
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
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

const REGISTER_MUTATION = gql`
mutation RegisterNewUser(
    $firstName: String!
    $lastName: String!
    $birthDate: String!
    $username: String!
    $email: String!
    $password: String!
) {
    register(
        data: {
        firstName: $firstName
        lastName: $lastName
        birthDate: $birthDate
        username: $username
        email: $email
        password: $password
        }
    ) {
        token
        user {
            firstName
            lastName
            id
            email
            birthDate
            createdAt
    }
    }
}
`