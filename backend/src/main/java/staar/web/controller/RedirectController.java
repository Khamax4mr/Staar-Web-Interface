package staar.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import staar.web.common.Const.HOME;

/* 특정 주소를 입력하면 지정한 다른 주소로 연결하는 클래스입니다. */
@Controller
public class RedirectController {
  private static final String command_redirect = "redirect:";

  /** 백엔드 홈 주소 대신 프론트엔드 주소로 이동합니다.
   * @return 프론트엔드 주소. */
  @GetMapping(HOME.BACK_HOME_REL)
  public String redirect() {
    return String.format(command_redirect + HOME.FRONT_HOME_DIR);
  }
}