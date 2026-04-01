from langgraph.graph import StateGraph
from retriever import retrieve_context
from llm_service import generate_response

def build_graph():

    def retrieve_node(state):
       return {
           "query": state["query"],
           "profile": state["profile"],
           "context": retrieve_context(state["query"], state["user_id"])
       }

    def llm_node(state):
        return {
            "response": generate_response(state["context"], state["query"], state["profile"])
        }

    graph = StateGraph(dict)
    graph.add_node("retrieve", retrieve_node)
    graph.add_node("llm", llm_node)

    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "llm")

    return graph.compile()
