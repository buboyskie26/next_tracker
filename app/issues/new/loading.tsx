// import { Box, Card } from '@radix-ui/themes';
// // import Skeleton from 'react-loading-skeleton';
// // import 'react-loading-skeleton/dist/skeleton.css';

// import Skeleton from '../../components/Skeleton';
// import IssueFormSkeletal from '../_components/IssueFormSkeletal';

// const LoadingNewIssue = () => {
//   return <IssueFormSkeletal />;
// };

// export default LoadingNewIssue;
import React from 'react';
// We used IssueFormSkeletal because it has been used for multiple places.
import IssueFormSkeletal from '../_components/IssueFormSkeletal';

const NewLoadingPage = () => {
  return <IssueFormSkeletal />;
};

export default NewLoadingPage;
