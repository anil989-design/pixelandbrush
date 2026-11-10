"""
FinAI — Student Finance & Business Analytics Engine
Author: Anil Panday (Anil Pandey)
Education: Business Management with International, Ravensbourne University London
Location: London, United Kingdom

Applies business analytics metrics (daily burn rate, term runway, category variance,
and recurring spend detection) to university student transaction data in Python,
and generates structured prompts/summaries for AI financial assistants.
"""

import csv
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Dict, List


@dataclass
class Transaction:
    date: datetime
    description: str
    category: str
    amount: float  # Positive = expense, Negative = income/grant


def load_transactions(csv_path: str | Path) -> List[Transaction]:
    transactions: List[Transaction] = []
    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            transactions.append(
                Transaction(
                    date=datetime.strptime(row["date"], "%Y-%m-%d"),
                    description=row["description"].strip(),
                    category=row["category"].strip(),
                    amount=float(row["amount"]),
                )
            )
    return sorted(transactions, key=lambda t: t.date)


def analyze_student_budget(
    transactions: List[Transaction],
    current_balance: float,
    weekly_category_targets: Dict[str, float],
) -> Dict[str, object]:
    if not transactions:
        raise ValueError("No transactions provided for analysis.")

    start_date = transactions[0].date
    end_date = transactions[-1].date
    days_elapsed = max((end_date - start_date).days + 1, 1)
    weeks_elapsed = max(days_elapsed / 7.0, 1.0)

    category_totals: Dict[str, float] = defaultdict(float)
    total_spent = 0.0

    for tx in transactions:
        if tx.amount > 0:
            category_totals[tx.category] += tx.amount
            total_spent += tx.amount

    daily_burn_rate = total_spent / days_elapsed
    weekly_burn_rate = daily_burn_rate * 7.0
    runway_days = (current_balance / daily_burn_rate) if daily_burn_rate > 0 else float("inf")
    runway_weeks = runway_days / 7.0

    variance_by_category: Dict[str, Dict[str, float]] = {}
    for cat, target_weekly in weekly_category_targets.items():
        actual_weekly = category_totals.get(cat, 0.0) / weeks_elapsed
        variance_by_category[cat] = {
            "target_weekly_gbp": round(target_weekly, 2),
            "actual_weekly_gbp": round(actual_weekly, 2),
            "variance_gbp": round(actual_weekly - target_weekly, 2),
        }

    return {
        "author": "Anil Panday (Anil Pandey) — Ravensbourne University London",
        "period_days": days_elapsed,
        "total_spent_gbp": round(total_spent, 2),
        "daily_burn_rate_gbp": round(daily_burn_rate, 2),
        "weekly_burn_rate_gbp": round(weekly_burn_rate, 2),
        "current_balance_gbp": round(current_balance, 2),
        "estimated_runway_weeks": round(runway_weeks, 1),
        "category_totals_gbp": {k: round(v, 2) for k, v in category_totals.items()},
        "weekly_variance": variance_by_category,
    }


def format_ai_summary_report(metrics: Dict[str, object]) -> str:
    lines = [
        "==============================================================",
        "FinAI — Student Finance & Business Analytics Report (London)",
        f"Prepared by: {metrics['author']}",
        "==============================================================",
        f"Analysis Window     : {metrics['period_days']} days",
        f"Total Spend         : £{metrics['total_spent_gbp']:.2f}",
        f"Daily Burn Rate     : £{metrics['daily_burn_rate_gbp']:.2f} / day",
        f"Weekly Burn Rate    : £{metrics['weekly_burn_rate_gbp']:.2f} / week",
        f"Remaining Balance   : £{metrics['current_balance_gbp']:.2f}",
        f"Projected Runway    : {metrics['estimated_runway_weeks']} weeks",
        "",
        "Weekly Category Budget vs. Actual:",
    ]
    for cat, v in metrics["weekly_variance"].items():
        status = "OVER" if v["variance_gbp"] > 0 else "ON TRACK"
        lines.append(
            f"  - {cat:<16}: Actual £{v['actual_weekly_gbp']:>6.2f}/wk | "
            f"Target £{v['target_weekly_gbp']:>6.2f}/wk | "
            f"Variance £{v['variance_gbp']:>+6.2f} [{status}]"
        )
    return "\n".join(lines)


if __name__ == "__main__":
    sample_csv = Path(__file__).parent / "sample_student_transactions.csv"
    weekly_targets = {
        "Accommodation": 185.0,
        "Transport (TfL)": 32.0,
        "Groceries": 45.0,
        "Eating Out": 25.0,
        "Study & Tech": 15.0,
    }
    txs = load_transactions(sample_csv)
    report_metrics = analyze_student_budget(
        transactions=txs,
        current_balance=1450.00,
        weekly_category_targets=weekly_targets,
    )
    print(format_ai_summary_report(report_metrics))
