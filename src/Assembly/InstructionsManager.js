import { useState } from "react";
import { FormatForms } from "./FormatsForm";
import { InstructionsForm } from "./InstructionsForm";

const FORMATS = new Map();
FORMATS.set("R", {"formatName":"R","fields":[{"name": 'Opcode', "bits": {"start": "31", "end": "26"}}, {"bits":{"start":"25","end":"21"},"name":"rs"},{"bits":{"start":"20","end":"16"},"name":"rt"},{"bits":{"start":"15","end":"11"},"name":"rd"},{"bits":{"start":"10","end":"6"},"name":"shamt"},{"bits":{"start":"5","end": "0"},"name":"funct"}]});
FORMATS.set("I",{"formatName":"I","fields":[{"name": 'Opcode', "bits": {"start": "31", "end": "26"}}, {"bits":{"start":"25","end":"21"},"name":"rs"},{"bits":{"start":"20","end":"16"},"name":"rt"},{"bits":{"start":"15","end": "0"},"name":"immediate"}]});
FORMATS.set("J",{"formatName":"J","fields":[{"name": 'Opcode', "bits": {"start": "31", "end": "26"}}, {"bits":{"start": "25","end": "0"},"name":"address"}]});

const INSTRUCTIONS = new Map();
INSTRUCTIONS.set("add",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"100000"}]});
INSTRUCTIONS.set("sub",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"100010"}]});
INSTRUCTIONS.set("and",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"100100"}]});
INSTRUCTIONS.set("or",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"100101"}]});
INSTRUCTIONS.set("nor",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"100111"}]});
INSTRUCTIONS.set("slt",{"instructionName":"add","format":"R","parameters":[{"type":"Const","value":"000000","field":"Opcode"},{"type":"Registry","field":"rd"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"Const","field":"funct","value":"101010"}]});
INSTRUCTIONS.set("lw",{"instructionName":"lw","format":"I","parameters":[{"type":"Const","value":"100011","field":"Opcode"},{"type":"Registry","field":"rt"},{"type":"Address","offset":"immediate","registry":"rs"}]});
INSTRUCTIONS.set("lw",{"instructionName":"lw","format":"I","parameters":[{"type":"Const","value":"101011","field":"Opcode"},{"type":"Registry","field":"rt"},{"type":"Address","offset":"immediate","registry":"rs"}]});
INSTRUCTIONS.set("beq",{"instructionName":"beq","format":"I","parameters":[{"type":"Const","value":"000100","field":"Opcode"},{"type":"Registry","field":"rs"},{"type":"Registry","field":"rt"},{"type":"AddressOffset","field":"immediate"}]});
INSTRUCTIONS.set("j",{"instructionName":"j","format":"J","parameters":[{"type":"Const","value":"000010","field":"Opcode"},{"type":"Label","field":"address"}]});

export const InstructionsManager = ({saveInstructions}) => {
  const [formats, setFormats] = useState(FORMATS);
  const [instructions, setInstructions] = useState(INSTRUCTIONS);
  return (
    <div>
      <FormatForms
        saveFormat={(format) => {
          const newFormats  = new Map(formats);
          newFormats.set(format.formatName, format);
          setFormats(newFormats);
        }}
      ></FormatForms>
      {formats.size > 0 ? (
        <InstructionsForm
          formats={formats}
          saveInstruction={(instruction) => {
            const newInstructions = new Map(instructions);
            newInstructions.set(instruction.instructionName, instruction);
            setInstructions(newInstructions);
          }}
        ></InstructionsForm>
      ) : null}
      {[...formats].map((format) => {
        return <div>{JSON.stringify(format)}</div>;
      })}
      {[...instructions].map((instruction) => {
        return <div>{JSON.stringify(instruction)}</div>;
      })}
      <button onClick={() => {
        saveInstructions({formats, instructions});
      }}>Save</button>
    </div>
  );
};
