import {
  Button,
  CardActionArea,
  CircularProgress,
  FormHelperText,
  FormLabel,
  IconButton,
  Modal,
  Slider,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';
import { useCallback, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { MdClose, MdUploadFile } from 'react-icons/md';
import { UiServices } from '../service/ui.service.ts';
import ErrorService from '../service/error.service.ts';
import getCroppedImg from '../helper/cropperHelper.ts';

export function UploadBox(props: IProps) {
  const [aspectSet] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [fileCrop, setFileCrop] = useState<any | null>(null);
  const [cropper, setCropper] = useState<Area | null>(null);

  const uiService = new UiServices();
  const inputRef: any = useRef();
  const errorService = new ErrorService();
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);

  const uploadProcess = async (files: Blob) => {
    setLoadingUpload(true);
    try {
      if (files) {
        const formData: FormData = new FormData();
        const fileToUpload = files;

        formData.append('file', fileToUpload);
        await axios
          .post('https://backend.newshive.id/api/upload', formData, {
            headers: {
              Authorization: null,
            },
          })
          .then((res: AxiosResponse) => {
            setLoadingUpload(false);
            if (props.onChange) {
              props.onChange(res?.data?.response_data?.url);
            }
          })
          .catch((e) => {
            errorService.fetchApiError(e);
            setLoadingUpload(false);
          });
      } else {
        setLoadingUpload(false);
      }
    } catch (error) {
      setLoadingUpload(false);
      console.error('Error during image compression:', error);
    }
  };
  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCropper(croppedAreaPixels);
  }, []);

  const showCropper = useCallback(async () => {
    try {
      const resultCropper: any = await getCroppedImg(fileCrop, cropper, 0);
      const file: File = resultCropper.file;
      console.info('INI', file);
      uploadProcess(file).then();
      setFileCrop(null);
    } catch (e: any) {
      uiService.handleSnackbarSuccess('Failed initializing cropper', 'error');
    }
  }, [fileCrop, cropper]);

  return (
    <div>
      <div>
        <FormLabel className="" htmlFor={props.name}>
          <div className={`${props.errorMessage && 'text-red-500 '} pb-1 capitalize`}>
            {props.label} {props.required && <span className={'text-red-600'}> *</span>}
          </div>
        </FormLabel>
        <div
          className={`w-full relative ${props.size === 'sm' ? 'h-[200px]' : 'h-[230px] '} border border-slate-300 duration-300 rounded-lg flex flex-col justify-center items-center  hover:bg-primary-10 ${props.errorMessage ? 'bg-red-700/20 border-red-700' : 'bg-white'}`}
        >
          {props.values ? (
            <div>
              <div className="bg-red-700 absolute top-2 right-2 z-[300] text-white w-fit rounded-full">
                <IconButton onClick={() => props.onChange && props.onChange('')}>
                  <MdClose color="white" className="text-white" />
                </IconButton>
              </div>
              <img alt="" src={props.values} className={`${props.size === 'sm' ? 'h-[200px]' : 'h-[230px] '} p-2`} />
            </div>
          ) : (
            <CardActionArea onClick={() => inputRef.current?.click()} sx={{ width: '100%', height: '100%' }}>
              <div className={'w-full flex items-center justify-center text-4xl text-primary-dark'}>
                {loadingUpload ? <CircularProgress /> : <MdUploadFile fontSize={'inherit'} />}
              </div>
              <div className={'text-center text-primary-dark/50 pt-2'}>
                {t(loadingUpload ? 'loading' : 'upload-images').toUpperCase()}
              </div>
            </CardActionArea>
          )}
        </div>
        {props.errorMessage && <FormHelperText sx={{ color: 'red' }}>{props.errorMessage}</FormHelperText>}

        <input
          onChange={(e: any) => {
            if (e.target.files && e.target.files.length) {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.addEventListener('load', () => {
                setFileCrop(reader.result);
              });
            }
          }}
          hidden
          accept="image/*"
          type={'file'}
          ref={inputRef}
        />
      </div>
      <Modal
        open={!!fileCrop}
        onClose={() => setFileCrop(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-end justify-center h-full lg:py-32 py-4 z-[400]">
          <Cropper
            image={fileCrop}
            crop={crop}
            zoom={zoom}
            aspect={aspectSet}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <div className="w-full px-8 flex justify-center items-center lg:w-[400px] flex-col gap-5">
            <Slider
              defaultValue={zoom}
              aria-label="Default"
              valueLabelDisplay="auto"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e: any) => {
                setZoom(e.target.value);
              }}
            />
            <div className="lg:flex grid grid-cols-2 gap-3    w-full">
              <Button fullWidth variant="contained" color="error" onClick={() => setFileCrop(null)}>
                Cancel
              </Button>
              <Button fullWidth variant="contained" color="info" onClick={showCropper}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

interface IProps {
  label?: string;
  errorMessage?: any;
  required?: boolean;
  name?: string;
  values?: string;
  size?: 'lg' | 'sm';
  onChange?: (e: string) => void;
  onChaneOriginal?: (e: string) => void;
}
