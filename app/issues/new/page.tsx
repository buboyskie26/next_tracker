import React from 'react';
import dynamic from 'next/dynamic';
import NewLoadingPage from './loading';

// import IssueForm from '../_components/IssueForm';
// Tell Nextjs to not render this component from the server. thus, only in client side
// Specifically the Create Issue
// This makes the same loading experience of page inputs (Title,Description)
//
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <NewLoadingPage />,
});

const NewIssuePage = () => {
  return (
    <>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
