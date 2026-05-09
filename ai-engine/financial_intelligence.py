
# Concurred total financial exchange rate where the current savings, expense is used
# added emergency funds as well .
import math

def compute_financial_metrics(profile):

    income = profile.get("income", 0)
    expense = profile.get("expense", 0)
    savings = profile.get("savings", 0)

    saving_rate = savings / income if income > 0 else 0
    expense_ratio = expense / income if income > 0 else 0

    # Handle emergency fund properly
    if expense == 0:
        emergency_months = math.inf
    else:
        emergency_months = savings / expense

    return {
        "income": income,
        "expense": expense,
        "savings": savings,
        "savings_rate": round(saving_rate, 2),
        "expense_ratio": round(expense_ratio, 2),
        "emergency_months": round(emergency_months, 2) if emergency_months != math.inf else 999
    }


def analyse_portfolio(assets):

    total = sum(a.get("value", 0) for a in assets)

    if total == 0:
        return {
            "allocation": {},
            "diversification_score": 0,
            "risk": "unknown"
        }

    allocation = {}

    # FIX: merge duplicate asset types
    for a in assets:
        asset_type = a.get("type")
        value = a.get("value", 0)

        allocation[asset_type] = allocation.get(asset_type, 0) + (value / total)

    diversification_score = len(allocation)

    equity = allocation.get("stocks", 0) + allocation.get("crypto", 0)

    if equity > 0.7:
        risk = "high"
    elif equity > 0.4:
        risk = "medium"
    else:
        risk = "low"

    return {
        "allocation": allocation,
        "diversification_score": diversification_score,
        "risk": risk
    }

def compute_health_score(metrics, portfolio):

    score = 0

    # Savings rate → continuous scoring
    score += min(metrics["savings_rate"] * 100, 30)

    # Emergency fund
    if metrics["emergency_months"] >= 6:
        score += 30
    elif metrics["emergency_months"] >= 3:
        score += 20
    else:
        score += 10

    # Diversification
    score += min(portfolio["diversification_score"] * 5, 20)

    # Risk alignment
    if portfolio["risk"] == "medium":
        score += 20
    elif portfolio["risk"] == "low":
        score += 15
    else:
        score += 10

    return int(score)


def compute_projection(profile):

    savings = profile.get("savings", 0)
    expense = profile.get("expense", 1)

    target = expense * 3  # 3 months emergency fund

    if savings <= 0:
        months_needed = math.inf
    else:
        months_needed = target / savings

    return {
        "emergency_target": target,
        "months_to_goal": round(months_needed, 1) if months_needed != math.inf else -1
    }

def compute_priority(metrics, portfolio):

    priorities = []

    if metrics["emergency_months"] < 1:
        priorities.append("CRITICAL: Build emergency fund immediately")

    if metrics["savings_rate"] < 0.2:
        priorities.append("HIGH: Increase savings rate")

    if portfolio["diversification_score"] < 2:
        priorities.append("MEDIUM: Improve diversification")

    if portfolio["risk"] == "high":
        priorities.append("MEDIUM: Reduce high-risk exposure")

    return priorities


def classify_financial_state(metrics):

    state = ""

    if metrics["emergency_months"] < 1:
            state =  "CRITICAL_LIQUIDITY"

    elif metrics["emergency_months"] < 3:
            state = "LOW_LIQUIDITY"

    elif metrics["savings_rate"] < 0.2:
            state = "LOW_SAVINGS"

    return "STABLE" if state == "" else state


def allocation_engine(risk="low"):

    if risk == "low":
        return {
            "debt": 0.6,
            "fd": 0.4,
            "equity": 0.0
        }

    elif risk == "medium":
        return {
            "debt": 0.4,
            "fd": 0.2,
            "equity": 0.4
        }

    else:  # high risk
        return {
            "debt": 0.2,
            "fd": 0.1,
            "equity": 0.7
        }


def sip_projection(monthly_investment, annual_return, years):

    r = annual_return / 12 / 100
    n = years * 12

    future_value = monthly_investment * (((1 + r)**n - 1) / r) * (1 + r)

    return round(future_value, 2)


def goal_investment_plan(goal_amount, years, expected_return):

    r = expected_return / 12 / 100
    n = years * 12

    monthly_investment = goal_amount / (((1 + r)**n - 1) / r * (1 + r))

    return round(monthly_investment, 2)


def financial_analysis(profile):

    metrics = compute_financial_metrics(profile)
    portfolio = analyse_portfolio(profile.get("assets", []))
    health_score = compute_health_score(metrics, portfolio)
    projection = compute_projection(profile)
    priority = compute_priority(metrics, portfolio)
    state = classify_financial_state(metrics)
    allocation = allocation_engine(portfolio["risk"])

    return {
        "metrics": metrics,
        "portfolio": portfolio,
        "health_score": health_score,
        "projection": projection,
        "priority": priority,
        "state": state,
        "allocation": allocation
    }