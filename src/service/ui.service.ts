import { toast } from 'react-toastify'
import swall from 'sweetalert'

export class UiServices {
  public handleSnackbarSuccess(message: string, variant?: 'success' | 'error' | 'info') {
    if (variant === 'error') {
      toast.error(message)
    } else if (variant === 'info') {
      toast.info(message)
    } else {
      toast.success(message)
    }
  }

  public swall(param: ISwallConfig) {
    swall({
      title: param?.title ?? '',
      text: param?.message ?? '',
      icon: param?.icon ?? 'success'
    }).then(param.onOke)
  }
}

interface ISwallConfig {
  title?: string
  message?: string
  icon?: 'success' | 'error' | string
  onOke?: () => void
}
