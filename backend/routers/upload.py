from services.gemini_service import summarize_text
#from database.mongodb import documents
from fastapi import APIRouter, UploadFile, File
import shutil

from services.pdf_service import extract_text

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    print("PDF saved")

    text = extract_text(file_path)

    print("PDF extracted")

    summary = summarize_text(text)

    print("Summary generated")

    # documents.insert_one(
    #     {
    #         "filename": file.filename,
    #         "summary": summary
    #     }
    # )

    print("Saved to MongoDB")

    return {
        "filename": file.filename,
        "summary": summary
    }