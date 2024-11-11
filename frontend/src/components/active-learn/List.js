import {useEffect, useState} from 'react';
import {List, ListItemButton, ListSubheader} from "@mui/material";
import {useProgramContext} from './ProgramContext';
import {getDirectFolders} from '../common/FileBrowser';

let benchmark_source_path = '/home/shared/AL_benchmark';

function BenchmarkList({name}) {
  /* 선택한 벤치마크 ID, 초기화할 변수 ID. */
  const {benchmarkId, setBenchmarkId, setVariableId} = useProgramContext();

  /* 컴포넌트 마운트 시 수행 동작. 벤치마크 폴더 불러오기. */
  const [contents, setContents] = useState([]);
  useEffect(() => {
    getDirectFolders(benchmark_source_path).then((result) => {
      setContents(result);
    }).catch(e => {
      setContents([]);
    });
  }, []);

  /* 클릭한 벤치마크로 ID 변경. */
  const onClick = (e, id) => {
    setBenchmarkId(id);
    setVariableId(null);
  };

  /* 연속 리스트 버튼 생성. */
  const nameList = contents.map((name) =>
    <ListItemButton key={name}
      selected={benchmarkId === name}
      onClick={(e) => onClick(e, name)}>
      {name}
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

  /* 벤치마크 ID 변화 시 수행 동작. 벤치마크 하위 폴더 불러오기. */
  const [contents, setContents] = useState([]);
  useEffect(() => {
    if (benchmarkId) {
      let benchmark_path = benchmark_source_path + '/' + benchmarkId;
      getDirectFolders(benchmark_path).then((result) => {
        setContents(result);
      }).catch(e => {
        setContents([]);
      });
    }
  }, [benchmarkId]);

  /* 클릭한 벤치마크로 ID 변경. */
  const onClick = (e, id) => {
    setVariableId(id);
  };

  /* 연속 리스트 버튼 생성. */
  const nameList = contents.map((name) =>
    <ListItemButton key={name}
      selected={variableId === name}
      onClick={(e) => onClick(e, name)}>
      {name}
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