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
  return (
    /* Todo: 능동학습 수행 페이지로 이동. */
    <Button>{name}</Button>
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