import {HeaderSimpleMenu, FooterSelectMenu} from '../components/common/Menu';
import {BenchmarkList, VariableList} from '../components/active-learn/List';
import {ProgramContextProvider} from '../components/active-learn/ProgramContext';
import {Frame, Container} from '../layouts/Frame';

export default function BMSelector() {
  let conWidth = `calc(100vw - 500px)`;
  let conHeight = `calc(100vh - 120px)`;

  return(
    <Frame>
      <ProgramContextProvider>
        <HeaderSimpleMenu name='능동학습 시작'/>
        <Container gap='16px' minHeight={conHeight} overflow='hidden'>
            <Container width='480px' maxHeight={conHeight} bgcolor='whitesmoke'>
              <BenchmarkList name='벤치마크 예제 선택'/>
            </Container>
            <Container width={conWidth} maxHeight={conHeight} bgcolor='whitesmoke'>
              <VariableList name='관심 변수 선택'/>
            </Container>
        </Container>
        <FooterSelectMenu/>
      </ProgramContextProvider>
    </Frame>
  );
}