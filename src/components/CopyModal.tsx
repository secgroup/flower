/*
 * This file is part of Flower.
 *
 * Copyright ©2018 Nicolò Mazzucato
 * Copyright ©2018 Antonio Groza
 * Copyright ©2018 Brunello Simone
 * Copyright ©2018 Alessio Marotta
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Flower is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Flower is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Flower.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: "absolute" as const,
    backgroundColor: theme.palette.background.paper,
    width: 900,
    height: 700,
    overflow: "auto" as const,
    whiteSpace: "pre-line" as const,
    wordWrap: "break-word" as const,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class CopyModal extends React.Component<{
  classes: any;
  isOpen: boolean;
  onClose: () => any;
  text_to_copy: string;
  onCopy: (a: string) => void;
}> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.isOpen}
          onClose={this.props.onClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Request to copy
            </Typography>
            <pre id="to_copy">{this.props.text_to_copy}</pre>

            <CopyToClipboard text={this.props.text_to_copy}>
              <button>Copy</button>
            </CopyToClipboard>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped: any = withStyles(styles)(CopyModal);

export default SimpleModalWrapped;
