import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Box, IconButton, Checkbox, TextField, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const AccordionItem = ({
  title,
  expanded,
  handleExpand,
  handlePickRandom,
  searchTerm,
  handleSearchChange,
  getCompletedCount,
  items,
  searchResults,
  handleCheckboxChange,
  navigate
}) => {

  return (

    <Accordion
      expanded={expanded[title] || false}
      onChange={handleExpand(title)}
      className='m-7 md:w-4/6 lg:w-4/6 border border-gray-300 shadow-lg'
      style={{ backgroundColor: '#fff', color: '#000' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <p className='text-lg lg:text-2xl font-semibold'>{title}</p>
      </AccordionSummary>

      <AccordionDetails>
        <div className='w-full flex justify-center gap-2 mb-2 lg:gap-2'>
          
          <div className='px-3 border border-gray-400 cursor-pointer lg:text-lg lg:p-3'
            onClick={() => handlePickRandom(title)}>
            Pick Random
          </div>

          <div className='w-4/6'>
            <TextField
              type="text"  
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e, title)}
              className='border border-gray-900 w-full text-lg lg:p-3'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

          </div>
          <div className='px-3 border border-gray-400 lg:p-3 '>
            {getCompletedCount(title)}
          </div>

        </div>

        <List>
          {((searchResults[title] && searchResults[title].length > 0) ? searchResults[title] : items.filter((item) => item.title === title)).map((item, index) => (
            <ListItem key={index} className='flex flex-col'>
              <div className='flex bg-gray-200 p-4 border border-gray-300 shadow-md w-[97%] justify-between'>
                <div className='flex gap-4 items-center'>
                  <Checkbox
                    checked={item.completed || false}
                    onClick={(e) => handleCheckboxChange(e, item.$id, !item.completed)}
                    className='h-5 w-5'
                    style={{ color: '#000' }}
                  />
                  <Link to={`/question/${item.$id}`} className='flex gap-4 items-center'>
                    <Typography>{index + 1}</Typography>
                    <Typography>{item.Question}</Typography>
                  </Link>
                </div>

                <div className='flex gap-6 items-center'>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className='outline-none hover:text-blue-600'>
                    <Typography>Online Code Editor</Typography>
                  </a>
                </div>
              </div>
            </ListItem>
          ))}
        </List>

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
