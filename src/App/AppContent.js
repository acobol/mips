import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Stencil from "./stencil";
import Canvas from "./canvas";
import ConfigPanel from "./ConfigPanel";
import { InstructionsManager } from "../Assembly/InstructionsManager";
import { AssemblyConstructor } from "../Assembly/AssemblyConstructor";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

function AppContent({ engine }) {
  const [stencilOpen, setStencilOpen] = useState(false);
  const toggleStencil = () => {
    setStencilOpen(!stencilOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={stencilOpen}>
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
          <IconButton
            onClick={() => {
              engine.getModel().getNodes().forEach((node) => {
                node.startStage();
              });
              engine.getModel().getNodes().forEach((node) => {
                if (!node.stageProcessed) {
                  node.processState();
                }
              });
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
              const memory = engine.getModel().getNodes().find((node) => {
                return node.getOptions().type === "memoryBank";
              });
              if (memory) {
                memory.loadInstructionsFormats(instructionsFormats);
              }
            }} 
          />
          <AssemblyConstructor loadCode={(assembledCode) => {
            const memory = engine.getModel().getNodes().find((node) => {
              return node.getOptions().type === "memoryBank";
            });
            if (memory) {
              memory.loadProgram(assembledCode);
            }
          }} />
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
      <ConfigPanel engine={engine} diagram={engine.getModel()}/>
    </Box>
  );
}

export default AppContent;
