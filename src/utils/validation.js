import * as yup from 'yup';

export const createSignUpSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(t('field.mixed.required'))
    .min(3, t('field.name.min'))
    .max(20, t('field.name.max')),
  password: yup
    .string()
    .trim()
    .required(t('field.mixed.required'))
    .min(6, t('field.password.min')),
  confirmPassword: yup
    .string()
    .required(t('field.mixed.required'))
    .oneOf([yup.ref('password')], t('field.confirmPassword.repeat')),
});

export const createUpdateValidationSchema = (channelNames, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, t('field.name.min'))
    .max(20, t('field.name.max'))
    .required(t('field.mixed.required'))
    .test({
      name: 'name',
      message: t('field.name.uniq'),
      test: (value) => {
        if (!value) {
          return false;
        }

        return !channelNames.includes(value);
      },
    }),
});
