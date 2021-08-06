import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo({ list, ...props }) {

  return (
    <div style={{ width: 290 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={list}
        {...props}
        renderInput={(params) => (
          <TextField {...params} label="Event" margin="normal" variant="outlined" />
        )}
      />
    </div>
  );
}