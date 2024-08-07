import React, { useEffect, useState } from 'react'
import QuestionLayout from './QuestionLayout';
import authService from '../../Appwrite/Authenticatioon';
import service from '../../Appwrite/coonfiguration';

function String() {
  
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserStringQuestion = async () => {
       try {
         const user = await authService.getCurrentUser();
         if (user) {
           const result = await service.stringQuestions(user.$id)
           if (result && result.documents) {
              setQuestions(result.documents)
              setFilteredQuestions(result.documents)
           }
         }
       } catch (error) {
        console.error('Error fetching user or questions String:', error);
      }
      finally {
        setLoading(false)
       }
    }
    fetchUserStringQuestion()
  })


  const handleSearchChange = (e) => {
     const searchTerm = e.target.value;
     setSearchTerm(searchTerm)

     const filtered = questions.filter((question) => question.question.includes(searchTerm))
     
     setFilteredQuestions(filtered)
  }


  const handleCheckboxChange = async (e, questionId, completed) => {
      e.stopPropagation();

      setFilteredQuestions((preQues) =>
       preQues.map((question) => question.$id === questionId ? {...question, completed} : question))

      try {
        await service.updateStringQuestionStatus(questionId, completed)
      } catch (error) {
        console.error('Error updating question status at String:', error);

        setFilteredQuestions((preQues) =>
          preQues.map((question) => question.$id === questionId ? {...question, completed} : question))
      }
  }


  const pickRandom = () => {
     const randomIndex = Math.ceil(Math.random() * questions.length)
     const matchedQuestion = questions.find(question => question.serialNo === randomIndex)

     if (matchedQuestion) {
       window.open(matchedQuestion.titleDetails, "_blank")
     }
     else{
      console.log('No question found with the generated random ID');
     }
  }


  const getCompletedCount = () => {
    const complete = filteredQuestions.filter((question) => question.completed).length;
    return `${complete}/${questions.length} Done`;
  };


  return (
    <>
       <QuestionLayout 
         title={'String'} 
         getCompletedCount={getCompletedCount()} 
         handleCheckboxChange={handleCheckboxChange}
         pickRandom={pickRandom} 
         questions={filteredQuestions}
         searchTerm={searchTerm}
         handleSearchChange={handleSearchChange} 
         loading={loading}
       />
    </>
  )
}

export default String
