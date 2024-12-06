import { useState } from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { over } from 'stompjs';
import { ENV } from '../constants/env.ts';

export function useWs() {
  const token: string | null = localStorage.getItem('token');
  const urlWs = ENV.ENDPOINT + '/ws';
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Stomp.Client | undefined>();

  function connect() {
    console.info('RUNNING CONNECT');
    const sock = new SockJS(urlWs, { debug: false });
    const temp = over(sock);
    setStompClient(temp);
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    temp.connect(headers, onConnect, onErrorConnect);
  }

  function onErrorConnect() {
    setIsConnect(true);
    setError(true);
  }

  function onConnect() {
    setIsConnect(true);
  }

  return {
    error,
    connect,
    isConnect,
    stompClient,
  };
}
