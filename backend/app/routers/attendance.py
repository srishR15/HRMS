from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.database import get_db
from app.models import Attendance as AttendanceModel, Employee as EmployeeModel
from app.schemas import AttendanceCreate, Attendance

router = APIRouter()

# -----------------------------
# Get attendance for an employee
# -----------------------------
@router.get("/{employee_id}", response_model=List[Attendance])
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(EmployeeModel).filter(EmployeeModel.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    return db.query(AttendanceModel).filter(AttendanceModel.employee_id == employee_id).all()


# -----------------------------
# Mark attendance
# -----------------------------
@router.post("/", response_model=Attendance, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    # Validate employee exists
    employee = db.query(EmployeeModel).filter(EmployeeModel.employee_id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )

    # Validate status
    if attendance.status not in ["Present", "Absent"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be either 'Present' or 'Absent'"
        )

    # Check for duplicate entry for same date
    existing = db.query(AttendanceModel).filter(
        AttendanceModel.employee_id == attendance.employee_id,
        AttendanceModel.date == attendance.date
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attendance already marked for {attendance.date}"
        )

    new_attendance = AttendanceModel(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance
