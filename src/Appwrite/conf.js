const conf = {
   appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),

   appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

   appwriteDataBaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

   appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),

   appwriteArrayCollectionID: String(import.meta.env.VITE_APPWRITE_ARRAY_COLLECTION_ID),

   appwriteStringCollectionID: String(import.meta.env.VITE_APPWRITE_STRING_COLLECTION_ID),

   appwriteLinkedListCollectionID: String(import.meta.env.VITE_APPWRITE_LINKEDLIST_COLLECTION_ID),

   appwriteStackCollectionID: String(import.meta.env.VITE_APPWRITE_STACK_COLLECTION_ID),

   appwriteRecursionCollectionID: String(import.meta.env.VITE_APPWRITE_RECURSION_COLLECTION_ID),

   appwriteBinaryTreeCollectionID: String(import.meta.env.VITE_APPWRITE_BINARYTREE_COLLECTION_ID),

   // appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf;