import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function PostForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const [addPost, {loading}] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      console.log('result: ', result)
    },
    onError(error) {
      console.log({error})
    },
    variables: {
      body: value
    }
  })

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="New post"
          multiline
          fullWidth
          rows="4"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" color="primary" onClick={addPost}>Post</Button>
        </div>
      </div>
    </form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $body: String!
  ) {
    createPost(body: $body) {
      id
  	  body
      createdAt
      username
    }
  }
`
