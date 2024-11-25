import {useEffect, useState} from 'react';
import {List, ListItemButton, ListSubheader} from "@mui/material";
import {getDirectFolders, getJsonFile} from '../common/FileFetcher';

/* 상위 폴더 경로. */
let parent_path = '..';
let meta_path = 'meta.json';
let is_runnable = 'isRunnable';

function FolderBrowser({title, root, id, setId, setTarget}) {
  /* 컴포넌트 마운트 시 수행 동작. 하위 폴더 불러오기. */
  const [path, setPath] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let wd_path = [root, ...path].join('/');
    getDirectFolders(wd_path).then((result) => {
      if (path.length > 0) {
        setContents([parent_path, ...result]);
      } else {
        setContents(result);
      }
    }).catch(e => {
      if (path.length > 0) {
        setContents([parent_path]);
      } else {
        setContents([]);
      }
    }).finally(e => {
      /* 대기 상태 종료. */
      setLoading(false);
      setId(null);
      setTarget(null);
    });
  }, [path]);

  /* 클릭 폴더 설정. */
  const onClick = (e, id) => {
    if (id === parent_path) {
      setId(null);
      setTarget(null);
    } else {
      setId(id);
      setTarget([root, ...path, id].join('/'));
    }
  };

  /* 현재 폴더 경로 변경. */
  const onDoubleClick = (e, id) => {
    if (loading === false) {
      if (id === parent_path) {
        setPath(path.slice(0, -1));
        setLoading(true);
      } else {
        let wd_meta_path = [root, ...path, id, meta_path].join('/');
        getJsonFile(wd_meta_path).then((result) => {
          if (result.hasOwnProperty(is_runnable)) {
            if (result.isRunnable === false) {   
              setPath([...path, id]);
              setLoading(true);
            }
          }
        });
      }
    }
  }

  /* 연속 리스트 버튼 생성. */
  const nameList = contents.map((name) =>
    <ListItemButton key={name}
      selected={id === name}
      onClick={(e) => onClick(e, name)}
      onDoubleClick={(e) => onDoubleClick(e, name)}>
      {name}
    </ListItemButton>
  );

  return(
    <List sx={{padding:'0px', width: '100%', overflowY: 'auto'}}>
      <ListSubheader>{title}</ListSubheader>
      {nameList}
    </List>
  );
}

export {FolderBrowser};