
def generate_rule_based_advice(metrics, portfolio, goal_plan):

    advice = []

    # savings
    if metrics["savings_rate"] < 0.2:
        advice.append("Increase your savings rate to at least 20%")

    # emergency fund
    if metrics["emergency_months"] < 3:
        advice.append("Build an emergency fund of at least 3-6 months")

    # diversification
    if portfolio["diversification_score"] < 3:
        advice.append("Diversify your investments across more asset classes")

    # risk
    if portfolio["risk"] == "high":
        advice.append("Consider reducing exposure to high-risk assets")

    # goals
    for goal in goal_plan:
        if goal["feasibility"] == "difficult":
            advice.append(f"Goal '{goal['name']}' may not be achievable — adjust timeline or amount")

    return advice