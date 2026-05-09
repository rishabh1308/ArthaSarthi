import time
from vector_store import vector_DB

def clean_metadata(metadata: dict) -> dict:
    """
    Ensures metadata is compatible with Chroma:
    - No empty lists
    - No nested dicts
    - Only primitives (int, float, str, bool)
    """

    cleaned = {}

    for key, value in metadata.items():

        if value is None:
            continue


        if isinstance(value, list):
            if len(value) == 0:
                continue

            cleaned[key] = ", ".join(map(str, value))
            continue


        if isinstance(value, dict):
            cleaned[key] = str(value)
            continue


        cleaned[key] = value

    return cleaned



def store_financial_profile(user_id, income, expense, savings, risk):

    text = f"""
User {user_id} financial state:
Income -> {income}
Expense -> {expense}
Savings -> {savings}
Risk -> {risk}
"""

    metadata = clean_metadata({
        "user_id": user_id,
        "income": income,
        "expense": expense,
        "savings": savings,
        "risk": risk,
        "timestamp": time.time()
    })

    vector_DB.add_texts(
        [text],
        metadatas=[metadata]
    )


def store_chat_memory(user_id, query, profile, response):

    text = f"""
User {user_id} interaction:
Query -> {query}
Profile Snapshot -> {profile}
AI Response -> {response}
"""


    assets = profile.get("assets", [])

    metadata = clean_metadata({
        "user_id": user_id,
        "income": profile.get("income"),
        "expense": profile.get("expense"),
        "savings": profile.get("savings"),


        "assets_count": len(assets),


        "assets_summary": ", ".join(
            [str(a.get("type")) for a in assets]
        ) if assets else None,

        "timestamp": time.time()
    })

    vector_DB.add_texts(
        [text],
        metadatas=[metadata]
    )