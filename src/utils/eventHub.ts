// import Mitt from 'mitt';
// const eventHub = new Mitt();
// export default eventHub;

import mitt from 'mitt';
const eventHub = mitt();
export default eventHub;
// ==========================
// type Events = {
//   foo: string;
//   bar?: number;
// };
// const emitter = mitt<Events>(); // inferred as Emitter<Events>
// emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'
// emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
