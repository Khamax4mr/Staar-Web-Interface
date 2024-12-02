import {useProgramContext} from '../active-learn/ProgramContext';
import {Bar, Button, Container, Title} from '../../layouts/Menu';

function FileButton({name}) {
  /* Todo: 파일 메뉴 기능 추가. */
  return(
    <Button disabled>{name}</Button>
  );
};

function ViewButton({name}) {
  /* Todo: 보기 메뉴 기능 추가. */
  return(
    <Button disabled>{name}</Button>
  );
};

function LanguageButton({name}) {
  /* Todo: 언어 메뉴 기능 추가. */
  return(
    <Button disabled>{name}</Button>
  );
};

function RunButton({name}) {
  /* 선택한 벤치마크 경로. */
  const {benchmarkPath} = useProgramContext();

  /* 버튼 클릭 시 동작. */
  const onClick = () => {
    /* 벤치마크를 선택하면 수행. */
    if (benchmarkPath !== null) {
      /* Todo: 능동학습 수행 페이지로 이동. */
      console.log('선택한 벤치마크:', benchmarkPath);
    }
  };

  return (
    <Button onClick={onClick}>{name}</Button>
  );
}

function HeaderSimpleMenu({name}) {
  return (
    <Container>
      <Title>{name}</Title>
      <Bar>
        <FileButton name='파일'/>
        <ViewButton name='보기'/>
        <LanguageButton name='언어'/>
      </Bar>
    </Container>
  );
}

function FooterSelectMenu() {
  return(
    <Container sx={{top: 'auto', bottom: 0}}>
      <Bar>
        <RunButton name='능동학습 수행'/>
      </Bar>
    </Container>
  );
}

export {HeaderSimpleMenu, FooterSelectMenu};