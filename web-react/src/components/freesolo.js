import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo(props) {
    console.log(props.list)
  return (
    <div style={{ width:290 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={props.list}
        renderInput={(params) => (
          <TextField {...params} label="Event" margin="normal" variant="outlined" />
        )}
      />
      </div>
      );
    }