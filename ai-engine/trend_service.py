import re

class DataInsufficientError(Exception):
    def __init__(self, message):
        super().__init__(message)



# def extract_financials(record):
#
#         '''
#
#         The commented out steps were giving pattern discrepancy, overall matching
#         was correct , but the starting structure was from 0,0,0 and not given
#         financial data.
#         '''
#
#         metadata = record.get("metadata")
#         income = record.get("income")
#         expense = record.get("expense")
#         savings = record.get("savings")
#
#         # matches = re.findall(
#         #     r"Income:\s*(\d).*Expense:\s*(\d).*Savings:\s*(\d).*",
#         #     text,
#         #     re.DOTALL
#         # )
#         #
#         # return  [(float(i), float(e), float(s)) for i,e,s in matches]
#
#         # if not income or not expense or not savings:
#         #     return None
#
#         if income is None  or expense is None or savings is None:
#             raise DataInsufficientError("Invalid financial format")
#
#         return(
#             float(income),
#             float(expense),
#             float(savings)
#         )


def extract_financials(record):

    try:
        text = record.page_content if hasattr(record, "page_content") else str(record)

        import re

        income = re.search(r"income\s*[:\-]?\s*(\d+)", text, re.IGNORECASE)
        expense = re.search(r"expense\s*[:\-]?\s*(\d+)", text, re.IGNORECASE)
        savings = re.search(r"savings\s*[:\-]?\s*(\d+)", text, re.IGNORECASE)

        if not (income and expense and savings):
            raise ValueError("Missing fields")

        return int(income.group(1)), int(expense.group(1)), int(savings.group(1))

    except:
        raise DataInsufficientError("Invalid financial format")


def analyse_trend(profile, records):

    valid_records = []

    for r in records:
        try:
            data = extract_financials(r)
            valid_records.append(data)
        except:
            continue


    if len(valid_records) < 2:
        return {
            "income_change": 0,
            "expense_change": 0,
            "savings_change": 0,
            "status": "insufficient_data"
        }

    past = valid_records[-2]
    current = valid_records[-1]

    past_income, past_expense, past_savings = past
    curr_income, curr_expense, curr_savings = current

    def pct_change(old, new):
        if old == 0:
            return 0
        return round((new - old) / old, 2)

    return {
        "income_change": pct_change(past_income, curr_income),
        "expense_change": pct_change(past_expense, curr_expense),
        "savings_change": pct_change(past_savings, curr_savings),
        "status": "ok"
    }


