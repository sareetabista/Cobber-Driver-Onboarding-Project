export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export enum FORM_STATUS {
  NOT_STARTED = 'not_started',
  INITIATED = 'initiated',
  COMPLETED = 'completed',
}

export enum USER_ROLE {
  SUPER_ADMIN = 'super_admin',
  DRIVER = 'driver',
}
