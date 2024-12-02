package staar.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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

  @MessageMapping(ENDPOINT.ACTIVE_LEARN)
  @SendTo(TOPIC.CMD)
  public String requestActiveLearn(String msg) {
    System.out.println(String.format(Msg_Publish, ENDPOINT.ACTIVE_LEARN, TOPIC.CMD));

    /* path 키 값이 없으면 null을 반환하며 종료. */
    final Map<String, Object> json = convert2Map(msg);
    if (!json.containsKey(KEY.CMD)) return null;

    /* 직접 하위 폴더 이름 찾기. */
    final String path = json.get(KEY.CMD).toString();
    final String cmd = "nohup alearner -i " + path + "/input.txt";

    /* 로그가 전부 출력되지 않음. */
    /* 내버려두면 끝까지 동작은 하나 프로세스를 기다리는지 확인 필요. */
    /* 음.. */
    final List<String> res = new ArrayList<>();
    res.addAll(ProcessRunner.execute(cmd.split(" ")));
    System.out.println(res);

    /* 클라이언트에게 보낼 메세지 구성. */
    final Map<String, Object> result = new HashMap<>();
    result.put(KEY.LOG, res);

    /* 구독 클라이언트에게 직접 메세지 전달. */
    try {
      final ObjectMapper mapper = new ObjectMapper();
      return mapper.writeValueAsString(result);
    } catch (JsonProcessingException e) {
      System.out.println("error");
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
