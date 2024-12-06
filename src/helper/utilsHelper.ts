import clipboardCopy from 'clipboard-copy';
import { t } from 'i18next';
import { ASSETS } from '../constants/assets.ts';

export function playOrderNumberSound(number: number) {
  const numberStr = number.toString();

  const audioFiles: string[] = [
    ASSETS.AUDIO.ORDER_NUMBER,
    ...numberStr.split('').map((digit) => {
      switch (digit) {
        case '0':
          return ASSETS.AUDIO.ZERO;
        case '1':
          return ASSETS.AUDIO.ONE;
        case '2':
          return ASSETS.AUDIO.TWO;
        case '3':
          return ASSETS.AUDIO.THREE;
        case '4':
          return ASSETS.AUDIO.FOUR;
        case '5':
          return ASSETS.AUDIO.FIVE;
        case '6':
          return ASSETS.AUDIO.SIX;
        case '7':
          return ASSETS.AUDIO.SEVEN;
        case '8':
          return ASSETS.AUDIO.EIGHT;
        case '9':
          return ASSETS.AUDIO.NINE;
        default:
          return '';
      }
    }),
    ASSETS.AUDIO.READY_TO_TAKE,
  ];

  const playSequentialAudio = async (files: string[]) => {
    for (const file of files) {
      if (!file) continue;
      const audio = new Audio(file);
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
          resolve();
        });
      });
    }
  };

  playSequentialAudio(audioFiles).catch((error) => {
    console.error('Error in audio sequence:', error);
  });
}

export async function CopyToClipboard(txt: string) {
  if (txt) {
    try {
      await clipboardCopy(txt).then(() => {
        alert(t('password-copying'));
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}

export function generateUrlOrderQr(value: string) {
  return `/public/order?code=${value}`;
}
