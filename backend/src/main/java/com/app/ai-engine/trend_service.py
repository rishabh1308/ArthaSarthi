import re

class DataInsufficientError(Exception):
    def __init__(self, message):
        super().__init__(message)



def extract_financials(text):

        '''

        The commented out steps were giving pattern discrepancy, overall matching
        was correct , but the starting structure was from 0,0,0 and not given
        financial data.
        '''

        income = re.search(r"Income:\s*(\d+)", text)
        expense = re.search(r"Expense:\s*(\d+)", text)
        savings = re.search(r"Savings:\s*(\d+)", text)

        # matches = re.findall(
        #     r"Income:\s*(\d).*Expense:\s*(\d).*Savings:\s*(\d).*",
        #     text,
        #     re.DOTALL
        # )
        #
        # return  [(float(i), float(e), float(s)) for i,e,s in matches]

        # if not income or not expense or not savings:
        #     return None

        if not income or not expense or not savings:
            raise DataInsufficientError("Invalid financial format")

        return(
            float(income.group(1)),
            float(expense.group(1)),
            float(savings.group(1)),
        )


def analyse_trend(current_profile, records):

    if len(records) < 2:
        return {
            "income_change": 0,
            "expense_change": 0,
            "savings_change": 0,
        }

    past_nums = extract_financials(records[-2])
    current_nums = extract_financials(records[-1])

    #Single tuple entry in List of Tuple
    past_income, past_expense, past_savings = past_nums
    current_income, current_expense, current_savings = current_nums

    trend = {
        "income_change": current_income - past_income,
        "expense_change": current_expense - past_expense,
        "savings_change": current_savings - past_savings
    }

    # print("PAST NUMS:", past_nums)
    # print("CURRENT NUMS:", current_nums)

    return trend


