from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# print("OpenAI :" , os.getenv("OPENAI_API_KEY"))
# print("LangChain :" , os.getenv("LANGCHAIN_API_KEY"))


llm = ChatOpenAI(model="gpt-5-nano", temperature=0.2) # making the model more factual since temp is between 0.0-0.3

def clean_context(context):
    return [{
        "income": r.get("income"),
        "expense":r.get("expense"),
        "savings": r.get("savings")
    }
        for r in context
    ]

def generate_response(context, query, profile, trend, intelligence, goal_plan):

    # recent_history = context[-3:] if context else []

    recent_history = clean_context(context)
    

    prompt = f"""
    You are a precise financial advisor.

    === CURRENT PROFILE ===
    Income: {profile.get("income")}
    Expense: {profile.get("expense")}
    Savings: {profile.get("savings")}
    Assets: {profile.get("assets")}

    === RECENT HISTORY (last 3 records) ===
    {recent_history}

    === TREND ANALYSIS ===
    Income Change: {trend.get("income_change")}
    Expense Change: {trend.get("expense_change")}
    Savings Change: {trend.get("savings_change")}

    === FINANCIAL INTELLIGENCE ===
    Savings Rate: {intelligence["metrics"]["savings_rate"]}
    Expense Ratio: {intelligence["metrics"]["expense_ratio"]}
    Emergency Fund: {intelligence["metrics"]["emergency_months"]} months
    Health Score: {intelligence["health_score"]}/100
    Portfolio Risk: {intelligence["portfolio"]["risk"]}
    Diversification: {intelligence["portfolio"]["diversification_score"]}
    
    === GOAL PLANNING ===
    {goal_plan}
    - Evaluate if goals are feasible
    - Suggest adjustments if needed
    - Recommend monthly investment strategy
    
    === USER QUESTION ===
    {query}
    
    
    === INSTRUCTIONS ===
    1. Compare past vs present numerically
    2. Use trend values explicitly
    3. Identify improvement or deterioration
    4. Give 2–4 actionable steps
    5. Be concise, precise, and structured

    === OUTPUT FORMAT ===
    - Summary (1–2 lines)
    - Key Changes (bullet points)
    - Actionable Steps (numbered)
    """

    return llm.invoke(prompt).content

'''
gives response of the query asked using current+past financial context
'''


