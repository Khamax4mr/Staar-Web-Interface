import {Button, Checkbox, IconButton, Select, TextField} from '@mui/material';
import styled from '@emotion/styled';

const MiniButton = styled(IconButton)({
  Width: '24px',
  Height: '24px',
});

const ShortTextBox = styled(TextField)(({disabled}) => ({
  height: 'fit-content',
  paddingTop: '6px',
  input: {
    padding: '4px',
    backgroundColor: (disabled) ? 'whitesmoke' : 'white',
    fontSize: '14px',
  },
}));

const LongTextBox = styled(ShortTextBox)({
  width: '100%',
});

const CheckBox = styled(Checkbox)({
  padding: '0px',
});

const SelectBox = styled(Select)({
  width: '128px',
  marginTop: '4px',
  div: {padding: '4px',},
  input: {fontSize: '14px',},
});

const ClickBox = styled(Button)({});

export {MiniButton, ShortTextBox, LongTextBox, CheckBox, SelectBox, ClickBox};