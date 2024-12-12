package staar.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import staar.cmd.ProcessRunner;
import staar.web.common.Const.ENDPOINT;
import staar.web.common.Const.KEY;
import staar.web.common.Const.TOPIC;

@Controller
public class CMDRunnerController {
  private final static String Msg_Publish = "엔드 포인트 %s로 %s 토픽 메세지 발생";
  private final static String Cmd_Active_Learn = "alearner -i %s/input.txt";

  private final ProcessRunner runner;

  @Autowired
  public CMDRunnerController(ProcessRunner temp) {
    runner = temp;
  }

  @MessageMapping(ENDPOINT.ACTIVE_LEARN)
  @SendTo(TOPIC.CMD)
  public void requestActiveLearn(@Payload String msg, SimpMessageHeaderAccessor accessor) {
    System.out.println(String.format(Msg_Publish, ENDPOINT.ACTIVE_LEARN, TOPIC.CMD));

    /* cmd 키 값이 없으면 null을 반환하며 종료. */
    final Map<String, Object> json = convert2Map(msg);
    if (!json.containsKey(KEY.CMD)) return;

    /* 명령어, 세션 번호 설정. */
    final String path = json.get(KEY.CMD).toString();
    final String cmd = String.format(Cmd_Active_Learn, path);
    final String sessionId = accessor.getSessionId();

    /* 비동기 명령어 실행. */
    // final List<String> res = new ArrayList<>();
    new Thread(() -> {
      runner.execute(cmd.split(" "), sessionId);
    }).start();
  }

  /** Json 형식 문자열 msg를 Json 키, 값에 대응하는 <String, Object> 맵으로 변환합니다.
   * @param msg Json 형식 문자열
   * @return <String, Object> 맵 */
  private Map<String, Object> convert2Map(String msg) {
    final Map<String, Object> map = new HashMap<>();
    try {
      final ObjectMapper mapper = new ObjectMapper();
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