import ElementNode from "../../Nodes/ElementNode";

class AndModel extends ElementNode {
  constructor(name = "and") {
    super({ name, type: "and" });
    this.addOutPort("Resultado", true, 1);
    this.addInPort("And1");
    this.addInPort("And2");
  }
}

export default AndModel;
