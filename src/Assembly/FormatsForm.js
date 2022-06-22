import { useState } from "react";

export const FormatForms = ({saveFormat}) => {
  const [formatName, setFormatName] = useState("");
  const [fields, setFields] = useState([]);
  return (
    <div>
      <label>
        Format Name:
        <input
          type={"text"}
          defaultValue={formatName}
          onChange={({ target: { value } }) => {
            setFormatName(value);
          }}
        />
      </label>
      <button
        onClick={() => {
          const newFields = [...fields];
          const bits = {
            start: 0,
            end: 0
          };
          newFields.push({
            bits,
          });
          setFields(newFields);
        }}
      >
        Add field
      </button>
      {fields.map((field, index) => {
        return (
          <div key={index}>
            <label>
              Name:
              <input
                type={"text"}
                defaultValue={field.bits.name}
                onChange={({ target: { value } }) => {
                  const newFields = [...fields];
                  newFields[index].name = value;
                  setFields(newFields);
                }}
              />
            </label>
            <label>
              Start:
              <input
                type={"number"}
                min={0}
                max={25}
                defaultValue={field.bits.start}
                onChange={({ target: { value } }) => {
                  const newFields = [...fields];
                  newFields[index].bits.start = value;
                  setFields(newFields);
                }}
              />
            </label>
            <label>
              End:
              <input
                type={"number"}
                min={0}
                max={31}
                defaultValue={field.bits.end}
                onChange={({ target: { value } }) => {
                  const newFields = [...fields];
                  newFields[index].bits.end = value;
                  setFields(newFields);
                }}
              />
            </label>
          </div>
        );
      })}
      <button
        onClick={() => {
          saveFormat({
            formatName,
            fields: [{name: 'Opcode', bits: {start: "31", end: "26"}}, ...fields]
          });
          setFields([]);
          setFormatName("");
        }}
      >
        Add format
      </button>
    </div>
  );
};
