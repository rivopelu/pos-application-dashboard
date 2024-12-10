export interface IResGetMe {
  name: string;
  username: string;
  avatar: string;
  client_id: string;
  client_name: string;
  client_logo: string;
  client_address?: string;
  is_active_subscription: boolean;
  subscription_expired_date: number;
  address: string;
}
