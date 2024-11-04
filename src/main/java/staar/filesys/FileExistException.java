package staar.filesys;

/** 같은 이름의 파일이 존재함을 나타내는 예외 클래스입니다. */
public class FileExistException extends RuntimeException {
  public FileExistException() {
    super();
  }

  public FileExistException(String msg) {
    super(msg);
  }

  public FileExistException(Throwable t) {
    super(t);
  }
  
  public FileExistException(String msg, Throwable t) {
    super(msg, t);
  }
}