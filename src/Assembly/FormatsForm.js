import { useState } from "react";
import { InstructionsForm } from "./InstructionsForm";

const FIELD_TYPES = [
  "opcode",
  "register",
  "funct",
  "shamt",
  "inmmediate",
  "address"
];

export const FormatForms = () => {
  const [formats, setFormats] = useState([]);
  const [formatName, setFormatName] = useState("");
  const [fields, setFields] = useState([]);
  const [instructions, setInstructons] = useState([]);
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
          const type = FIELD_TYPES[0];
          newFields.push({
            bits,
            type
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
                max={31}
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
            <label>
              Field type:
              <select
                onChange={({ target: { value } }) => {
                  const newFields = [...fields];
                  newFields[index].type = value;
                  setFields(newFields);
                }}
                defaultValue={field.type}
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
          </div>
        );
      })}
      <button
        onClick={() => {
          const newFormats = [...formats];
          newFormats.push({
            formatName,
            fields
          });
          setFormats(newFormats);
          setFields([]);
          setFormatName("");
        }}
      >
        Add format
      </button>
      {formats.map((format) => {
        return (
          <div>
            <div>Format: {format.formatName}</div>
            <div>
              Fields:
              {format.fields.map((field, index) => {
                return (
                  <div>
                    Field {index}: start - {field.bits.start} | end -{" "}
                    {field.bits.end}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {formats.length > 0 ? (
        <div>
          <InstructionsForm formats={formats}></InstructionsForm>
        </div>
      ) : null}
    </div>
  );
};
