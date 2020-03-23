import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core'
import Card from '../components/Card'

export default function Home() {
    const { data, loading, error } = useQuery(POSTS_QUERY)
    return (
        <>
            <Grid item xs={false} sm={1} />
            <Grid item container xs={12} sm={10} spacing={2} alignItems="center" justify="center" alignContent='center'>
                {data && data.posts && data.posts.map(post => (
                    <Grid key={post.id} item sm={6} align="center">
                        <Card post={post} />
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={false} sm={1} />
        </>

    )
}

const POSTS_QUERY = gql`
# Write your query or mutation here
{
  posts{
    id
    body
    username
    createdAt
    comments {
      id
      body
      username
    }
    likes {
      id
      username
      createdAt
    }
    commentsCount
    likesCount
  }
}
`
