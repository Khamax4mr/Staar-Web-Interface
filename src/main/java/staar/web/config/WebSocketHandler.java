package staar.web.config;

import java.nio.file.FileAlreadyExistsException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import staar.activelearn.build.InputGenerator;
import staar.activelearn.build.ProgramConfig;
import staar.filesys.FileSystemManager;

public class WebSocketHandler extends TextWebSocketHandler {
  
  private static final String CLIENT_ID = "클라이언트 ID";
  private static final String ERR_RECEIVE = "프로그램 설정 응답을 받지 못했습니다.";
  private static final String MSG_FAIL_INPUT = "[실패] 이미 존재하는 파일.";
  private static final String MSG_SUCC_INPUT = "[성공] 입력 파일 [%s] 생성.";

  private final ObjectMapper mapper = new ObjectMapper();

  /** 클라이언트 연결 성공 알림 발생. */
  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    System.out.println(String.format("%s: %s", CLIENT_ID, session.getId()));
  }

  /** 프로그램 설정 json 수신 시 설정 객체 생성. */
  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
    final JsonNode json = mapper.readTree(msg.getPayload());

    if (json == null) {
      System.out.println(ERR_RECEIVE);
    } else {
      /* 프로그램 설정 json 객체화. */
      final ProgramConfig config = ProgramConfig.builder()
                                                .setProgramDirPath(json.get("programDir").asText())
                                                .setTargetName(json.get("targetName").asText())
                                                .setWorkDirPath(json.get("workDir").asText())
                                                .setBenchmark(json.get("benchmark").asBoolean())
                                                .setNoConst(json.get("noConst").asBoolean())
                                                .setTeacher(json.get("teacher").asText())
                                                .build();
      System.out.println(config.toString());

      /* 작업 폴더에 프로그램 설정 입력 파일 생성. */
      try {
        final String inputPath = String.format("%s/input.txt", config.getWorkDirPath());
        FileSystemManager.makeDirectory(config.getWorkDirPath());
        FileSystemManager.makeFile(inputPath, InputGenerator.getInstance(config).generateInput());
        session.sendMessage(new TextMessage(String.format(MSG_SUCC_INPUT, inputPath)));
      } catch (Exception e) {
        session.sendMessage(new TextMessage(MSG_FAIL_INPUT));
      }
    }
  }
}