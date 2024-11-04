package staar.activelearn.build;

import java.util.LinkedList;
import java.util.List;

import staar.activelearn.Const.Key;

/** 능동 학습 수행에 필요한 입력 파일을 생성하는 클래스입니다. */
public class InputGenerator {
  private static InputGenerator instance = null;  /* 싱글톤 인스턴스. */
  private static ProgramConfig progConfig = null; /* 프로그램 설정. */

  /** 입력 생성기 생성자.
   * 싱글톤 인스턴스이므로 접근 제어자를 private로 사용합니다. */
  private InputGenerator() {};

  /** stmt 라벨을 파싱하는 라벨 파서 싱글톤 인스턴스를 반환합니다.
   * @param stmt 파싱 할 구문.
   * @return 라벨 파서. */
  public static InputGenerator getInstance(ProgramConfig config) {
    /* 인스턴스가 없으면 인스턴스 생성. */
    if (instance == null) {
      instance = new InputGenerator();
    }
    progConfig = config;
    return instance;
  }

  /** 능동 학습 수행을 위한 입력 리스트를 반환합니다.
   * @return 능동 학습 수행 입력 리스트. */
  public List<String> generateInput() {
    final List<String> inputs = new LinkedList<>();
    inputs.add(String.format("%s %s/code/code_run.c", Key.CODE, progConfig.getProgramDirPath()));
    inputs.add(String.format("%s %s/traces/trace1.txt", Key.TRACE, progConfig.getProgramDirPath()));
    inputs.add(String.format("%s %s", Key.VAR, progConfig.getTargetName()));
    inputs.add(String.format("%s %s", Key.WD, progConfig.getWorkDirPath()));
    inputs.add(String.format("%s %s", Key.TEACHER, progConfig.getTeacher()));

    if (progConfig.getBenchmark() == true) {
      inputs.add(Key.BENCHMARK);
    }

    if (progConfig.getNoConst() == true) {
      inputs.add(Key.NO_CONST);
    }

    return inputs;
  }
}