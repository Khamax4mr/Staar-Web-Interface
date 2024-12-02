import {useEffect, useState} from 'react';
import {useProgramContext} from './ProgramContext';
import {requestActiveLearn} from '../common/CmdRunner';

function LearnLauncher() {
  /* 선택한 벤치마크 경로. */
  const {benchmarkPath} = useProgramContext();
  const path = benchmarkPath.join('/');
  const cmd = path;
  let res = null;

  /* 컴포넌트 마운트 시 수행 동작. 프로세스 요청. */
  useEffect(() => {
    requestActiveLearn(cmd).then((result) => {
      res = result;
    }).catch((e) => {});
  }, []);

  return(res);
}

export {LearnLauncher};