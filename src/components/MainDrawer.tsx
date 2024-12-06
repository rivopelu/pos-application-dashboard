import { Drawer } from '@mui/material';
import { ReactNode } from 'react';

export function MainDrawer(props : IProps){
  return (
    <Drawer open={props.open} onClose={props.onClose} anchor={"bottom"}>
      {props.component}
    </Drawer>
  )
}

interface IProps {
  open ?: boolean;
  onClose ?: () => void;
  component : ReactNode;
}