from langgraph.graph import StateGraph
from retriever import  retrieve_records
from llm_service import generate_response
from trend_service import analyse_trend

def build_graph():

    def retrieve_node(state):
       return {
           **state, # unpacks state dictionary into its keyword arguments automatically.
           "context": retrieve_records(state["user_id"])
       }

    def trend_node(state):
        return {
            **state,
            "trend":analyse_trend(
                state["profile"],
                state["context"]
            )
        }

    def llm_node(state):

        return {
            **state,
            "response": generate_response(state["context"], state["query"], state["profile"],state["trend"])
        }

    graph = StateGraph(dict)
    graph.add_node("retrieve", retrieve_node)
    graph.add_node("trend", trend_node)
    graph.add_node("llm", llm_node)


    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "trend")
    graph.add_edge("trend", "llm")

    return graph.compile()
