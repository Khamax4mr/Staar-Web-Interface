package staar.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import staar.web.common.Const.BackLink;
import staar.web.common.Const.FrontLink;

/* 웹소켓 통신 환경을 설정하는 클래스입니다. */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
  /* /ws 경로의 웹소켓 핸들러를 등록합니다. */
  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry reg) {
    reg.addHandler(new WebSocketHandler(), BackLink.WS_REL).setAllowedOrigins(FrontLink.GLOBAL);
  }
}