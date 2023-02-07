// import Mitt from 'mitt';
// const eventHub = new Mitt();
// export default eventHub;

import mitt from 'mitt';
type Events = {
	showFloor1: any;
	showFloor2: any;
	showWall: any;
	showAll: any;
	hideAll: any;
	flatFlight: any;
	recoverFlight: any;
	pointsFighter: any;
	pointsBlast: any;
	pointsBack: any;
};
const eventHub = mitt<Events>();
export default eventHub;
// ==========================
// type Events = {
//   foo: string;
//   bar?: number;
// };
// const emitter = mitt<Events>(); // inferred as Emitter<Events>
// emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'
// emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
