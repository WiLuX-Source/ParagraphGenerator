type config = {
  input: string;
  output: string;
  variables: string;
};
import { readFileSync, existsSync, writeFileSync } from "fs";

class FileSystemApi {
  static readfile = (file: string): string => {
    return readFileSync(file, { encoding: "utf8", flag: "r" });
  };
  static readconfig(): config {
    if (existsSync("./config.json")) {
      return JSON.parse(
        readFileSync("./config.json", {
          encoding: "utf8",
          flag: "r",
        })
      );
    } else {
      throw new Error("Couldn't find config.json");
    }
  }
  static readvariables(file: string): string[] {
    if (existsSync(file)) {
      let _ = readFileSync(file, { encoding: "utf8", flag: "r" }).split("\n");
      return _;
    } else {
      throw new Error("Couldn't find variables.");
    }
  }
  static generateoutput(text: string, directory: string) {
    try {
      writeFileSync(directory, text);
    } catch (err) {
      throw err;
    }
  }
}
export default FileSystemApi;
