package staar.web.common;

/* 웹 UI 스프링 백엔드 구현에 사용한 상수 클래스입니다. */
public final class Const {

  /* 프론트엔드 경로. */
  public static final class FrontLink {
    public static final String GLOBAL = "*";

    public static final String HOME_REL = "/";

    public static final String HOME_DIR = "https://khamax4mr.github.io/Staar-Web-Interface/";
  }

  /* 백엔드 경로. */
  public static final class BackLink {
    public static final String GLOBAL = "*";

    public static final String HOME_REL = "/";
    public static final String WS_REL = HOME_REL + "ws";

    public static final String HOME_DIR = "http://localhost:8080";
    public static final String WS_DIR = HOME_DIR + WS_REL;
  }
}