import { LoadingButton } from '@mui/lab';
import { Avatar, Button, CardActionArea, IconButton, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdLockReset } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { AccountActions } from '../../redux/actions/account.actions.ts';
import DateHelper from '../../helper/dateHelper.ts';
import { IAccountSlice } from '../../redux/reducers/account.slice.ts';
import { IResListAccont } from '../../models/response/IResListAccount.ts';
import { defaultPaginationType } from '../../helper/paginationHelper.ts';
import { ROUTES } from '../../routes/route.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, defaultPaginatedResponse } from '../../models/response/ResponseModel.ts';
import { IResCreateAccount } from '../../models/response/IResCreateAccount.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { CopyToClipboard } from '../../helper/utilsHelper.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { PopupModal } from '../../components/PopupModal.tsx';
import MainPagination from '../../components/MainPagination.tsx';

type typeModalPopup = 'RESET_PASSWORD' | 'DEACTIVE_USER';

export function AccountPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const httpService = new HttpService();
  const errorService = new ErrorService();

  const accountActions = new AccountActions();
  const dateHelper = new DateHelper();

  const account: IAccountSlice = useAppSelector((state) => state.Account);

  const [selectedData, setSelectedData] = useState<IResListAccont | undefined>(undefined);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [showModal, setShowModal] = useState<typeModalPopup | undefined>();

  function fetchData(param?: string) {
    dispatch(accountActions.getListAccount(param));
  }

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.ACCOUNT(e));
  }

  function onSubmitResetPassword() {
    if (selectedData?.id) {
      setLoadingSubmit(true);
      httpService
        .PATCH(ENDPOINT.RESET_PASSWORD(selectedData.id))
        .then((res: BaseResponse<IResCreateAccount>) => {
          setNewPassword(res.data.response_data.password);
          setLoadingSubmit(false);
        })
        .catch((e) => {
          setLoadingSubmit(false);

          errorService.fetchApiError(e);
        });
    }
  }

  useEffect(() => {
    fetchData(location?.search);
  }, [location?.search]);

  function onCloseModal() {
    setNewPassword(undefined);
    setSelectedData(undefined);
    setShowModal(undefined);
  }

  const tableColumn: ITableColumnData[] = [
    {
      key: 'name',
      headerTitle: t('name'),
      layouts: (e: IResListAccont) => (
        <div className="flex items-center gap-4">
          <Avatar src={e.avatar} />
          <div>{e.name || '-'}</div>
        </div>
      ),
    },
    {
      key: 'username',
      headerTitle: t('username'),
      value: 'username',
    },
    {
      key: 'created-date',
      headerTitle: t('created-date'),
      layouts: (e: IResListAccont) => {
        return <div>{dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm')}</div>;
      },
    },
    {
      key: 'role',
      headerTitle: t('user-role'),
      layouts: (e: IResListAccont) => {
        return <div className={`font-bold ${e.role === 'ADMIN' ? 'text-green-700' : 'text-blue-700'}`}>{e.role}</div>;
      },
    },
    {
      key: 'action',
      headerTitle: t('action'),
      layouts: (e: IResListAccont) => {
        return (
          <div>
            <Tooltip className="capitalize" title={t('reset-password')}>
              <IconButton onClick={() => onClickActionButton('RESET_PASSWORD', e)}>
                <div className="bg-primary-main/30 text-primary-main border border-primary-main p-1 rounded-full ">
                  <MdLockReset />
                </div>
              </IconButton>
            </Tooltip>
            <Tooltip className="capitalize" title={t('deactive-account')}>
              <IconButton onClick={() => onClickActionButton('DEACTIVE_USER', e)}>
                <div className="bg-red-700/30 text-red-700 border border-red-700 p-1 rounded-full ">
                  <MdClose />
                </div>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  function onClickActionButton(type: typeModalPopup, data: IResListAccont) {
    setShowModal(type);
    setSelectedData(data);
  }

  function componentSuccessResetpassword() {
    return (
      <div className={'flex flex-col gap-4 items-center justify-center text-center'}>
        <div>
          <h1 className={'font-semibold text-2xl capitalize'}>{t('reset-password-account-successfully')}</h1>
          <p>{t('account-success-created-description')}</p>
        </div>
        <div className={'w-full'}>
          <Tooltip title={t('copy-password')}>
            <CardActionArea onClick={() => CopyToClipboard(newPassword || '')}>
              <MainCard>
                <CardBody>
                  <div className={'font-semibold'}>{newPassword}</div>
                </CardBody>
              </MainCard>
            </CardActionArea>
          </Tooltip>
        </div>
        <Button fullWidth variant={'contained'} onClick={onCloseModal}>
          {t('oke')}
        </Button>
      </div>
    );
  }

  function compoenentConfirmationResetPassword() {
    return (
      <div className="flex flex-col gap-4">
        <div className="items-center justify-center text-center">
          <h1 className="capitalize font-semibold text-2xl">{t('reset-password')}</h1>
          <p className="italic text-slate-600">{t('reset-password-description', { name: selectedData?.name || '' })}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outlined" color={'error'} onClick={() => setSelectedData(undefined)}>
            {t('cancel')}
          </Button>
          <LoadingButton loading={loadingSubmit} onClick={onSubmitResetPassword} variant="outlined">
            {t('submit')}
          </LoadingButton>
        </div>
      </div>
    );
  }

  function confirmationDeactiveUser() {
    return (
      <div className="flex flex-col gap-4">
        <div className="items-center justify-center text-center">
          <h1 className="capitalize font-semibold text-2xl">{t('deactive-user')}</h1>
          <p className="italic text-slate-600">{t('deactive-user-description', { name: selectedData?.name || '' })}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outlined" color={'error'} onClick={() => setSelectedData(undefined)}>
            {t('cancel')}
          </Button>
          <LoadingButton loading={loadingSubmit} onClick={onSubmitResetPassword} variant="outlined">
            {t('submit')}
          </LoadingButton>
        </div>
      </div>
    );
  }

  function bodyModalResetPassword() {
    if (showModal === 'RESET_PASSWORD') {
      if (newPassword) {
        return componentSuccessResetpassword();
      } else {
        return compoenentConfirmationResetPassword();
      }
    } else if (showModal === 'DEACTIVE_USER') {
      return confirmationDeactiveUser();
    } else {
      return <></>;
    }
  }

  return (
    <PageContainer className="mt-8">
      <PopupModal onClose={onCloseModal} component={bodyModalResetPassword()} open={!!showModal} />
      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <h1>ACCOUNT PAGE</h1>
          <Link to={ROUTES.NEW_ACCOUNT()}>
            <Button variant="contained" startIcon={<MdAdd />}>
              {t('new-account')}
            </Button>
          </Link>
        </div>
        <MainTable
          loading={account?.listAccount?.loading}
          data={account?.listAccount?.data || []}
          columns={tableColumn}
        />
        <MainPagination
          data={account?.listAccount?.paginated_data || defaultPaginatedResponse}
          onChange={onChangePagination}
        />
      </div>
    </PageContainer>
  );
}
