import conf from './conf.js';
import { Client, ID, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        
        this.databases = new Databases(this.client);
    }


    //Here link is the link of the coding ninjas platform
    async createQuestion({serialNo, Question, code, link, userId, title, completed = false}){
        try {
            return await this.databases.createDocument(
               conf.appwriteDataBaseID,
               conf.appwriteCollectionID,
               serialNo,
                {
                   Question, code, link, userId, title, completed
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createQuestion :: error", error);
        }
    }


    async updateQuestion(serialNo, {Question, code, link}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                serialNo, 
                {
                  Question, code, link
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateQuestion :: error", error);
            throw error;
        }
    }


    async deleteQuestion(serialNo){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                serialNo    
            )
            return true

        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }


    async getQuestion(serialNo){
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,
                serialNo
            )
        } catch (error) {
            console.log("Appwrite serive :: getQuestion :: error", error);
            return false
        }
    }


    async getQuestions(userId){
        if(!userId) {
            console.log('getQuestions error: userId or title is not defined at configue');
            return { documents: [] };
        }
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDataBaseID,
                conf.appwriteCollectionID,    
                [
                    Query.equal('userId', userId),
                ] 
            )
            // console.log('API Response:', response);
            return response;
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return { documents: [] };
        }
    }


    async updateQuestionStatus (questionId, completed) {
        if(!questionId || !completed) {
            console.log('error at questionId & completed at updateQuestionStatus');
        }
        try {
          const response = await this.databases.updateDocument(
            conf.appwriteDataBaseID, 
            conf.appwriteCollectionID, 
            questionId, 
            {
              completed: completed
            });
          return response;
        } catch (error) {
          console.error('Error updating question status:', error);
          throw error;
        }
      }



      async getcode(questionId) {
        try {
          const document = await this.databases.getDocument(
           conf.appwriteDataBaseID, 
           conf.appwriteCollectionID,
            questionId
          );
          return document;
        } catch (error) {
          console.error('Error fetching code:', error);
        }
      }


      async saveCode(questionId, code) {
        try {
          await this.databases.updateDocument(
            conf.appwriteDataBaseID, 
            conf.appwriteCollectionID,
            questionId,
            { code }
          );
        } catch (error) {
          console.error('Error saving code:', error);
        }
      }
    


    async searchQuestions(question) {
        try {
          return await this.databases.listDocuments(
            conf.appwriteDataBaseID, 
            conf.appwriteCollectionID,
            [ 
              Query.search('Question', question),
            ]
          )
        } catch (error) {
            console.error('Error searching posts:', error);
            return { documents: [] }; 
        }
    }


    // ARRAY COLLECTION 
    async arrayQuestions(userId) {
      if(!userId) {
        console.log('getQuestions error: userId or title is not defined at configue');
        return { documents: [] };
    }
    try {
        const response = await this.databases.listDocuments(
            conf.appwriteDataBaseID,
            conf.appwriteArrayCollectionID,    
            [
                Query.equal('userId', userId),
            ] 
        )     
        return response;
    } catch (error) {
        console.log("Appwrite serive :: getQuestions :: error", error);
        return { documents: [] };
    }
    }

    async updateArrayQuestionStatus (questionId, completed) {
      if(!questionId) {
          console.log('error at questionId & completed at updateQuestionStatus');
      }
      try {
        const response = await this.databases.updateDocument(
          conf.appwriteDataBaseID, 
          conf.appwriteArrayCollectionID, 
          questionId, 
          {
            completed: completed
          });
        return response;
      } catch (error) {
        console.error('Error updating question status:', error);
        throw error;
      }
    }

    async ArraysearchQuestions(question) {
      try {
        return await this.databases.listDocuments(
          conf.appwriteDataBaseID, 
          conf.appwriteCollectionID,
          [ 
            Query.search('Question', question),
          ]
        )
      } catch (error) {
          console.error('Error searching posts:', error);
          return { documents: [] }; 
      }
  }



   // String COLLECTION 
   async stringQuestions(userId) {
    if(!userId) {
      console.log('getQuestions error: userId or title is not defined at configue');
      return { documents: [] };
  }
  try {
      const response = await this.databases.listDocuments(
          conf.appwriteDataBaseID,
          conf.appwriteStringCollectionID,    
          [
              Query.equal('userId', userId),
          ] 
      )     
      return response;
  } catch (error) {
      console.log("Appwrite serive :: getQuestions :: error", error);
      return { documents: [] };
  }
  }

  async updateStringQuestionStatus (questionId, completed) {
    if(!questionId) {
        console.log('error at questionId & completed at updateQuestionStatus');
    }
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDataBaseID, 
        conf.appwriteStringCollectionID, 
        questionId, 
        {
          completed: completed
        });
      return response;
    } catch (error) {
      console.error('Error updating question status:', error);
      throw error;
    }
  }

  async StringsearchQuestions(question) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID, 
        conf.appwriteStringCollectionID,
        [ 
          Query.search('Question', question),
        ]
      )
    } catch (error) {
        console.error('Error searching posts:', error);
        return { documents: [] }; 
    }
}


