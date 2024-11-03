import {FormControl, MenuItem} from '@mui/material';
import {useProgramContext} from './ProgramContext';
import {HelpButton, SearchButton} from '../common/MiniButton';
import {Container, Title} from '../../layouts/Frame';
import {CheckBox, SelectBox, ShortTextBox, LongTextBox} from '../../layouts/Field';

/* 프로그램 폴더 경로 입력란. 초기 값은 홈 폴더로 설정. */
function OptProgramDir() {
  const {programDir, setProgramDir} = useProgramContext();

  /* 입력에 따라 프로그램 폴더 경로 수정. */
  const onChange = (e) => {
    setProgramDir(e.target.value);
  }

  return (
    <Container>
      <Title>프로그램 폴더</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 서버 파일 선택 구현 시 disabled 처리할 것. */}
      <LongTextBox value={programDir} onChange={onChange}/>
      {/* Todo: 서버 파일 선택. */}
      <SearchButton/>
    </Container>
  );
}

/* 모델 코드 경로 입력란. {프로그램 폴더/code/model.c}로 자동으로 값 설정. */
function OptModelPath() {
  const {programDir} = useProgramContext();

  return (
    <Container>
      <Title>모델 코드</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <LongTextBox disabled value={programDir + '/code/model.c'}/>
    </Container>
  );
}

/* 트레이스 경로 입력란. {프로그램 폴더/traces/trace1.txt}로 자동으로 값 설정. */
function OptTracePath() {
  const {programDir} = useProgramContext();

  return (
    <Container>
      <Title>트레이스</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <LongTextBox disabled value={programDir + '/traces/trace1.txt'}/>
    </Container>
  );
}

/* 관심 변수 이름 입력란. */
function OptTargetName() {
  const {setTargetName} = useProgramContext();

  /* 입력에 따라 관심 변수 이름 수정. */
  const onChange = (e) => {
    setTargetName(e.target.value);
  }

  return (
    <Container>
      <Title>관심 변수 이름</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 입력 형식 점검. */}
      <ShortTextBox onChange={onChange}/>
    </Container>
  );
}

/* 작업 폴더 경로 입력란. */
function OptWorkDir() {
  const {setWorkDir} = useProgramContext();

  /* 입력에 따라 작업 폴더 경로 수정. */
  const onChange = (e) => {
    setWorkDir(e.target.value);
  }

  return (
    <Container>
      <Title>작업 폴더</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      {/* Todo: 서버 파일 선택 구현 시 disabled 처리할 것. */}
      <LongTextBox onChange={onChange}/>
      {/* Todo: 서버 파일 선택. */}
      <SearchButton/>
    </Container>
  );
}

/* 밴치마크 모드 활성화 입력란. 초기 값은 true로 설정. */
function OptBenchmark() {
  const {benchmark, setBenchmark} = useProgramContext();

  /* 입력에 따라 밴치마크 모드 활성화 여부 수정. */
  const onChange = (e) => {
    setBenchmark(e.target.checked);
  }

  return (
    <Container>
      <Title>benchmark</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <CheckBox checked={benchmark} onChange={onChange}/>
    </Container>
  );
}

/* 상수 미사용 활성화 입력란. 초기 값은 false로 설정. */
function OptNoConst() {
  const {noConst, setNoConst} = useProgramContext();

  /* 입력에 따라 상수 미사용 활성화 여부 수정. */
  const onChange = (e) => {
    setNoConst(e.target.checked);
  }

  return (
    <Container>
      <Title>no-const</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <CheckBox checked={noConst} onChange={onChange}/>
    </Container>
  );
}

/* 학습 방식 설정 입력란. 초기 값은 baseline으로 설정. */
function OptTeacher() {
  const {teacher, setTeacher} = useProgramContext();

  /* 입력에 따라 학습 방식 수정. */
  const onChange = (e) => {
    setTeacher(e.target.value);
  }

  return (
    <Container>
      <Title>teacher</Title>
      {/* Todo: 도움말 설명. */}
      <HelpButton/>
      <FormControl>
        <SelectBox value={teacher} onChange={onChange}>
          <MenuItem value={'baseline'}>baseline</MenuItem>
          <MenuItem value={'improved'}>improved</MenuItem>
        </SelectBox>
      </FormControl>
    </Container>
  );
}

export {OptProgramDir as OptFolder, OptModelPath as OptModel, OptTracePath as OptTrace, OptTargetName as OptTarget, OptWorkDir, OptBenchmark, OptNoConst, OptTeacher};