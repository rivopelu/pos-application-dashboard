import { IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { STYLE_VARIABLE } from "../constants/style-variable.ts";
import { useDataConstants } from "../constants/useDataConstants.ts";

export function SideBar()
{
  const data = useDataConstants()
  const location = useLocation()
  const [currentPathSplit, setCurrentPathSplit] = useState<string>('/')

  function checkActiveNav(item: string)
  {
    const data = item.split('/')[1]
    return data.split('?')[0] === currentPathSplit
  }

  useEffect(() =>
  {
    const data = location.pathname.split('/')[1]
    const split = data.split('?')[0]
    setCurrentPathSplit(split)
  }, [location.pathname])
  return (
    <div style={{ width: STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH + 76 }} className={'h-screen '}>
      <div
        className={'bg-white h-screen w-full border-r fixed left-0'}
        style={{ width: STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH }}
      >
        <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        <MenuList>

          {data.sidebarDataList.map((item, i) =>
          {
            const Icon = item.icon
            return (
              <Link to={item.path} key={i} className='w-full'>

                <MenuItem>
                  <ListItemIcon>
                    <IconButton color={checkActiveNav(item.path) ? 'primary' : undefined}>
                      <Icon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText className={`uppercase font-semibold ${checkActiveNav(item.path) ? 'text-primary-main' : ""}`} >
                    {item.title}
                  </ListItemText>
                </MenuItem>
              </Link>

            )
          })}
        </MenuList>
      </div>
    </div>
  )
}
