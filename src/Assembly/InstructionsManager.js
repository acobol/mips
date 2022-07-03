import { useState } from "react";
import { FormatForms } from "./FormatsForm";
import { InstructionsForm } from "./InstructionsForm";
import SourceIcon from "@mui/icons-material/Source";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "../App/TabPanel";
import Button from '@mui/material/Button';

const FORMATS = new Map();
FORMATS.set("R", {
  formatName: "R",
  fields: [
    { name: "Opcode", bits: { start: "31", end: "26" } },
    { bits: { start: "25", end: "21" }, name: "rs" },
    { bits: { start: "20", end: "16" }, name: "rt" },
    { bits: { start: "15", end: "11" }, name: "rd" },
    { bits: { start: "10", end: "6" }, name: "shamt" },
    { bits: { start: "5", end: "0" }, name: "funct" }
  ]
});
FORMATS.set("I", {
  formatName: "I",
  fields: [
    { name: "Opcode", bits: { start: "31", end: "26" } },
    { bits: { start: "25", end: "21" }, name: "rs" },
    { bits: { start: "20", end: "16" }, name: "rt" },
    { bits: { start: "15", end: "0" }, name: "immediate" }
  ]
});
FORMATS.set("J", {
  formatName: "J",
  fields: [
    { name: "Opcode", bits: { start: "31", end: "26" } },
    { bits: { start: "25", end: "0" }, name: "address" }
  ]
});

const INSTRUCTIONS = new Map();
INSTRUCTIONS.set("add", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "100000" }
  ]
});
INSTRUCTIONS.set("sub", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "100010" }
  ]
});
INSTRUCTIONS.set("and", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "100100" }
  ]
});
INSTRUCTIONS.set("or", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "100101" }
  ]
});
INSTRUCTIONS.set("nor", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "100111" }
  ]
});
INSTRUCTIONS.set("slt", {
  instructionName: "add",
  format: "R",
  parameters: [
    { type: "Const", value: "000000", field: "Opcode" },
    { type: "Registry", field: "rd" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "Const", field: "funct", value: "101010" }
  ]
});
INSTRUCTIONS.set("lw", {
  instructionName: "lw",
  format: "I",
  parameters: [
    { type: "Const", value: "100011", field: "Opcode" },
    { type: "Registry", field: "rt" },
    { type: "Address", offset: "immediate", registry: "rs" }
  ]
});
INSTRUCTIONS.set("sw", {
  instructionName: "sw",
  format: "I",
  parameters: [
    { type: "Const", value: "101011", field: "Opcode" },
    { type: "Registry", field: "rt" },
    { type: "Address", offset: "immediate", registry: "rs" }
  ]
});
INSTRUCTIONS.set("beq", {
  instructionName: "beq",
  format: "I",
  parameters: [
    { type: "Const", value: "000100", field: "Opcode" },
    { type: "Registry", field: "rs" },
    { type: "Registry", field: "rt" },
    { type: "AddressOffset", field: "immediate" }
  ]
});
INSTRUCTIONS.set("j", {
  instructionName: "j",
  format: "J",
  parameters: [
    { type: "Const", value: "000010", field: "Opcode" },
    { type: "Label", field: "address" }
  ]
});

export const InstructionsManager = ({ saveInstructions }) => {
  const [formats, setFormats] = useState(FORMATS);
  const [instructions, setInstructions] = useState(INSTRUCTIONS);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <IconButton
        onClick={toggleModal}
        aria-label="Formatos e Instrucciones"
        title="Formatos e Instrucciones"
        color="inherit"
      >
        <SourceIcon />
      </IconButton>
      <Dialog open={open} aria-labelledby="modal-modal-title">
        <DialogTitle id="modal-modal-title">
          Generar nuevas instrucciones
        </DialogTitle>
        <DialogContent dividers>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label="Instrucciones" />
            <Tab label="Formatos" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            {formats.size > 0 && (
              <InstructionsForm
                formats={formats}
                saveInstruction={(instruction) => {
                  const newInstructions = new Map(instructions);
                  newInstructions.set(instruction.instructionName, instruction);
                  setInstructions(newInstructions);
                }}
              ></InstructionsForm>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <FormatForms
              saveFormat={(format) => {
                const newFormats = new Map(formats);
                newFormats.set(format.formatName, format);
                setFormats(newFormats);
              }}
            ></FormatForms>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              toggleModal();
              saveInstructions({ formats, instructions });
            }}
          >
            Cargar Instrucciones
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              toggleModal();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
