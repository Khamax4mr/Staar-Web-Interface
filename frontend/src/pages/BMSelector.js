import {HeaderSimpleMenu, FooterSelectMenu} from '../components/common/Menu';
import {BenchmarkBrowser} from '../components/active-learn/BenchmarkBrowser';
import {BenchmarkDescriptionBox} from '../components/active-learn/MessageBox';
import {Frame, Title, Container} from '../layouts/Frame';

export default function BMSelector() {
  let conWidth = `calc(100vw - 16px)`;
  let conHeight = `calc(100vh - 252px)`;

  return(
    <Frame>
      <HeaderSimpleMenu name='능동학습 시작'/>
        <Title>벤치마크 설정</Title>
        <Container minWidth={conWidth} minHeight={conHeight}>
          <Container minWidth={conWidth} maxHeight={conHeight} bgcolor='whitesmoke' overflow='hidden'>
            <BenchmarkBrowser/>
          </Container>
        </Container>
        <Container paddingTop='8px' minWidth={conWidth} minHeight='128px'>
          <Container minWidth={conWidth} maxHeight='128px' bgcolor='whitesmoke' overflow='hidden'>
            <BenchmarkDescriptionBox/>
          </Container>
        </Container>
      <FooterSelectMenu/>
    </Frame>
  );
}