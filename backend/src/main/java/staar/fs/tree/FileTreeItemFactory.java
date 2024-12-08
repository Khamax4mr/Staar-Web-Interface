package staar.fs.tree;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import staar.fs.ExcludeRule;


/** 주어진 파일을 적절한 파일 트리 구성 요소로 반환하는 팩토리입니다. */
public class FileTreeItemFactory {

  private final static String Msg_No_File = "존재하지 않는 파일";
  private final static String Msg_No_Readable = "파일을 읽을 수 없음";

  private ExcludeRule excludeRule;  /* 제외 규칙 */

  /** 파일 트리 구성 요소 팩토리 생성자. */
  public FileTreeItemFactory() {
    excludeRule = null;
  }

  /** 파일 트리 구성 요소 팩토리 생성자. 제외 규칙을 rule로 설정합니다.
   * @param rule 제외 규칙 * */
  public FileTreeItemFactory(ExcludeRule rule) {
    excludeRule = rule;
  }

  /** file을 파일 트리 구성 요소로 반환합니다.
   * @param file 파일 객체
   * @return 파일 트리 구성 요소 */
  public FileTreeItem createItem(File file) {
    /* 파일 객체가 없거나 존재하지 않는 파일이면 작업 무효. */
    if (file == null || !file.exists()) {
      System.out.println(Msg_No_File);
      return null;
    }
    /* 폴더라면 폴더 구성 요소 반환. */
    else if (file.isDirectory()) {
      final FolderItem item = new FolderItem(file);
      final List<File> sortedFiles = new ArrayList<>();
      sortedFiles.addAll(Arrays.asList(file.listFiles()));
      Collections.sort(sortedFiles);

      /* 하위 파일 구성 요소 추가. */
      for (File subFile : sortedFiles) {
        if (excludeRule.isExcluded(subFile)) continue;
        if (subFile.isDirectory()) {
          item.addChild(new FolderItem(subFile));
        } else {
          item.addChild(new FileItem(subFile));
        }
      }
      return item;
    }
    /* 파일이면 파일 구성 요소 반환. */
    else {
      final FileItem item = new FileItem(file);
      
      try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        item.addData(reader.lines().toList());
        reader.close();
      } catch (IOException e) {
        System.out.println(Msg_No_Readable);
        e.printStackTrace();
      }
      return item;
    }
  }
}