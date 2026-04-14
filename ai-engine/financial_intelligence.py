
# Concurred total financial exchange rate where the current savings, expense is used
# added emergency funds as well .
def compute_financial_metrics(profile):

    income = profile["income"]
    expense = profile["expense"]
    savings = profile["savings"]

    if income == 0:
        saving_rate = 0
        expense_ratio = 0

    else:
        saving_rate = savings / income
        expense_ratio = expense / income

    if expense == 0:
        emergency_months = 0
    else:
        emergency_months = savings / expense

    return {
        "savings_rate": round(saving_rate,2),
        "expense_ratio": round(expense_ratio,2),
        "emergency_months": round(emergency_months,2)
    }


# analysis through  diversification score in the assets as the diversity can be assessed through the
# total amount of assets revealed/ told by the user.
def analyse_portfolio(assets):

    total = sum(a.get("value",0) for a in assets)

    if total == 0:
        return {
            "diversification_score":0,
            "risk": "unknown"
        }

    allocation = {
        a["type"] : a["value"]/total for a in assets
    }

    diversification_score = len(allocation)

    equity = allocation.get("stocks",0) + allocation.get("crypto",0)

    if equity>0.7:
        risk = "high"
    elif equity>0.4:
        risk = "medium"
    else:
        risk = "low"

    return{
        "allocation": allocation,
        "diversification_score": diversification_score,
        "risk": risk
    }

def compute_health_score(metrics, portfolio):

    score = 0

    #savings rate
    if metrics["savings_rate"]>0.3:
        score+=30
    elif metrics["savings_rate"]>0.2:
        score+=20
    else:
        score+=10


    #emergency fund
    if metrics["emergency_months"]>=6:
        score+=30
    elif metrics["emergency_months"]>=3:
        score+=20
    else:
        score+=10

    # diversification
    if portfolio["diversification_score"]>=3:
        score += 20
    else:
        score += 10

    # risk alignment
    if portfolio["risk"]=="medium":
        score += 20
    else:
        score += 10

    return score


def financial_analysis(profile):

    metrics = compute_financial_metrics(profile)
    portfolio = analyse_portfolio(profile.get("assets", []))
    health_score = compute_health_score(metrics, portfolio)

    return {
        "metrics": metrics,
        "portfolio": portfolio,
        "health_score": health_score,
    }