import {HeaderSimpleMenu, FooterSelectMenu} from '../components/common/Menu';
import {BenchmarkBrowser} from '../components/active-learn/BenchmarkBrowser';
import {BenchmarkDescription} from '../components/active-learn/Description';
import {ProgramContextProvider} from '../components/active-learn/ProgramContext';
import {Frame, Container} from '../layouts/Frame';

export default function BMSelector() {
  let conWidth = `calc(100vw - 16px)`;
  let conHeight = `calc(100vh - 252px)`;

  return(
    <Frame>
      <ProgramContextProvider>
        <HeaderSimpleMenu name='능동학습 시작'/>
        <Container minWidth={conWidth} minHeight={conHeight}>
          <Container minWidth={conWidth} maxHeight={conHeight} bgcolor='whitesmoke' overflow='hidden'>
            <BenchmarkBrowser title='벤치마크 예제 선택'/>
          </Container>
        </Container>
        <Container paddingTop='8px' minWidth={conWidth} minHeight='128px'>
          <Container minWidth={conWidth} maxHeight='128px' bgcolor='whitesmoke' overflow='hidden'>
            <BenchmarkDescription/>
          </Container>
        </Container>
        <FooterSelectMenu/>
      </ProgramContextProvider>
    </Frame>
  );
}