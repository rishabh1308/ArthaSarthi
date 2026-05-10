from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

print("STEP 1")

embedding = OpenAIEmbeddings(
    model="text-embedding-3-small"
)

print("STEP 2")

vector_DB = Chroma(
    collection_name="financial_memory",
    embedding_function=embedding,
    persist_directory="/tmp/chroma_db"
)

print("STEP 3")