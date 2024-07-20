import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import service from '../Appwrite/coonfiguration';
import authService from '../Appwrite/Authenticatioon';
import MonacoEditor from '../component/MonacoCodeEditor';
import { ID } from 'appwrite';

const AddQuestion = ({ question }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(question?.title || '');

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      serialNo: question?.serialNo || '',
      Question: question?.Question || '',
      code: question?.code || '',
      link: question?.link || ''
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

  const submit = async (data) => {
    try {
      const { serialNo, Question, code, link } = data;
      console.log(data);
  
        if (question) {
          // Update existing question
          const updatedQuestion = await service.updateQuestion(
            question.$id, 
            { serialNo, Question, code, link }
          );
          console.log('Updated question:', updatedQuestion);
          navigate(`/question/${updatedQuestion.$id}`);
        } 
        else if (selectedTitle && serialNo.trim() && Question.trim() && code && link.trim()) {
          // Create new question
          const createdQuestion = await service.createQuestion({
            title: selectedTitle,
            serialNo: serialNo,
            Question: Question,
            code: code,
            link: link,
            userId: userId,
          });
          console.log(createdQuestion);
          if (createdQuestion) {
            navigate(`/`);
          }
        }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <>
      <h1 className='flex justify-center font-normal font-sans mt-5 text-4xl'>
        {question ? 'Edit Question' : 'Add Question'}
      </h1>

      <form onSubmit={handleSubmit(submit)} className='flex justify-center mb-3'>
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
            {...register("serialNo", { required: true })}
          />

          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("Question", { required: true })}
          />

          <Controller
            name="code"
            control={control}
            defaultValue={question?.code || "// Write your code here"}
            render={({ field }) => (
              <MonacoEditor {...field} control={control} />
            )}
          />

          <TextField
            label="Online code Editor Link"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("link", { required: true })}
          />

          <Button variant="contained" color="primary" type='submit'>
            {question ? 'Update Question' : 'Add Question'}
          </Button>
          
        </Box>
        
        {errors && errors.title && (
                    <span className="block text-red-500 mb-2">{errors.title.message}</span>
        )}
      </form>
    </>
  );
};

export default AddQuestion;
