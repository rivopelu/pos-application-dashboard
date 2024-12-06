import { OrderStatusEnum } from '../enums/order-status-enum.ts';

export function OrderStatusEnumText(props: IProps)
{
  function checkColor()
  {
    switch (props.status)
    {
      case OrderStatusEnum.READY:
        return '#0369a1';
      case OrderStatusEnum.COMPLETED:
        return '#15803d';
      case OrderStatusEnum.CREATED:
        return '#0369a1';
      case OrderStatusEnum.PENDING:
        return '#a18103';
      case OrderStatusEnum.REQUEST_BILL:
        return '#a10387';
      case OrderStatusEnum.IN_PROGRESS:
        return '#007368';
      default:
        return '#313133';
    }
  }

  return (
    <div className="font-semibold" style={{ color: checkColor() }}>
      {props.status}
    </div>
  );
}

interface IProps
{
  status: OrderStatusEnum;
}
