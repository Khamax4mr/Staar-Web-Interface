import {FormControl, MenuItem} from '@mui/material';
import {Container, Title} from '../../layouts/Frame';
import {CheckBox, SelectBox, ShortTextBox, LongTextBox} from '../../layouts/Field';
import {HelpButton, SearchButton} from '../common/MiniButton';

/* 프로그램 폴더 입력란. 초기 값은 홈 폴더로 설정. */
function OptFolder() {
  return (
    <Container>
      <Title>프로그램 폴더</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 서버 파일 선택 구현 시 disabled 처리할 것. */}
      {/* Todo: 초기 값 홈 폴더로 설정. */}
      <LongTextBox/>
      {/* Todo: 서버 파일 선택. */}
      <SearchButton/>
    </Container>
  );
}

/* 모델 코드 입력란. {프로그램 폴더/code/model.c}로 자동으로 값 설정. */
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

/* 트레이스 입력란. {프로그램 폴더/traces/trace1.txt}로 자동으로 값 설정. */
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

/* 관심 변수 입력란. */
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

/* 작업 폴더 입력란. */
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

/* 밴치마크 모드 활성화 입력란. 초기 값은 true로 설정. */
function OptBenchmark() {
  return (
    <Container>
      <Title>benchmark</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <CheckBox defaultChecked/>
    </Container>
  );
}

/* 상수 미사용 활성화 입력란. 초기 값은 false로 설정. */
function OptNoConst() {
  return (
    <Container>
      <Title>no-const</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <CheckBox/>
    </Container>
  );
}

/* 학습 방식 설정 입력란. 초기 값은 baseline으로 설정. */
function OptTeacher() {
  return (
    <Container>
      <Title>teacher</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <FormControl>
        <SelectBox value={'baseline'}>
          <MenuItem value={'baseline'}>baseline</MenuItem>
          <MenuItem value={'improved'}>improved</MenuItem>
        </SelectBox>
      </FormControl>
    </Container>
  );
}

export {OptFolder, OptModel, OptTrace, OptTarget, OptWorkDir, OptBenchmark, OptNoConst, OptTeacher};