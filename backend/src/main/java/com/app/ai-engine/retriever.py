from vector_store import vector_DB


def retrieve_records( user_id):


    docs = vector_DB.get(where={"user_id":user_id})

    combined = list(zip(docs["documents"], docs["metadatas"]))

    valid_records = [(doc, meta) for doc, meta in combined if "timestamp" in meta]

    sorted_docs = sorted(
        valid_records, key = lambda x: x[1].get("timestamp",0)
    )

    return [doc for doc, _ in sorted_docs]


    # return "\n\n".join( doc.page_content for doc in docs)

'''
RAG implementation :
Query will be turned to embeddings 
comparing with past results and returning the top 5 or upto 5 results which are the closest.


without this Hallucination of LLM will happen
will overlook the past context with every query
'''