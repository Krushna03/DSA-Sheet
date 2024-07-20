import React, { useEffect, useState } from 'react'
import service from '../Appwrite/coonfiguration';
import { useNavigate, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose different styles
import { Button } from '@mui/material';
import { FaTrash, FaEdit  } from "react-icons/fa";


function Question() {
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true);
  const { serialNo } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        if (serialNo) {
          const fetchedQuestion = await service.getQuestion(serialNo);
          if (fetchedQuestion) {
            setQuestion(fetchedQuestion);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
    }, [serialNo, navigate])


    const deleteQues = () => {
      service.deleteQuestion(question.$id).then((status) => {
          if (status) {
              navigate("/");
          }
      });
  };


    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
  
    if (!question) {
      return <div className="flex justify-center items-center h-screen">Question not found</div>;
    }


    const handleCheckboxChange = async (completed) => {
      if (question) {
        try {
          // Update the state locally
            setQuestion((prevQuestion) => ({ ...prevQuestion, completed }));
          // Synchronize with the backend
            await service.updateQuestionStatus(question.$id, completed);
        } 
        catch (error) {
          console.error('Error updating question status:', error);
        }
      }
    };



  
    return (
      <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6">
        
        <div className="flex justify-between items-center mb-4">
          
          <h1 className="text-3xl font-bold text-gray-800">{question.Question}</h1>
          
          <div className="flex items-end">
            <input
              type="checkbox"
              checked={question.completed || false}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mr-1 mb-1 h-5 w-5 rounded border-gray-300 text-black focus:ring-black forced-colors:to-black, "
            />
            <label className="text-lg mt-5 text-gray-700">Completed</label>
           
            <Button 
              onClick={() => navigate(`/edit-question/${serialNo}`)} >
              <FaEdit size={20} color='black'/>
            </Button>

           <Button onClick={deleteQues}>
              <FaTrash size={20} color='black'/>
           </Button>
           
          </div>

        </div>

        <div className="mb-4">
          <div className="prose prose-lg max-w-none text-gray-700">
              <SyntaxHighlighter language="java" style={atomDark}>
                {question.code}
              </SyntaxHighlighter>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition duration-300"
        >
          Back to List
        </button>
      </div>
    </div>
    );
}

export default Question
