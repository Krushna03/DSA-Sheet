import React, { useEffect, useState } from 'react'
import service from '../Appwrite/coonfiguration';
import { useNavigate, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose different styles
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
      <div className="bg-gray-50 shadow-lg rounded-lg py-4 px-2">
        
        <div className="flex flex-wrap justify-between items-center mb-3 mx-2 lg:mb-5">
          
          <h1 className="text-xl lg:text-3xl font-bold text-gray-800">{question.Question}</h1>
          
          <div className="flex items-end gap-4 my-2">
              <input
                type="checkbox"
                checked={question.completed || false}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="h-5 w-5"
                  style={{
                    appearance: 'none',
                    backgroundColor: question.completed ? 'black' : 'white',
                    border: '2px solid black',
                    borderRadius: '0.25rem',
                    display: 'inline-block',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundImage: question.completed
                      ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\' width=\'16px\' height=\'16px\'%3E%3Cpath d=\'M0 0h24v24H0z\' fill=\'none\'/%3E%3Cpath d=\'M9 16.2l-4.2-4.2L3 13.8 9 19.8l12-12-1.4-1.4z\'/%3E%3C/svg%3E")'
                      : 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
              />
              {/* <label className="text-lg mt-2 text-gray-700">Completed</label> */}
           
            <button onClick={() => navigate(`/edit-question/${serialNo}`)}>
              <FaEdit size={19} color='black'/>
            </button>

           <button onClick={deleteQues}>
              <FaTrash size={19} color='black'/>
           </button>
           
          </div>
        </div>

        <div className='my-5 mx-2 lg:text-lg' style={{ whiteSpace: 'pre-wrap' }}>
           {question.description}
        </div>

        <div className="mb-5">
          <div className="prose prose-lg max-w-none">
              <SyntaxHighlighter language="java" style={atomDark} className='text-sm lg:text-base'>
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
