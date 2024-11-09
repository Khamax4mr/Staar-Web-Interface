package staar.web.common;

/* 웹 UI 스프링 백엔드 구현에 사용한 상수 클래스입니다. */
public final class Const {

  /* 홈 경로. */
  public static final class HOME {
    public static final String GLOBAL = "*";
    public static final String FRONT_HOME_REL = "/";
    public static final String FRONT_HOME_DIR = "https://khamax4mr.github.io/Staar-Web-Interface/";
    public static final String BACK_HOME_REL = "/";
    public static final String BACK_HOME_DIR = "http://localhost:8080";
  }

  /* 토픽 경로. */
  public static final class TOPIC {
    public static final String BASE = "/topic";
  }

  /* 엔드포인트 경로. */
  public static final class ENDPOINT {
    public static final String WS = "/ws";
    public static final String FS = "/fs";
  }
}