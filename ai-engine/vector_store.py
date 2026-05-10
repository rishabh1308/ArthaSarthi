from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings



embedding = OpenAIEmbeddings(
    model="text-embedding-3-small"
)

vector_DB = Chroma(
    collection_name="financial_memory",
    embedding_function=embedding,
    persist_directory="/tmp/chroma_db"
)
