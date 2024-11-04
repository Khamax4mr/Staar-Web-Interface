package staar.activelearn;

/* 능동 학습 백엔드에서 사용하는 상수를 모은 기호. */
public final class Const {

  /* 명령어 인자. */
  public static class Key {
    public static final String CODE = "-code";
    public static final String TRACE = "-trace";
    public static final String VAR = "-var";
    public static final String BENCHMARK = "-benchmark";
    public static final String INCLUDE = "-include";
    public static final String NO_CONST = "-no-const";
    public static final String TEACHER = "-teacher";
    public static final String TERM = "term";
    public static final String USE_FRAMAC_EVA = "-use-framac-eva";
    public static final String USE_TRACE_EXPR = "-use-trace-expr";
    public static final String USE_TRACE_RANGE = "-use-trace-range";
    public static final String WD = "-wd";
    public static final String UNWIND = "--unwind";
    public static final String K_INDUCTION = "--k-induction";
    public static final String OBEJCT_BITS = "--object-bits";
  }

  /* 초기 값. */
  public static class Default {
    public static final boolean BENCHMARK = true;     /* -benchmark */
    public static final boolean NOCONST = false;      /* -no-const */
    public static final String TEACHER = "baseline";  /* -teacher */
  }
}