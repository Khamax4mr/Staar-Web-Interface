import {Container, Title, Bar, Button} from '../../layouts/Menu';

export default function Menu({name}) {
  return (
    <Container>
      <Title>{name}</Title>
      <Bar>
        {/* Todo: 파일 메뉴 기능 추가. */}
        <Button>파일</Button>
        {/* Todo: 편집 메뉴 기능 추가. */}
        <Button>편집</Button>
        {/* Todo: 보기 메뉴 기능 추가. */}
        <Button>보기</Button>
        {/* Todo: 도구 메뉴 기능 추가. */}
        <Button>도구</Button>
        {/* Todo: 언어 메뉴 기능 추가. */}
        <Button>언어</Button>
      </Bar>
    </Container>
  );
}