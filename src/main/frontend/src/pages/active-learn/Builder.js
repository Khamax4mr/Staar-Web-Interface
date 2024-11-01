import {ContainerDivider, Frame, Title} from '../../layouts/Frame';
import Menu from '../../components/common/Menu';
import {OptFolder, OptModel, OptTrace, OptTarget, OptWorkDir, OptBenchmark, OptNoConst, OptTeacher} from '../../components/active-learn/Option';
import {ClickBox} from '../../layouts/Field';

export default function Builder() {
  return (
    <Frame>
      <div className='menu'>
        <Menu name='능동 학습 시작'/>
      </div>
      <div className='program-option'>
        <Title>대상 프로그램</Title>
        <OptFolder/>
        <OptModel/>
        <OptTrace/>
      </div>
      <ContainerDivider/>
      <div className='required-option'>
        <Title>필수 옵션</Title>
        <OptTarget/>
      </div>
      <ContainerDivider/>
      <div className='alternative-option'>
        <Title>선택 옵션</Title>
        <OptWorkDir/>
        <OptBenchmark/>
        <OptNoConst/>
        <OptTeacher/>
      </div>
      <ContainerDivider/>
      <div className='buttons'>
        {/* Todo: ActiveLearnRunner 페이지 전환. */}
        <ClickBox variant='outlined'>능동 학습 수행</ClickBox>
      </div>
    </Frame>
  );
}