import {useEffect, useState} from 'react';
import {useProgramContext} from './ProgramContext';
import {FolderBrowser} from '../common/FileBrowser';
import {getFile} from '../common/FileFetcher';

function BenchmarkBrowser() {
  /* 선택한 벤치마크 경로, 설명, 실행 가능성. */
  const {benchmarkPath, setBenchmarkPath, setBenchmarkDesc, runnable, setRunnable} = useProgramContext();
  
  /* 선택한 벤치마크 정보. */
  const [benchmarkData, setBenchmarkData] = useState({});

  /* 벤치마크 모음 폴더 경로, 정보 파일 경로. */
  let benchmark_home_path = '/home/shared/AL_benchmark';
  let data_path = 'data.json';

  /* Json 파일 키. */
  let is_dir_key = 'isdir';
  let data_key = 'data';
  let description_key = 'description';
  let child_key = 'child';
  let isdir_key = 'isDirectory';

  /* 벤치마크 경로 변경 시 수행 동작. 하위 폴더 정보 불러오기. */
  useEffect(() => {
    /* 초기화. */
    setRunnable(false);
    if (benchmarkPath) {
      /* 현재 벤치마크 경로가 루트인 경우, 정보 초기화. */
      if (benchmarkPath.length == 1) setBenchmarkData({});
      /* 벤치마크를 선택한 경우, 정보 설정. */
      else if (benchmarkPath.length == 2) {
        let benchmark_name = benchmarkPath[1];
        let benchmark_data_path = [benchmark_home_path, benchmark_name, data_path].join('/');

        getFile(benchmark_data_path).then((result) => {
          if (is_dir_key in result && !result[isdir_key] && data_key in result) {
            let data = JSON.parse(result[data_key]);
            setBenchmarkData(data);
            setBenchmarkDesc(data[description_key]);
          } else setBenchmarkDesc(null);
        }).catch((e) => {
          setBenchmarkData({});
          setBenchmarkDesc(null);
        });
      }
      /* 이미 벤치마크를 선택한 경우, 실행 가능성 설정. */
      else if (Object.keys(benchmarkData).length) {
        let cursor = benchmarkData;
        for (let i = 2; i < benchmarkPath.length; i++) {
          if (Object.keys(cursor.child).includes(benchmarkPath[i])) {
            cursor = cursor.child[benchmarkPath[i]];
          }
        }
        setRunnable(!Object.keys(cursor).includes(child_key));
        if (cursor.hasOwnProperty(description_key)) {
          setBenchmarkDesc(cursor.description);
        }
      }
    }
  }, [benchmarkPath]);

  return(
    <FolderBrowser
      root={benchmark_home_path}
      setPath={setBenchmarkPath}
      blocked={runnable}/>
  );
}

export {BenchmarkBrowser};