export const API_ERROR: Record<number, string> = {
  400: 'Please enter all required fields',
  401: 'Incorrect email or password',
  409: 'This email already exists',
}

export const VALIDATION_ERROR = {
  MISSING_EMAIL: 'Please enter your email',
  MISSING_NAME: 'Please enter your name',
  MISSING_PASSWORD: 'Please enter your password',
  MISSING_CONFIRM_PASSWORD: 'Please confirm your password',
  INVALID_EMAIL: 'The email is not valid',
  MISMATCH_PASSWORDS: 'This password does not match the one you entered above',
}

export const UNKNOWN_ERROR = 'An unknown error occurred'
