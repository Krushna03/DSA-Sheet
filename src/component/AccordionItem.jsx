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
  searchTerm,
  handleSearchChange,
  getCompletedCount,
  items,
  searchResults,
  handleCheckboxChange,
  navigate
}) => {

  const filteredItems = items.filter((item) => item.title === title);

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
      {filteredItems.length > 0 ? (
         <div className='w-full flex flex-col'>
         <div className='w-full flex justify-center gap-2 mb-2 lg:gap-2'>
           <div className='w-4/6 lg:w-5/6 md:w-4/6'>
             <TextField
               type="text"
               placeholder="Search..."
               value={searchTerm}
               onChange={(e) => handleSearchChange(e, title)}
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
             {getCompletedCount(title)}
           </div>
         </div>

         <List>
           {filteredItems.map((item, index) => (
             <ListItem key={index} className='flex flex-col'>
               <div className='flex bg-gray-200 p-2 lg:p-4 border border-gray-300 shadow-md w-full lg:w-[97%] justify-between'>
                 <div className='flex gap-2 lg:gap-4 items-center'>
                   <Checkbox
                     checked={item.completed || false}
                     onClick={(e) => handleCheckboxChange(e, item.$id, !item.completed)}
                     className='h-4 w-4 lg:h-5 lg:w-5'
                     style={{ color: '#000' }}
                   />
                   <Link to={`/question/${item.$id}`} className='flex gap-2 lg:gap-4 items-center'>
                     <Typography className='text-sm lg:text-base'>{index + 1}</Typography>
                     <Typography className='text-sm lg:text-base'>{item.Question}</Typography>
                   </Link>
                 </div>

                 <div className='flex gap-4 lg:gap-6 items-center'>
                   <a href={item.link} target="_blank" rel="noopener noreferrer" className='outline-none hover:text-blue-600 text-xs lg:text-base'>
                     <Typography>Online Code Editor</Typography>
                   </a>
                 </div>
               </div>
             </ListItem>
           ))}
         </List>
       </div>
     ) : (
       <div className='flex items-center justify-center w-full h-[50px] text-center'>
         <Typography>No Question found</Typography>
       </div>
     )}

        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton onClick={() => navigate(`/AddQuestion?title=${title}`)} color="black">
            <AddIcon />
          </IconButton>
        </Box>
        </AccordionDetails>
      </Accordion>
    ) 
};

export default AccordionItem;
