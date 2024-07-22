import React from 'react'
import QuestionLayout from './QuestionLayout';

function String() {
  
  const questions = [
    { id: 0, title: 'Reverse the array', links: ['https://geeksforgeeks.org'] },
    { id: 1, title: 'Find the maximum and minimum element in an array', links: ['https://geeksforgeeks.org'] },
    { id: 2, title: 'Find the "Kth" max and min element of an array', links: ['https://geeksforgeeks.org'] },
    { id: 3, title: 'Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo', links: ['https://geeksforgeeks.org'] },
    { id: 4, title: 'Move all the negative elements to one side of the array', links: ['https://geeksforgeeks.org'] },
    { id: 5, title: 'Find the Union and Intersection of the two sorted arrays.', links: ['https://geeksforgeeks.org'] },
  ];


  const gfgIcon = 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg';
  const cnIcon = "https://i.ibb.co/RcQ5qLs/Coding-Ninjas-logo.jpg"


  return (
    <>
       <QuestionLayout title={'String'}  questions={questions} gfgIcon={gfgIcon} cnIcon={cnIcon}/>
    </>
  )
}

export default String
