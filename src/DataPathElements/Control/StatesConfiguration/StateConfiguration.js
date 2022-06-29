import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { DeleteItemsAction } from "@projectstorm/react-canvas-core/dist/actions/DeleteItemsAction";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useState } from "react";
import { ControlStateModel } from "./States/ControlStateModel";
import ControlStateFactory from "./States/ControlStateFactory";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StateLinkFactory from "./Links/StateLinkFactory";
import InPortFactory from "./Ports/InPort/InPortFactory";
import OutPortFactory from "./Ports/OutPort/OutPortFactory";
import { EditableLabelModel } from "../../../Labels/EditableLabelModel";
import { EditableLabelFactory } from "../../../Labels/EditableLabelFactory";

function StateConfigurationCanvas() {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false });
  engine.getNodeFactories().registerFactory(new ControlStateFactory());
  engine
    .getActionEventBus()
    .registerAction(new DeleteItemsAction({ keyCodes: [46] }));
  engine
    .getStateMachine()
    .getCurrentState().dragNewLink.config.allowLooseLinks = false;
  engine.getLinkFactories().registerFactory(new StateLinkFactory());
  engine.getPortFactories().registerFactory(new InPortFactory());
  engine.getPortFactories().registerFactory(new OutPortFactory());
  engine.getLabelFactories().registerFactory(new EditableLabelFactory());
  const node1 = new ControlStateModel({name: "0"});
  node1.setPosition(100, 100);
  const node2 = new ControlStateModel({name: "1"});
  node2.setPosition(300, 100);
  const link = node1.getPort("Out").link(node2.getPort("In"));
  link.addLabel(new EditableLabelModel());
  const diagram = new DiagramModel();
  diagram.addAll(node1, node2, link);
  engine.setModel(diagram);
  return (
    <>
      <button
        onClick={() => {
          const node = new ControlStateModel({
            name: "State",
            colo: "blue"
          });
          node.setPosition(100, 100);
          engine.getModel().addNode(node);
          engine.repaintCanvas();
        }}
      >
        Add State
      </button>
      <button
        onClick={() => {
          debugger;
        }}
      >
        Serialize state machine
      </button>
      <div id="diagramStateCanvas">
        <CanvasWidget engine={engine}></CanvasWidget>
      </div>
    </>
  );
}

function StateConfiguration() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggleModal}>Edit States Diagram</button>
      <Dialog
        open={isOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        fullScreen
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleModal}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="modal-modal-title">Estados de control</DialogTitle>
        <DialogContent dividers>
          <StateConfigurationCanvas></StateConfigurationCanvas>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StateConfiguration;
