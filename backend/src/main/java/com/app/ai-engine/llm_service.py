from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# print("OpenAI :" , os.getenv("OPENAI_API_KEY"))
# print("LangChain :" , os.getenv("LANGCHAIN_API_KEY"))


llm = ChatOpenAI(model="gpt-5-nano", temperature=0.3) # making the model more factual since temp is between 0.0-0.3

def generate_response(context, query, profile, trend):

    prompt = f'''
    
    You are a financial advisor.
    
    Current state: {profile}
    
    Past context: {context}
    
    Computed Trend : {trend}
    
    Query/Question : {query}
    
    Instructions:
    - use trend data explicitly
    - compare past vs present numerically
    - Give clear actionable advice
    - Be precise not vague
`   - Make it brief, precise and crisp for further assistance.

    '''

    return llm.invoke(prompt).content

'''
gives response of the query asked using current+past financial context
'''


