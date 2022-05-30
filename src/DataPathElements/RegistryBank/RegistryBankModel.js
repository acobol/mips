import { action, makeObservable, observable } from "mobx";
import ElementNode from "../../Nodes/ElementNode";

class RegistryBankModel extends ElementNode {
  constructor(name = "Banco de registros") {
    super({name, type: 'registryBank'});
    this.registries = new Array(32).fill(''.padStart(32, '0'));
    this.addOutPort('Dato1', true, 32);
    this.addOutPort('Dato2', true, 32);
    this.escrPort = this.addInPort('EscrReg');
    this.regRead1 = this.addInPort('Reg. lectura 1');
    this.regRead2 = this.addInPort('Reg. lectura 2');
    this.regWrite = this.addInPort('Reg. escritura');
    this.writeData = this.addInPort('Dato a escribir');
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
    const writeSignal = this.escrPort.getSignal();
    if(writeSignal === '1') {
      const writeAddress = this.regWrite.getSignal();
      const data = this.writeData.getSignal();
      const index = parseInt(writeAddress, 2);
      this.registries[index] = data;
    } else {
      const readAddress1 = this.regRead1.getSignal();
      const readAddress2 = this.regRead2.getSignal();
      const index1 = parseInt(readAddress1, 2);
      const index2 = parseInt(readAddress2, 2);
      this.out1 = this.registries[index1];
      this.out2 = this.registries[index2];
    }
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

