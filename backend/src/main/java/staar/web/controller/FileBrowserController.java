package staar.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import staar.fs.ExcludeRule;
import staar.fs.FileBrowser;
import staar.fs.common.Const.PATH;
import staar.fs.common.Const.TYPE;
import staar.fs.tree.FileItem;
import staar.fs.tree.FileTreeItemFactory;
import staar.fs.tree.FileTreeVisitor;
import staar.fs.tree.FolderItem;
import staar.web.common.Const.ENDPOINT;
import staar.web.common.Const.KEY;
import staar.web.common.Const.TOPIC;

/** 파일 탐색기 사용 요청 동작을 담당하는 컨트롤러 클래스입니다. */
@Controller
public class FileBrowserController {

  private final static String Msg_Publish = "엔드 포인트 %s로 %s 토픽 메세지 발생";
  private final static String Err_Processing = "Json 형식 구성 오류 발생";

  /** msg에서 path 키의 값에 해당하는 경로의 직접 하위 폴더 이름을 반환합니다.
   * /fs를 구독한 클라이언트를 대상으로 /fs/dir-folder 엔드 포인트 동작을 수행합니다.
   * @param msg Json 형식 문자열
   * @return 폴더 이름 목록 Json 형식 문자열 */
  @MessageMapping(ENDPOINT.DIR_FOLDER)
  @SendTo(TOPIC.FS)
  public String getDirectFolder(String msg) {
    System.out.println(String.format(Msg_Publish, ENDPOINT.DIR_FOLDER, TOPIC.FS));

    /* path 키 값이 없으면 null을 반환하며 종료. */
    final Map<String, Object> json = convert2Map(msg);
    if (!json.containsKey(KEY.PATH)) return null;

    /* 파일을 찾을 수 없으면 null을 반환하며 종료. */
    final String path = json.get(KEY.PATH).toString();
    final File targetFile = FileBrowser.getInstance().search(path);
    if (targetFile == null) return null;

    /* 제외 목록 구성. */
    final ExcludeRule rule = new ExcludeRule();
    rule.addExcludedName(PATH.COMMON);
    rule.addExcludedName(PATH.CODE);
    rule.addExcludedType(TYPE.FILE);

    /* 폴더 구성 요소를 만들지 못하면 null을 반환하며 종료. */
    final FolderItem targetItem = (FolderItem)new FileTreeItemFactory(rule).createItem(targetFile);
    if (targetItem == null) return null;
    
    /* 직접 하위 파일 목록 기록. */
    final Map<String, Object> result = new HashMap<>();
    result.putAll(targetItem.toJson(new FileTreeVisitor()));

    /* 구독 클라이언트에게 직접 하위 폴더 이름 리스트 메세지 전달. */
    try {
      final ObjectMapper mapper = new ObjectMapper();
      return mapper.writeValueAsString(result);
    } catch (JsonProcessingException e) {
      System.out.println(Err_Processing);
      e.printStackTrace();
      return null;
    }
  }

 /** msg에서 path 키의 값에 해당하는 경로의 파일을 반환합니다.
   * /fs를 구독한 클라이언트를 대상으로 /fs/file 엔드 포인트 동작을 수행합니다.
   * @param msg Json 형식 문자열
   * @return 폴더 이름 목록 Json 형식 문자열 */
  @MessageMapping(ENDPOINT.FILE)
  @SendTo(TOPIC.FS)
  public String getFile(String msg) {
    System.out.println(String.format(Msg_Publish, ENDPOINT.FILE, TOPIC.FS));

    /* path 키 값이 없으면 null을 반환하며 종료. */
    final Map<String, Object> json = convert2Map(msg);
    if (!json.containsKey(KEY.PATH)) return null;

    /* 파일을 찾을 수 없으면 null을 반환하며 종료. */
    final String path = json.get(KEY.PATH).toString();
    final File targetFile = FileBrowser.getInstance().search(path);
    if (targetFile == null) return null;

    /* 파일 구성 요소를 만들지 못하면 null을 반환하며 종료. */
    final FileItem targetItem = (FileItem)new FileTreeItemFactory().createItem(targetFile);
    if (targetItem == null) return null;

    /* 파일 정보 기록. */
    final Map<String, Object> result = new HashMap<>();
    result.putAll(targetItem.toJson(new FileTreeVisitor()));

    /* 구독 클라이언트에게 파일 메세지 전달. */
    try {
      final ObjectMapper mapper = new ObjectMapper();
      return mapper.writeValueAsString(result);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
      return null;
    }
  }

  /** Json 형식 문자열 msg를 Json 키, 값에 대응하는 <String, Object> 맵으로 변환합니다.
   * @param msg Json 형식 문자열
   * @return <String, Object> 맵 */
  private Map<String, Object> convert2Map(String msg) {
    final Map<String, Object> map = new HashMap<>();
    try {
      final ObjectMapper mapper = new ObjectMapper();
      // mapper.readTree
      map.putAll(mapper.readValue(msg, new TypeReference<Map<String, Object>>(){}));
    } catch (JsonMappingException e) {
      e.printStackTrace();
      return null;
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      return null;
    }
    return map;
  }
}