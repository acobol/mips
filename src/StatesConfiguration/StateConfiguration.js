import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useState } from "react";
import { ControlStateModel } from "./States/ControlStateModel";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SignalsSizesForm from "./SignalsSizesForm";
import { TabPanel } from "../App/TabPanel";

function StateConfigurationCanvas({ engine }) {
  return (
    <>
      <Button
        onClick={() => {
          const node = new ControlStateModel(
            engine.getModel().getNodes().length.toString()
          );
          node.setPosition(100, 100);
          engine.getModel().addNode(node);
          engine.repaintCanvas();
        }}
        variant="contained"
      >
        Add State
      </Button>
      <div id="diagramStateCanvas" style={{ height: "1000px" }}>
        <CanvasWidget engine={engine}></CanvasWidget>
      </div>
    </>
  );
}

function StateConfiguration({ engine, saveControlStates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={toggleModal}
        aria-label="Edit States Diagram"
      >
        <AccountTreeIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="modal-modal-title">Estados de control</DialogTitle>
        <DialogContent dividers>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Estados" />
            <Tab label="Señales" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <StateConfigurationCanvas engine={engine} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SignalsSizesForm />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              saveControlStates();
              toggleModal();
            }}
          >
            Guardar Estados
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StateConfiguration;
