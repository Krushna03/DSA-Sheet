import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoaderButton from '../Loading/LoaderBtn';

function QuestionLayout({ getCompletedCount, questions, handleCheckboxChange, pickRandom, title, searchTerm, handleSearchChange, loading }) {

  const gfgIcon = 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg';
  const cnIcon = "https://i.ibb.co/RcQ5qLs/Coding-Ninjas-logo.jpg";

  return (
    <>
      <div className='flex flex-col justify-center mt-5'>
        <div className='p-6 w-full flex justify-center'>
          <h1 className='text-3xl font-semibold'>{title}</h1>
        </div>

        <div className='flex justify-center w-[100%] gap-2 mb-2 lg:gap-2'>
          <div className='px-1 py-2 border border-gray-500 text-sm lg:px-3 lg:py-3 flex items-center'>
            <h1 className='text-xl cursor-pointer hover:font-medium' onClick={pickRandom}>Pick Random</h1>
          </div>
          <div className='w-4/6 lg:w-3/6 md:w-3/6 border border-gray-500 rounded'>
            <TextField
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-full text-sm lg:text-lg p-1 lg:p-3'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className='px-1 py-2 border border-gray-500 text-sm lg:px-3 lg:py-3 flex items-center text-xl'>
            <h1>{getCompletedCount}</h1>
          </div>
        </div>
      </div>

      <div className='flex justify-center mb-2 lg:gap-2 mt-10'>
        <div className='w-[65%]'>

          {loading ? (
            <div className='text-center py-4'>
             <LoaderButton color='black'/>
            </div>
          ) : (
            <>
            {questions.length === 0 ? (
              <div className='text-center py-4'>
                <h2 className='text-xl text-gray-500'>Question Not found</h2>
              </div>
            ) : (
              <>
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
                        <input 
                          type="checkbox"
                          checked={question.completed || false}
                          onClick={(e) => handleCheckboxChange(e, question.$id, !question.completed)}
                          className='h-4 w-4 lg:h-4'
                          style={{ color: '#000' }}
                        />
                      </div>
                      <div className='w-1/2 flex justify-center items-center'>
                        <h1 className='text-lg'>{question.serialNo}</h1>
                      </div>
                    </div>

                    <div className='w-4/6 py-3 px-3 text-left border-r border-gray-400'>
                      <a href={question.titleDetails} target='_blank' rel="noopener noreferrer">
                        <h1 className='text-lg'>{question.question}</h1>
                      </a>
                    </div>

                    <div className='w-1/6 py-2 text-center border-r border-gray-400 flex'>
                      <div className='w-1/2 flex justify-center items-center border-r border-gray-400'>
                        <h1 className='h-4 w-7'>
                          <a href={question.gfg} target="_blank" rel="noopener noreferrer">
                            <img src={gfgIcon} alt="gfg" />
                          </a> 
                        </h1>
                      </div>
                      <div className='w-1/2 flex justify-center items-center'>
                        <h1 className='text-lg h-7 w-7'>
                          <a href={question.codingNinjas} target="_blank" rel="noopener noreferrer">
                            <img src={cnIcon} alt="gfg" />
                          </a>
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  </>
);
}

export default QuestionLayout;