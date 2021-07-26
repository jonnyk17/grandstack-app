import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
export default function SimpleSelect(props) {
  const classes = useStyles()
  const [choice, setChoice] = React.useState('')

  const handleChange = (event) => {
    setChoice(event.target.value)
    if (props.handleChange) props.handleChange(event)
  }

  return (
    <FormGroup row className={classes.formGroup}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          onChange={handleChange}
        >
          {props.list.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  )
}
