"""
API 개발 시 참고 : 프론트엔드에서 http 엔드포인트를 통해 호출되는 메서드
"""
# 기본적으로 추가
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import FileResponse
from backend.core.status import Status, SU, ER
import logging
import os
from typing import Optional
# (db 세션 관련)이후 삭제 예정, 개발을 위해 일단 임시로 추가
from sqlalchemy.ext.asyncio import AsyncSession
from backend.var.session import get_db

# 호출할 모듈 추가
from backend.api.v1.exam_sharing_board.exam_sharing_board_dto import ReadBoard, ReadBoardlist, CreateBoard, UpdateBoard
from backend.api.v1.exam_sharing_board import exam_sharing_board_svc

BASE_DIR = os.path.dirname('C:/Users/user/Desktop/minseo_koka/semtle-web-client/backend/')
STATIC_DIR = os.path.join(BASE_DIR, 'images/exam_sharing_board/')
SERVER_IMG_DIR = os.path.join('http://localhost:8000/', 'images/exam_sharing_board/')


# 로깅 및 라우터 객체 생성 - 기본적으로 추가
logger = logging.getLogger(__name__)
router = APIRouter(prefix="/exam_sharing_board", tags=["exam_sharing_board"])

# 라우터 추가 시 현재는 backend.api.v1.__init__.py에 생성하려는 라우터 추가해줘야 함.(수정 예정)


# Read List
@router.get(
    "/get list",
    summary="족보 게시판 게시물 전체 조회",
    description="- 족보 게시판 게시물 전체 리스트 반환, 등록된 예제가 없는 경우 `[]` 반환",
    response_model=ReadBoardlist,
    responses=Status.docs(SU.SUCCESS, ER.NOT_FOUND)
)
# 함수명 get, post, update, delete 중 1택 + 목적에 맞게 이름 작성
async def get_exam_sharing_board_list(db: AsyncSession = Depends(get_db), page: int = 0):
    # 개발 중 logging 사용하고 싶을 때 이 코드 추가
    logger.info("----------족보 게시판 전체 목록 조회----------")
    total, exam_sharing_board_info = await exam_sharing_board_svc.get_exam_sharing_board_list(db, skip=page)
    return {
        'total': total,
        'Board_info': exam_sharing_board_info
    }


# Read
@router.get(
    "/get",
    summary="족보 게시판 특정 게시물 조회",
    description="- 족보 게시판 특정 게시물 정보 반환, 등록된 예제가 없는 경우 `[]` 반환",
    response_model=ReadBoard,
    responses=Status.docs(SU.SUCCESS, ER.NOT_FOUND)
)
# 함수명 get, post, update, delete 중 1택 + 목적에 맞게 이름 작성
async def get_exam_sharing_board(db: AsyncSession = Depends(get_db), exam_sharing_board_no: int = 0):
    # 개발 중 logging 사용하고 싶을 때 이 코드 추가
    logger.info("----------족보 게시판 특정 게시물 조회----------")
    exam_sharing_board_info = await exam_sharing_board_svc.get_exam_sharing_board(db, exam_sharing_board_no)
    return exam_sharing_board_info


# Image 
@router.get(
    "/images",
    summary="족보 게시판 특정 게시물 이미지 조회",
    description="- 족보 게시판 특정 게시물 이미지 반환, 등록된 예제가 없는 경우 `[]` 반환",
    response_model=list[str],
    responses=Status.docs(SU.SUCCESS, ER.NOT_FOUND)
)
# 함수명 get, post, update, delete 중 1택 + 목적에 맞게 이름 작성
async def get_exam_sharing_board(db: AsyncSession = Depends(get_db), file_name: str = ""):
    # 개발 중 logging 사용하고 싶을 때 이 코드 추가
    logger.info("----------족보 게시판 특정 게시물 이미지 조회----------")
    return FileResponse(''.join([STATIC_DIR,file_name]))


# Create
@router.post(
    "/",
    summary="입력 받은 데이터를 데이터베이스에 추가",
    description="- String-Form / String-Form / Integer-Form",
    # response_model=ResultType, # -> 코드 미완성, 주석처리
    responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD, ER.FIELD_VALIDATION_ERROR)
)
async def create_exam_sharing_board(
    exam_sharing_board_info: Optional[CreateBoard],
    db: AsyncSession = Depends(get_db)
):
    logger.info("----------족보 게시판 신규 게시물 생성----------")
    exam_sharing_board_no = await exam_sharing_board_svc.create_exam_sharing_board(exam_sharing_board_info, db)
    return { "status": SU.CREATED, "Exam_Sharing_Board_No": exam_sharing_board_no}


