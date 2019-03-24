// argv[0] -> path of node
// argv[1] -> path of script
// argv[2+] -> actual args


// Read file into code variable
const {readFileSync} = require('fs');
const filePath = process.argv[2];
let code = readFileSync(filePath, 'utf8');

const TOKEN_TYPES = [
  // Keywords
  {if: /\bif\b/},
  {else: /\belse\b/},

  {goto: /\bgoto\b/},

  {switch: /\bswitch\b/},
  {case: /\bcase\b/},
  {default: /\bdefault\b/},

  {do: /\bdo\b/},
  {while: /\bwhile\b/},
  {for: /\bfor\b/},
  {continue: /\bcontinue\b/},
  {break: /\bbreak\b/},

  {typedef: /\btypedef\b/},
  {struct: /\bstruct\b/},
  {union: /\bunion\b/},
  {enum: /\benum\b/},

  {return: /\breturn\b/},
  {sizeof: /\bsizeof\b/},

  {const: /\bconst\b/},
  {static: /\bstatic\b/},
  {volatile: /\bvolatile\b/},
  {extern: /\bextern\b/},

  // Identifiers and literals
  {identifier: /\b[A-Za-z_]\w*\b/},
  {numberlit: /\b((?:0x[0-9a-fA-F]+)|(?:[0-9]*\.?[0-9]+))\b/},

  // Punctuation
  {oparen: /\(/},
  {cparen: /\)/},
  {obrace: /\{/},
  {cbrace: /\}/},
  {obracket: /\[/},
  {cbracket: /\]/},
  {semicolon: /;/},
  {comma: /,/},

  // Comments
  {slinecom: /\/\/.*/},
  {mlinecom: /\/\*(?:.|\n)*?\*\//},

  // Operators

  // Three char
  {lshiftequal: /<<=/},
  {rshiftequal: />>=/},

  // Two char
  {plusequal: /\+=/},
  {minusequal: /-=/},
  {divideequal: /\//},
  {timesequal: /\*=/},
  {modequal: /%=/},

  {increment: /\+\+/},
  {decrement: /--/},

  {orequal: /\|=/},
  {andequal: /\&=/},
  {xorequal: /\^=/},

  {doublequal: /==/},
  {notequal: /!=/},
  {greaterequal: />=/},
  {lessthanequal: /<=/},

  {logicaland: /&&/},
  {logicalor: /\|\|/},

  {lshift: /<</},
  {rshift: />>/},

  {arrow: /->/},

  // Single char
  {ampersand: /\&/},
  {asterisk: /\*/},
  {dot: /\./},

  {plus: /\+/},
  {minus: /-/},
  {divide: /\//},
  {equal: /=/},

  {logicalnot: /!/},
  {binaryor: /\|/},
  {binaryxor: /\^/},
  {ochevron: /</},
  {cchevron: />/},

  // Strings and characters
  {string: /"(?:\\\n|.)*?"/},
  {character: /'(?:.|\\[abfnrtv'"?0\\]|\\[0-7]{3}|\\x[0-9a-fA-F]{2})'/},

  {wspace: /\s/},
];



class Tokenizer {
  constructor(code){
    this.code = code;
    this.tokens = [];
    this.cursor = {
      col: 1,
      line: 1
    }
  }

  extractToken(){
    for(let token of TOKEN_TYPES){
      let type = Object.keys(token)[0];
      let value = Object.values(token)[0].source;
      let re = new RegExp("^" + value);
      let match = this.code.match(re);
      if(match){
        // Remove matched code
        this.code = this.code.substring(match[0].length);

        // Adjust cursor
        if(type == 'mlinecom'){
          let lines = match[0].split('\n')
          this.cursor.line += lines.length - 1;
          this.cursor.col = lines[lines.length-1].length+1;
        } else if(match[0] == '\n'){
          this.cursor.line++;
          this.cursor.col = 1;
        } else {
          this.cursor.col += match[0].length;
        }

        if(type == 'string'){
          match[0] = match[0].replace(/\\\n/g, '');
        }

        return ({type: type, value: match[0]});
      }
    }
    console.log(this.tokens);
    let lastLine = code.split('\n')[this.cursor.line-1];
    let cursorLine = lastLine.replace(/[^\t]/g, ' ').substring(0, this.cursor.col-1)+'^';
    console.log({x: lastLine, y: cursorLine});
    throw `Couldn't match token at ${filePath}:${this.cursor.line}:${this.cursor.col}\n${lastLine}\n${cursorLine}`;
  }

  tokenize(){
    while(this.code){
      let token = this.extractToken();
      this.tokens.push(token);
    }
    return this.tokens;
  }
}

class Parser {
  constructor(tokens){
    this.tokens = tokens;

  }

  parse(){

  }
}

let tokenizer = new Tokenizer(code);
let tokens = tokenizer.tokenize();
for(let token of tokens){
  if(token.type != 'wspace')
    console.log(token.value);
}
