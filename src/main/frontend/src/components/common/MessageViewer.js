import {useEffect, useState, useRef} from 'react';

function MessageViewer() {
  const socket = useRef(null);
  const [msg, setSendMsg] = useState([]);

  /* 컴포넌트 마운트 시 수행 동작. */
  useEffect(() => {
    let url = "ws://localhost:15535/ws";
    socket.current = new WebSocket(url);

    /* 서버 응답 반응 시 메세지 갱신. */
    socket.current.onmessage = (e) => {
      setSendMsg(e.data);
    };
    
    return () => socket.current.close();
  }, []);

  return (
    <div>
      {msg}
    </div>
  );
}

export default MessageViewer;