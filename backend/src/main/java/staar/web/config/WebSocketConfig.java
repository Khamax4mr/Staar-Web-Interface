package staar.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import staar.web.common.Const.ENDPOINT;
import staar.web.common.Const.HOME;
import staar.web.common.Const.TOPIC;

/* STOMP 웹소켓 통신 환경을 설정하는 클래스입니다. */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  /* STOMP 웹 소켓 통신 연결 엔드 포인트를 /ws로 설정합니다. */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry reg) {
    reg.addEndpoint(ENDPOINT.WS)
       .setAllowedOriginPatterns(HOME.GLOBAL)
       .withSockJS();
  }

  /* /topic의 구독을 대상으로, 클라이언트 / 경로를 목적지로 둔 STOMP 브로커를 구성합니다. */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker(TOPIC.FS, TOPIC.CMD);
    config.setApplicationDestinationPrefixes(HOME.FRONT_HOME_REL);
  }
}