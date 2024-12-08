package staar.fs.tree;

import java.io.File;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


/** 파일 트리 구성 요소 중 하나인 폴더 구성 요소 클래스입니다. */
public class FolderItem extends FileTreeItem {

  private List<FileTreeItem> children; /* 하위 파일 리스트 */

  /** file로부터 폴더 구성 요소의 내용을 구성합니다.
   * @param file 파일 객체 */
  public FolderItem(File file) {
    super(file);
    isDirectory = true;
    children = new LinkedList<>();
  }

  /** 하위 파일 리스트에 item을 추가합니다.
   * @param item 파일 트리 구성 요소 */
  public void addChild(FileTreeItem item) {
    children.add(item);
  }

  /** 하위 파일 리스트에 items를 추가합니다.
   * @param items 파일 트리 구성 요소 목록 */
  public void addChildren(Collection<FileTreeItem> items) {
    children.addAll(items);
  }

  /** 설정한 하위 파일 목록을 반환합니다.
   * @return 하위 파일 목록 */
  public Collection<FileTreeItem> getChildren() {
    return children;
  }

  /** 파일 트리를 방문하면서 폴더 구성 요소의 내용을 Json 구조의 맵으로 출력합니다.
   * @param visitor 비지터 객체
   * @return Json 맵 */
  @Override
  public Map<String, Object> toJson(FileTreeVisitor visitor) {
    return visitor.visit(this);
  }
}