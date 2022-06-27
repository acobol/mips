import createEngine, {
  DefaultNodeModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { DeleteItemsAction } from "@projectstorm/react-canvas-core/dist/actions/DeleteItemsAction";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useState } from "react";
import Modal from "react-modal";
import { ControlStateModel } from "./ControlStateModel";
import ControlStateFactory from "./ControlStateFactory";

function StateConfigurationCanvas() {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false });
  engine.getNodeFactories().registerFactory(new ControlStateFactory());
  engine
    .getActionEventBus()
    .registerAction(new DeleteItemsAction({ keyCodes: [46] }));
  engine
    .getStateMachine()
    .getCurrentState().dragNewLink.config.allowLooseLinks = false;
  const diagram = new DiagramModel();
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
      <div id="diagramStateCanvas">
        <CanvasWidget engine={engine}></CanvasWidget>
      </div>
    </>
  );
}

Modal.setAppElement("#root");

function StateConfiguration() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return <>
    <button onClick={openModal}>Edit States Diagram</button>
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <StateConfigurationCanvas></StateConfigurationCanvas>
    </Modal>
  </>
}

export default StateConfiguration;
