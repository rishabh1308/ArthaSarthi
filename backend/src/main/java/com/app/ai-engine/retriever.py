from vector_store import vector_DB


def retrieve_context(query, user_id):

    query_prompt=f'''
    
    Financial History related to:
    {query}
    Income, expense, savings, trends, comparison
    
    '''

    docs = vector_DB.similarity_search(query_prompt,
                                       k=5,
                                       filter={"user_id": user_id}
                                       )
    return "\n\n".join( doc.page_content for doc in docs)

'''
RAG implementation :
Query will be turned to embeddings 
comparing with past results and returning the top 5 or upto 5 results which are the closest.


without this Hallucination of LLM will happen
will overlook the past context with every query
'''