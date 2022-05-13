import React, { useEffect, useState } from "react";
import ElementNode from "./Nodes/ElementNode";
import BitsLink from "./Links/BitsLinkModel";
import { observer } from "mobx-react-lite";

const NodeInspector = observer(({ node, engine }) => {
  return (
    <div>
      <label>
        Name
        <input
          type={"text"}
          defaultValue={node.options.name}
          onChange={(event) => {
            event.preventDefault();
            event.stopPropagation();
            node.changeName(event.target.value);
            engine.repaintCanvas();
          }}
        />
      </label>
      <button
        onClick={() => {
          node.addOutPort("");
          engine.repaintCanvas();
        }}
      >
        Add signal
      </button>
      {node.getOutPorts().map((port) => {
        return (
          <div key={port.options.id}>
            <label>
              Signal name
              <input
                type={"text"}
                defaultValue={port.options.name}
                onChange={(event) => {
                  port.changeName(event.target.value);
                  engine.repaintCanvas();
                }}
              />
            </label>
            <label>
              Bits:
              <input
                type={"number"}
                max={32}
                min={0}
                defaultValue={port.bitsNumber}
                onChange={({ target: { value } }) => {
                  const bits = parseInt(value);
                  port.changeBitsNumber(bits);
                  engine.repaintCanvas();
                }}
              />
            </label>
            <button
              onClick={() => {
                node.removePort(port);
                engine.repaintCanvas();
              }}
            >
              Remove signal
            </button>
          </div>
        );
      })}
      {node.getInPorts().map((port) => {
        return (
          <div key={port.options.id}>
            <div>
              In signal: {port.options.name} - {port.bits}
            </div>
          </div>
        );
      })}
    </div>
  );
});

const LinkInspector = observer(({ link, engine }) => {
  return (
    <div>
      <div>Signal bits: {link.bits}</div>
      <div>
        <label>
          From
          <input
            type={"number"}
            min={0}
            max={link.selectedBits.to}
            defaultValue={link.selectedBits.from}
            onChange={({ target: { value } }) => {
              link.changeSelectedBitsFrom(value);
              engine.repaintCanvas();
            }}
          />
        </label>
      </div>
      <div>
        <label>
          To
          <input
            type={"number"}
            min={link.selectedBits.from}
            max={link.bits - 1}
            defaultValue={link.selectedBits.to}
            onChange={({ target: { value } }) => {
              link.changeSelectedBitsTo(value);
              engine.repaintCanvas();
            }}
          />
        </label>
      </div>
    </div>
  );
});

const getForm = (element, engine) => {
  if (element instanceof ElementNode) {
    return <NodeInspector engine={engine} node={element} />;
  }
  if (element instanceof BitsLink) {
    return <LinkInspector link={element} engine={engine} />;
  }
  return "No element selected";
};

const ConfigPanel = ({ diagram, engine }) => {
  const [selectedElement, setSelectedElement] = useState(undefined);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    diagram.registerListener({
      nodesUpdated: ({ node, isCreated }) => {
        if (isCreated) {
          node.registerListener({
            selectionChanged: ({ isSelected }) => {
              if (isSelected) {
                setSelectedElement(node);
              } else {
                setSelectedElement(undefined);
              }
            }
          });
        }
      }
    });
    diagram.registerListener({
      linksUpdated: ({ link, isCreated }) => {
        if (isCreated) {
          link.registerListener({
            selectionChanged: ({ isSelected }) => {
              if (isSelected) {
                setSelectedElement(link);
              } else {
                setSelectedElement(undefined);
              }
            }
          });
        }
      }
    });
  }, [diagram, selectedElement]);
  return (
    <div id="configPanel" className={collapsed ? "collapsed" : ""}>
      <div className="divider" onClick={() => setCollapsed(!collapsed)}>
        <div className="handler-container">
          <div
            className="handler"
            onClick={() => setCollapsed(!collapsed)}
          ></div>
        </div>
      </div>
      <div className="panel">
        {getForm(selectedElement, engine)}
      </div>
    </div>
  );
};

export default ConfigPanel;