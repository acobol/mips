import { useState } from "react";

export const InstructionsForm = ({formats}) => {
  const [instructionName, setInstructionName] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [parameters, setPatameters] = useState([]);
  return (
    <div>
      <div>
        Nueva instrucción: {instructionName} {parameters.map((param, index) => `param${index + 1}`).join(", ")}
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
        <select onChange={({target: {value}}) => {
          setSelectedFormat(value);
        }}>
          {formats.map((format) => {
            return (
              <option key={format.formatName} value={format}>
                {format.formatName}
              </option>
            );
          })}
        </select>
      </label>
      {selectedFormat ? <div>
        <button disabled={parameters.length >= selectedFormat.fields.length} onClick={() => {
          const newParameters = [...parameters];
          newParameters.push({});
          setPatameters(newParameters);
        }}>Add parameter</button>
      </div> : null}
      {parameters.map((parameter, index) => {
        return <div key={index}>
          <label>
            Field:
            <select onChange={({target: {value}}) => {
              const newParameters = [...parameters];
              newParameters[index].field = value;
              setPatameters(newParameters);
            }} defaultValue={parameter.field}>
              {selectedFormat.fields.map((field) => {
                return <option key={field.name} value={field.name}>{field.name}</option>;
              })}
            </select>
          </label>
        </div>;
      })}
    </div>
  );
};
