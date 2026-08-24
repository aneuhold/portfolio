/**
 * Strips YAML front-matter from a provided markdown file string.
 *
 * @param text - The full contents of a markdown file.
 */
export default function stripFrontMatter(text: string) {
  const match = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(text);
  if (match) {
    return text.slice(match[0].length);
  } else {
    return text;
  }
}
