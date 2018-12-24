import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
        const { classes, textChange, eventname, eventlocation, eventimage, artist } = this.props;
        return (
                <ValidatorForm className={classes.container}>
                    <TextValidator
                        placeholder="Event Name"
                        onChange={textChange}
                        name="eventname"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={eventname}
                    />
                    <TextValidator
                        placeholder="Event Location"
                        onChange={textChange}
                        name="eventlocation"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={eventlocation}
                    />
                    <TextValidator
                        placeholder="Artist"
                        onChange={textChange}
                        name="artist"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={artist}
                    />
                </ValidatorForm>
        );
    }
}

Inputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);