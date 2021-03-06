import React from 'react';
import {IconButton, Snackbar } from '@material-ui/core';
import '../pages/SuburbPage.css'

import mInfo from '../assets/ic_info.png'

class InfoButton extends React.Component {
    state = {
        open: false,
        messageInfo: {},
    };

    queue = [];

    handleClick = message => () => {
        this.queue.push({
            message,
            key: new Date().getTime(),
        });

        if (this.state.open) {
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    };

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                open: true,
            });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleExited = () => {
        this.processQueue();
    };


    render() {
        return (
            <div className="InfoPopup">
              <IconButton onClick={this.handleClick(this.props.message)}><img src={mInfo} className="InfoDef" alt="info"/></IconButton>
              <Snackbar
                  style={{height: "10px"}}
                  key={this.state.messageInfo.key}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                  }}
                  open={this.state.open}
                  autoHideDuration={4000}
                  onClose={this.handleClose}
                  onExited={this.handleExited}
                  ContentProps={{
                      'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.messageInfo.message}</span>}
                  action={
                      <IconButton color="inherit" size="small" onClick={this.handleClose}></IconButton>
                  }
              />
            </div>
        );
    }
}

export default InfoButton;
