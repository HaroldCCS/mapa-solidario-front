enum PERMISSIONS {
  MANAGE_USERS = 'screen-manage-users',
  MANAGE_HEADQUARTERS = 'screen-manage-headquarters',
  MANAGE_EVENTS = 'screen-manage-events',

  MY_NOTIFICATIONS = 'screen-show-only-notifications',
  SHOW_EVENTS = 'screen-show-only-events',
  SHOW_HEADQUARTERS = 'screen-show-only-headquarters',
}
export type PERMISSIONS_ARRAY = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export {PERMISSIONS};