import {useEffect, useState} from 'react';
import {useProgramContext} from './ProgramContext';
import {requestActiveLearn} from '../common/CmdRunner';

function LearnLauncher() {
  /* 선택한 벤치마크 경로. */
  const {benchmarkPath} = useProgramContext();
  const path = benchmarkPath.join('/');
  const [output, setOutput] = useState([]);
  let res = null;

  /* 컴포넌트 마운트 시 수행 동작. 프로세스 요청. */
  useEffect(() => {
    try {
    // requestActiveLearn(cmd, null);
      requestActiveLearn(path, (data) => {
        setOutput((prev) => [...prev, data]);});
    } catch(err) {}
    // receiveActiveLearn((data) => {
    //   setOutput((prev) => [...prev, data.output]);
    // });
  }, []);

  useEffect(() => {
    console.log(output);
  }, [output]);

  return output;
}

export {LearnLauncher};