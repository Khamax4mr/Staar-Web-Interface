package staar.fs.tree;

import java.io.File;
import java.util.Map;


/** 파일 트리 구성 요소 클래스입니다. */
public abstract class FileTreeItem implements Comparable<FileTreeItem> {
  protected String name;          /* 파일 이름 */
  protected String path;          /* 파일 경로 */
  protected boolean isDirectory;  /* 폴더 여부 */

  /** file로부터 파일 트리 구성 요소의 속성을 구성합니다.
   * @param file 파일 객체 */
  public FileTreeItem(File file) {
    name = file.getName();
    path = file.getAbsolutePath();
    isDirectory = file.isDirectory();
  }

  /** 설정한 파일 이름을 반환합니다.
   * @return 파일 이름 */
  public String getName() {
    return name;
  }

  /** 설정한 파일 경로 문자열을 반환합니다.
   * @return 파일 경로 문자열 */
  public String getPath() {
    return path;
  }

  /** 설정한 폴더 여부를 반환합니다.
   * @return 폴더 여부 */
  public boolean isDirectory() {
    return isDirectory;
  }

  /** 파일 트리를 방문하면서 구성 요소의 내용을 Json 구조의 맵으로 출력하는 추상 메소드입니다.
   * @param visitor 비지터 객체
   * @return Json 맵 */
  public abstract Map<String, Object> toJson(FileTreeVisitor visitor);

  /** 이 파일 트리 구성 요소와 other과 이름을 기준으로 비교합니다.
   * @param other 비교 대상 파일 트리 구성 요소
   * @return 비교 결과 */
  @Override
  public int compareTo(FileTreeItem other) {
    return getName().compareTo(other.name);
  }
}