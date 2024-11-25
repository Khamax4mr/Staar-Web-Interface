import {useEffect} from 'react';
import {useProgramContext} from './ProgramContext';
import {FolderBrowser} from '../common/FileBrowser';

function BenchmarkBrowser() {
  /* 선택한 경로, 벤치마크 ID. */
  const {benchmarkId, setBenchmarkId, setBenchmarkPath} = useProgramContext();

  /* 벤치마크 모음 폴더 경로. */
  let benchmark_source_path = '/home/shared/AL_benchmark';

  return(
    <FolderBrowser title='벤치마크 선택'
      root={benchmark_source_path}
      id={benchmarkId}
      setId={setBenchmarkId}
      setTarget={setBenchmarkPath}/>
  );
}

export {BenchmarkBrowser};