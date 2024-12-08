import {useProgramContext} from './ProgramContext';
import {FolderBrowser} from '../common/FileBrowser';

function BenchmarkBrowser() {
  /* 선택한 벤치마크 경로, 설명, 실행 가능성. */
  const {setBenchmarkPath} = useProgramContext();

  /* 벤치마크 모음 폴더 경로, 메타 파일 경로. */
  let benchmark_source_path = '/home/shared/AL_benchmark';

  return(
    <FolderBrowser
      root={benchmark_source_path}
      setPath={setBenchmarkPath}/>
  );
}

export {BenchmarkBrowser};