import {useEffect, useState} from 'react';
import {useProgramContext} from './ProgramContext';
import {FolderBrowser} from '../common/FileBrowser';
import {getJsonFile} from '../common/FileFetcher';

function BenchmarkBrowser() {
  /* 선택한 벤치마크 경로, 설명. */
  const {benchmarkPath, setBenchmarkPath, setBenchmarkDesc} = useProgramContext();
  
  /* 선택한 벤치마크 정보, 접근 차단 여부. */
  const [benchmarkMeta, setBenchmarkMeta] = useState({});
  const [blocked, setBlocked] = useState(false);

  /* 벤치마크 모음 폴더 경로, 메타 파일 경로. */
  let benchmark_source_path = '/home/shared/AL_benchmark';
  let meta = 'meta.json';

  /* 컴포넌트 마운트 및 벤치마크 경로 변경 시 수행 동작. 하위 폴더 정보 불러오기. */
  useEffect(() => {
    setBlocked(false);
    if (benchmarkPath) {
      /* 현재 벤치마크 폴더가 루트인 경우, 메타, 접근 차단 초기화. */
      if (benchmarkPath.length == 1) setBenchmarkMeta({});
      /* 벤치마크를 선택한 경우, 메타 설정. */
      else if (benchmarkPath.length == 2) {
        let benchmarkName = benchmarkPath[1];
        let meta_path = [benchmark_source_path, benchmarkName, meta].join('/');
        getJsonFile(meta_path).then((result) => {
          setBenchmarkMeta(result);
          setBenchmarkDesc(result.description);
        }).catch((e) => {
          setBenchmarkMeta({});
          setBenchmarkDesc(null);
        });
      }
      /* 이미 벤치마크를 선택한 경우, 접근 차단 설정. */
      else if (Object.keys(benchmarkMeta).length) {
        let cursor = benchmarkMeta;
        for (let i = 2; i < benchmarkPath.length; i++) {
          if (Object.keys(cursor.child).includes(benchmarkPath[i])) {
            cursor = cursor.child[benchmarkPath[i]];
          }
        }
        setBlocked(!Object.keys(cursor).includes('child'));
        if (cursor.hasOwnProperty('description')) {
          setBenchmarkDesc(cursor.description);
        }
      }
    }
  }, [benchmarkPath]);

  return(
    <FolderBrowser
      root={benchmark_source_path}
      setPath={setBenchmarkPath}
      blocked={blocked}/>
  );
}

export {BenchmarkBrowser};