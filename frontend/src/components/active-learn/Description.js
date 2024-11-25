import {useEffect} from 'react';
import {getJsonFile} from '../common/FileFetcher';
import {useProgramContext} from './ProgramContext';

function BenchmarkDescription() {
  /* 선택한 벤치마크 설명. */
  const {benchmarkPath, benchmarkDesc, setBenchmarkDesc} = useProgramContext();

  useEffect(() => {
    /* 벤치마크 모음 폴더 경로. */
    let meta = 'meta.json';
    let meta_path = [benchmarkPath, meta].join('/');

    if (benchmarkPath !== null) {
      getJsonFile(meta_path).then((result) => {
        setBenchmarkDesc(result.description);
      }).catch(e => {
        setBenchmarkDesc(null);
      });
    } else {
      setBenchmarkDesc(null);
    }
  }, [benchmarkPath]);

  return benchmarkDesc;
}

export {BenchmarkDescription};