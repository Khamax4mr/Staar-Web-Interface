package staar.fs;

import java.io.File;


/** 지정한 파일을 찾는 파일 탐색기 클래스입니다. */
public class FileBrowser {
  private final static String Msg_Not_Found = "파일 [%s]을 찾을 수 없음";

  private static FileBrowser instance = null; /* 싱글톤 인스턴스. */

  /** 파일 탐색기 생성자.
   * 싱글톤 인스턴스이므로 접근 제어자를 private로 사용합니다. */
  private FileBrowser() {}
    
  /** 파일 탐색기 싱글톤 인스턴스를 반환합니다.
   * @return 파일 탐색기. */
  public static FileBrowser getInstance() {
    /* 인스턴스가 없으면 인스턴스 생성. */
    if (instance == null) {
      instance = new FileBrowser();
    }
    return instance;
  }

  /** path 경로의 파일을 반환합니다.
   * @param path 경로
   * @return 파일 객체 */
  public File search(String path) {
    /* path가 찾을 수 없는 파일이면 파일 미반환. */
    final File sourceFile = new File(path);
    if (!sourceFile.exists()) {
      System.out.println(String.format(Msg_Not_Found, path));
      return null;
    }
    return sourceFile;
  }
}