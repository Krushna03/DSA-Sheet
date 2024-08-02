import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccordionItem = ({
  title,
  expanded,
  handleExpand,
  searchTerm,
  handleSearchChange,
  getCompletedCount,
  items,
  searchResults,
  handleCheckboxChange,
  navigate
}) => {

  const filteredItems = searchTerm ? searchResults[title] || [] : items.filter((item) => item.title === title);

  return (
    <Accordion
      expanded={expanded[title] || false}
      onChange={handleExpand(title)}
      className='m-7 w-[85%] lg:w-4/6 border border-gray-300 shadow-lg'
      style={{ backgroundColor: '#fff', color: '#000' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <p className='text-lg lg:text-2xl font-semibold'>{title}</p>
      </AccordionSummary>

      <AccordionDetails>
        {/* Always render the search box and "done" box */}
        <div className='w-full flex flex-col'>
          <div className='w-full flex justify-center gap-2 mb-2 lg:gap-2'>
            <div className='relative w-4/6 lg:w-5/6 md:w-4/6'>
                <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm lg:text-lg' />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e, title)}
                  className='border border-gray-600 w-full text-lg lg:text-lg p-1 lg:p-3 pl-12 lg:pl-16'
                />
            </div>

            <div className='px-1 border border-gray-600 text- lg:text-lg lg:px-3 lg:py-3 flex items-center'>
              {getCompletedCount(title)}
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <List>
              {filteredItems.map((item, index) => (
                <ListItem key={index} className='flex flex-col'>
                  <div className='flex bg-gray-100 p-2 lg:p-5 border border-gray-300 shadow-md w-full lg:w-[90%] justify-between'>
                    <div className='flex gap-3 lg:gap-4 items-center'>
                      <input
                        type='checkbox'
                        checked={item.completed || false}
                        onClick={(e) => handleCheckboxChange(e, item.$id, !item.completed)}
                        className='h-3 w-3 lg:h-4 lg:w-4'
                        style={{
                          appearance: 'none',
                          backgroundColor: item.completed ? 'black' : 'white',
                          border: '2px solid black',
                          width: '1rem',
                          height: '1rem',
                          borderRadius: '0.25rem',
                        }}
                      />
                      <Link to={`/question/${item.$id}`} className='flex gap-3 lg:gap-4 items-center'>
                        <h1 className='text-sm font-medium lg:text-lg'>{index + 1}</h1>
                        <h1 className='text-sm font-medium lg:text-lg'>{item.Question}</h1>
                      </Link>
                    </div>

                    <div className='flex gap-5 lg:gap-6 items-center'>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className='outline-none hover:text-blue-600 text-xs lg:text-base'>
                        <h1 className='text-sm font-medium'>Online Code Editor</h1>
                      </a>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <div className='flex items-center justify-center w-full h-[50px] text-center'>
              <Typography>No Question found</Typography>
            </div>
          )}
        </div>

        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton onClick={() => navigate(`/AddQuestion?title=${title}`)} color="black">
            <AddIcon />
          </IconButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
