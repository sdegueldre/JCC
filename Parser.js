

class Parser {
  constructor(tokens){
    this.tokens = tokens;
    this.AST = [];
  }

  consume(expectedType){
    if(this.peek(expectedType)){
      return this.tokens.shift();
    }
    let filePath = 'test.c';
    throw `Unexpected token in ${filePath}:${this.tokens[0].pos.line}:${this.tokens[0].pos.col}:\n'${this.tokens[0].type}', expected '${expectedType}'`;
  }

  peek(expectedType, offset = 0){
    return expectedType == this.tokens[offset].type;
  }

  parse(){
    while(this.tokens){
      this.AST.push(this.parseDecl());
      console.log(this.AST);
    }
    return this.AST;
  }

  parseDecl(){
    // Struct decl, var decl, union decl, func decl, typedef
    if(this.tokens[0].type == 'typedef'){
      this.AST.push(this.parseTypedef());
      return;
    }
    let type = this.parseType();
    let declNode = {type: '', retType: type.type, identifier: type.identifier};
    if(this.peek('oparen')){
      this.consume('oparen');
      let paramList = [];
      if(!this.peek('cparen'));
        paramList.push(this.parseParam());
      while(this.peek('comma')){
        this.consume('comma');
        paramList.push(this.parseParam());
      }
      this.consume('cparen');
      declNode.type = 'funcDecl';
      declNode.params = paramList;
    } else {
      declNode.type = 'varDecl';
    }
    return (declNode);
  }

  parseParam(){
    return this.parseType();
  }

  parseTypedef(){
    this.consume('typedef');
    let declType = this.parseType();
    let alias = this.consume(identifier).value;
    return ({
      type: 'typedef',
      declType: declType,
      alias: alias
    })
  }

  parseType(){
     /* valid types:
      *   struct ((identifier)|(identifier declaration)|(declaration))
      *   union ((identifier)|(identifier declaration)|(declaration))
      *   (typemod)* identifier ([(int)]|asterisk)*
      *
      **/
    let typemods = [];
    while(this.peek('typemod')){
      typemods.push(this.consume('typemod').value);
    }
    let name = this.consume('identifier').value;
    let qualifiers = [];
    while(this.peek('asterisk')){
      this.consume('asterisk');
      qualifiers.push('pointer')
    }
    let identifier = this.consume('identifier').value;
    while(this.peek('obracket')){
      this.consume('obracket');
      let size = -1;
      if(this.peek('numberlit'))
        size = this.consume('numberlit').value
      this.consume('cbracket');
      if(size == -1)
        qualifiers.push('pointer')
      else
        qualifiers.push('array', size);
    }
    return ({
      identifier: identifier,
      type: {
        typemods: typemods,
        typeName: name,
        qualifiers: qualifiers
      }
    });
  }

}

module.exports.Parser = Parser;
