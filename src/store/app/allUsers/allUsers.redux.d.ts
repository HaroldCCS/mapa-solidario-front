export default interface Interface {
	_id: string;
	email?: string;
	name?: string;
	cell_phone?: string;
	incremental?: number;
	nit?: string;
	roles?: string[];
	headquarters_id?: string[];
	status?: boolean;
}