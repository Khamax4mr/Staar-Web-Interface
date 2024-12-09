import {useEffect, useState} from 'react';
import {List, ListItemButton} from "@mui/material";
import {getDirectFolders} from '../common/FileFetcher';

let home_path = '/home';  /* 홈 폴더 경로. */
let parent_path = '..';   /* 상위 폴더 경로. */

let function_type = 'function'; /* 함수 자료형. */

let is_dir_key = 'isdir'; /* 폴더 여부 키. */
let data_key = 'data';    /* 파일 정보 키. */

function FolderBrowser({root, wd, setPath, blocked}) {
  /* 작업 폴더 목록, 선택 파일 내용. */
  let browser_root = home_path;
  const [workDir, setWorkDir] = useState([]);
  const [content, setContent] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 입력 속성으로 상태 설정. */
  if (root) browser_root = root;
  if (wd) setWorkDir(wd.split('/').filter(Boolean));

  /* 컴포넌트 마운트 및 작업 폴더 변경 시 수행 동작. 하위 폴더 정보 불러오기. */
  useEffect(() => {
    /* 하위 폴더라면 상위 폴더 이동 선택지 .. 추가. */
    let previous = (workDir.length > 0) ? [parent_path] : [];

    /* 하위 폴더 정보 불러오기. */
    let wd_path = [root, ...workDir].join('/');
    getDirectFolders(wd_path).then((result) => {
      if (is_dir_key in result && result[is_dir_key] && data_key in result) {
        let keys = Object.keys(result[data_key]);
        setContent([...previous, ...keys]);
      }
    }).catch(e => {
    }).finally(e => {
      setSelectItem(null);
      setLoading(false);
    });
  }, [workDir]);

  /* 컴포넌트 마운트 및 폴더 선택 시 수행 동작. 경로 전달. */
  useEffect(() => {
    if (typeof setPath === function_type) {
      if (selectItem) setPath([browser_root, ...workDir, selectItem]);
      else setPath([browser_root, ...workDir]);
    }
  }, [selectItem]);

  /* 클릭 시 폴더 정보 가져오기. */
  const onClick = (e, id) => {
    if (selectItem !== id) {
      if (parent_path === id) setSelectItem(null);
      else setSelectItem(id);
    }
  };

  /* 더블 클릭 시 현재 폴더 경로 변경. */
  const onDoubleClick = (e, id) => {
    if (loading === false) {
      if (id === parent_path) {
        setWorkDir(workDir.slice(0, -1));
        setLoading(true);
      } else if (blocked === false) {
        setWorkDir([...workDir, id]);
        setLoading(true);
      }
    }
  }

  /* 연속 리스트 버튼 생성. */
  const nameList = content.map((name) =>
    <ListItemButton key={name}
      selected={selectItem === name}
      onClick={(e) => onClick(e, name)}
      onDoubleClick={(e) => onDoubleClick(e, name)}>
      {name}
    </ListItemButton>
  );

  return(
    <List sx={{padding:'0px', width: '100%', overflowY: 'auto'}}>
      {nameList}
    </List>
  );
}

export {FolderBrowser};