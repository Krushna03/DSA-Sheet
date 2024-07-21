import React from 'react'
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Array() {

  const questions = [
    { id: 0, title: 'Reverse the array', links: ['https://geeksforgeeks.org'] },
    { id: 1, title: 'Find the maximum and minimum element in an array', links: ['https://geeksforgeeks.org'] },
    { id: 2, title: 'Find the "Kth" max and min element of an array', links: ['https://geeksforgeeks.org'] },
    { id: 3, title: 'Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo', links: ['https://geeksforgeeks.org'] },
    { id: 4, title: 'Move all the negative elements to one side of the array', links: ['https://geeksforgeeks.org'] },
    { id: 5, title: 'Find the Union and Intersection of the two sorted arrays.', links: ['https://geeksforgeeks.org'] },
  ];

  return (
    <>
    <div className='flex flex-col justify-center mt-5'>
        
        <div className='p-6 w-full flex justify-center'>
          <h1 className='text-3xl font-semibold'>Array</h1>
        </div>

        <div className='flex justify-center w-[95%] gap-2 mb-2 lg:gap-2'>
          <div className='px-1 py-2 border border-gray-400 text-sm lg:px-3 lg:py-3 flex items-center'>
            <h1>Pick Random</h1>
          </div>
          <div className='w-4/6 lg:w-3/6 md:w-4/6'>
            <TextField
              type="text"  
              placeholder="Search..."
              className='border border-gray-900 w-full text-sm lg:text-lg p-1 lg:p-3'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            /> 
          </div>
          <div className='px-1 py-2 border border-gray-400 text-sm lg:px-3 lg:py-3 flex items-center'>
            <h1>0/30 Done</h1>
          </div>
        </div>
    </div>

     <div className='flex justify-center w-[98%] gap-2 mb-2 lg:gap-2 mt-10'>
       <div className='w-5/6 flex justify-center gap-5'>

          <div className='px-1 py-2 border border-gray-400 text-sm lg:px-3 lg:py-3 flex items-center'>
            <h1>Number</h1>
          </div>
           <div className='w-4/6 lg:w-3/6 md:w-4/6 '>
              <h1 className='border border-gray-900 w-full text-sm lg:text-lg p-1 lg:p-3 align-middle'>Question</h1>
           </div>
           <div>
             <h1 className='px-1 py-2 border border-gray-400 text-sm lg:px-3 lg:py-3 flex items-center'>
               Links
             </h1>
           </div>
       </div>

       <div>
        <p>
         Question
        </p>
       </div>
     </div>
    </>
  )
}

export default Array
