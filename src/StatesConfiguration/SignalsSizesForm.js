import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useContext, useState } from "react";
import { SignalContext } from "../Contexts/SignalsContext";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

function SignalsSizesForm() {
  const {signals, saveSignals} = useContext(SignalContext);
  const [newSignal, setNewSignal] = useState("");
  const [newSignalSize, setNewSignalSize] = useState(1);
  const [error, setError] = useState(false);
  const generateFormEntries = () => {
    const inputs = [];
    for (const signalName in signals) {
      const signalSize = signals[signalName];
      const input = (
        <FormControl key={signalName}>
          <InputLabel htmlFor={signalName}>{signalName}</InputLabel>
          <OutlinedInput
            id={signalName}
            type="number"
            value={signalSize}
            label={signalName}
            inputProps={{ min: 1 }}
            onChange={({target: {value}}) => {
              const newSignals = {...signals};
              newSignals[signalName] = value;
              saveSignals(newSignals);
            }}
          />
        </FormControl>
      );
      inputs.push(input);
    }
    return inputs;
  };

  return <Stack spacing={2}>
    {generateFormEntries()}
    <Stack direction={"row"} spacing={2}>
      <FormControl>
        <InputLabel htmlFor="new-signal">Nueva Señal</InputLabel>
        <OutlinedInput
          id="new-signal"
          type="text"
          value={newSignal}
          label="Nueva Señal"
          onChange={({target: {value}}) => {
            setNewSignal(value);
            const exist = Object.keys(signals).some((signalName) => {
              return signalName === value;
            });
            setError(exist);
          }}
          error={error}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="new-signal-size">Tamaño</InputLabel>
        <OutlinedInput
          id="new-signal-size"
          type="number"
          value={newSignalSize}
          label="Tamaño"
          inputProps={{ min: 1 }}
          onChange={({target: {value}}) => {
            setNewSignalSize(value);
          }}
        />
      </FormControl>
      <IconButton
        disabled={(!newSignal || error)}
        onClick={() => {
          const newSignals = {...signals};
          newSignals[newSignal] = newSignalSize;
          setNewSignal("");
          setNewSignalSize(1);
          saveSignals(newSignals);      
        }}
        aria-label="Añadir señal"
        title="Añadir señal"
        color="inherit"
      >
        <AddIcon />
      </IconButton>
    </Stack>
  </Stack>;
}

export default SignalsSizesForm;
