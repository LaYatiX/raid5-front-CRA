import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function SimpleSnackbar(props) {
    const {snackOpen, close, info} = props;
    const closeSnack = () => {
        close();
    };
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackOpen}
                autoHideDuration={3000}
                onClose={closeSnack}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{info}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={closeSnack}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}

export default SimpleSnackbar;