import {List, ListItemButton, ListSubheader} from "@mui/material";
import {useProgramContext} from './ProgramContext';

/* TODO: Ubuntu 서버에서 벤치마크 폴더 읽어서 가져오기. */
const benchmarks = [
  {id: 1, name: 'AutomaticTransmissionUsingDurationOperatorExample'},
  {id: 2, name: 'BangBangControlUsingTemporalLogicExample'},
  {id: 3, name: 'CountEventsExample'}];

/* TODO: Ubuntu 서버에서 벤치마크 폴더 읽어서 가져오기. */
const variables1 = [
  {id: 1, name: 'ChartAbsoluteTimeCounter'},
  {id: 2, name: 'CondWasTrueAtLastTimeStep_3'},
  {id: 3, name: 'CondWasTrueAtLastTimeStep_4'},
  {id: 4, name: 'DurationLastReferenceTick_3'},
  {id: 5, name: 'DurationLastReferenceTick_4'},
  {id: 6, name: 'Gear'}];

/* TODO: Ubuntu 서버에서 벤치마크 폴더 읽어서 가져오기. */
const variables2 = [
  {id: 1, name: 'Boiler'},
  {id: 2, name: 'Color'},
  {id: 3, name: 'InHeater'},
  {id: 4, name: 'InOn'},
  {id: 5, name: 'LED'},
  {id: 6, name: 'TemporalCounter_i1'},
  {id: 7, name: 'TemporalCounter_i2'},
  {id: 8, name: 'WasOn'}];

/* TODO: Ubuntu 서버에서 벤치마크 폴더 읽어서 가져오기. */
const variables3 = [
  {id: 1, name: 'Is_c1_model'},
  {id: 2, name: 'TemporalCounter_i1'},
  {id: 3, name: 'Y'}];

const empty = [{}];

function BenchmarkList({name}) {
  /* 선택한 벤치마크 ID, 초기화할 변수 ID. */
  const {benchmarkId, setBenchmarkId, setVariableId} = useProgramContext();
  
  /* 클릭한 벤치마크로 ID 변경. */
  const onClick = (e, id) => {
    setBenchmarkId(id);
    setVariableId(0);
  };

  /* 연속 리스트 버튼 생성. */
  const nameList = benchmarks.map((bm, index) =>
    <ListItemButton key={index}
      selected={benchmarkId === bm.id}
      onClick={(e) => onClick(e, bm.id)}>
      {bm.name}
    </ListItemButton>
  );

  return(
    <List sx={{padding:'0px', width: '100%', overflowY: 'auto'}}>
      <ListSubheader>{name}</ListSubheader>
      {nameList}
    </List>
  );
}

function VariableList({name}) {
  /* 선택한 벤치마크 ID, 변수 ID. */
  const {benchmarkId, variableId, setVariableId} = useProgramContext();

  /* TODO: Ubuntu 서버에서 벤치마크 폴더 읽어서 가져오기. */
  const target = benchmarkId === 1 ? variables1 :
                 benchmarkId === 2 ? variables2 :
                 benchmarkId === 3 ? variables3 : empty;

  /* 클릭한 벤치마크로 ID 변경. */
  const onClick = (e, id) => {
    setVariableId(id);
  };

  /* 연속 리스트 버튼 생성. */
  const nameList = target.map((v, index) =>
    <ListItemButton key={index}
      selected={variableId === v.id}
      onClick={(e) => onClick(e, v.id)}>
      {v.name}
    </ListItemButton>
  );

  return(
    <List sx={{padding:'0px', width: '100%', overflowY: 'auto'}}>
      <ListSubheader>{name}</ListSubheader>
      {nameList}
    </List>
  );
}

export {BenchmarkList, VariableList};