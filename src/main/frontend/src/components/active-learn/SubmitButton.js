import {useEffect, useState, useRef} from 'react';
import {useProgramContext} from './ProgramContext';
import {ButtonContainer, Message} from '../../layouts/Frame';
import {ClickBox} from '../../layouts/Field';

/* 프로그램 설정, 옵션으로 능동 학습 실행 입력 파일 구성. */
function GenInputButton({setMsg}) {
  const socket = useRef(null);
  const {programDir, targetName, workDir, benchmark, noConst, teacher} = useProgramContext();

  /* 컴포넌트 마운트 시 수행 동작. */
  useEffect(() => {
    let url = "ws://localhost:15535/ws";
    socket.current = new WebSocket(url);

    /* 서버 응답 반응 시 메세지 갱신. */
    socket.current.onmessage = (e) => {
      console.log(e);
      setMsg(e.data);
    };

    /* 웹소켓 통신 불가 알림. */
    socket.current.onclose = () => {
      console.log('서버와 연결을 할 수 없습니다.');
    };

    return () => socket.current.close();
  }, []);

  /* 로그 출력, 웹소켓으로 프로그램, 옵션 설정 정보 전송. */
  const onClick = () => {
    const setting = {programDir, targetName, workDir, benchmark, noConst, teacher};
    if (socket.current.readyState) {
      socket.current.send(JSON.stringify(setting));
      console.log('프로그램 설정');
      console.log(setting);
    }
  }

  return(
    <ClickBox variant='outlined' onClick={onClick}>입력 파일 생성</ClickBox>
  );
}

/* 프로그램 설정, 옵션으로 능동 학습 수행. */
function RunButton() {
  /* 로그 출력. */
  /* Todo: ActiveLearnRunner 페이지 전환. */
  const onClick = () => {
    console.log('능동 학습 수행');
  }

  return(
    <ClickBox variant='outlined' onClick={onClick}>능동 학습 수행</ClickBox>
  );
}

function BuildButtons() {
  const [msg, setMsg] = useState('');
  
  return(
    <div>
      <ButtonContainer>
        <GenInputButton setMsg={setMsg}/>
        <RunButton/>
      </ButtonContainer>
      {msg}
    </div>
  );
}
export {BuildButtons};