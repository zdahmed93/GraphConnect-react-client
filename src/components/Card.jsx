import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'teal',
    },
}));

export default function RecipeReviewCard({ post: { id, body, username, createdAt, commentsCount, likesCount } }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card className={classes.root} elevation={4}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        GC
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={username}
                subheader={moment(Number(createdAt)).fromNow()}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <FormControlLabel
                    control={
                        <Checkbox 
                            // checked={false} 
                            icon={<ThumbUpAltOutlinedIcon />} 
                            checkedIcon={<ThumbUpAlt />} 
                            name="checkedH" 
                        />
                    }
                    label={`${likesCount}`}
                />
                <IconButton component={Link} to={`/post/${id}`}>
                    <QuestionAnswerOutlinedIcon />
                </IconButton>
                <p>{commentsCount}</p>

            </CardActions>
        </Card>
    );
}
