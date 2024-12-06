import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { MdArrowBack, MdArrowForward, MdLogout, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store.ts';
import { IResGetMe } from '../models/response/IResGetMe.ts';
import AuthServices from '../service/auth.service.ts';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import { PageContainer } from './PageContainer.tsx';
import { BrandLogo } from './BrandLogo.tsx';
import { useState } from 'react';

export function TopBar()
{
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.Account);
  const dataProfile: IResGetMe = account.getMe?.data;

  const [activeMenu, setActiveMenu] = useState<HTMLElement | null>(null);

  const authService = new AuthServices();

  function onClickBack()
  {
    navigate(-1);
  }
  function onClickForward()
  {
    navigate(1);
  }

  function handleClose()
  {
    setActiveMenu(null)
  }

  function menuList()
  {
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
          <ListItemIcon>
            <MdPerson />
          </ListItemIcon>
          <ListItemText className='capitalize'>{t("profile")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => authService.Logout()} >
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          <ListItemText className='capitalize'>{t("logout")}</ListItemText>
        </MenuItem>
      </Menu>
    )

  }
  return (
    <nav
      className={'  border-b bg-white w-screen fixed flex'}
      style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT, zIndex: 300 }}
    >
      <PageContainer className={'h-full w-full'}>
        <div className={'grid grid-cols-3 h-full '}>
          <div className={'h-full flex items-center -translate-x-5'}>
            <IconButton onClick={onClickBack}>
              <MdArrowBack />
            </IconButton>
            <IconButton onClick={onClickForward}>
              <MdArrowForward />
            </IconButton>
          </div>
          <div className={'flex items-center justify-center'}>
            <div className={'h-full flex items-center'}>
              <BrandLogo />
            </div>
          </div>
          <div className={'flex items-center justify-end gap-8'}>
            <Tooltip title={t('profile')}>
              <IconButton onClick={(e) => setActiveMenu(e.currentTarget)}>
                <Avatar src={dataProfile?.avatar} sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>
            {menuList()}
          </div>
        </div>
      </PageContainer>
    </nav>
  );
}
