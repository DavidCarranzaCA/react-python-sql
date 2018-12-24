import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});

class Inputs extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { textChange } = this.props;
        return (

            <Grid container spacing={16} justify='center'>
                <Grid item xs={4}>
                    <Input
                        placeholder="Event Name"
                        onChange={textChange}
                        name="eventname"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Input
                        placeholder="Event Location"
                        onChange={textChange}
                        name="eventlocation"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Input
                        placeholder="Artist"
                        onChange={textChange}
                        name="artist"
                    />
                </Grid>
            </Grid >
        );
    }
}

Inputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);