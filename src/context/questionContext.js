import { createContext, useContext } from "react";

export const questionContext = createContext({
    questions: [
      { id: 1, 
        title: 'Reverse the array', 
        titleDetails: ['https://www.geeksforgeeks.org/program-to-reverse-an-array/'], 
        gfg: ['https://geeksforgeeks.org'], 
        cn: ['https://www.naukri.com/code360/problems/reverse-the-array_1262298?topList=love-babbar-dsa-sheet-problems&utm_source=website&utm_medium=affiliate&utm_campaign=450dsatracker'],
        completed: false
     },
     { id: 2, 
      title: 'Find the maximum and minimum element in an array', 
      titleDetails: 'https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/',
      links: ['https://geeksforgeeks.org'],
      completed: false
    },
    { id: 3, 
      title: 'Find the "Kth" max and min element of an array', 
      titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
      links: ['https://geeksforgeeks.org'],
      completed: false 
    },
    { id: 4, 
      title: 'Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo', 
      titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
      links: ['https://geeksforgeeks.org'],
      completed: false 
    },
    { id: 5, 
      title: 'Move all the negative elements to one side of the array', 
      titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
      links: ['https://geeksforgeeks.org'],
      completed: false 
    },
    { id: 6, 
      title: 'Find the Union and Intersection of the two sorted arrays.', 
      titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
      links: ['https://geeksforgeeks.org'],
      completed: false 
    },
    ],

    toggleComplete: (id) => {}
    
})

export const QuestionProvider = questionContext.Provider;

export const questionUse = () => {
   return useContext(questionContext)
}