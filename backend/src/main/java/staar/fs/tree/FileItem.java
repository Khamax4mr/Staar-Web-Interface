package staar.fs.tree;

import java.io.File;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


/** 파일 트리 구성 요소 중 하나인 파일 구성 요소 클래스입니다. */
public class FileItem extends FileTreeItem {

  private List<String> data;  /* 파일 내용 */

  /** file로부터 파일 구성 요소의 내용을 구성합니다.
   * @param file 파일 객체 */
  public FileItem(File file) {
    super(file);
    isDirectory = false;
    data = new LinkedList<>();
  }

  /** 파일 내용에 line을 추가합니다.
   * @param line 정보 문자열 */
  public void addDatum(String line) {
    data.add(line);
  }

  /** 파일 내용에 lines을 추가합니다.
   * @param lines 정보 문자열 목록 */
  public void addData(Collection<String> lines) {
    data.addAll(lines);
  }

  /** 설정한 파일 내용을 반환합니다.
   * @return 파일 내용 */
  public List<String> getData() {
    final List<String> output = new LinkedList<>();
    output.addAll(data);
    return output;
  }

  /** 파일 트리를 방문하면서 파일 구성 요소의 내용을 Json 구조의 맵으로 출력합니다.
   * @param visitor 비지터 객체
   * @return Json 맵 */
  @Override
  public Map<String, Object> toJson(FileTreeVisitor visitor) {
    return visitor.visit(this);
  }
}