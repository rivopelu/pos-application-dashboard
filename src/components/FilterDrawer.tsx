import { Drawer } from '@mui/material'
import { ReactNode } from 'react'
import {STYLE_VARIABLE} from "../constants/style-variable.ts";

export function FilterDrawer(props: IProps) {
  return (
    <Drawer
      PaperProps={{ sx: { background: 'none', boxShadow: 'none', paddingRight: 4 } }}
      anchor="right"
      open={props.open}
      onClose={props.onClose}
    >
      <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT * 3 }}></div>
      <div className="h-full">{props.component}</div>
    </Drawer>
  )
}

interface IProps {
  open?: boolean
  onClose?: () => void
  component?: ReactNode
}
