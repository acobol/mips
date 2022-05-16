import { CanvasWidget } from "@projectstorm/react-canvas-core";
import React from "react";
import MultiplexorModel from "./DataPathElements/Multiplexor/MultiplexorModel";
import ALUModel from "./DataPathElements/ALU/ALUModel";
import RegistryBankModel from "./DataPathElements/RegistryBank/RegistryBankModel";
import MemoryBankModel from "./DataPathElements/MemoryBank/MemoryBankModel";
import SignExtensorModel from "./DataPathElements/SignExtend/SignExtendModel";
import InstructionsRegistryModel from "./DataPathElements/InstructionsRegistry/InstructionsRegistryModel";
import PCModel from './DataPathElements/PC/PCModel';
import AddModel from "./DataPathElements/Add/AddModel";
import ConstModel from "./DataPathElements/Const/ConstModel";
import ShiftLeftModel from "./DataPathElements/ShiftLeft/ShiftLeftModel";
import ALUControlModel from "./DataPathElements/ALUControl/ALUControlModel";
import AndModel from "./DataPathElements/And/AndModel";
import ControlModel from "./DataPathElements/Control/ControlModel";
import ConcatenatorModel from "./DataPathElements/Concatenator/ConcatenatorModel";
import OrModel from "./DataPathElements/Or/OrModel";
import RegistryModel from "./DataPathElements/Registry/RegistryModel";

const models = {
  'ALU': ALUModel,
  'multiplexor': MultiplexorModel,
  'registryBank': RegistryBankModel,
  'memoryBank': MemoryBankModel,
  'signExtend': SignExtensorModel,
  'instructionsRegistry': InstructionsRegistryModel,
  'pc': PCModel,
  'add': AddModel,
  'const': ConstModel,
  'shiftLeft': ShiftLeftModel,
  'ALUControl': ALUControlModel,
  'and': AndModel,
  'control': ControlModel,
  'concatenator': ConcatenatorModel,
  'or': OrModel,
  'registry': RegistryModel
}

const Canvas = ({engine}) => {
    return (
      <div
        id="canvas"
        onDrop={(event) => {
          const def = JSON.parse(event.dataTransfer.getData("model-def"));
          const modelConstructor = models[def.type];
          if (modelConstructor) {
            const model = new modelConstructor();
            const point = engine.getRelativeMousePoint(event);
            model.setPosition(point);
            engine.getModel().addNode(model);
            engine.repaintCanvas();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        <CanvasWidget engine={engine}></CanvasWidget>
      </div>
    );
}

export default Canvas;
