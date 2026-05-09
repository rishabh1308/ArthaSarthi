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

def generate_response(context, query, profile, trend, intelligence=None, goal_plan=None, advice=None):

    # recent_history = context[-3:] if context else []

    recent_history = clean_context(context)

    prompt = f"""
    You are a highly precise financial advisor. You must base your advice strictly on the provided data.

    -----------------------------------
    USER PROFILE
    -----------------------------------
    Income: {profile.get("income")}
    Expense: {profile.get("expense")}
    Savings: {profile.get("savings")}
    Assets: {profile.get("assets")}

    -----------------------------------
    RECENT HISTORY (last records)
    -----------------------------------
    {recent_history}

    -----------------------------------
    TREND ANALYSIS
    -----------------------------------
    Income Change: {trend.get("income_change")}
    Expense Change: {trend.get("expense_change")}
    Savings Change: {trend.get("savings_change")}

    -----------------------------------
    FINANCIAL INTELLIGENCE
    -----------------------------------
    Savings Rate: {intelligence["metrics"]["savings_rate"]}
    Expense Ratio: {intelligence["metrics"]["expense_ratio"]}
    Emergency Fund: {intelligence["metrics"]["emergency_months"]} months
    Health Score: {intelligence["health_score"]}/100

    Portfolio Risk: {intelligence["portfolio"]["risk"]}
    Diversification: {intelligence["portfolio"]["diversification_score"]}

    -----------------------------------
    PROJECTION
    -----------------------------------
    Emergency Fund Target: {intelligence["projection"]["emergency_target"]}
    Months to Reach Target: {intelligence["projection"]["months_to_goal"]}

    -----------------------------------
    SYSTEM PRIORITY
    -----------------------------------
    {intelligence["priority"]}

    -----------------------------------
    GOAL PLANNING
    -----------------------------------
    {goal_plan}

    -----------------------------------
    USER QUESTION
    -----------------------------------
    {query}
    
    ALLOCATION PLAN:
    Debt: {intelligence["allocation"]["debt"] * 100}%
    FD: {intelligence["allocation"]["fd"] * 100}%
    Equity: {intelligence["allocation"]["equity"] * 100}%

    -----------------------------------
    STRICT INSTRUCTIONS
    -----------------------------------
    1. FIRST, identify the user's financial condition (e.g., critical liquidity, stable, etc.)
    2. ALWAYS prioritize based on SYSTEM PRIORITY above
    3. Compare past vs present using exact numbers
    4. Explicitly use trend percentages (increase/decrease)
    5. Use projection data to give timelines (months to goal)
    6. NEVER give generic advice (e.g., "save more", "reduce expenses")
    7. Every recommendation MUST include:
       - numeric value (₹ or %)
       - or timeline (months)
    8. If emergency fund < 3 months → make it top priority
    9. If portfolio risk is high → suggest rebalancing
    

    ADDITIONAL STRICT RULES:
    
    - Use realistic financial language (avoid fractional months like 4.5 → say 4–5 months)
    - Do NOT use words like "optional" unless uncertainty is real
    - Every investment recommendation must include:
      - asset type (e.g., index fund, FD, debt fund)
      - reason for selection
    - When portfolio risk is unknown → default to low-risk instruments first
    - Avoid vague allocations (e.g., "some amount") — always specify ₹ or %

    -----------------------------------
    OUTPUT FORMAT (STRICT)
    -----------------------------------
    Summary:
    (2–3 lines stating financial condition + biggest issue)

    Key Insights:
    - Bullet points with numeric comparisons
    - Mention trend changes explicitly

    Action Plan:
    1. Step with numbers + timeline
    2. Step with numbers + timeline
    3. Step with numbers + timeline (optional)
    """

    return llm.invoke(prompt).content

'''
gives response of the query asked using current+past financial context
'''


