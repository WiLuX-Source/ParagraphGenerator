import FileSystemApi from "./filesystem";
const config = FileSystemApi.readconfig();
const input: string = FileSystemApi.readfile(config.input);
const variables: string[] = FileSystemApi.readvariables(config.variables);

try {
  const temptext = input;
  const replacedText = repeatWithVariables(temptext, variables);
  console.log(replacedText);
  FileSystemApi.generateoutput(replacedText, config.output);
} catch (err) {
  console.error("Error:", err);
}

function repeatWithVariables(temptext: string, variables: string[]): string {
  let replacedText = "";
  for (let i = 0; i < variables.length; i++) {
    const lineVariables = variables[i].split(":");
    const lineText = replacePlaceholders(temptext, lineVariables);
    replacedText += lineText + "\n";
  }
  return replacedText;
}

function replacePlaceholders(temptext: string, variables: string[]): string {
  for (let i = 0; i < variables.length; i++) {
    const placeholder = "{" + i + "}";
    temptext = temptext.replace(placeholder, variables[i]);
  }
  return temptext;
}
