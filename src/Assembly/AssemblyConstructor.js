import { useState } from "react";
import { Parser } from "jison";

const grammar = {
  lex: {
    rules: [
      ['\\s+', '/* skip whitespace */'],
      [`#[^\\n]*`,          `/* skip comments */`],
      [
        `\\$(` +
          [
            "zero",
            "at",
            "v0",
            "v1",
            "a0",
            "a1",
            "a2",
            "a3",
            "t0",
            "t1",
            "t2",
            "t3",
            "t4",
            "t5",
            "t6",
            "t7",
            "s0",
            "s1",
            "s2",
            "s3",
            "s4",
            "s5",
            "s6",
            "s7",
            "t8",
            "t9",
            "k0",
            "k1",
            "gp",
            "sp",
            "s8",
            "fp",
            "ra"
          ].join("|") +
          `)`,
        "return 'NAME_REG'"
      ],
      ["(" + ["\\.text", "\\.data"].join("|") + ")", "return 'SEGMENT'"],
      [
        "\\b(" +
          ["add", "sub", "and", "or", "nor", "slt", "lw", "sw", "beq", "j", "addi"]
            .reverse()
            .join("|") +
          ")\\b",
        "return 'OPCODE'"
      ],
      ["[a-zA-Z0-9_]+\\:", `
        yytext = yytext.slice(0, -1);
        return 'LABEL';
      `],
      ["\\d+", "return 'DECIMAL'"],
      ["[a-zA-Z0-9_]+",                "return 'ID'"],
      ["\\(",                  "return '('"],
      ["\\)",                  "return ')'"],
      [",",                    "return ','"],
      ["-",                    "return '-'"]
    ]
  },
  "bnf": {
    "Program":      [["Statements",  "return {type: 'Program', segments: yy.segments, labels: yy.labels, directives: yy.directives}"]],
    "Statements":   ["Statement",
                     "Statements Statement"],
    "Statement":    [["LABEL",                    "yy.handleLabel({type: 'Label', value: $1})"],
                     ["Element",                  "yy.handleElement($1)"]],
    "Element":      [["Instruction",              "$$ = $1"],
                     ["Data",                     "$$ = $1"]],
    "Instruction":  [["OPCODE Operands",          "$$ = {type: 'Instruction', opcode: $1, operands: $2}"]],
    "Operands":     [["Op",                       "$$ = [$1]"],
                     ["Op , Op",                  "$$ = [$1, $3]"],
                     ["Op , Op , Op",             "$$ = [$1, $3, $5]"]],
    "Op":           [["Reg",                      "$$ = $1"],
                     ["AddrImm",                  "$$ = $1"]],
    "Reg":          [["NAME_REG",                 "$$ = {type: 'Register', value: $1, kind: 'Name'}"]],
    "RegAddr":      [["( Reg )",                  "$$ = $2"]],
    "AddrImm":      [["Offset RegAddr",           "$$ = {type: 'Address', offset: $1, base: $2}"],
                     ["RegAddr",                  "$$ = {type: 'Address', offset: 0, base: $1}"],
                     ["Offset",                   "$$ = $1"]],
    "SignConst":    [["Const",                    "$$ = $1"],
                     ["- Const",                  "$$ = {type: 'Unary', 'operator': '-', value: $2}"]],
    "Offset":       [["SignConst",                "$$ = $1"],
                     ["Const + Const",            "$$ = {type: 'Offset', kind: 'offset', base: $1, offset: $3, operator: '+'}"],
                     ["Const - Const",            "$$ = {type: 'Offset', kind: 'offset', base: $1, offset: $3, operator: '-'}"]],
    "Data":         [["DataMode DataList",        "$$ = {type: 'Data', mode: $1, value: $2.length === 1 ? $2[0] : $2}"],
                     [".ascii String",            "$$ = {type: 'Data', mode: $1, value: $2}"],
                     [".asciiz String",           "$$ = {type: 'Data', mode: $1, value: $2}"],
                     [".space Expr",              "$$ = {type: 'Data', mode: $1, value: $2}"]],
    "String":       [["STRING",                   "$$ = {type: 'String', value: $1}"]],
    "DataMode":     [[".byte",                    "$$ = $1"],
                     [".half",                    "$$ = $1"],
                     [".word",                    "$$ = $1"],
                     [".float",                   "$$ = $1"],
                     [".double",                  "$$ = $1"]],
    "DataList":     [["Expr",                     "$$ = [$1]"],
                     ["DataList , Expr",          "$1.push($3); $$ = $1;"]],
    "SegmentDir":   [["SEGMENT OptNumber",  `
      // Record current segment on entering it.
      yy.currentSegment = $1;
      yy.instructionsCount = 0;
      // If address is specified, the segmented starts
      // at that specific memory location.
      const address = $2 ? $2.value : undefined;
      $$ = {
        type: 'Segment',
        value: $1,
        address,
      };
      // Initialize the segment if it's not allocated yet.
      if (!segments[$1]) {
        yy.segments[$1] = {
          address,
          instructions: [],
        };
      }
    `]],
    "SetDir":       [["SET_DIR SetDirArg",        "$$ = {type: 'Directive', kind: 'set', argument: $2}"]],
    "SetDirArg":    [["SET_DIR_ARG",              "$$ = $1"],
                     ["OPCODE",                   "$$ = $1"]],
    "SymbolDir":    [["SYM_GLOB_DIR ID",          "$$ = {type: 'Directive', kind: 'symbol', directive: $1, name: $2}"],
                     ["SYM_CONS_DIR ID , Const",  "$$ = {type: 'Directive', kind: 'symbol', directive: $1, name: $2, value: $4}"]],
    "AlignDir":     [[".align , Expr",            "$$ = {type: 'Directive', kind: 'align', expression: $3}"]],
    "OptNumber":    [["Number",                   "$$ = $1"],
                     ["/* empty */", "$$ = undefined"]],
    "OptID":        [["ID",                       "$$ = $1"],
                     ["/* empty */", "$$ = undefined"]],
    "OptOffset":    [["Offset",                   "$$ = $1"],
                     ["/* empty */",                        "$$ = {type: 'Offset', kind: 'Const', value: 0}"]],
    "Number":       [["DECIMAL",                  "$$ = {type: 'Number', kind: 'decimal', value: Number($1)}"],
                     ["HEXADECIMAL",              "$$ = {type: 'Number', kind: 'hex', value: Number($1), raw: $1}"]],
    "Const":        [["Number",                   "$$ = $1"],
                     ["CHAR",                     "$$ = {type: 'Char', value: $1}"],
                     ["ID",                       "$$ = {type: 'Identifier', value: $1}"]],
  }
};

