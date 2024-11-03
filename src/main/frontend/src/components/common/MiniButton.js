import {MiniButton} from '../../layouts/Field'
import {HelpIcon, SearchIcon} from '../../layouts/Icon'

/* 도움말 버튼. 마우스 오버 시 툴팁으로 설명 표시. */
function HelpButton() {
  /* Todo: 툴팁 기능 추가.*/
  return (
    <MiniButton>
      <HelpIcon/>
    </MiniButton>
  );
}

/* 서버 파일 선택 버튼. */
function SearchButton() {
  /* Todo: 서버 파일 선택으로 연결.*/
  return (
    <MiniButton>
      <SearchIcon/>
    </MiniButton>
  );
}

export {HelpButton, SearchButton};