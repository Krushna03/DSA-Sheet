import React, { useState, useEffect } from 'react';
import QuestionLayout from './QuestionLayout';
import authService from '../../../Appwrite/Authenticatioon';
import service from '../../../Appwrite/coonfiguration';


function Array() {
  // 668fb5c5001d5af383c1
  const [questions, setQue] = useState([])
  
  useEffect(() => {
    const fetchUserArrayQuestions = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const result = await service.arrayQuestions(user.$id);
          if (result && result.documents) {
            setQue(result.documents);
          }
        }
      } catch (error) {
        console.error('Error fetching user or questions:', error);
      }
    };
    fetchUserArrayQuestions();
  }, []);

  // const [questions, setQuestions] = useState(() => {
  //   const sotredQuestions = JSON.parse(localStorage.getItem('questions'))
  //   return sotredQuestions ||
  //   [
  //     { id: 1, 
  //        title: 'Reverse the array', 
  //        titleDetails: ['https://www.geeksforgeeks.org/program-to-reverse-an-array/'], 
  //        gfg: ['https://geeksforgeeks.org'], 
  //        cn: ['https://www.naukri.com/code360/problems/reverse-the-array_1262298?topList=love-babbar-dsa-sheet-problems&utm_source=website&utm_medium=affiliate&utm_campaign=450dsatracker'],
  //        completed: false
  //     },
  //     { id: 2, 
  //       title: 'Find the maximum and minimum element in an array', 
  //       titleDetails: 'https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/',
  //       links: ['https://geeksforgeeks.org'],
  //       completed: false
  //     },
  //     { id: 3, 
  //       title: 'Find the "Kth" max and min element of an array', 
  //       titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
  //       links: ['https://geeksforgeeks.org'],
  //       completed: false 
  //     },
  //     { id: 4, 
  //       title: 'Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo', 
  //       titleDetails: 'https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/',
  //       links: ['https://geeksforgeeks.org'],
  //       completed: false 
  //     },
  //   ];
  // })
  


  // const toggleComplete = (serialNo) => {
  //   questions.map((Eachquestion) => 
  //     Eachquestion.serialNo === serialNo ? {...Eachquestion, completed: !Eachquestion.completed } : Eachquestion
  //   );
  //   }
  
  
  const handleCheckboxChange = async (event, questionId, completed) => {
    event.stopPropagation();
    setQue((prevQues) =>
      prevQues.map((ques) => ques.$id === questionId ? { ...ques, completed } : ques
      )
    );
    try {
      await service.updateArrayQuestionStatus(questionId, completed);
    } catch (error) {
      console.error('Error updating question status:', error);
      setQue((prevQues) =>
        prevQues.map((ques) => ques.$id === questionId ? { ...questions, completed: !completed } : ques
        )
      );
    }
  };
  
  const pickRandom = () => {
     const randomIndex = Math.ceil(Math.random() * questions.length)
     const matchedQuestion  = questions.find(question => question.serialNo === randomIndex);
  
     if (matchedQuestion) {
        window.open(matchedQuestion.titleDetails, '_blank');
    } else {
      console.log('No question found with the generated random ID');
    }
  }

  const getCompletedCount = () => {
    const complete = questions.filter((question) => question.completed).length;
    return `${complete}/${questions.length} Done`;
  };


  return (
       <QuestionLayout 
          getCompletedCount={getCompletedCount()} 
          handleCheckboxChange={handleCheckboxChange}
          pickRandom={pickRandom} 
          title={'Array'} 
          questions={questions} 
        />
  );
}

export default Array;
