import { CanvasWidget } from "@projectstorm/react-canvas-core";
import React from "react";
import MultiplexorModel from "./Models/Multiplexor/MultiplexorModel";
import ALUModel from "./Models/ALU/ALUModel";
import RegistryBankModel from "./Models/RegistryBank/RegistryBankModel";
import MemoryBankModel from "./Models/MemoryBank/MemoryBankModel";
import SignExtensorModel from "./Models/SignExtend/SignExtendModel";
import InstructionsMemoryModel from "./Models/InstructionsMemory/InstructionsMemoryModel";
import PCModel from './Models/PC/PCModel';
import AddModel from "./Models/Add/AddModel";
import ConstModel from "./Models/Const/ConstModel";
import ShiftLeftModel from "./Models/ShiftLeft/ShiftLeftModel";
import ALUControlModel from "./Models/ALUControl/ALUControlModel";
import AndModel from "./Models/And/AndModel";
import ControlModel from "./Models/Control/ControlModel";
import ConcatenatorModel from "./Models/Concatenator/ConcatenatorModel";

const models = {
  'ALU': ALUModel,
  'multiplexor': MultiplexorModel,
  'registryBank': RegistryBankModel,
  'memoryBank': MemoryBankModel,
  'signExtend': SignExtensorModel,
  'instructionsMemory': InstructionsMemoryModel,
  'pc': PCModel,
  'add': AddModel,
  'const': ConstModel,
  'shiftLeft': ShiftLeftModel,
  'ALUControl': ALUControlModel,
  'and': AndModel,
  'control': ControlModel,
  'concatenator': ConcatenatorModel
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
            console.log(engine.getModel().serialize());
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
