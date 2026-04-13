from vector_store import vector_DB


def retrieve_records(user_id, limit = 5):


    docs = vector_DB.get(where={"user_id":user_id})

    documents = docs.get('documents',[])
    metadatas = documents.get('metadata',[])

    combined = list(zip(documents, metadatas))

    valid_records = [meta for doc, meta in combined if "timestamp" in meta]

    sorted_records = sorted(
        valid_records, key = lambda x: x.get("timestamp",0)
    )

    return sorted_records[-limit:]


    # return "\n\n".join( doc.page_content for doc in docs)

'''
RAG implementation :
Query will be turned to embeddings 
comparing with past results and returning the top 5 or upto 5 results which are the closest.


without this Hallucination of LLM will happen
will overlook the past context with every query
'''