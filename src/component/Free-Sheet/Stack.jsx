import React, { useState, useEffect } from 'react';
import QuestionLayout from './QuestionLayout';
import authService from '../../Appwrite/Authenticatioon';
import service from '../../Appwrite/coonfiguration';


function Stack() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUserStackQuestions = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const result = await service.StackQuestions(user.$id);
          if (result && result.documents) {
            setQuestions(result.documents);
            setFilteredQuestions(result.documents); // Initialize filteredQuestions with all questions
          }
        }
      } catch (error) {
        console.error('Error fetching user or questions Stack:', error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchUserStackQuestions();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = questions.filter((question) =>
      question.question.toLowerCase().includes(searchTerm)
    );
    setFilteredQuestions(filtered);
  };
  
  const handleCheckboxChange = async (event, questionId, completed) => {
    event.stopPropagation();
    console.log('clicked seQues');
    setFilteredQuestions((prevQues) =>
      prevQues.map((ques) => ques.$id === questionId ? { ...ques, completed } : ques
      )
    );
    try {
      await service.updateStackQuestionStatus(questionId, completed);
      console.log('clicked to service');
    } catch (error) {
      console.error('Error updating question status at Stack:', error);
      
      setFilteredQuestions((prevQues) =>
        prevQues.map((ques) => ques.$id === questionId ? { ...ques, completed: !completed } : ques
        )
      );
      console.log('clicked seQues issues vala');
    }
  };
  
  const pickRandom = () => {
    const randomIndex = Math.ceil(Math.random() * questions.length);
    const matchedQuestion  = questions.find(question => question.serialNo === randomIndex);

    if (matchedQuestion) {
      window.open(matchedQuestion.titleDetails, '_blank');
    } else {
      console.log('No question found with the generated random ID');
    }
  }

  const getCompletedCount = () => {
    const complete = filteredQuestions.filter((question) => question.completed).length;
    return `${complete}/${questions.length} Done`;
  };

  return (
    <QuestionLayout 
      getCompletedCount={getCompletedCount()} 
      handleCheckboxChange={handleCheckboxChange}
      pickRandom={pickRandom} 
      title={'Stack'} 
      questions={filteredQuestions}
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange} 
      loading={loading}
    />
  );
}

export default Stack;
