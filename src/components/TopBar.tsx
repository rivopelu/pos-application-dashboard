import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import { MdLogout, MdPerson, MdSettings } from 'react-icons/md';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import { IResGetMe } from '../models/response/IResGetMe.ts';
import { IAccountSlice } from '../redux/reducers/account.slice.ts';
import { useAppSelector } from '../redux/store.ts';
import AuthServices from '../service/auth.service.ts';
import { BrandLogo } from './BrandLogo.tsx';
import { PageContainer } from './PageContainer.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/route.ts';

export function TopBar() {
  const account: IAccountSlice = useAppSelector((state) => state.Account);
  const dataProfile: IResGetMe | undefined = account.getMe?.data;

  const [activeMenu, setActiveMenu] = useState<HTMLElement | null>(null);

  const authService = new AuthServices();

  function handleClose() {
    setActiveMenu(null);
  }

  function menuList() {
    return (
      <Menu
        id="basic-menu"
        anchorEl={activeMenu}
        open={Boolean(activeMenu)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.SETTING()} className="flex items-center">
            <ListItemIcon>
              <MdPerson />
            </ListItemIcon>
            <ListItemText className="capitalize">{t('profile')}</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={ROUTES.SETTING()} className="flex items-center">
            <ListItemIcon>
              <MdSettings />
            </ListItemIcon>
            <ListItemText className="capitalize">{t('setting')}</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => authService.Logout()}>
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          <ListItemText className="capitalize">{t('logout')}</ListItemText>
        </MenuItem>
      </Menu>
    );
  }
  return (
    <nav
      className={'  border-b bg-white w-screen fixed flex'}
      style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT, zIndex: 300 }}
    >
      <PageContainer className={'h-full w-full'}>
        <div className={'grid grid-cols-3 h-full '}>
          <div className={'h-full flex items-center -translate-x-5'}>
            <BrandLogo />
          </div>
          <div className={'flex items-center justify-center'}></div>
          <div className={'flex items-center justify-end gap-8'}>
            <Button>
              <div className="flex gap-4 items-center " onClick={(e) => setActiveMenu(e.currentTarget)}>
                <div>{dataProfile?.name || ''}</div>
                <Avatar src={dataProfile?.avatar} sx={{ width: 30, height: 30 }} />
              </div>
            </Button>
            {menuList()}
          </div>
        </div>
      </PageContainer>
    </nav>
  );
}
