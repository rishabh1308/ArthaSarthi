from vector_store import vector_DB

def store_financial_profile(user_id, income, expense, savings, risk):

    text = f"""
    User {user_id} financial state:
    Income->{income}
    expense->{expense}
    savings->{savings}
    risk->{risk}          
    """

    vector_DB.add_texts([text])

def store_chat_memory(user_id, query, profile, response):

    text = f'''
    User {user_id}
    financial snapshot:
    user  Query->{query}
    Current State ->{profile}
    AI response -> {response}
    '''

    vector_DB.add_texts(
        [text],
        metadatas=[ {"user_id": user_id} ]
    )

'''
adding structure and historical awareness 
trend should be detected now with this structure encased.
Also adding response by AI for RAG retrieval ahead.
'''