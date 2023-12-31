import React from 'react'
import { TextField, Grid } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

const CustomTextField = ({ name, label }) => {
    const { control } = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField
                        defaultValue=''
                        fullWidth
                        label={label}
                        required
                    />
                )}
            />
        </Grid>
    )
}

export default CustomTextField
