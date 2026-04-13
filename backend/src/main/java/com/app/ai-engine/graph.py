from langgraph.graph import StateGraph
from retriever import  retrieve_records
from llm_service import generate_response
from trend_service import analyse_trend
from memory_service import store_chat_memory
from financial_intelligence import financial_analysis
from goal_planner import plan_multiple_goals

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

    def intelligence_node(state):
        state["intelligence"] = financial_analysis(state["profile"])
        return state


    def goal_node(state):

        goals = state.get('goals',[])
        if goals:
            state["goal_plan"] = plan_multiple_goals(
                state["profile"],
                goals
            )
        else:
            state["goal_plan"] = []

        return state


    def llm_node(state):

        response = generate_response(state["context"], state["query"], state["profile"], state["trend"])

        store_chat_memory(
            state["user_id"],
            state["query"],
            state["profile"],
            response=response
        )

        return {
            **state,
            "response": response
        }

    graph = StateGraph(dict)
    graph.add_node("retrieve", retrieve_node)
    graph.add_node("trend", trend_node)
    graph.add_node("llm", llm_node)
    graph.add_node("intelligence", intelligence_node)
    graph.add("goal", goal_node)

    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "trend")
    graph.add_edge("trend", "intelligence")
    graph.add_edge("intelligence", "goal")
    graph.add_edge("goal", "llm")

    return graph.compile()
