import ElementNode from "../../Nodes/ElementNode";

class AndModel extends ElementNode {
  constructor(name = "and") {
    super({ name, type: "and" });
    this.addOutPort("result", true, 1);
    this.addInPort("and1");
    this.addInPort("and2");
  }
}

export default AndModel;
