import {FormControl, MenuItem} from '@mui/material';
import {Container, Title} from '../../layouts/Frame';
import {CheckBox, SelectBox, ShortTextBox, LongTextBox} from '../../layouts/Field';
import {HelpButton, SearchButton} from '../common/MiniButton';

function OptFolder() {
  return (
    <Container>
      <Title>프로그램 폴더</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 서버 파일 선택 구현 시 disabled 처리할 것. */}
      <LongTextBox/>
      {/* Todo: 서버 파일 선택. */}
      <SearchButton/>
    </Container>
  );
}

function OptModel() {
  return (
    <Container>
      <Title>모델 코드</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 선택한 프로그램 폴더 따라 경로 설정. */}
      <LongTextBox disabled/>
    </Container>
  );
}

function OptTrace() {
  return (
    <Container>
      <Title>트레이스</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 선택한 프로그램 폴더 따라 경로 설정. */}
      <LongTextBox disabled/>
    </Container>
  );
}

function OptTarget() {
  return (
    <Container>
      <Title>관심 변수 이름</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 입력 형식 점검. */}
      <ShortTextBox/>
    </Container>
  );
}

function OptWorkDir() {
  return (
    <Container>
      <Title>작업 폴더</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 서버 파일 선택 구현 시 disabled 처리할 것. */}
      <LongTextBox/>
      {/* Todo: 서버 파일 선택. */}
      <SearchButton/>
    </Container>
  );
}

function OptBenchmark() {
  return (
    <Container>
      <Title>benchmark</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 초기값 true로 설정. */}
      <CheckBox/>
    </Container>
  );
}

function OptNoConst() {
  return (
    <Container>
      <Title>no-const</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 초기값 true로 설정. */}
      <CheckBox/>
    </Container>
  );
}

function OptTeacher() {
  return (
    <Container>
      <Title>teacher</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 초기값 baseline으로 설정. */}
      <FormControl>
        <SelectBox>
          <MenuItem value={'baseline'}>baseline</MenuItem>
          <MenuItem value={'improved'}>improved</MenuItem>
        </SelectBox>
      </FormControl>
    </Container>
  );
}

export {OptFolder, OptModel, OptTrace, OptTarget, OptWorkDir, OptBenchmark, OptNoConst, OptTeacher};