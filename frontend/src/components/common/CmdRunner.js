import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let url = 'https://localhost:15535/ws';
let topic_cmd = '/cmd';
let dest_cmd_active_learn = '/cmd/active-learn';

class CmdRunner {
  constructor(socket) {
    this.socket = socket;
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
        /* 콘솔 출력 디버그용. */
        // debug: (msg) => console.log(msg),
      });
      this.stomp.activate();
    }); 
  }

  /* STOMP 웹 소켓 통신 종료. */
  disconnected() {
    if (this.stomp) {
      console.log('서버 연결 종료');
      this.stomp.deactivate();
    }
  }
  
  /* 서버로 명령어 정보 전달. */
  getMessage(topic, dest, cmd) {
    return new Promise(async (resolve, reject) => {
      if (!this.stomp || !this.stomp.connected) {
        try {
          await this.connect();
        } catch (err) {
          return reject(err);
        }
      }

      /* topic 구독. */
      const subscription = this.stomp.subscribe(topic, (msg) => {
        console.log(topic, dest, '수신');
        if (msg.body) {
          const results = JSON.parse(msg.body);
          resolve(results);
          subscription.unsubscribe();
        }
      });

      /* 엔드 포인트 /fs로 정보 전송. */
      this.stomp.publish({
        destination: dest,
        body: JSON.stringify({cmd: cmd}),
      });
      console.log(topic, dest, '전송');
    });
  }
}

async function requestActiveLearn(cmd) {
  const socket = new SockJS(url);
  const runner = new CmdRunner(socket);
  console.log('능동 학습 실행 요청');

  try {
    const result = await runner.getMessage(topic_cmd, dest_cmd_active_learn, cmd);
    return (result.log) ? result.log : [];
  } catch (err) {
    console.err('명령어 실행기 오류:', err);
    return [];
  } finally {
    runner.disconnected();
  }
}

export {requestActiveLearn};