import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { OperationsContext } from "../../Contexts/OperationsContext";

export const Label = styled.div`
  user-select: none;
  pointer-events: auto;
`;


export const EditableLabelWidget = (props) => {
  const [value, setValue] = useState(props.model.instructions);
  const {operations} = useContext(OperationsContext);
  const [selectedInstruction, setSelectedInstruction] = useState(
    operations[0]
  );

  return (
    <Label>
      {props.model.parent.isSelected() && (
        <>
          <select
            defaultValue={selectedInstruction}
            onChange={({ target: { value } }) => {
              setSelectedInstruction(value);
            }}
          >
            {operations.map((instruction) => {
              return (
                <option key={instruction} value={instruction}>
                  {instruction}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => {
              const newValue = [...value];
              newValue.push(selectedInstruction);
              props.model.instructions.push(selectedInstruction);
              setValue(newValue);
            }}
          >
            Añadir instrucción
          </button>
        </>
      )}
      {value.join(" | ")}
    </Label>
  );
};
