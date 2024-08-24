"""
API 개발 시 참고 : 비즈니스 로직 작성, control에서 호출
"""
# 기본적으로 추가
from fastapi import Depends, UploadFile, File
from sqlalchemy import Result, ScalarResult, select, update, insert, delete, func
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload, query
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone
import os
import secrets

from backend.api.v1.Study_Board_Comment.Study_Board_Comment_dto import UpdateComment, ReadComment, CreateComment, ReadCommentlist
from backend.var.models import Study_Board_Comment
from backend.var.session import get_db

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR,'static/')
IMG_DIR = os.path.join(STATIC_DIR,'images/')
SERVER_IMG_DIR = os.path.join('http://localhost:8000/','static/','images/')

# Read
async def get_Study_Board_Comment(db: AsyncSession, Free_Board_no: int, skip: int = 0) -> tuple[int, list[ReadCommentlist]]:
    result = await db.execute(select(Study_Board_Comment).filter(Study_Board_Comment.Board_no == Free_Board_no).order_by(Study_Board_Comment.Board_no.desc()).offset(skip*10).limit(10))
    Comment_info = result.scalars().all()
    total = await db.execute(select(func.count(Study_Board_Comment.Board_no)))
    total = total.scalar()
    return total, Comment_info


# Create
async def create_Study_Board_Comment(Free_Board_no: int, Comment_info: CreateComment, File_name: list[UploadFile], db: AsyncSession):
    create_values = {
    "Board_no": Free_Board_no,
    "Content": Comment_info.Content,
    "Create_date": datetime.now(timezone.utc).replace(second=0, microsecond=0).replace(tzinfo=None),
    "Likes": 0  # 예시로 Likes 컬럼이 있다면
    }
    Image_paths=[]
    for file in File_name:
        currentTime = datetime.now().strftime("%Y%m%d%H%M%S")
        original_extension = os.path.splitext(file.filename)[1]  # 원래 파일의 확장자 추출
        saved_file_name = f"{currentTime}{secrets.token_hex(16)}{original_extension}"  # 확장자 포함
        file_location = os.path.join(IMG_DIR, saved_file_name)
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        Image_paths.append(saved_file_name)
    create_values["Image_paths"] = ",".join(Image_paths)
    await db.execute(insert(Study_Board_Comment).values(create_values))
    await db.commit()
    

# Update
async def update_Study_Board_Comment(Study_Board_no: int, Comment_no: int, Comment_info: UpdateComment, File_name: list[UploadFile], db: AsyncSession) -> None:
    create_values = {
    "Board_no": Study_Board_no,
    "Comment_no" : Comment_no,
    "Content": Comment_info.Content,
    "Create_date": datetime.now(timezone.utc).replace(second=0, microsecond=0).replace(tzinfo=None),
    "Likes": 0  # 예시로 Likes 컬럼이 있다면
    }
    Image_paths=[]
    for file in File_name:
        currentTime = datetime.now().strftime("%Y%m%d%H%M%S")
        original_extension = os.path.splitext(file.filename)[1]  # 원래 파일의 확장자 추출
        saved_file_name = f"{currentTime}{secrets.token_hex(16)}{original_extension}"  # 확장자 포함
        file_location = os.path.join(IMG_DIR, saved_file_name)
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        Image_paths.append(saved_file_name)
    create_values["Image_paths"] = ",".join(Image_paths)
    await db.execute(insert(Study_Board_Comment).values(create_values))
    await db.execute(update(Study_Board_Comment).filter(Study_Board_Comment.Board_no == Study_Board_no).filter(Study_Board_Comment.Comment_no == Comment_no).values(Comment_info.dict()))
    await db.commit()
    

# Delete
async def delete_Study_Board_Comment(Study_Board_no: int, Comment_no: int, db: AsyncSession) -> None:
    delete_Image_Study_Board_Comment(Study_Board_no, Comment_no)
    await db.execute(delete(Study_Board_Comment).filter(Study_Board_Comment.Board_no == Study_Board_no).filter(Study_Board_Comment.Comment_no == Comment_no))
    await db.commit()

# Delte Image
async def delete_Image_Study_Board_Comment(Board_no: int, Comment_no: int, db: AsyncSession) -> None:
    result = await db.execute(select(Study_Board_Comment.Image_paths).filter(Study_Board_Comment.Board_no == Board_no).filter(Study_Board_Comment.Comment_no == Comment_no))
    image_paths = result.scalar_one_or_none()
    image_paths = image_paths.split(',')
    for image_path in image_paths:
        full_path = os.path.join(IMG_DIR, image_path.strip())
        os.remove(full_path)