import React from 'react'
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function QuestionLayout({questions, cnIcon, gfgIcon}) {
  return (
    <>
        <div className='flex flex-col justify-center mt-5'>
        
        <div className='p-6 w-full flex justify-center'>
          <h1 className='text-3xl font-semibold'>Array</h1>
        </div>

        <div className='flex justify-center w-[100%] gap-2 mb-2 lg:gap-2'>
          <div className='px-1 py-2 border border-gray-400 text-sm lg:px-3 lg:py-3 flex items-center'>
            <h1>Pick Random</h1>
          </div>
          <div className='w-4/6 lg:w-3/6 md:w-3/6'>
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

      <div className='flex justify-center mb-2 lg:gap-2 mt-10'>
        <div className='w-[60%]'>
          <div className='flex justify-between border-b border-t border-gray-500'>
            <div className='w-1/6 py-2 text-center border-r border-l border-gray-500'>
              <h1 className='text-lg'>Number</h1>
            </div>
            <div className='w-4/6 py-2 text-center border-r border-gray-500'>
              <h1 className='text-lg'>Question</h1>
            </div>
            <div className='w-1/6 py-2 text-center border-r border-gray-500'>
              <h1 className='text-lg'>Links</h1>
            </div>
          </div>

          {questions.map((question, index) => (
            <div key={index} className='flex justify-between border-b border-gray-400'>
              
              <div className='w-1/6 py-2 border-r border-l border-gray-400 flex'>
                <div className='w-1/2 flex justify-center items-center border-r border-gray-400'>
                  <input type="checkbox" className='w-4' />
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                  <h1 className='text-lg'>{index + 1}</h1>
                </div>
              </div>

              <div className='w-4/6 py-3 px-3 text-left border-r border-gray-400'>
                <h1 className='text-lg'>{question.title}</h1>
              </div>

              <div className='w-1/6 py-2 text-center border-r border-gray-400 flex'>
              <div className='w-1/2 flex justify-center items-center border-r border-gray-400'>
                   <h1 className='h-4 w-7'>
                      <img src={gfgIcon} alt="gfg" />
                   </h1>
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                  <h1 className='text-lg h-7 w-7'>
                      <img src={cnIcon} alt="cn" />
                  </h1>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuestionLayout
