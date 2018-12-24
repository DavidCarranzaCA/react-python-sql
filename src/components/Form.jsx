import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
});

class Inputs extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { textChange, classes } = this.props;
        return (
            <div className={classes.container}>
                <Input
                    placeholder="Event Name"
                    onChange={textChange}
                    name="eventname"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Input
                    placeholder="Event Location"
                    onChange={textChange}
                    name="eventlocation"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Input
                    placeholder="Event Image (supply link)"
                    onChange={textChange}
                    name="eventimage"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Input
                    placeholder="Artist"
                    onChange={textChange}
                    name="artist"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
            </div>
        );
    }
}

Inputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);