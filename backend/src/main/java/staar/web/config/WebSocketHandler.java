package staar.web.config;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/* /ws의 웹소켓 통신 동작을 설정하는 클래스입니다. */
public class WebSocketHandler extends TextWebSocketHandler {
  private static final String Msg_Conn = "클라이언트 연결";
  private static final String Msg_Get_Msg = "메세지 수신";

  private static final String Alm_Conn = "서버 연결 성공";
  private static final String Alm_Get_Msg = "서버 응답";

  /** 클라이언트 연결 성공 시 서버 연결 성공 메세지를 출력하고 클라이언트에게 연결 성공을 알립니다. */
  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    System.out.println(String.format("%s: %s", Msg_Conn, session.getId()));
    session.sendMessage(new TextMessage(Alm_Conn));
  }

  /** 텍스트 메세지 수신 시 받은 텍스트 메세지를 출력하고 클라이언트에게 응답한 메세지를 알립니다. */
  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
    System.out.println(String.format("%s: %s", Msg_Get_Msg, msg.getPayload()));
    session.sendMessage(new TextMessage(String.format("%s: %s", Alm_Get_Msg, msg.getPayload())));
  }
}