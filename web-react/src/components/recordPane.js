import React from 'react'
//import {makeStyles} from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useState } from 'react';
// const useStyles = makeStyles(() => ({
//     min:{
//         "& .MuiTextField-root": {

//             width: '50%'        }
//     }
// }))

 export default function Recordpane({formState, setFormState, ...props}){
    const [minState, setMinState]= useState('')
    const [secState, setSecState]= useState('')
    const [hourState, setHourState]= useState('')
    const handleChange = (e)=>{
        setSecState(e.target.value)
         setFormState({
                  ...formState,
                  record: (minState+":"+e.target.value)
                })
    
    }
    const handleHourChange = (e)=>{
        setSecState(e.target.value)
         setFormState({
                  ...formState,
                  record: (hourState+":"+minState+":"+e.target.value)
                })
    
    }
    //const [hourState, setHourState]= useState('')
    console.log(formState)
    //const classes = useStyles()
    if(!props.type){
        return null
    }
    else if(props.type.type==="solid"){
        return (
            <div className="form-group">
              <label htmlFor="record">Record</label>
              <input type="text" name="record" 
              placeholder="record"
              value={formState.record}
              onChange={(e)=>
                setFormState({
                  ...formState,
                  record: e.target.value
                })}
               />
            </div>
        )
    }
    else if(props.type.type==="sec"){
        return (
            <div className="form-group">
     
              <input type="text" name="sec" 
             placeholder="Seconds"
              value={formState.record}
              onChange={(e)=>
                setFormState({
                  ...formState,
                  record: e.target.value
                })}
               />
            </div>
        )
    }
    else if(props.type.type==="min"){
        return (
            <div className="form-group">
                <Grid container spacing={1} direction='row' justifyContent='space-between'>
                <Grid item xs>
                <input style={{width: '100%'}} type="text" name="min" 
                placeholder="Minutes"
                value={minState}
                onChange={(e)=>setMinState(e.target.value)}
               />
              </Grid>
              <Grid item xs>
              
                <input style={{width: '100%'}} type="text" name="min" 
                placeholder="Seconds"
                value={secState}
                onChange={handleChange}
               />
              </Grid>
            </Grid>
            </div>
        )
    }
    else if(props.type.type==="hour"){
        return (
            <div className="form-group">
                <Grid container spacing={1} direction='row' justifyContent='space-between'>
                <Grid item xs>
                  
                  <input style={{width: '100%'}} type="text" name="hour" 
                  placeholder="Hours"
                  value={hourState}
                  onChange={(e)=>setHourState(e.target.value)}
                  />
                </Grid>  
                <Grid item xs>
                <input style={{width: '100%'}} type="text" name="min" 
                placeholder="Minutes"
                value={minState}
                onChange={(e)=>setMinState(e.target.value)}
                />
              </Grid>
              <Grid item xs>
                  
                <input style={{width: '100%'}} type="text" name="min" 
                placeholder="Seconds"
                value={secState}
                onChange={handleHourChange}
                />
              </Grid>
            </Grid>
            </div>
        )
    }
    else{
        return null
    }
}