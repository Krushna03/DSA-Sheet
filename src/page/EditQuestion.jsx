import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/coonfiguration'
import AddQuestion from './AddQuestion'

function EditQuestion() {
  const [question, setQues] = useState(null)
  const { serialNo } = useParams()
  const navigate = useNavigate()

  console.log(question);

  useEffect(() => {
    if (serialNo) {
      service.getQuestion(serialNo).then((question) => {
        if (question) {
          setQues(question)
        }
      })
    }
    else{
      navigate('/')
    }
  }, [serialNo, navigate])


  return question ? (
     <div>
        <AddQuestion question={question}/>
     </div>
  ) 
   : null
}

export default EditQuestion
