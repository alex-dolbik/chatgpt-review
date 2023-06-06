I want you to analyze code from github PR. Below you can see the code. If you see "-" at the start of the line it means line was deleted or change on another line. If you see "+" at the start of the line, it means line was added or replaced deleted line.

I'd like you to analyze code and give comments for lines which can be improved.


'-const fn = () => {\n' +
"-  console.log('This is test function');\n" +
"-  console.log('The second log');\n" +
'+const fn = (name, org) => {\n' +
"+  if (name === 'org_name') {\n" +
"+    console.log('This is org name', 'org_name');\n" +
'+  }\n' +
'+\n' +
"+  if (name === 'org_name') {\n" +
"+    console.log('Name is equal', 'org_name');\n" +
'+  }\n' +
'+\n' +
"+  if (org === 'org_name') {\n" +
"+    console.log('Organisation name is:', 'org_name');\n" +
'+  }\n' +
' }\n' +
' \n' +
' export default fn;\n' +


can you provide feedback in format:

[line-number]: comment