// Linked List
  async LinkedListQuestion(userId) {
    if(!userId) {
      console.log('getQuestions error: userId or title is not defined at configue');
      return { documents: [] };
  }
  try {
      const response = await this.databases.listDocuments(
          conf.appwriteDataBaseID,
          conf.appwriteLinkedListCollectionID,    
          [
              Query.equal('userId', userId),
          ] 
      )     
      return response;
  } catch (error) {
      console.log("Appwrite serive :: getQuestions :: error", error);
      return { documents: [] };
  }
  }

  async updateLinkedListQuestionStatus (questionId, completed) {
    if(!questionId) {
        console.log('error at questionId & completed at updateQuestionStatus');
    }
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDataBaseID, 
        conf.appwriteLinkedListCollectionID, 
        questionId, 
        {
          completed: completed
        });
      return response;
    } catch (error) {
      console.error('Error updating question status:', error);
      throw error;
    }
  }

  async LinkedListsearchQuestions(question) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID, 
        conf.appwriteLinkedListCollectionID,
        [ 
          Query.search('Question', question),
        ]
      )
    } catch (error) {
        console.error('Error searching posts:', error);
        return { documents: [] }; 
    }
  }

  
    // Stack COLLECTION 
  async StackQuestions(userId) {
    if(!userId) {
      console.log('getQuestions error: userId or title is not defined at configue');
      return { documents: [] };
  }
  try {
      const response = await this.databases.listDocuments(
          conf.appwriteDataBaseID,
          conf.appwriteStackCollectionID,    
          [
              Query.equal('userId', userId),
          ] 
      )     
      return response;
  } catch (error) {
      console.log("Appwrite serive :: getQuestions :: error", error);
      return { documents: [] };
  }
  }

  async updateStackQuestionStatus (questionId, completed) {
    if(!questionId) {
        console.log('error at questionId & completed at updateQuestionStatus');
    }
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDataBaseID, 
        conf.appwriteStackCollectionID, 
        questionId, 
        {
          completed: completed
        });
      return response;
    } catch (error) {
      console.error('Error updating question status:', error);
      throw error;
    }
  }

  async StacksearchQuestions(question) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID, 
        conf.appwriteStackCollectionID,
        [ 
          Query.search('Question', question),
        ]
      )
    } catch (error) {
        console.error('Error searching posts:', error);
        return { documents: [] }; 
    }
  }


   // Recusion COLLECTION 
   async RecursionQuestions(userId) {
    if(!userId) {
      console.log('getQuestions error: userId or title is not defined at configue');
      return { documents: [] };
  }
  try {
      const response = await this.databases.listDocuments(
          conf.appwriteDataBaseID,
          conf.appwriteRecursionCollectionID,    
          [
              Query.equal('userId', userId),
          ] 
      )     
      return response;
  } catch (error) {
      console.log("Appwrite serive :: getQuestions :: error", error);
      return { documents: [] };
  }
  }

  async updateRecursionQuestionStatus (questionId, completed) {
    if(!questionId) {
        console.log('error at questionId & completed at updateQuestionStatus');
    }
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDataBaseID, 
        conf.appwriteRecursionCollectionID, 
        questionId, 
        {
          completed: completed
        });
      return response;
    } catch (error) {
      console.error('Error updating question status:', error);
      throw error;
    }
  }

  async RecursionsearchQuestions(question) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID, 
        conf.appwriteRecursionCollectionID,
        [ 
          Query.search('Question', question),
        ]
      )
    } catch (error) {
        console.error('Error searching posts:', error);
        return { documents: [] }; 
    }
  }



   // Recusion COLLECTION 
   async BinaryTreeQuestions(userId) {
    if(!userId) {
      console.log('getQuestions error: userId or title is not defined at configue');
      return { documents: [] };
  }
  try {
      const response = await this.databases.listDocuments(
          conf.appwriteDataBaseID,
          conf.appwriteBinaryTreeCollectionID,    
          [
              Query.equal('userId', userId),
          ] 
      )     
      return response;
  } catch (error) {
      console.log("Appwrite serive :: getQuestions :: error", error);
      return { documents: [] };
  }
  }

  async updateBinaryTreeQuestionStatus (questionId, completed) {
    if(!questionId) {
        console.log('error at questionId & completed at updateQuestionStatus');
    }
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDataBaseID, 
        conf.appwriteBinaryTreeCollectionID, 
        questionId, 
        {
          completed: completed
        });
      return response;
    } catch (error) {
      console.error('Error updating question status:', error);
      throw error;
    }
  }

  async BinaryTreesearchQuestions(question) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID, 
        conf.appwriteBinaryTreeCollectionID,
        [ 
          Query.search('Question', question),
        ]
      )
    } catch (error) {
        console.error('Error searching posts:', error);
        return { documents: [] }; 
    }
  }


}


const service = new Service()

export default service