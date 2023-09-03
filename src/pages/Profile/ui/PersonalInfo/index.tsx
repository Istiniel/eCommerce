import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import { selectCustomer } from '../../../../app/redux/features/AuthSlice/AuthSlice';
import AuthInput from '../../../../shared/ui/AuthInput';
import ErrorMessage from '../../../../shared/ui/ErrorMessage';
import Button from '../../../../shared/ui/Button';
import styles from './PersonalInfo.module.scss';
import { updateCustomer } from '../../../../app/redux/asyncThunks/updateUser';
import { showSuccessMessage } from '../../../../shared/helpers/showSuccessMessage';

export type PersonalInfoFormState = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

const PersonalInfo = () => {
  const customer = useAppSelector(selectCustomer);
  const {
    firstName: currentFirstName,
    lastName: currentLastName,
    dateOfBirth: currentDateOfBirth,
  } = customer!;

  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<PersonalInfoFormState>({
    mode: 'onChange',
    defaultValues: {
      firstName: currentFirstName,
      lastName: currentLastName,
      dateOfBirth: currentDateOfBirth,
    },
  });

  const onSubmit: SubmitHandler<PersonalInfoFormState> = async (data, event) => {
    event?.preventDefault();

    const { firstName, lastName, dateOfBirth } = data;

    if (
      currentFirstName === firstName &&
      currentLastName === lastName &&
      currentDateOfBirth === dateOfBirth
    ) {
      setEditMode(false);
      return;
    }

    const requestBody: Omit<MyCustomerUpdate, 'version'> = {
      actions: [
        {
          action: 'setFirstName',
          firstName,
        },
        {
          action: 'setLastName',
          lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth,
        },
      ],
    };

    try {
      setError('');

      const result = await dispatch(updateCustomer(requestBody));

      if (result.meta.requestStatus !== 'rejected') {
        showSuccessMessage();
      }
    } catch (requestError) {
      if (requestError instanceof Error && 'message' in requestError) {
        setError(requestError.message);
      }
    }

    setEditMode(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <AuthInput
        control={control}
        disabled={!editMode}
        name="firstName"
        type="text"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            special: (value) => {
              return !/[!-/:-@[-`{-~]/.test(String(value)) ? true : 'noSpecialSymbols';
            },
            numbers: (value) => {
              return !/[0-9]/.test(String(value)) ? true : 'noNumbers';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        disabled={!editMode}
        name="lastName"
        type="text"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            special: (value) => {
              return !/[!-/:-@[-`{-~]/.test(String(value)) ? true : 'noSpecialSymbols';
            },
            numbers: (value) => {
              return !/[0-9]/.test(String(value)) ? true : 'noNumbers';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        disabled={!editMode}
        name="dateOfBirth"
        type="date"
        rules={{
          required: 'emptyInput',
          validate: {
            birthDate: (value) => {
              const date = new Date(String(value));
              const age = new Date().getFullYear() - date.getFullYear();
              return age >= 13 ? true : 'ageValidation';
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
      {!!error && <ErrorMessage message={error} />}
    </form>
  );
};

export default PersonalInfo;
