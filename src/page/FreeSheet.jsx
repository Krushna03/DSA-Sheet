import React from 'react'
import Card from '../component/Free-Sheet/Card';
import ArrayImg from './CardImages/Array.png'
import StringImg from './CardImages/String.png'
import BinaryTreeImg from './CardImages/BinaryTree.png'
import LinkedListImg from './CardImages/LinkedList.png'
import StackImg from './CardImages/Stack.png'
import RecursionImg from './CardImages/Recursion.png'


function FreeSheet() {

  return (
   <div className='mb-20'>

   <div className='flex justify-center mt-5 '>
      <p className='font-bold mt-5 text-3xl lg:text-4xl'>List of Data Structres</p>
   </div> 

     <div className='flex justify-center m-3 w-full flex-wrap gap-9'>
           <Card title={'Array'} images={ArrayImg}/>
           <Card title={'String'} images={StringImg}/>
           <Card title={'Linked List'} images={LinkedListImg}/>
           <Card title={'Stack'} images={StackImg}/>
           <Card title={'Recursion'} images={RecursionImg}/>
           <Card title={'Binary Tree'} images={BinaryTreeImg}/>
     </div>
   
   </div>
  )
}

export default FreeSheet
