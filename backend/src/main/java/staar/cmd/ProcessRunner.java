package staar.cmd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import staar.web.common.Const.ENDPOINT;
import staar.web.common.Const.TOPIC;


/** 터미널에서 명령어를 수행하는 프로세스 수행 클래스입니다. */
@Service
public class ProcessRunner {

  private SimpMessagingTemplate template;
  
    public ProcessRunner(SimpMessagingTemplate temp) {
      template = temp;
    }
  
    private static final String Msg_Succ = "process [%s] running complete.";  /* 프로세스 실행 성공. */
    private static final String Msg_Fail = "process [%s] running failed.";    /* 프로세스 실행 실패. */
    private static final String Msg_Abort = "process [%s] interrupted.";      /* 프로세스 중단. */
  
    /** 터미널에서 args를 입력하여 프로세스를 수행하고 화면에 나타난 출력문을 반환합니다.
     * @param args 명령어.
     * @return 명령어 실행으로 발생한 출력문 리스트. */
    @Async
    public void execute(String[] args, String sessionId) {
      final List<String> output = new LinkedList<>();
      final String progName = args[0];
  
      try {
        final ProcessBuilder builder = new ProcessBuilder(args);
        builder.redirectErrorStream(true);
  
        /* 프로세스 수행 출력문 기록. */
        final Process process = builder.start();
        final BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
  
        String line = null;
        while ((line = reader.readLine()) != null) {
          // output.add(line);
          template.convertAndSendToUser(sessionId, ENDPOINT.ACTIVE_LEARN, line);
      }
      process.waitFor();
      reader.close();
      System.out.println(String.format(Msg_Succ, progName));
    }
    /* 프로세스 실행을 실패하거나 출력문 결과를 가져오지 못하면 예외 발생. */
    catch (IOException e) {
      System.out.println(String.format(Msg_Fail, progName));
    }
    /* 프로세스 실행이 중단 되어 예외 발생. */
    catch (InterruptedException e) {
      System.out.println(String.format(Msg_Abort, progName));
    }
    // return output;
  }
}