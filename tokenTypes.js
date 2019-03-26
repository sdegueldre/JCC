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
  {typemod: /\b(?:(?:un)?signed|short|long)\b/},  

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
  {stringlit: /"(?:\\\n|\\"|.)*?(?:[^\\])"/},
  {charlit: /'(?:.|\\[abfnrtv'"?0\\]|\\[0-7]{3}|\\x[0-9a-fA-F]{2})'/},

  {wspace: /\s/},
];

module.exports.TOKEN_TYPES = TOKEN_TYPES;
