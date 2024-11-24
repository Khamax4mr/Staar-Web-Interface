import {useEffect, useState} from 'react';
import {List, ListItemButton, ListSubheader} from "@mui/material";
import {getDirectFolders} from '../common/FileFetcher';

/* 상위 폴더 경로. */
let parent_path = '..';

function FolderBrowser({title, root, setTarget}) {
  /* 컴포넌트 마운트 시 수행 동작. 하위 폴더 불러오기. */
  const [path, setPath] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let wd_path = [root, ...path].join("/");
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
      setTarget(null);
    });
  }, [path]);

  /* 클릭 폴더 설정. */
  const onClick = (e, id) => {
    setTarget([root, ...path, id].join('/'));
  };

  /* 현재 폴더 경로 변경. */
  const onDoubleClick = (e, id) => {
    if (loading === false) {
      if (id === parent_path) {
        setPath(path.slice(0, -1))
      } else {
        setPath([...path, id]);
      }
    }
    setLoading(true);
  }

  /* 연속 리스트 버튼 생성. */
  const nameList = contents.map((name) =>
    <ListItemButton key={name}
      selected={path === name}
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