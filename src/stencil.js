import { useState } from "react";

function Stencil() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div id="stencil" className={collapsed ? "collapsed" : ""}>
      <div className="panel">
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "multiplexor" })
            );
          }}
        >
          Multiplexor
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "ALU" })
            );
          }}
        >
          ALU
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "registryBank" })
            );
          }}
        >
          Registry Bank
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "memoryBank" })
            );
          }}
        >
          Memory Bank
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "signExtend" })
            );
          }}
        >
          Sign Extend
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "instructionsRegistry" })
            );
          }}
        >
          Instruction Memory
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "pc" })
            );
          }}
        >
          PC
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "add" })
            );
          }}
        >
          Add
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "const" })
            );
          }}
        >
          Const
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "shiftLeft" })
            );
          }}
        >
          Shift Left
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "ALUControl" })
            );
          }}
        >
          ALU Control
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "and" })
            );
          }}
        >
          And
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "or" })
            );
          }}
        >
          Or
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "control" })
            );
          }}
        >
          Control
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "concatenator" })
            );
          }}
        >
          Concatenator
        </div>
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "model-def",
              JSON.stringify({ type: "registry" })
            );
          }}
        >
          Registry
        </div>
      </div>
      <div className="divider" onClick={() => setCollapsed(!collapsed)}>
        <div className="handler-container">
          <div className="handler" onClick={() => setCollapsed(!collapsed)}></div>
        </div>
      </div>
    </div>
  );
}

export default Stencil;
