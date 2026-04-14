
def plan_goal(profile, goal):

    income = profile.get("income", 0)
    savings = profile.get("savings", 0)

    target_amount = goal.get("target_amount", 0)
    years = goal.get("years", 0)

    months = years * 12

    #remaining amount
    remaining = max(target_amount - savings,  0)

    if months == 0:
        monthly_required = remaining
    else:
        monthly_required = remaining/months


    affordable = monthly_required / income if income else 0


    if affordable < 0.2:
        feasibility = "easy"
    elif affordable < 0.4:
        feasibility = "moderate"
    else:
        feasibility = "difficult"

    return {
        "target": target_amount,
        "years": years,
        "monthly_required": round(monthly_required,5),
        "feasibility": feasibility,
    }


def plan_multiple_goals(profile, goals):

    results = []

    for goal in goals:
        result = plan_goal(profile, goal)
        result["name"] = goal.get("name","goal")
        results.append(result)

    return results


