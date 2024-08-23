"""
반환 형식 재정의
"""
from backend.var.dto import BaseDTO


class ResultType(BaseDTO):
    status: str
    message: str
    detail: dict[str, str] | str = {}
