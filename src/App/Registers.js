import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { observer } from "mobx-react-lite";

const REGISTERS = [
  "$zero",
  "$at",
  "$v0",
  "$v1",
  "$a0",
  "$a1",
  "$a2",
  "$a3",
  "$t0",
  "$t1",
  "$t2",
  "$t3",
  "$t4",
  "$t5",
  "$t6",
  "$t7",
  "$s0",
  "$s1",
  "$s2",
  "$s3",
  "$s4",
  "$s5",
  "$s6",
  "$s7",
  "$t8",
  "$t9",
  "$k0",
  "$k1",
  "$gp",
  "$sp",
  "$fp",
  "$ra"
];

function Registers({ engine }) {
  const getElement = (type) => {
    return engine
      .getModel()
      .getNodes()
      .find((node) => {
        return node.getOptions().type === type;
      });
  };

  const registries = getElement("registryBank").registries;
  const pcAddress = getElement("pc").currentAddress;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre de registro</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>PC</TableCell>
            <TableCell>{pcAddress}</TableCell>
          </TableRow>
          {registries.map((registry, index) => {
            return (
              <TableRow key={REGISTERS[index]}>
                <TableCell>{REGISTERS[index]}</TableCell>
                <TableCell>{registry}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default observer(Registers);
