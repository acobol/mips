import { useState } from "react";

const FIELD_TYPES = ["Registry", "Address", "Label", "Const", "Immediate"];

export const InstructionsForm = ({ formats, saveInstruction }) => {
  const [instructionName, setInstructionName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState([...formats.values()][0]);
  const [parameters, setParameters] = useState([{type: 'Const', value: '', field: 'Opcode'}]);
  return (
    <div>
      <div>
        Nueva instrucción: {instructionName}{" "}
        {parameters
          .filter((param) => param.type !== "Const")
          .map((param) => param.type === 'Registry' ? 'registry' : param.type === 'Address' ? 'offset(registry)' : param.type === 'Immediate' ? 'immediate' : 'label')
          .join(", ")}
      </div>
      <label>
        Instruction name:
        <input
          type={"text"}
          defaultValue={instructionName}
          onChange={({ target: { value } }) => {
            setInstructionName(value);
          }}
        ></input>
      </label>
      <label>
        Format:
        <select
          onChange={({ target: { value } }) => {
            setSelectedFormat(formats.get(value));
          }}
        >
          {[...formats.values()].map((format) => {
            return (
              <option key={format.formatName} value={format.formatName}>
                {format.formatName}
              </option>
            );
          })}
        </select>
      </label>
      {selectedFormat ? (
        <div>
          <button
            disabled={parameters.length >= selectedFormat.fields.length}
            onClick={() => {
              const newParameters = [...parameters];
              newParameters.push({ type: FIELD_TYPES[0] });
              setParameters(newParameters);
            }}
          >
            Add parameter
          </button>
        </div>
      ) : null}
      {parameters.map((parameter, index) => {
        const getOperandPart = (type) => {
          let form;
          switch (type) {
            case "Registry":
              form = (
                <label>
                  Registry field:
                  <select
                    onChange={({ target: { value } }) => {
                      const newParameters = [...parameters];
                      newParameters[index].field = value;
                      setParameters(newParameters);
                    }}
                    defaultValue={parameter.field}
                  >
                    {selectedFormat.fields.map((field) => {
                      return (
                        <option key={field.name} value={field.name}>
                          {field.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              );
              break;
            case "Immediate":
              form = (
                <label>
                  Immediate field:
                  <select
                    onChange={({ target: { value } }) => {
                      const newParameters = [...parameters];
                      newParameters[index].field = value;
                      setParameters(newParameters);
                    }}
                    defaultValue={parameter.field}
                  >
                    {selectedFormat.fields.map((field) => {
                      return (
                        <option key={field.name} value={field.name}>
                          {field.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              );
              break;
            case "Address":
              form = (
                <div>
                  <label>
                    Offset field:
                    <select
                      onChange={({ target: { value } }) => {
                        const newParameters = [...parameters];
                        newParameters[index].offset = value
                        setParameters(newParameters);
                      }}
                      defaultValue={parameter.offset}
                    >
                      {selectedFormat.fields.map((field) => {
                        return (
                          <option key={field.name} value={field.name}>
                            {field.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label>
                    Registry Field:
                    <select
                      onChange={({ target: { value } }) => {
                        const newParameters = [...parameters];
                        newParameters[index].registry = value;
                        setParameters(newParameters);
                      }}
                      defaultValue={parameter.registry}
                    >
                      {selectedFormat.fields.map((field) => {
                        return (
                          <option key={field.name} value={field.name}>
                            {field.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              );
              break;
            case "Label":
              form = (
                <label>
                  Label field:
                  <select
                    onChange={({ target: { value } }) => {
                      const newParameters = [...parameters];
                      newParameters[index].label = value;
                      setParameters(newParameters);
                    }}
                    defaultValue={parameter.label}
                  >
                    {selectedFormat.fields.map((field) => {
                      return (
                        <option key={field.name} value={field.name}>
                          {field.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              );
              break;
            case "Const":
              form = (
                <div>
                  <label>
                    Const value:
                    <input
                      type={"text"}
                      onChange={({ target: { value } }) => {
                        const newParameters = [...parameters];
                        newParameters[index].value = value;
                        setParameters(newParameters);
                      }}
                    ></input>
                  </label>
                  <label>
                    Const field:
                    <select
                      onChange={({ target: { value } }) => {
                        const newParameters = [...parameters];
                        newParameters[index].field = value;
                        setParameters(newParameters);
                      }}
                      defaultValue={parameter.field}
                    >
                      {selectedFormat.fields.map((field) => {
                        return (
                          <option key={field.name} value={field.name}>
                            {field.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              );
              break;
            default:
              break;
          }
          return form;
        };
        return (
          <div key={index}>
            <label>
              Operand type:
              <select
                onChange={({ target: { value } }) => {
                  const newParameters = [...parameters];
                  newParameters[index].type = value;
                  setParameters(newParameters);
                }}
                defaultValue={parameter.type}
              >
                {FIELD_TYPES.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </label>
            {getOperandPart(parameter.type)}
          </div>
        );
      })}
      <button
        onClick={() => {
          saveInstruction({
            instructionName,
            format: selectedFormat.formatName,
            parameters
          });
          setInstructionName("");
          setParameters([{type: 'Const', value: '', field: 'Opcode'}]);
          setSelectedFormat(formats[0]);
        }}
      >
        Add Instruction
      </button>
    </div>
  );
};
