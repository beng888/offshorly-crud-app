export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: 'must be an email',
  },
  maxLength: {
    value: 55,
    message: 'must be an less than or equal to 55 characters',
  },
};

export const passwordRules = {
  required: 'Password is required',
  maxLength: {
    value: 12,
    message: 'must be an less than or equal to 12 characters',
  },
};

export const titleRules = {
  maxLength: {
    value: 50,
    message: 'must be an less than or equal to 50 characters',
  },
  minLength: {
    value: 4,
    message: 'must be an less than or equal to 4 characters',
  },
};

export const descriptionRules = {
  minLength: {
    value: 4,
    message: 'must be an less than or equal to 4 characters',
  },
};
