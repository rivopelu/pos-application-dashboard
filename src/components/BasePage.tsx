import { ReactNode, useEffect } from 'react';
import { GeneralLoading } from './GeneralLoading';
import { useAppDispatch } from '../redux/store.ts';
import { useLocation } from 'react-router-dom';
import { AccountActions } from '../redux/actions/account.actions.ts';
import { ROUTES } from '../routes/route.ts';
import { PageTypeEnums } from '../enums/page-type-enums.ts';
import { TopBar } from './TopBar.tsx';
import { SideBar } from './SideBar.tsx';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';

function BasePage(props: IProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const accountActions = new AccountActions();

  useEffect(() => {
    if (location.pathname !== ROUTES.SIGN_IN()) {
      dispatch(accountActions.getMe()).then();
    }
  }, []);

  if (props.type === PageTypeEnums.FULL_PAGE) {
    return (
      <>
        <GeneralLoading />
        {props.children}
      </>
    );
  } else {
    return (
      <main className={'flex w-full relative'}>
        <GeneralLoading />
        <TopBar />
        <SideBar />
        <div className={'  w-full'}>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
          <div className={'grid gap-8'}>{props.children}</div>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        </div>
      </main>
    );
  }
}

export default BasePage;

interface IProps {
  children: ReactNode;
  type: PageTypeEnums;
}
