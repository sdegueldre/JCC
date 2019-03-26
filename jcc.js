const {Tokenizer} = require('./Tokenizer.js');
const {Parser} = require('./Parser.js');

// argv[0] -> path of node
// argv[1] -> path of script
// argv[2+] -> actual args


// Read file into code variable
const {readFileSync} = require('fs');
const filePath = process.argv[2];
let code = readFileSync(filePath, 'utf8');

let tokenizer = new Tokenizer(code);
let tokens = tokenizer.tokenize();

let parser = new Parser(tokens);
let abstractSyntaxTree = parser.parse();
console.log(abstractSyntaxTree);
