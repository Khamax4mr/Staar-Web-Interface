import {HeaderSimpleMenu, FooterSelectMenu} from '../components/common/Menu';
import {BenchmarkBrowser} from '../components/active-learn/BenchmarkBrowser';
import {ProgramContextProvider} from '../components/active-learn/ProgramContext';
import {Frame, Container} from '../layouts/Frame';

export default function BMSelector() {
  let conWidth = `calc(100vw - 16px)`;
  let conHeight = `calc(100vh - 120px)`;

  return(
    <Frame>
      <ProgramContextProvider>
        <HeaderSimpleMenu name='능동학습 시작'/>
        <Container gap='16px' minWidth={conWidth} minHeight={conHeight}>
          <Container minWidth={conWidth} maxHeight={conHeight} bgcolor='whitesmoke' overflow='hidden'>
            <BenchmarkBrowser title='벤치마크 예제 선택'/>
          </Container>
        </Container>
        <FooterSelectMenu/>
      </ProgramContextProvider>
    </Frame>
  );
}