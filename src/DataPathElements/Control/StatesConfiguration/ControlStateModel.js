import { DefaultNodeModel } from "@projectstorm/react-diagrams";

export class ControlStateModel extends DefaultNodeModel {
  constructor({name}) {
      super({
          name,
          type: 'state'
      });
      this.addInPort('In');
      this.addOutPort('Out');
      this.signals = [];
  }

  addSignal(signal) {
    this.signals.push(signal);
  }

  saveSignals(signals) {
    this.signals = signals;
  }
}
