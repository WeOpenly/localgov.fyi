import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
profile_user_detail_card : {
  maxWidth: 345,
  borderRadius: 5,
  boxShadow: `0 0 0 0`,
  border: `1px solid ${theme.palette.primary['100']}`,
  borderBottom: 'none',
},
profile_user_detail_media : {
  borderRadius: '50%',
  width: '60%',
  margin: '0 auto',
  padding: theme.spacing.unit*2,
},
udc_content: {

}
});

class UserDetailCard extends React.Component {
  render(){
  const {classes, user} = this.props;

  return (
    <Card className={classes.profile_user_detail_card}>
        <CardMedia
          component="img"
          alt={user.email}
          className={classes.profile_user_detail_media}
          image={user.picture}
          title={user.email}/>
        <CardContent className='udc_content'>
          <Typography gutterBottom variant="subheading" component="h2">
            {user.email}
          </Typography>
          <Typography gutterBottom variant="caption" component="h2">
            {user.email}
          </Typography>
        </CardContent>
    </Card>
  );
  }
  
}

UserDetailCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDetailCard);