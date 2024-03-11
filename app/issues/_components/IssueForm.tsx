'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import delay from 'delay';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

// interface IssueFormData {
//   title: string;
//   description: string;
// }

// Tell Nextjs to not render this component from the server.
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// });

// Generating an interface based on the backend schema.
// Now we are letting zod, infer this type, based on issueSchema schema
type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

export default function IssueForm({ issue }: Props) {
  //
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  // delay(1200);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.put(`/api/issues/${issue.id}`, data);
      else await axios.post('/api/issues', data);
      router.refresh();
      router.push('/issues/list');
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError('Unexpected error');
    }
  });

  //
  return (
    //
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>

        {/* {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )} */}
        {/* Refactored */}
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}

        <Button disabled={isSubmitting}>
          {issue ? 'Updated Issue' : 'Submit Issue'}{' '}
          {isSubmitting && <Spinner />}{' '}
        </Button>
      </form>
    </div>
  );
}
