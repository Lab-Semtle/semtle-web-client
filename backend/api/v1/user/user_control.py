from typing import Annotated
from typing import Optional
from fastapi import APIRouter, Depends

from backend.api.v1.user.user_dto import ReadUserInfo, CreateUserInfo, UpdateUserInfo
from backend.api.v1.user import user_service
from backend.core.type import ResultType
from backend.core.status import Status, SU, ER
import logging

# (db 세션 관련)이후 삭제 예정
from sqlalchemy.ext.asyncio import AsyncSession
from backend.var.session import get_db


logger = logging.getLogger(__name__)
router = APIRouter(prefix="/user")


@router.get(
    "/",
    summary="전체 유저 정보 목록 조회",
    description="- 유저 정보 리스트 반환, 등록된 유저가 없는 경우 `[]` 반환",
    response_model=list[ReadUserInfo],
    responses=Status.docs(SU.SUCCESS, ER.NOT_FOUND)
)
async def get_users(db: AsyncSession = Depends(get_db)):
    # 개발 중 logging 사용하고 싶을 때 이 코드 추가
    logger.info("----------전체 유저 정보 목록 조회----------")
    users_info = await user_service.get_users(db)
    return users_info


@router.post(
    "/",
    summary="신규 유저 생성",
    description="- 중복 유저 확인 기능 아직 X, 데이터베이스에 유저 추가",
    response_model=ResultType,
    responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD),
    # status_code=Status.docs(SU.CREATED)
)
async def create_user(user_info: Optional[CreateUserInfo], db: AsyncSession = Depends(get_db)):
    logger.info("----------신규 유저 생성----------")
    await user_service.create_user(user_info, db)
    return SU.CREATED
