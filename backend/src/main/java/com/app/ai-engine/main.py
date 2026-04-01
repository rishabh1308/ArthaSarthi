from fastapi import FastAPI
from pydantic import BaseModel
from graph import build_graph
from memory_service import store_chat_memory

app = FastAPI()
graph = build_graph()

class ChatRequest(BaseModel):
    user_id:int
    message: str
    profile: str

@app.post("/chat")
def chat(request: ChatRequest):
    result = graph.invoke({
        "query": request.message,
        "profile": request.profile,
        "user_id": request.user_id
    })


    store_chat_memory(
        user_id=request.user_id,
        query=request.message,
        profile=request.profile,
        response= result["response"]
    )

    return {
        "response": result["response"]
    }