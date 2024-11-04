package staar.filesys;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

/** 파일, 폴더의 생성, 삭제를 다루는 파일 시스템 관리 클래스입니다. */
public final class FileSystemManager {

  /* 파일 생성. */
  private static final String Msg_Dir_Succ = "폴더 [%s] 생성.";                 /* 폴더 생성. */
  private static final String Msg_Dir_Fail = "실패: 동명의 파일이 이미 존재합니다:";  /* 이미 존재하는 파일에 의한 폴더 생성 실패. */
  private static final String Msg_File_Succ = "파일 [%s] 생성.";                /* 파일 생성. */
  private static final String Msg_File_Fail = "실패: 파일이 이미 존재합니다.";      /* 파일 존재. */

  /** path 경로의 폴더를 만듭니다.
   * @param path 경로.
   * @throws FileExistException 이미 존재하는 파일 때문에 폴더를 생성하지 못하면 예외 발생. */
  public static final void makeDirectory(String path) throws FileExistException {
    final File workDir = new File(path);

    if (workDir.exists()) {
      /* 폴더가 이미 있으면 넘어가기. */
      if (workDir.isDirectory()) return;
      /* 폴더가 아닌 파일이 이미 있으면 예외 발생. */
      throw new FileExistException(String.format(Msg_Dir_Fail, path));
    }
    /* 폴더가 없으면 폴더 생성. */
    else {
      System.out.println(String.format(Msg_Dir_Succ, workDir));
      workDir.mkdirs();
    }
  }

  /** path 경로의 파일을 data 내용으로 만듭니다.
   * @param path 경로.
   * @throws FileExistException 이미 존재하는 폴더 때문에 파일을 생성하지 못하면 예외 발생. 
   * @throws IOException 경로가 존재하지 않아서 파일을 생성하지 못하면 예외 발생. */
  public static final void makeFile(String path, List<String> data) throws FileExistException, IOException {
    final File file = new File(path);

    /* 파일이 아닌 폴더가 이미 있으면 예외 발생. */
    if (file.exists() && file.isDirectory()) {
      throw new FileExistException(String.format(Msg_File_Fail, path));
    } else {
      /* 파일 제거. */
      if (file.exists()) {
        removeAll(path);
      }
      
      /* 파일 생성. */
      if (file.createNewFile()) {
        System.out.println(String.format(Msg_File_Succ, path));

        final BufferedWriter writer = new BufferedWriter(new FileWriter(file));
        for (String line : data) {
          writer.write(line);
          writer.newLine();
        }
        writer.flush();
        writer.close();
      }
    }
  }

  /** path에 있는 모든 파일, 폴더를 삭제합니다.
   * @param path 경로. */
  public static final void removeAll(String path) {
    final Stack<File> stack = new Stack<>();
    stack.add(new File(path));

    /* 스택에 있는 모든 파일을 지우기 전까지 작업 반복. */
    while (!stack.isEmpty()) {
      final File f = stack.peek();
      
      /* 파일이면 삭제. */
      if (f.isFile()) {
        f.delete();
        stack.remove(f);
      } else {
        final File[] fileLists = f.listFiles();

        /* 폴더에 파일이 없으면 삭제. */
        if (fileLists.length == 0) {
          f.delete();
          stack.remove(f);
        }
        /* 폴더에 파일이 있으면 포함된 파일들을 스택에 추가. */
        else {
          stack.addAll(new LinkedList<>(Arrays.asList(fileLists)));
        }
      }
    }
  }
}