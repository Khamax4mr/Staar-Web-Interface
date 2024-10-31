import {useEffect, useState, useRef} from 'react';

function App() {
  const socket = useRef(null);
  const [inp, setInput] = useState('');
  const [msg, setSendMsg] = useState([]);

  /* 컴포넌트 마운트 시 수행 동작. */
  useEffect(() => {
    let url = "ws://localhost:15535/ws";
    socket.current = new WebSocket(url);

    /* 서버 응답 반응 시 메세지 갱신. */
    socket.current.onmessage = (e) => {
      setSendMsg((prev) => [...prev, e.data]);
    };

    /* 웹소켓 통신 불가 알림. */
    socket.current.onclose = () => {
      let errMsg = '서버와 연결되지 않습니다.'
      setSendMsg((prev) => [...prev, errMsg])
    };

    return () => socket.current.close();
  }, []);

  /* 웹소켓으로 메세지 전송. */
  const sendMessage = () => {
    if (socket.current.readyState && inp) {
      socket.current.send(inp);
    }
    setInput('');
  };

  return (
    <div>
      <h2>웹소켓 통신</h2>
      <input 
        type='text'
        value={inp}
        onChange={(e) => setInput(e.target.value)}/>
      <button onClick={sendMessage}>전송</button>
      
      <ul>{msg.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}</ul>
    </div>
  );
}

export default App;