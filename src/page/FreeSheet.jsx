import React from 'react'
import Card from '../component/Free-Sheet/Card';


function FreeSheet() {

  return (
   <div>

   <div className='flex justify-center mt-5 '>
      <p className='font-bold mt-5 text-3xl lg:text-4xl'>List of Data Structres</p>
   </div> 

     <div className='flex justify-center m-3 w-full flex-wrap gap-9'>
           <Card title={'Array'}/>
           <Card title={'String'}/>
           <Card title={'Linked List'}/>
           <Card title={'Stack'}/>
           <Card title={'Recursion'}/>
           <Card title={'Binary Tree'}/>
     </div>
   
   </div>
  )
}

export default FreeSheet