# # Create
# @router.post(
#     "/",
#     summary="입력 받은 데이터를 데이터베이스에 추가",
#     description="- String-Form / String-Form / List[UploadFile]",
#     # response_model=ResultType, # -> 코드 미완성, 주석처리
#     responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD, ER.FIELD_VALIDATION_ERROR)
# )
# async def create_exam_sharing_board(
#     title: str,
#     content: str,
#     file_name: list[UploadFile] = File(...),
#     db: AsyncSession = Depends(get_db)
# ):
#     logger.info("----------족보 게시판 신규 게시물 생성----------")
#     await exam_sharing_board_svc.create_exam_sharing_board(title, content, file_name, db)
#     return SU.CREATED


# Create
@router.put(
    "/create upload",
    summary="입력 받은 이미지를 데이터베이스에 추가",
    description="- List[UploadFile]",
    # response_model=ResultType, # -> 코드 미완성, 주석처리
    responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD, ER.FIELD_VALIDATION_ERROR)
)
async def upload_file_exam_sharing_board(
    exam_sharing_board_no: int,
    file_name: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db)
):
    logger.info("----------족보 게시판 신규 게시물 이미지 생성----------")
    await exam_sharing_board_svc.upload_file_exam_sharing_board(exam_sharing_board_no, file_name, db)
    return SU.CREATED


# Update
@router.put(
    "/",
    summary="입력 받은 데이터로 기존 게시글 제목 및 내용 수정",
    description="- no가 일치하는 데이터의 title, content, view 수정",
    responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD)
)
async def update_exam_sharing_board(
    exam_sharing_board_no: int,
    exam_sharing_board_info: Optional[UpdateBoard],
    db: AsyncSession = Depends(get_db),
    select: bool = False
):
    logger.info("----------족보 게시판 기존 게시물 수정----------")
    await exam_sharing_board_svc.update_exam_sharing_board(exam_sharing_board_no, exam_sharing_board_info, db, select=select)
    return SU.SUCCESS


# # Update
# @router.put(
#     "/",
#     summary="입력 받은 데이터로 변경 사항 수정",
#     description="- no가 일치하는 데이터의 title, content, file_name 수정",
#     responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD)
# )
# async def update_exam_sharing_board(
#     exam_sharing_board_no: int,  # JWT 토큰에서 id 가져오는 방식으로 변경, 이건 임시조치
#     title: str,
#     content: str,
#     file_name: list[UploadFile] = File(...),
#     db: AsyncSession = Depends(get_db)
# ):
#     logger.info("----------족보 게시판 기존 게시물 수정----------")
#     await exam_sharing_board_svc.update_exam_sharing_board(exam_sharing_board_no, title, content, file_name, db)
#     return SU.SUCCESS


# Update
@router.put(
    "/update upload",
    summary="입력 받은 파일로 파일 경로 수정",
    description="- no가 일치하는 데이터의 file_name 수정",
    responses=Status.docs(SU.CREATED, ER.DUPLICATE_RECORD)
)
async def upload_update_file_exam_sharing_board(
    exam_sharing_board_no: int,
    file_name: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
    select: bool = False
):
    logger.info("----------족보 게시판 기존 게시물 파일 수정----------")
    await exam_sharing_board_svc.upload_update_file_exam_sharing_board(exam_sharing_board_no, file_name, db, select=select)
    return SU.SUCCESS


# Delete
@router.delete(
    "/",
    summary="족보 게시판 게시물 삭제",
    description="- exam_sharing_board_no가 일치하는 데이터 삭제",
    responses=Status.docs(SU.SUCCESS, ER.DUPLICATE_RECORD),
)
async def delete_exam_sharing_board(
    exam_sharing_board_no: int, # JWT 토큰에서 id 가져오는 방식으로 변경, 임시조치
    db: AsyncSession = Depends(get_db)
):
    await exam_sharing_board_svc.delete_exam_sharing_board(exam_sharing_board_no, db)
    return SU.SUCCESS


# sort title
@router.get(
    "/sort title",
    summary="족보 게시판 게시물 제목 정렬",
    description="- 족보 게시판 게시물 제목을 가나다순으로 정렬하여 반환, 등록된 예제가 없는 경우 `[]` 반환",
    response_model=ReadBoardlist,
    responses=Status.docs(SU.SUCCESS, ER.NOT_FOUND)
)
# 함수명 get, post, update, delete 중 1택 + 목적에 맞게 이름 작성
async def sort_exam_sharing_board(db: AsyncSession = Depends(get_db), page: int = 0, select: int = 0):
    # 개발 중 logging 사용하고 싶을 때 이 코드 추가
    logger.info("----------족보 게시판 제목 가나다순 정렬----------")
    total, exam_sharing_board_info = await exam_sharing_board_svc.sort_exam_sharing_board(db, skip=page, select=select)
    return {
        'total': total,
        'Board_info': exam_sharing_board_info
    }