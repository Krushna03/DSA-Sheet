import React from 'react'
import Card from '../component/Free-Sheet/Card';


function FreeSheet() {

  return (
   <div>

   <div className='flex justify-center mt-5 '>
      <p className='text-4xl m-6 font-semibold'>List of Data Structres</p>
   </div> 

     <div className='flex justify-center m-3 w-full flex-wrap h-18 gap-9 mb-10'>
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
