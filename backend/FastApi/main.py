import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from detect_cam import detect_sign_from_frame, get_current_text, delete_last_character, reset_text
from io import BytesIO
from PIL import Image
import uvicorn

app = FastAPI()

# Cho phép frontend từ Render gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Có thể fix thành URL frontend Render nếu muốn bảo mật hơn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    frame = np.array(image)
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

    label = detect_sign_from_frame(frame)
    return {"label": label}

@app.get("/text/")
def get_text():
    return {"text": get_current_text()}

@app.post("/text/delete")
def delete_character():
    delete_last_character()
    return {"message": "Deleted"}

@app.post("/text/reset")
def reset():
    reset_text()
    return {"message": "Reset thành công"}

if __name__ == "__main__":
    # Render yêu cầu dùng biến PORT
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)