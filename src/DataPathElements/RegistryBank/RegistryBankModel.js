import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

const DATA1_PORT = 'Dato1';
const DATA2_PORT = 'Dato2';
const WRITE_REG_PORT = 'EscrReg';
const READ_REG1_PORT = 'Reg. lectura 1';
const READ_REG2_PORT = 'Reg. lectura 2';
const REG_DEST_PORT = 'Reg. escritura';
const DATA_TO_WRITE_PORT = 'Dato a escribir';

class RegistryBankModel extends ElementNode {
  constructor(name = "Banco de registros") {
    super({name, type: 'registryBank'});
    this.registries = new Array(32).fill(''.padStart(32, '0'));
    this.registries[8] = (12).toString(2).padStart(32, '0');
    this.registries[9] = (10).toString(2).padStart(32, '0');
    this.addOutPort(DATA1_PORT, true, 32);
    this.addOutPort(DATA2_PORT, true, 32);
    this.addInPort(WRITE_REG_PORT);
    this.addInPort(READ_REG1_PORT);
    this.addInPort(READ_REG2_PORT);
    this.addInPort(REG_DEST_PORT);
    this.addInPort(DATA_TO_WRITE_PORT);
    this.out1 = undefined;
    this.out2 = undefined;
    makeObservable(this, {
      out1: observable,
      out2: observable,
      registries: observable,
      processState: action
    });
  }

  processState() {
    const writeSignal = this.getPort(WRITE_REG_PORT).getSignal();
    if(writeSignal === '1') {
      const writeAddress = this.getPort(REG_DEST_PORT).getSignal();
      this.colorLinks(REG_DEST_PORT);
      const data = this.getPort(DATA_TO_WRITE_PORT).getSignal();
      this.colorLinks(DATA_TO_WRITE_PORT);
      const index = parseInt(writeAddress, 2);
      this.registries[index] = data;
    } else {
      const readAddress1 = this.getPort(READ_REG1_PORT).getSignal();
      this.colorLinks(READ_REG1_PORT);
      const readAddress2 = this.getPort(READ_REG2_PORT).getSignal();
      this.colorLinks(READ_REG2_PORT);
      const index1 = parseInt(readAddress1, 2);
      const index2 = parseInt(readAddress2, 2);
      this.out1 = this.registries[index1];
      this.out2 = this.registries[index2];
      this.getPort(DATA1_PORT).putSignal(this.out1);
      this.getPort(DATA2_PORT).putSignal(this.out2);
    }
    this.stageProcessed = true;
  }

  getConfigForm(engine) {
    return <>
    <label>
      Out1: {this.out1}
      Out2: {this.out2}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
    {this.registries.map((registry, index) => {
      return <div key={index}>
        {registry}
      </div>
    })}
    </>
  }
}

export default RegistryBankModel;

