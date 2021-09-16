import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 'form',
      newPaletteName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({
      newPaletteName: evt.target.value,
    });
  }

  handleSubmit() {
    this.setState({ stage: 'emoji' });
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };

    this.props.addNewPalette(newPalette);
    this.setState({ stage: '' });
  }

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;

    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === 'form'}
          aria-labelledby="form-dialog-title"
          onClose={hideForm}
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <DialogContent>
              <DialogContentText>
                Please enter a nam for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used!']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
