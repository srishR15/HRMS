from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import Base, engine, init_db
from app.routers import employees, attendance

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

init_db()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(employees.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="frontend")

@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}