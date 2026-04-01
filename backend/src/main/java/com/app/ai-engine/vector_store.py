from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

vector_DB = Chroma(
    collection_name="financial_memory",
    embedding_function=embedding,
    persist_directory="./chroma_db"
)

'''
semantic memory of the User current and past profiles 
it stores and retrieves embeddings 

HuggingFace embedding converts txt -> numeric vector

Chroma (Vector DB) stores Vector + Original text

without this AI will become forgetful and stateless and will respond ,
as per the current and not previous choices
'''