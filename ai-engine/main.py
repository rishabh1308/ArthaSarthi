from typing import Dict, List, Any

from fastapi import FastAPI
from pydantic import BaseModel
from graph import build_graph
from memory_service import store_chat_memory

app = FastAPI()
graph = build_graph()

class ChatRequest(BaseModel):
    user_id:int
    message: str
    profile: Dict[str,Any]
    goals: List[Dict[str,Any]] = []

@app.post("/chat")
async def chat(request: ChatRequest):
    result = graph.invoke({
        "query": request.message,
        "profile": request.profile,
        "user_id": request.user_id,
        "goals": request.goals
    })

    return {
        "response": result.get("response"),
        "error": result.get("error")
    }