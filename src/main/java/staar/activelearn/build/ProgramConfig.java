package staar.activelearn.build;

import java.util.LinkedList;
import java.util.List;

import staar.activelearn.Const.Default;

/** 능동 학습에 필요한 프로그램 정보 클래스입니다. */
public class ProgramConfig {

  private static final String ProgramDir = "프로그램 폴더";
  private static final String Target = "관심 변수    ";
  private static final String WorkDir = "작업 폴더    ";
  private static final String Benchmark = "benchmark    ";
  private static final String NoConst = "no-const     ";
  private static final String Teacher = "teacher      ";

  private static final String Msg_No_Dir = "지정된 프로그램 폴더 경로가 없습니다.";
  private static final String Msg_No_Target = "지정된 관심 변수 이름이 없습니다.";

  private String programDirPath;  /* 프로그램 폴더 경로. */
  private String targetName;      /* 관심 변수 이름. */
  private String workDirPath;     /* 작업 폴더 경로. */
  private boolean benchmark;      /* 밴치마크 모드. */
  private boolean noConst;        /* 상수 미사용. */
  private String teacher;         /* 학습 전략. */

  /** 프로그램 설정 생성자.
   * 빌더를 통해 객체를 생성하므로 생성자의 접근 제어자는 private을 사용합니다.
   * @param dir 프로그램 폴더 경로.
   * @param target 관심 변수 이름.
   * @param wd 작업 폴더 경로.
   * @param bm 밴치마크 모드 활성화 여부.
   * @param nConst 상수 미사용 활성화 여부.
   * @param strategy 학습 전략. */
  private ProgramConfig(String dir, String target, String wd,
                 boolean bm, boolean nConst, String strategy) {
    programDirPath = dir;
    targetName = target;
    workDirPath = wd;
    benchmark = bm;
    noConst = nConst;
    teacher = strategy;
  }

  /** 프로그램 폴더 경로를 반환합니다.
   * @return 프로그램 폴더 경로. */
  public String getProgramDirPath() {
    return programDirPath;
  }

  /** 관심 변수 이름을 반환합니다.
   * @return 관심 변수 이름. */
  public String getTargetName() {
    return targetName;
  }

  /** 작업 폴더 경로를 반환합니다.
   * @return 작업 폴더 경로. */
  public String getWorkDirPath() {
    return workDirPath;
  }

  /** 밴치마크 모드를 반환합니다.
   * @return 밴치마크 모드. */
  public boolean getBenchmark() {
    return benchmark;
  }

  /** 상수 미사용 여부를 반환합니다.
   * @return 상수 미사용 여부. */
  public boolean getNoConst() {
    return noConst;
  }

  /** 학습 전략을 반환합니다.
   * @return 학습 전략. */
  public String getTeacher() {
    return teacher;
  }

  /** 프로그램 설정을 구성하는 빌더 객체를 생성합니다.
   * @return 빌더 객체. */
  public static Builder builder() {
    return new Builder();
  }

  /* 프로그램 설정 빌더 이너 클래스. */
  public static class Builder {

    private String dir;       /* 프로그램 폴더 경로. */
    private String target;    /* 관심 변수 이름. */
    private String wd;        /* 작업 폴더 경로. */
    private boolean bm;       /* 밴치마크 모드.  */
    private boolean nConst;   /* 상수 미사용.  */
    private String strategy;  /* 학습 전략. */

    /** 프로그램 설정 빌더 생성자. */
    private Builder() {
      dir = null;
      target = null;
      wd = null;
      bm = Default.BENCHMARK;
      nConst = Default.NOCONST;
      strategy = Default.TEACHER;
    }

    /** 선언한 정보로부터 프로그램 설정 객체를 생성합니다.
     * @return 생성한 프로그램 설정 객체.
     * @throws IllegalArgumentException 필수 옵션 미지정 시 예외 발생. */
    public ProgramConfig build() {
      if (dir == null) {
        throw new IllegalArgumentException(Msg_No_Dir);
      } else if (target == null) {
        throw new IllegalArgumentException(Msg_No_Target);
      }
      return new ProgramConfig(dir, target, wd, bm, nConst, strategy);
    }

    /** 프로그램 폴더 경로를 path로 설정합니다.
     * @param path 경로.
     * @return 프로그램 폴더 경로를 설정한 빌더. */
    public Builder setProgramDirPath(String path) {
      dir = path;
      return this;
    }
  
    /** 관심 변수 이름을 name로 설정합니다.
     * @param name 이름.
     * @return 관심 변수 이름을 설정한 빌더. */
    public Builder setTargetName(String name) {
      target = name;
      return this;
    }

    /** 작업 폴더 경로를 path로 설정합니다.
     * @param path 경로.
     * @return 작업 폴더 경로를 설정한 빌더. */
    public Builder setWorkDirPath(String path) {
      wd = path;
      return this;
    }
  
    /** 밴치마크 모드를 checked로 설정합니다.
     * @param checked 활성화 여부.
     * @return 밴치마크 모드를 설정한 빌더. */
    public Builder setBenchmark(boolean checked) {
      bm = checked;
      return this;
    }

    /** 상수 미사용을 checked로 설정합니다.
     * @param checked 활성화 여부.
     * @return 상수 미사용을 설정한 빌더. */
    public Builder setNoConst(boolean checked) {
      nConst = checked;
      return this;
    }
  
    /** 학습 전략을 name로 설정합니다.
     * @param name 전략 이름.
     * @return 학습 전략을 설정한 빌더. */
    public Builder setTeacher(String name) {
      strategy = name;
      return this;
    }
  }

  /** 프로그램 설정 내용을 출력합니다. */
  @Override
  public String toString() {
    final List<String> msgs = new LinkedList<>();
    msgs.add(String.format("%s: %s", ProgramDir, programDirPath));
    msgs.add(String.format("%s: %s", Target, targetName));
    msgs.add(String.format("%s: %s", WorkDir, workDirPath));
    msgs.add(String.format("%s: %s", Benchmark, benchmark));
    msgs.add(String.format("%s: %s", NoConst, noConst));
    msgs.add(String.format("%s: %s", Teacher, teacher));
    return String.join("\n", msgs);
  }
}