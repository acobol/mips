import { LinkWidget, PointModel, RightAngleLinkWidget } from "@projectstorm/react-diagrams";
import {Point} from '@projectstorm/geometry';

//Monkey patching RightAngleLinkWidget becuse doesn`t set the label position correctly
class StateLinkWidget extends RightAngleLinkWidget {
  
  render() {
    		//ensure id is present for all points on the path
		let points = this.props.link.getPoints();
		let paths = [];
    this.refPaths = [];

		// Get points based on link orientation
		let pointLeft = points[0];
		let pointRight = points[points.length - 1];
		let hadToSwitch = false;
		if (pointLeft.getX() > pointRight.getX()) {
			pointLeft = points[points.length - 1];
			pointRight = points[0];
			hadToSwitch = true;
		}
		let dy = Math.abs(points[0].getY() - points[points.length - 1].getY());

		// When new link add one middle point to get everywhere 90° angle
		if (this.props.link.getTargetPort() === null && points.length === 2) {
			[...Array(2)].forEach((item) => {
				this.props.link.addPoint(
					new PointModel({
						link: this.props.link,
						position: new Point(pointLeft.getX(), pointRight.getY())
					}),
					1
				);
			});
			this.props.link.setManuallyFirstAndLastPathsDirection(true, true);
		}
		// When new link is moving and not connected to target port move with middle point
		// TODO: @DanielLazarLDAPPS This will be better to update in DragNewLinkState
		//  in function fireMouseMoved to avoid calling this unexpectedly e.g. after Deserialize
		else if (this.props.link.getTargetPort() === null && this.props.link.getSourcePort() !== null) {
			points[1].setPosition(
				pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2,
				!hadToSwitch ? pointLeft.getY() : pointRight.getY()
			);
			points[2].setPosition(
				pointRight.getX() + (pointLeft.getX() - pointRight.getX()) / 2,
				!hadToSwitch ? pointRight.getY() : pointLeft.getY()
			);
		}
		// Render was called but link is not moved but user.
		// Node is moved and in this case fix coordinates to get 90° angle.
		// For loop just for first and last path
		else if (!this.state.canDrag && points.length > 2) {
			// Those points and its position only will be moved
			for (let i = 1; i < points.length; i += points.length - 2) {
				if (i - 1 === 0) {
					if (this.props.link.getFirstPathXdirection()) {
						points[i].setPosition(points[i].getX(), points[i - 1].getY());
					} else {
						points[i].setPosition(points[i - 1].getX(), points[i].getY());
					}
				} else {
					if (this.props.link.getLastPathXdirection()) {
						points[i - 1].setPosition(points[i - 1].getX(), points[i].getY());
					} else {
						points[i - 1].setPosition(points[i].getX(), points[i - 1].getY());
					}
				}
			}
		}

		// If there is existing link which has two points add one
		// NOTE: It doesn't matter if check is for dy or dx
		if (points.length === 2 && dy !== 0 && !this.state.canDrag) {
			this.props.link.addPoint(
				new PointModel({
					link: this.props.link,
					position: new Point(pointLeft.getX(), pointRight.getY())
				})
			);
		}

		for (let j = 0; j < points.length - 1; j++) {
			paths.push(
				this.generateLink(
					LinkWidget.generateLinePath(points[j], points[j + 1]),
					{
						'data-linkid': this.props.link.getID(),
						'data-point': j,
						onMouseDown: (event) => {
							if (event.button === 0) {
								this.setState({ canDrag: true });
								this.dragging_index = j;
								// Register mouse move event to track mouse position
								// On mouse up these events are unregistered check "this.handleUp"
								window.addEventListener('mousemove', this.handleMove);
								window.addEventListener('mouseup', this.handleUp);
							}
						},
						onMouseEnter: (event) => {
							this.setState({ selected: true });
							this.props.link.lastHoverIndexOfPath = j;
						}
					},
					j
				)
			);
		}

		return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
  }
}

export default StateLinkWidget;
