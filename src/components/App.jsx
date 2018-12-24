import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'

// components
import Inputs from './Form';

const styles = {
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
};

class MediaCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventname: '',
      eventlocation: '',
      artist: '',
      eventData: []
    }

    // binding this to functions
    this.handleTextInput = this.handleTextInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.getEvents()
  }

  // AJAX CALLS
  getEvents() {
    fetch('/getevents')
      .then(res => res.json())
      .then(event => {
        const uniqueValues = Array.from(new Set(event));
        console.log(uniqueValues);
        this.setState({
          eventData: [...uniqueValues]
        })
      });

  }

  postEvents() {
    const postEvent = {
      eventname: this.state.eventname,
      eventlocation: this.state.eventlocation,
      artist: this.state.artist
    }
    fetch('/newevent', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(postEvent)
    })
      .then(res => {
        if (res) {
          return this.getEvents()
        }
      })
      .catch(err => err)
  }

  // onChange and onClick functions
  handleTextInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit() {
    this.postEvents()
  }

  onDelete(id) {
    fetch('/delete', {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(id)
    })
    .then(res => {
      return this.getEvents()
    })
    .catch(err => console.log(err))
  }

  render() {
    // destructuring 
    const { classes } = this.props;
    const { eventData } = this.state;
    const eventCards = eventData.length > 0 ? eventData.map(newCard => {
      return (
        <Card key={newCard[0]}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={newCard[3]}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {newCard[1]} - {newCard[2]}
              </Typography>
              <Typography component="p">
                {newCard[5]}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" justify="flex-end" onClick={() => this.onDelete(newCard[0])}>Delete</Button>
          </CardActions>
        </Card>
      )
    }) : <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://picsum.photos/400"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Add Event Name - Add Location
          </Typography>
            <Typography component="p">
              Add Artist
        </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify='center'>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Create a new event!
              </Typography>
                <Inputs
                  textChange={this.handleTextInput}
                  validText={this.state}
                />
              </CardContent>
              <CardActions>
                <Button size="small" justify="flex-end" onClick={() => this.onSubmit()}>Submit</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={16}>
          <Grid item xs={12}>
            {eventCards}
          </Grid>
        </Grid>
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);