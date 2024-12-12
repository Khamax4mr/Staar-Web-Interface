package staar.cmd;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;

public class CMDRunner {
  private SimpMessagingTemplate template;

  public CMDRunner(SimpMessagingTemplate temp) {
    template = temp;
  }

  public void run(List<String> command, String sessionId) {
    
  }
}
