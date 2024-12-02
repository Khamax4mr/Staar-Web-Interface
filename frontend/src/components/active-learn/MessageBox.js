import {useProgramContext} from './ProgramContext';

let null_message = '[null]';

function BenchmarkDescriptionBox() {
  /* 선택한 벤치마크 설명 */
  const {benchmarkDesc} = useProgramContext();
  return benchmarkDesc;
}

function TargetInfoBox() {
  /* 선택한 벤치마크 경로. */
  const {benchmarkPath} = useProgramContext();

  let target_title = '대상 프로그램';
  let path = null_message;
  if (benchmarkPath.length > 0) path = benchmarkPath.join('/');
  return (<LineBox title={target_title} data={path}/>);
}

function LogBox() {
  let log_test_message = "";
  return log_test_message;
}

function SummaryBox() {
  let wd_title = "작업 폴더";
  let time_title = "소요 시간: ";
  let iter_title = "Iteration: ";
  let result_title = "수행 결과: ";

  return (
  <div>
    <div><LineBox title={wd_title}/></div>
    <div><LineBox title={time_title}/></div>
    <div><LineBox title={iter_title}/></div>
    <div><LineBox title={result_title}/></div>
  </div>);
}

function LineBox({title, data}) {
  return (title + ': ' + data);
}

export {BenchmarkDescriptionBox, TargetInfoBox, LogBox, SummaryBox};