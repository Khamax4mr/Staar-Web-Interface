package staar.fs;

import java.io.File;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/** 탐색 전략({@link FilterStrategy})에 따라 다양한 유형의 파일을 찾는 파일 탐색기 클래스입니다. */
public class FileBrowser {
  private final static String Msg_Not_Found = "파일 [%s]을 찾을 수 없음";

  private static FileBrowser instance = null;           /* 싱글톤 인스턴스. */
  private static List<File> files = new LinkedList<>(); /* 파일 리스트. */
    
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
    /* 리스트 초기화. */
    files.clear();
    return instance;
  }
    
  /** path에 있는 파일 리스트를 찾은 파일 탐색기를 반환합니다.
   * @param path 경로
   * @return 파일 탐색기 인스턴스 */
  public FileBrowser search(String path) {
    /* path가 찾을 수 없는 파일이면 넘어가기. */
    final File base = new File(path);
    if (!base.exists()) {
      System.out.println(String.format(Msg_Not_Found, path));
      return instance;
    }
    /* 찾은 파일을 파일 리스트에 추가. */
    if (base.isDirectory()) {
      files.addAll(Arrays.asList(base.listFiles()));
    } else {
      files.add(base);
    }
    return instance;
  }

  /** 파일 리스트에서 폴더가 아닌 파일을 제외한 파일 탐색기를 반환합니다.
   * @return 파일 탐색기 인스턴스 */
  public FileBrowser filterFolder() {
    for (Iterator<File> iter = files.iterator(); iter.hasNext();) {
      /* 폴더는 넘어가기. */
      final File file = iter.next();
      if (file.isDirectory()) continue;

      /* 폴더가 아닌 파일이면 파일 리스트에서 제거. */
      iter.remove();
    }
    return instance;
  }

  /** 파일 리스트에서 공통 파일을 제외한 파일 탐색기를 반환합니다.
   * @return 파일 탐색기 인스턴스 */
  public FileBrowser filterCommon() {
    for (Iterator<File> iter = files.iterator(); iter.hasNext();) {
      /* 폴더가 아니면 넘어가기. */
      final File file = iter.next();
      if (!file.isDirectory()) continue;

      /* 공통 파일 제거. */
      if (file.getName().equals("common")) iter.remove();
      else if (file.getName().equals("code")) iter.remove();
    }
    return instance;
  }

  /** id 번호의 파일을 반환합니다.
   * @param id 번호
   * @return 파일 */
  public File getFile(int id) {
    if (files.size() <= id) {
      return null;
    }
    return files.get(id);
  }

  /** 파일 리스트를 반환합니다.
   * @return 파일 리스트 */
  public List<File> getFiles() {
    final List<File> result = new LinkedList<>();
    result.addAll(files);
    return result;
  }
}