import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AppsIcon from '@mui/icons-material/Apps';
import { useContext, useRef, useState } from "react";
import Stencil from "./stencil";
import Canvas from "./canvas";
//import ConfigPanel from "./ConfigPanel";
import { InstructionsManager } from "../Assembly/InstructionsManager";
import { AssemblyConstructor } from "../Assembly/AssemblyConstructor";
import StateConfiguration from "../StatesConfiguration/StateConfiguration";
import { SignalContext } from "../Contexts/SignalsContext";
import { OperationsContext } from "../Contexts/OperationsContext";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { DeleteItemsAction } from "@projectstorm/react-canvas-core/dist/actions/DeleteItemsAction";
import ControlStateFactory from "../StatesConfiguration/States/ControlStateFactory";
import StateLinkFactory from "../StatesConfiguration/Links/StateLinkFactory";
import InPortFactory from "../StatesConfiguration/Ports/InPort/InPortFactory";
import OutPortFactory from "../StatesConfiguration/Ports/OutPort/OutPortFactory";
import { EditableLabelFactory } from "../StatesConfiguration/Labels/EditableLabelFactory";
import StatesDiagram from "../statesDiagram.json";
import Registers from "./Registers";

const drawerWidth = 240;
const registersWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== "stencilOpen" && prop !== "registersOpen"
})(({ theme, stencilOpen, registersOpen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  width: `calc(100% ${stencilOpen ? `- ${drawerWidth}px` : ""} ${
    registersOpen ? `- ${registersWidth}px` : ""
  })`,
  ...(stencilOpen && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(registersOpen && {
    marginRight: `${registersWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const serializeStates = (engine, signalsSizes, operations) => {
  const statesDiagram = {};
  const signals = Object.getOwnPropertyNames(signalsSizes);
  const statesBinaryLength = engine
    .getModel()
    .getNodes()
    .length.toString(2).length;
  engine
    .getModel()
    .getNodes()
    .forEach((node) => {
      const state = {};
      const name = parseInt(node.getOptions().name);
      const binaryName = name.toString(2).padStart(statesBinaryLength, "0");
      const definedSignals = {};
      node.signals.forEach((signal) => {
        definedSignals[signal.name] = signal.value.padStart(
          signalsSizes[signal.name],
          "0"
        );
      });
      signals.forEach((signal) => {
        if (!definedSignals[signal]) {
          definedSignals[signal] = "".padStart(signalsSizes[signal], "X");
        }
      });
      state.signals = definedSignals;
      const port = node.getPort("Out");
      const links = port.getLinks();
      const nextStateMap = {};
      operations.forEach((instruction) => {
        nextStateMap[instruction] = "".padStart(statesBinaryLength, "X");
      });
      for (const linkId in links) {
        const link = links[linkId];
        const label = link.getLabels()[0];
        const nextState = link.getTargetPort().getParent().getOptions().name;
        const nextStateBinary = parseInt(nextState)
          .toString(2)
          .padStart(statesBinaryLength, "0");
        let instructions = label.instructions;
        if (!instructions.length) {
          let found = false;
          let previousNode = node;
          while (!found && parseInt(previousNode.getOptions().name) > 0) {
            const inPort = previousNode.getPort("In");
            const inLinks = Object.keys(inPort.getLinks());
            if (inLinks.length === 1) {
              const inLinkId = inLinks[0];
              const inLink = inPort.getLinks()[inLinkId];
              const previousInstructions = inLink.getLabels()[0].instructions;
              if (previousInstructions.length > 0) {
                instructions = previousInstructions;
                found = true;
              } else {
                previousNode = inLink.getSourcePort().getParent();
              }
            } else {
              found = true;
            }
          }
        }
        if (!instructions.length) {
          operations.forEach((instruction) => {
            nextStateMap[instruction] = nextStateBinary;
          });
        } else {
          instructions.forEach((instruction) => {
            nextStateMap[instruction] = nextStateBinary;
          });
        }
      }
      state.nextState = nextStateMap;
      statesDiagram[binaryName] = state;
    });
  return statesDiagram;
};

const initializeStatesDiagram = () => {
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
  const diagram = new DiagramModel();
  diagram.deserializeModel(StatesDiagram, engine);
  engine.setModel(diagram);
  return engine;
};

function AppContent({ engine }) {
  const [stencilOpen, setStencilOpen] = useState(false);
  const [registersOpen, setRegistersOpen] = useState(false);
  const { signals } = useContext(SignalContext);
  const statesDiagram = useRef(initializeStatesDiagram());
  const { operations, saveOperations } = useContext(OperationsContext);
  const toggleStencil = () => {
    setStencilOpen(!stencilOpen);
  };
  const toggleRegisters = () => {
    setRegistersOpen(!registersOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
        stencilOpen={stencilOpen}
        registersOpen={registersOpen}
      >
        <Toolbar>
          <IconButton
            title="Abrir stencil"
            edge="start"
            color="inherit"
            aria-label="Abrir stencil"
            onClick={toggleStencil}
            sx={{
              marginRight: "36px",
              ...(stencilOpen && { display: "none" })
            }}
          >
            <ModeEditOutlineIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            MIPS
          </Typography>
          <StateConfiguration
            engine={statesDiagram.current}
            saveControlStates={() => {
              const states = serializeStates(
                statesDiagram.current,
                signals,
                operations
              );
              const statesNumber =
                Object.keys(states).length.toString(2).length;
              const firstState = "".padStart(statesNumber, "0");
              const control = engine
                .getModel()
                .getNodes()
                .find((node) => {
                  return node.getOptions().type === "control";
                });
              if (control) {
                control.modifyStates(states, firstState);
                for (const signalName in signals) {
                  const signalSize = signals[signalName];
                  const port = control.getPort(signalName);
                  if (port) {
                    port.changeBitsNumber(signalSize);
                  } else {
                    control.addOutPort(signalName, true, signalSize);
                  }
                }
                engine.repaintCanvas();
              }
            }}
          />
          <IconButton
            onClick={() => {
              engine
                .getModel()
                .getLinks()
                .forEach((link) => {
                  link.getOptions().color = "grey";
                });
              engine
                .getModel()
                .getNodes()
                .forEach((node) => {
                  node.startStage();
                });
              engine
                .getModel()
                .getNodes()
                .forEach((node) => {
                  if (!node.stageProcessed) {
                    node.processState();
                  }
                });
              engine.repaintCanvas();
            }}
            aria-label="Siguiente ciclo"
            title="Siguiente ciclo"
            color="inherit"
          >
            <SkipNextIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              console.log(engine.getModel().serialize());
            }}
            aria-label="Exportar"
            title="Exportar"
            color="inherit"
          >
            <FileDownloadIcon />
          </IconButton>
          <InstructionsManager
            saveInstructions={(instructionsFormats) => {
              const memory = engine
                .getModel()
                .getNodes()
                .find((node) => {
                  return node.getOptions().type === "memoryBank";
                });
              const newOperations = new Set();
              instructionsFormats.instructions.forEach((instruction) => {
                const opcode = instruction.parameters[0].value;
                newOperations.add(opcode);
              });
              saveOperations([...newOperations]);
              if (memory) {
                memory.loadInstructionsFormats(instructionsFormats);
              }
              const states = serializeStates(statesDiagram.current, signals, [
                ...newOperations
              ]);
              const statesNumber =
                Object.keys(states).length.toString(2).length;
              const firstState = "".padStart(statesNumber, "0");
              const control = engine
                .getModel()
                .getNodes()
                .find((node) => {
                  return node.getOptions().type === "control";
                });
              if (control) {
                control.modifyStates(states, firstState);
              }
            }}
          />
          <AssemblyConstructor
            loadCode={(assembledCode) => {
              const memory = engine
                .getModel()
                .getNodes()
                .find((node) => {
                  return node.getOptions().type === "memoryBank";
                });
              if (memory) {
                memory.loadProgram(assembledCode);
              }
            }}
          />
          <IconButton
            title="Abrir registros"
            edge="start"
            color="inherit"
            aria-label="Abrir registros"
            onClick={toggleRegisters}
            sx={{
              marginLeft: "36px",
              ...(registersOpen && { display: "none" })
            }}
          >
            <AppsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={stencilOpen}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1]
          }}
        >
          <IconButton onClick={toggleStencil}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Stencil />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Canvas engine={engine} />
      </Box>
      {/*       <ConfigPanel engine={engine} diagram={engine.getModel()} /> */}
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: registersWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="right"
        open={registersOpen}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            px: [1]
          }}
        >
          <IconButton onClick={toggleRegisters}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Registers engine={engine} />
      </Drawer>
    </Box>
  );
}

export default AppContent;
