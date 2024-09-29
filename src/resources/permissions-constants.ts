enum PERMISSIONS {
  CLIENT_MY_RESERVATIONS = 'client-my-reservations',
  MANAGE_USERS = 'screen-manage-users',
  MANAGE_RESERVATIONS = 'screen-manage-reservations',
  MANAGE_HEADQUARTERS = 'screen-manage-headquarters',
  MANAGE_SERVICES = 'screen-manage-treatments',
  MANAGE_PRODUCTS = 'screen-manage-products',
}
export type PERMISSIONS_ARRAY = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export {PERMISSIONS};