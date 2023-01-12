type InfoArr = {
	name: string;
	number: number;
	unit: string;
};
export type DataInfo = {
	[iot: string]: InfoArr;
	event: InfoArr;
	power: InfoArr;
	test: InfoArr;
};
export type EventList = {
	name: string;
	position: {
		x: number;
		y: number;
	};
	type: string;
}[];
