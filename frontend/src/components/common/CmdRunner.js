import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let url = 'https://localhost:15535/ws';
let topic_cmd = '/cmd';
let dest_cmd_active_learn = '/cmd/active-learn';
let dest_cmd_result = '/cmd/result';

class CmdRunner {
  constructor(socket) {
    this.socket = socket;
    this.stomp = null;
    this.subscription = null;
  }

  /* STOMP 웹 소켓 통신 연결. */
  connect() {
    return new Promise((resolve, reject) => {
      this.stomp = new Client({
        webSocketFactory: () => this.socket,
        onConnect: () => {
          // console.log('서버 연결 성공');
          resolve();
        },
        onError: (frame) => {
          // console.error('서버 연결 실패', frame);
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
      // console.log('서버 연결 종료');
      this.stomp.deactivate();
    }
  }
  
  /* 서버로 경로 정보 전달. */
  getMessage(topic, dest, cmd, onMessage) {
    if (!this.stomp || !this.stomp.connected) {
      return this.connect().then(() => {
        this.subscribe(topic, dest, onMessage);
        this.stomp.publish({
          destination: dest,
          body: JSON.stringify({cmd: cmd}),
        });
        console.log(topic, dest, '전송');
      });
    } else {
      this.subscribe(topic, dest, onMessage);
      this.stomp.publish({
        destination: dest,
        body: JSON.stringify({cmd: cmd}),
      });
      console.log(topic, dest, '전송');
    }
  }

  subscribe(topic, dest, callback) {
    /* topic 구독. */
    this.subscription = this.stomp.subscribe(dest, (msg) => {
      console.log(topic, dest, '수신');
      console.log(msg);
      if (msg.body) {
        const results = JSON.parse(msg.body);
        callback(results);
      }
    });
  }

  unsubscribe() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

async function requestActiveLearn(cmd, onMessage) {
  const socket = new SockJS(url);
  const runner = new CmdRunner(socket);
  console.log('능동 학습 실행 요청');

  try {
    await runner.getMessage(topic_cmd, dest_cmd_active_learn, cmd, onMessage);
  } catch (err) {
    console.err('명령어 요청기 오류:', err);
    runner.disconnected();
  }
}

// async function receiveActiveLearn(onMessage) {
//   const socket = new SockJS(url);
//   const runner = new CmdRunner(socket);
//   console.log('능동 학습 결과 대기');

//   try {
//     await runner.getMessage(topic_cmd, dest_cmd_result, null, onMessage);
//   } catch (err) {
//     console.err('결과 반환기 오류:', err);
//     return null;
//   }
// }

export {requestActiveLearn};