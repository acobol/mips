import ElementNode from "../../Nodes/ElementNode";

class OrModel extends ElementNode {
  constructor(name = "Or") {
    super({ name, type: "or" });
    this.addOutPort("Resultado", true, 1);
    this.addInPort("Or1");
    this.addInPort("Or2");
  }
}

export default OrModel;
