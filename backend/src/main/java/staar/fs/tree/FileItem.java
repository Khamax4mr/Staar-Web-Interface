package staar.fs.tree;

import java.io.File;
import java.util.Map;


/** 파일 트리 구성 요소 중 하나인 파일 구성 요소 클래스입니다. */
public class FileItem extends FileTreeItem {

  private String data;  /* 파일 내용 */

  /** file로부터 파일 구성 요소의 내용을 구성합니다.
   * @param file 파일 객체 */
  public FileItem(File file) {
    super(file);
    isDirectory = false;
    data = null;
  }

  /** 파일 내용을 line으로 설정합니다.
   * @param line 정보 문자열 */
  public void setData(String line) {
    data = line;
  }

  /** 설정한 파일 내용을 반환합니다.
   * @return 파일 내용 */
  public String getData() {
    return data;
  }

  /** 파일 트리를 방문하면서 파일 구성 요소의 내용을 Json 구조의 맵으로 출력합니다.
   * @param visitor 비지터 객체
   * @return Json 맵 */
  @Override
  public Map<String, Object> toJson(FileTreeVisitor visitor) {
    return visitor.visit(this);
  }
}