import re

class DataInsufficientError(Exception):
    def __init__(self, message):
        super().__init__(message)

def analyse_trend(current_profile, past_context):

    def extract_numbers(text):
        nums = list(map(float,re.findall(r'\d+', text)))
        return nums

    past_nums = extract_numbers(past_context)
    current_nums = extract_numbers(current_profile)

    if len(past_nums) <3 or len(current_nums) <3:
        raise DataInsufficientError("Not enough data for trend analysis")

    past_income, past_expense, past_savings = past_nums[:3]
    current_income, current_expense, current_savings = current_nums[:3]

    trend = {
        "income_change": past_income - current_income,
        "expense_change": past_expense - current_expense,
        "savings_change": past_savings - current_savings
    }

    return trend

