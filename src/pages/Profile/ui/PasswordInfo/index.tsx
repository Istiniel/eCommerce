import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { CustomerChangePassword } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import { clearErrorMessage, selectCustomer, selectError } from '../../../../app/redux/features/AuthSlice/AuthSlice';
import AuthInput from '../../../../shared/ui/AuthInput';
import ErrorMessage from '../../../../shared/ui/ErrorMessage';
import Button from '../../../../shared/ui/Button';
import styles from './PasswordInfo.module.scss';
import { showSuccessMessage } from '../../../../shared/helpers/showSuccessMessage';
import {
  changePassword,
} from '../../../../app/redux/asyncThunks/changePassword';

export type PasswordInfoFormState = {
  currentPassword: string;
  newPassword: string;
};

const PasswordInfo = () => {
  const customer = useAppSelector(selectCustomer);
  const {  id, version } = customer!;
  const passwordChangeError = useAppSelector(selectError);
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<PasswordInfoFormState>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordInfoFormState> = async (data, event) => {
    event?.preventDefault();

    const { currentPassword, newPassword } = data;

    const requestBody: CustomerChangePassword = {
      id,
      version,
      currentPassword,
      newPassword,
    };

    try {
      dispatch(clearErrorMessage());

      const result = await dispatch(changePassword(requestBody));

      if (result.meta.requestStatus !== 'rejected') {
        showSuccessMessage();
      }
    } catch (requestError) {
      if (requestError instanceof Error && 'message' in requestError) {
        // eslint-disable-next-line no-console
        console.log(requestError.message);
      }
    }

    setEditMode(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <AuthInput
        showPasswordToggler={false}
        control={control}
        disabled={!editMode}
        name="currentPassword"
        type="password"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 8,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            uppercase: (value) => {
              return /[A-Z]/.test(String(value)) ? true : 'uppercaseValidation';
            },
            lowercase: (value) => {
              return /[a-z]/.test(String(value)) ? true : 'lowercaseValidation';
            },
            numbers: (value) => {
              return /[0-9]/.test(String(value)) ? true : 'numberValidation';
            },
            special: (value) => {
              return /[!-/:-@[-`{-~]/.test(String(value)) ? true : 'specialValidation';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        disabled={!editMode}
        name="newPassword"
        type="password"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 8,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            uppercase: (value) => {
              return /[A-Z]/.test(String(value)) ? true : 'uppercaseValidation';
            },
            lowercase: (value) => {
              return /[a-z]/.test(String(value)) ? true : 'lowercaseValidation';
            },
            numbers: (value) => {
              return /[0-9]/.test(String(value)) ? true : 'numberValidation';
            },
            special: (value) => {
              return /[!-/:-@[-`{-~]/.test(String(value)) ? true : 'specialValidation';
            },
          },
        }}
      />
      <div className={styles.controlButtonsContainer}>
        <Button
          className={classNames({ [styles.disabled]: editMode })}
          type="button"
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>
        <Button className={classNames({ [styles.disabled]: !editMode })} type="submit">
          Apply
        </Button>
        <Button
          className={classNames({ [styles.disabled]: !editMode })}
          type="button"
          onClick={() => {
            setEditMode(false);
            reset();
          }}
        >
          Dismiss
        </Button>
      </div>
      {!!passwordChangeError && <ErrorMessage message={passwordChangeError} />}
    </form>
  );
};

export default PasswordInfo;
