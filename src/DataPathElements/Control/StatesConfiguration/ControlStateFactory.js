import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import {
  DefaultNodeWidget,
  DefaultPortLabel
} from "@projectstorm/react-diagrams";
import { ControlStateModel } from "./ControlStateModel";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { SIGNALS } from "../helpers/states";

const Node = styled.div`
  background-color: ${(p) => p.background};
  border-radius: 5px;
  font-family: sans-serif;
  color: white;
  border: solid 2px black;
  overflow: visible;
  font-size: 11px;
  border: solid 2px ${(p) => (p.selected ? "rgb(0,192,255)" : "black")};
`;

const Title = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  white-space: nowrap;
  justify-items: center;
`;

const TitleName = styled.div`
  flex-grow: 1;
  padding: 5px 5px;
`;

const Ports = styled.div`
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
`;

const PortsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    margin-right: 10px;
  }

  &:only-child {
    margin-right: 0px;
  }
`;

const ControlStateWidget = ({ engine, node }) => {
  const [selectedSignals, setSelectedSignals] = useState([...node.signals]);
  const avaibleSignals = useMemo(() => {
    const signalNames = selectedSignals.map(({ name }) => name);
    return Object.getOwnPropertyNames(SIGNALS).filter((signal) => {
      return !signalNames.includes(signal);
    });
  });
  const [selectedSignal, setSelectedSignal] = useState(avaibleSignals[0]);
  const generatePort = (port) => {
    return <DefaultPortLabel engine={engine} port={port} key={port.getID()} />;
  };
  const generateSignal = (signal, index) => {
    return (
      <div key={signal.name}>
        {signal.name}:{" "}
        <input
          type={"text"}
          defaultValue={signal.value}
          maxLength={SIGNALS[signal.name]}
          onChange={({ target: { value } }) => {
            const newSignals = [...selectedSignals]
            newSignals[index].value = value;
            setSelectedSignals(newSignals);
          }}
        />
      </div>
    );
  };
  useEffect(() => {
    node.registerListener({ selectionChanged: () => {
      node.saveSignals([...selectedSignals]);
    } });
  }, [node]);

  return (
    <Node
      data-default-node-name={node.getOptions().name}
      selected={node.isSelected()}
      background={node.getOptions().color}
    >
      <Title>
        <TitleName>{node.getOptions().name}</TitleName>
      </Title>
      <Ports>
        <PortsContainer>{node.getInPorts().map(generatePort)}</PortsContainer>
        <PortsContainer>{node.getOutPorts().map(generatePort)}</PortsContainer>
      </Ports>
      {selectedSignals.map(generateSignal)}
      {node.isSelected() && (
        <div>
          <select
            onChange={({ target: { value } }) => {
              setSelectedSignal(value);
            }}
            defaultValue={selectedSignal}
          >
            {avaibleSignals.map((signal) => {
              return <option key={signal}>{signal}</option>;
            })}
          </select>
          <button
            onClick={() => {
              const signal = {
                name: selectedSignal,
                value: "".padStart(SIGNALS[selectedSignal], "0")
              };
              node.addSignal(signal);
              setSelectedSignals([...selectedSignals, signal]);
              const nextSignal = avaibleSignals.find(
                (signal) => signal !== selectedSignal
              );
              setSelectedSignal(nextSignal);
            }}
          >
            Add Signal
          </button>
        </div>
      )}
    </Node>
  );
};

class ControlStateFactory extends AbstractReactFactory {
  constructor() {
    super("state");
  }

  generateReactWidget(event) {
    return (
      <ControlStateWidget
        engine={this.engine}
        size={50}
        node={event.model}
      ></ControlStateWidget>
    );
  }

  generateModel(event) {
    return new ControlStateModel();
  }
}

export default ControlStateFactory;
