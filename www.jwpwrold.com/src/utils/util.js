export function formartStr(text) {
  if (!text) return "";
  text = text.replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
  return text.replace(/(\r\n|\n|\r)/gm, "<br/>");
}
