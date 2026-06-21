from services.gemini_service import summarize_text
from fastapi import APIRouter, UploadFile, File
from services.pdf_service import extract_text
import shutil
import os

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("PDF saved")

    text = extract_text(file_path)

    print("PDF extracted")

    summary = summarize_text(text)

    print("Summary generated")

    return {
        "filename": file.filename,
        "summary": summary
    }