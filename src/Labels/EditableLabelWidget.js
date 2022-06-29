import styled from '@emotion/styled';
import { useState } from 'react';

export const Label = styled.div`
	user-select: none;
	pointer-events: auto;
`;

export const EditableLabelWidget = (props) => {
	const [str, setStr] = useState(props.model.value);

	return (
		<Label>
			<input
				value={str}
				onChange={(event) => {
					const newVal = event.target.value;

					// update value both in internal component state
					setStr(newVal);
					// and in model object
					props.model.value = newVal;
				}}
			/>

			<button onClick={() => {}}>Click me!</button>
		</Label>
	);
};