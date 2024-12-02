import {useProgramContext} from './ProgramContext';

function BenchmarkDescriptionBox() {
  /* 선택한 벤치마크 설명 */
  const {benchmarkDesc} = useProgramContext();
  return benchmarkDesc;
}

export {BenchmarkDescriptionBox};