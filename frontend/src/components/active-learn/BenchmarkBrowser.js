import {useEffect} from 'react';
import {useProgramContext} from './ProgramContext';
import {FolderBrowser} from '../common/FileBrowser';

function BenchmarkBrowser() {
  /* 선택한 경로, 벤치마크 ID. */
  const {setBenchmarkPath} = useProgramContext();

  /* 벤치마크 모음 폴더 경로. */
  let benchmark_source_path = '/home/shared/AL_benchmark';

  return(
    <FolderBrowser title='벤치마크 설정'
      root={benchmark_source_path}
      setTarget={setBenchmarkPath}/>
  );
}

export {BenchmarkBrowser};