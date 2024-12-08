package staar.fs;

import java.io.File;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import staar.fs.common.Const.TYPE;


/** 파일 검색 시 제외할 이름, 유형 규칙입니다. */
public class ExcludeRule {

  private final List<String> excludedNames = new LinkedList<>();  /* 제외 이름 리스트 */
  private final List<String> excludedTypes = new LinkedList<>();  /* 제외 타입 리스트 */

  /** 제외 이름, 유형 규칙 생성자. */
  public ExcludeRule() {
    excludedNames.clear();
    excludedTypes.clear();
  }

  /** 제외 이름 리스트에 name을 추가합니다.
   * @param name 이름 */
  public void addExcludedName(String name) {
    excludedNames.add(name);
  }

  /** 제외 유형 리스트에 type을 추가합니다.
   * @param type 유형 */
  public void addExcludedType(String type) {
    excludedTypes.add(type);
  }

  /** file의 제외 여부를 반환합니다.
   * @param file 파일 객체
   * @return 제외 여부 */
  public boolean isExcluded(File file) {
    /* 제외 이름 목록에 포함되면 제외 여부 반환. */
    final String name = file.getName();
    if (excludedNames.contains(name)) return true;
    
    /* 제외 유형 목록에 포함되면 제외 여부 반환. */
    final String type = file.isDirectory() ? TYPE.FOLDER : TYPE.FILE;
    if (excludedTypes.contains(type)) return true;
    return false;
  }

  /** 제외 이름 리스트를 반환합니다.
   * @return 제외 이름 리스트 */
  public Collection<String> getExcludedNames() {
    final List<String> result = new LinkedList<>();
    result.addAll(excludedNames);
    return result;
  }

  /** 제외 유형 리스트를 반환합니다.
   * @return 제외 유형 리스트 */
  public Collection<String> getExcludedTypes() {
    final List<String> result = new LinkedList<>();
    result.addAll(excludedTypes);
    return result;
  }
}
