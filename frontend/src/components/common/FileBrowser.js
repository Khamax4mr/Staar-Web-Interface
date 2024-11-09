import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const url = 'http://localhost:15535/ws';

class FileBrowser {
  constructor(socket) {
    this.socket = socket;
    this.topic = null;
    this.stomp = null;
  }

  /* STOMP 웹 소켓 통신 연결. */
  connect() {
    return new Promise((resolve, reject) => {
      this.stomp = new Client({
        webSocketFactory: () => this.socket,
        onConnect: () => {
          console.log('서버 연결 성공');
          resolve();
        },
        onError: (frame) => {
          console.error('서버 연결 실패', frame);
          reject(new Error(frame.headers['message']));
        },
        debug: (msg) => console.log(msg),
      });
      this.stomp.activate();
    }); 
  }

  /* STOMP 웹 소켓 통신 종료. */
  disconnected() {
    if (this.stomp) {
      console.log('연결 종료');
      this.stomp.deactivate();
    }
  }
  
  /* 서버로 경로 정보 전달. */
  getMessage() {
    return new Promise(async (resolve, reject) => {
      if (!this.stomp || !this.stomp.connected) {
        try {
          await this.connect();
        } catch (err) {
          return reject(err);
        }
      }
    });
  }
}

async function getDirectFolders({path}) {
  const socket = new SockJS(url);
  const browser = new FileBrowser(socket);

  try {
    const results = await browser.getMessage();
    console.log(results);
  } catch (err) {
    console.err('파일 탐색기 오류:', err);
  } finally {
    browser.disconnected();
  }
}

export {getDirectFolders};