import {createContext, useContext, useState} from 'react';

const ProgramContext = createContext();

/* 프로그램 컨텍스트 적용 범위 설정용 제공자. */
function ProgramContextProvider({children}) {
  const [benchmarkId, setBenchmarkId] = useState(null);
  const [variableId, setVariableId] = useState(null);

  return (
    <ProgramContext.Provider value={{
        benchmarkId, setBenchmarkId,
        variableId, setVariableId}}>
      {children}
    </ProgramContext.Provider>
  );
}

/* 프로그램 컨텍스트 사용. 제공자 태그 밖에서 사용하면 무효. */
function useProgramContext() {
  const value = useContext(ProgramContext);
  if (value === undefined) {
    throw new Error('프로그램 컨텍스트를 제공하지 않는 태그입니다.');
  }
  return value;
}

export {ProgramContextProvider, useProgramContext};