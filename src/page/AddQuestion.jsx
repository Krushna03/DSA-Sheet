import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import service from '../Appwrite/coonfiguration';
import authService from '../Appwrite/Authenticatioon';
import MonacoEditor from '../component/MonacoCodeEditor';
import LoaderButton from '../component/Loading/LoaderBtn';
import { ID } from 'appwrite';


const AddQuestion = ({ question }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(question?.title || '');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    setLoading(true)
    setError('')
    try {
      const { serialNo, Question, code, link } = data;
      console.log(data);
  
        if (question) {
          // Update existing question
          try {
            const updatedQuestion = await service.updateQuestion(
              question.$id, 
              { serialNo, Question, code, link }
            );
            navigate(`/question/${updatedQuestion.$id}`);
          } catch (error) {
            setError(error.message)
          }
        } 
        else if (selectedTitle && serialNo.trim() && Question.trim() && code && link.trim()) {
          // Create new question
          try {
            const createdQuestion = await service.createQuestion({
              title: selectedTitle,
              serialNo: serialNo + ID.unique(),
              Question: Question,
              code: code,
              link: link,
              userId: userId,
            });
            if (createdQuestion) {
              navigate(`/`);
            }
          } catch (error) {
            setError(error.message)
          }
        }
    } catch (error) {
      setError(error.message)
      console.error('Error submitting question:', error);
    }
    finally {
       setLoading(false)
    }
  };

  console.log(error, 'erro message');

   const navigation = () => {
      if (question) {
        navigate(`/question/${question.$id}`)
      }
      else {
         navigate('/')
      }
   }

  return (
    <>
      <h1 className='flex justify-center font-normal font-sans mt-5 text-4xl'>
        {question ? 'Edit Question' : 'Add Question'}
      </h1>

      {error && 
        <p className="text-red-600 mt-8 text-center">{error}</p>
      }

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
              <MenuItem value="Stack">Stack</MenuItem>
              <MenuItem value="Recursion">Recursion</MenuItem>
              <MenuItem value="Binary Tree">Binary Tree</MenuItem>
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

          <TextField
            label="Online code Editor Link"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("link", { required: true })}
          />

          <Controller
            name="code"
            control={control}
            defaultValue={question?.code || "// Write your code here"}
            render={({ field }) => (
              <MonacoEditor {...field} control={control} />
            )}
          />


         <div className='flex justify-end gap-3 my-4'>
            <Button 
               variant="contained" 
               type='submit' 
               style={{
                backgroundColor: 'black',
                color: 'white',
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <LoaderButton /> : (question ? 'Update Question' : 'Add Question')}
            </Button>

            <Button 
               variant="contained" 
               onClick={navigation}
               style={{
                backgroundColor: 'black',
                color: 'white',
              }}
            >
                Cancel
            </Button>
         </div>
          
        </Box>
      </form>
    </>
  );
};

export default AddQuestion;
