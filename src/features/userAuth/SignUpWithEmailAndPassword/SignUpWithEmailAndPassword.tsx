import { FC } from 'react';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Button, Group, TextInput } from '@mantine/core';
import { At } from 'tabler-icons-react';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { useAuth } from '@/services/firebase';
import FormServerStateWrapper from '@/components/FormServerStateWrapper';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUpWithEmailAndPassword: FC = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    schema: yupResolver(schema),
  });

  type FormValues = typeof form.values;

  const [createUserWithEmailAndPassword, _user, createUserLoading, createUserError] = useCreateUserWithEmailAndPassword(
    useAuth()
  );

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;
    await createUserWithEmailAndPassword(email, password);
  };

  return (
    <FormServerStateWrapper
      isLoading={createUserLoading}
      isError={!!createUserError}
      error={createUserError}
      isSuccess={!!_user}
      successMessage="You are logged in"
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="flex flex-col space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="john.doe@example.com"
          icon={<At size={14} />}
          type="email"
          {...form.getInputProps('email')}
        />
        <TextInput label="Password" type="password" {...form.getInputProps('password')} />
        <TextInput label="Confirm password" type="password" {...form.getInputProps('confirmPassword')} />
        <Group position="right" mt="md">
          <Button type="submit" className="w-full lg:w-60">
            Sign Up
          </Button>
        </Group>
      </form>
    </FormServerStateWrapper>
  );
};

export default SignUpWithEmailAndPassword;
