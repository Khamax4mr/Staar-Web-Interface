package staar.fs.tree;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import staar.fs.common.Const.KEY;


public class FileTreeVisitor {

  public Map<String, Object> visit(FileItem item) {
    final Map<String, Object> jsonMap = new HashMap<>();
    jsonMap.put(KEY.NAME, item.getName());
    jsonMap.put(KEY.PATH, item.getPath());
    jsonMap.put(KEY.IS_DIR, item.isDirectory());
    jsonMap.put(KEY.DATA, item.getData());
    return jsonMap;
  }

  public Map<String, Object> visit(FolderItem item) {
    final Map<String, Object> jsonMap = new HashMap<>();
    jsonMap.put(KEY.NAME, item.getName());
    jsonMap.put(KEY.PATH, item.getPath());
    jsonMap.put(KEY.IS_DIR, item.isDirectory());
      
    final Map<String, Object> data = new LinkedHashMap<>();
    for (FileTreeItem subItem : item.getChildren()) {
      data.put(subItem.name, subItem.toJson(this));
    }
    jsonMap.put(KEY.DATA, data);
    return jsonMap;
  }
}