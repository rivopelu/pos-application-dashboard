import { useState } from 'react'
import { FormLabel, InputAdornment, OutlinedInputProps, TextField } from '@mui/material'
import { HTMLInputTypeAttribute, ReactNode } from 'react'
import {STYLE_VARIABLE} from "../constants/style-variable.ts";

function formatRupiah(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function InputRupiah(props: IProps) {
  const [displayValue, setDisplayValue] = useState<string>(formatRupiah(Number(props.value) || 0))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    const formattedValue = formatRupiah(Number(numericValue))

    setDisplayValue(formattedValue)

    if (props.onChange) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props?.onChange &&
        props.onChange({
          ...event,
          target: { ...event.target, value: numericValue || '' }
        })
    }
  }

  return (
    <div>
      {props.label && (
        <FormLabel htmlFor={props.name}>
          <div className={`${props.errorMessage && 'text-red-500'} pb-1 `}>
            {props.label} {props.required && <span className="text-red-600"> *</span>}
          </div>
        </FormLabel>
      )}
      <TextField
        onClick={props.onClick}
        onKeyDown={(event) => event.key === 'Enter' && props.onEnter && props.onEnter()}
        size="small"
        type="text"
        name={props.name}
        id={props.name}
        autoComplete={props.autocomplete}
        required={props.required}
        value={props.value ? (displayValue !== '0' ? displayValue : '') : ''}
        onBlur={props.onBlur}
        onChange={handleChange}
        placeholder={props.placeholder}
        helperText={props.errorMessage}
        error={!!props.errorMessage}
        InputProps={{
          className: props.className || '',
          startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
          endAdornment: props.endIcon && (
            <InputAdornment position="start">{props.endIcon}</InputAdornment>
          )
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-root': {
            background: props.errorMessage
              ? STYLE_VARIABLE.COLORS.SYSTEM.LIGHT_RED
              : STYLE_VARIABLE.COLORS.SYSTEM.WHITE
          }
        }}
      />
    </div>
  )
}

interface IProps {
  className?: string
  label?: string
  placeholder?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  type?: HTMLInputTypeAttribute
  name?: string
  onChange?: OutlinedInputProps['onChange']
  onBlur?: OutlinedInputProps['onBlur']
  value?: any
  required?: boolean
  errorMessage?: any
  onEnter?: () => void
  autocomplete?: string
  onClick?: () => void
}