const parser = new Parser(grammar);
parser.yy = {
  segments: {},
  currentSegment: undefined,
  instructionsCount: 0,
  labels: {},
  directives: [],
  onParseBegin() {
    this.segments = {
      '.text': {
        address: undefined,
        instructions: []
      }
    };
    this.currentSegment = '.text';
    this.instructionsCount = 0;
    this.labels = {};
    this.directives = [];
  },
  handleLabel(label) {
    this.labels[label.value] = {
      address: this.instructionsCount,
      segment: this.currentSegment
    }
  },
  handleElement(element) {
    switch (element.type) {
      case 'Instruction':
        case 'Data':
          this.instructionsCount++;
          this.segments[this.currentSegment].instructions.push(element);
          break;
        case 'Directive':
        case 'Segment':
          this.directives.push(element);
          break;
        default:
          throw new Error('Unexpected statement: ' + element.type);
    }
  }
}

const parse = (text) => {
  parser.yy.onParseBegin();
  return parser.parse(text);
};

export const AssemblyConstructor = ({loadCode}) => {
  const [text, setText] = useState("");
  const [assembled, setAssembled] = useState();
  const [error, setError] = useState('');
  return (
    <div>
      <textarea
        defaultValue={text}
        onChange={({ target: { value } }) => {
          setAssembled(undefined);
          setText(value);
        }}
      ></textarea>
      <button
        onClick={() => {
          try {
            const assembled = parse(text);
            setAssembled(assembled);
            setError("");
          } catch(err) {
            setError(err.message);
          }
        }}
      >
        Assemble
      </button>
      {assembled ? <div>{JSON.stringify(assembled)}</div> : null}
      {error ? <div>{error}</div> : null}
      <button disabled={error || !assembled} onClick={() => {
        loadCode(assembled);
      }}>Cargar Programa</button>
    </div>
  );
};
