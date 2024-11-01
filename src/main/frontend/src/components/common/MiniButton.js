import {MiniButton} from '../../layouts/Field'
import {HelpIcon, SearchIcon} from '../../layouts/Icon'

function HelpButton() {
  return (
    <MiniButton>
      <HelpIcon/>
    </MiniButton>
  );
}

function SearchButton() {
  return (
    <MiniButton>
      <SearchIcon/>
    </MiniButton>
  );
}

export {HelpButton, SearchButton};