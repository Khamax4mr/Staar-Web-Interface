import {HeaderSimpleMenu, FooterRunnerMenu} from '../components/common/Menu';
import {Frame, Title, Container, ContainerDivider} from '../layouts/Frame';
import {TargetInfoBox, LogBox, SummaryBox} from '../components/active-learn/MessageBox';

export default function ALRunner() {
  return(
    <Frame>
      <HeaderSimpleMenu name='능동학습 실행'/>
        <Container>
          <TargetInfoBox/>
        </Container>
        <ContainerDivider/>
        <Title>실행 로그</Title>
        <Container minHeight='160px' bgcolor='whitesmoke' overflow='hidden'>
          <LogBox/>
        </Container>
        <ContainerDivider/>
        <Title>결과 요약</Title>
        <Container>
          <SummaryBox/>
        </Container>
      <FooterRunnerMenu/>
    </Frame>
  );
}