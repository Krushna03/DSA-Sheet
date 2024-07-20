import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import service from '../Appwrite/coonfiguration';
import authService from '../Appwrite/Authenticatioon';
import MonacoEditor from '../component/MonacoCodeEditor';
import { ID } from 'appwrite';


const QuestionForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');


  const { register, control, getValues, handleSubmit } = useForm({
    defaultValues: {
      serialNumber: '',
      Question: '',
      Code: '',
      websiteLink: ''
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.$id);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  
  const Submit = async (data) => {
    try {
      const { serialNumber, Question, code, websiteLink } = data;
      console.log('Selected Title:', selectedTitle); // Check if selectedTitle is correctly set
      console.log('Form Data:', data); // Log form data to ensure it's correct

      if (selectedTitle && serialNumber.trim() && Question.trim() && code && websiteLink.trim()) {
        await service.createQuestion({
          title: selectedTitle,
          // serialNo: serialNumber + ID.unique(),
          serialNo: serialNumber,
          Question: Question,
          Code: code,
          link: websiteLink,
          userId: userId,
        });
        navigate(`/`);
      }
    } catch (error) {
      console.log("Error at add Question Submit button", error);
    }
  };

  return (
    <>
      <h1 className='flex justify-center font-normal font-sans mt-5 text-4xl'>
        Add Question
      </h1>

      <form onSubmit={handleSubmit(Submit)} className='flex justify-center mb-3'>
        <Box className='m-5 p-2 w-full sm:w-5/6 md:w-4/6 lg:w-5/6'>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Select Title</InputLabel>
            <Select
              labelId="select-label"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              label="Select Title"
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Array">Array</MenuItem>
              <MenuItem value="String">String</MenuItem>
              <MenuItem value="Linked List">Linked List</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Serial Number"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("serialNumber", { required: true })}
          />

          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("Question", { required: true })}
          />

          <MonacoEditor control={control} />

          <TextField
            label="Online Code Editor Link"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("websiteLink", { required: true })}
          />

          <Button variant="contained" color="primary" type='submit'>
            Add Question
          </Button>
          
        </Box>
      </form>
    </>
  );
};

export default QuestionForm;
