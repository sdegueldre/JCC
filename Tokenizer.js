const {TOKEN_TYPES} = require('./tokenTypes.js');

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

        // Save and advance cursor
        let pos = {line: this.cursor.line, col: this.cursor.col};
        if(type == 'mlinecom'){
          let lines = match[0].split('\n')
          this.cursor.line += lines.length - 1;
          if(lines.length != 1)
            this.cursor.col = 1;
          this.cursor.col += lines[lines.length-1].length;
        } else if(match[0] == '\n'){
          this.cursor.line++;
          this.cursor.col = 1;
        } else {
          this.cursor.col += match[0].length;
        }

        let value = match[0];
        if(type == 'charlit' || type == 'stringlit')
          value = this.unescapeString(match[0]);
        return ({type: type, value: value, pos: pos});
      }
    }
    console.log(this.tokens);
    let lastLine = code.split('\n')[this.cursor.line-1];
    let cursorLine = lastLine.substring(0, this.cursor.col-1).replace(/[^\t]/g, ' ')+'^';
    console.log({x: lastLine, y: cursorLine});
    let filePath = 'test.c';
    throw `Couldn't match token at ${filePath}:${this.cursor.line}:${this.cursor.col}\n${lastLine}\n${cursorLine}`;
  }

  tokenize(){
    while(this.code){
      let token = this.extractToken();
      if(token.type != 'wspace')
        this.tokens.push(token);
    }
    return this.tokens;
  }

  unescapeString(string){
    const escapeSequences = [
      {esc: /\\a/g, char: '\a'},
      {esc: /\\b/g, char: '\b'},
      {esc: /\\f/g, char: '\f'},
      {esc: /\\\n/g, char: '\n'},
      {esc: /\\r/g, char: '\r'},
      {esc: /\\t/g, char: '\t'},
      {esc: /\\v/g, char: '\v'},
      {esc: /\\"/g, char: '"'},
      {esc: /\\'/g, char: "'"},
      {esc: /\\\?/g, char: '?'},
      {esc: /\\0/g, char: '\0'},
      {esc: /\\\\/g, char: '\\'},
      {esc: /\\x([0-9a-fA-F]{2})/g, char: '0x$1'},
      {esc: /\\([0-7]{3})/g, char: '0$1'},
    ];
    for(let sequence of escapeSequences){
      if(sequence.char == '0x$1'){
        string = string.replace(sequence.esc, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
      } else if(sequence.char == '0$1'){
        string = string.replace(sequence.esc, (match, p1) => String.fromCharCode(parseInt(p1, 8)));
      } else {
        string = string.replace(sequence.esc, sequence.char);
      }
    }
    return string;
  }
}

module.exports.Tokenizer = Tokenizer;
