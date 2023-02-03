import City from './mesh/City';
let city: City;
export default function createMesh() {
	city = new City();
}
export function updateMesh(time: number) {
	// city.update(time);
}
