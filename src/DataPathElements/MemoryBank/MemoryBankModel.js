import ElementNode from "../../Nodes/ElementNode";

class MemoryBankModel extends ElementNode {
  constructor(name = "Memoria") {
    super({name, type: 'memoryBank'});
    this.memory = [];
    this.datoInst = this.addOutPort('Dato/Instrucción', true, 32);
    this.address = this.addInPort('Dirección');
    this.dataToWrite = this.addInPort('Dato a escribir');
    this.readMem = this.addInPort('LeerMem');
    this.writeMem = this.addInPort('EscrMem');
    this.out = undefined;
  }

  loadProgram(program) {
    
  }

  processState() {
    const writeSignal = this.writeMem.getSignal();
    const readSignal = this.readMem.getSignal();
    const address = this.address.getSignal();
    if(writeSignal === '1') {
      const data = this.dataToWrite.getSignal();
      const index = parseInt(address, 2);
      this.registries[index] = data;
    } 
    if(readSignal === '1') {
      const index = parseInt(address, 2);
      this.out = this.registries[index];
    }
  }

  getConfigForm(engine) {
    return <>
    <label>
      Out1: {this.out}
      <button onClick={() => {
        this.processState();
      }}>Next state</button>
    </label>
    {this.memory.map((data, index) => {
      return <div key={index}>
        {data}
      </div>
    })}
    </>
  }
}

export default MemoryBankModel;

