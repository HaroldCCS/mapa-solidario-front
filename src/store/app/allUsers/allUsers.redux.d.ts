export default interface Interface {
	_id: string;
	email?: string;
	name?: string;
	cell_phone?: string;
	password?: string;
	incremental?: number;
	nit?: string;
	rol?: string;
	status?: boolean;
	user_validated?: 'pending' | 'approved' | 'rejected';
}